"""Resume an explicitly selected large Drive video using standard byte ranges."""
from concurrent.futures import ThreadPoolExecutor, as_completed
from http.cookiejar import CookieJar
from pathlib import Path
import argparse
import copy
import importlib.util
import json
import shutil
import time
import urllib.request

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('project_download',ROOT/'scripts/download-project-videos.py')
download_module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(download_module)
parser=argparse.ArgumentParser()
parser.add_argument('--manifest',type=Path,default=ROOT/'.media-source/hospital-batch.json')
parser.add_argument('--id')
parser.add_argument('--workers',type=int,choices=range(1,5),default=4)
args=parser.parse_args()
items=json.loads(args.manifest.read_text(encoding='utf-8'))
matches=[entry for entry in items if not args.id or entry['id']==args.id]
if len(matches)!=1:
    raise SystemExit('Select exactly one reviewed source with --id.')
item=matches[0]
destination=ROOT/'.media-source/projects'
target=destination/(item['id']+item['extension'])
parts=destination/(item['id']+'.parallel-parts')
parts.mkdir(parents=True,exist_ok=True)

if target.exists():
    print(f"READY {item['id']} {target.stat().st_size:,} bytes",flush=True)
    raise SystemExit(0)

cookies=CookieJar()
opener=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cookies))
with download_module.open_media(opener,item['driveId'],1) as response:
    if response.status!=206 or not response.headers.get('Content-Range','').startswith('bytes 1-'):
        raise RuntimeError('The source does not advertise standard resumable byte ranges')
    total=int(response.headers['Content-Range'].rsplit('/',1)[1])
    media_url=response.geturl()

chunk_size=128*1024*1024
chunks=[(index,start,min(start+chunk_size,total)-1) for index,start in enumerate(range(0,total,chunk_size))]

# Reuse the contiguous bytes from an earlier single-stream download.
# The caller must stop that writer before resuming with this downloader.
partial=target.with_suffix(target.suffix+'.part')
if partial.exists():
    available=partial.stat().st_size
    if available>total:
        raise RuntimeError('Partial source is larger than the advertised video')
    with partial.open('rb') as source:
        for index,start,end in chunks:
            reusable=min(end-start+1,max(0,available-start))
            path=parts/f'part-{index:03d}.bin'
            existing=path.stat().st_size if path.exists() else 0
            if reusable<=existing:
                continue
            source.seek(start+existing)
            remaining=reusable-existing
            with path.open('ab' if existing else 'wb') as output:
                while remaining:
                    data=source.read(min(1024*1024,remaining))
                    if not data:
                        raise RuntimeError('Incomplete reusable source range')
                    output.write(data)
                    remaining-=len(data)
    print(f'REUSED {item["id"]} {available:,} existing bytes',flush=True)

def fetch_chunk(chunk):
    index,start,end=chunk
    path=parts/f'part-{index:03d}.bin'
    expected=end-start+1
    jar=CookieJar()
    for cookie in cookies:
        jar.set_cookie(copy.copy(cookie))
    client=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
    for attempt in range(3):
        offset=path.stat().st_size if path.exists() else 0
        if offset==expected:
            return index
        if offset>expected:
            raise RuntimeError('Unexpected part size; original source left untouched')
        request=urllib.request.Request(media_url,headers={'User-Agent':'Mozilla/5.0','Range':f'bytes={start+offset}-{end}'})
        try:
            with client.open(request,timeout=90) as response:
                if response.status!=206 or response.headers.get('Content-Range')!=f'bytes {start+offset}-{end}/{total}':
                    raise RuntimeError('The source did not return the requested byte range')
                with path.open('ab' if offset else 'wb') as output:
                    while data:=response.read(1024*1024):
                        output.write(data)
            if path.stat().st_size!=expected:
                raise RuntimeError('Incomplete range response')
            return index
        except Exception:
            if attempt==2:
                raise
            time.sleep(2**(attempt+1))

print(f"RANGE DOWNLOAD {item['id']} {total:,} bytes in {len(chunks)} parts",flush=True)
with ThreadPoolExecutor(max_workers=args.workers) as pool:
    completed=0
    for future in as_completed([pool.submit(fetch_chunk,chunk) for chunk in chunks]):
        future.result()
        completed+=1
        print(f"PARTS READY {item['id']} {completed}/{len(chunks)}",flush=True)

temporary=target.with_suffix(target.suffix+'.assembling')
with temporary.open('wb') as output:
    for index,_,_ in chunks:
        with (parts/f'part-{index:03d}.bin').open('rb') as source:
            shutil.copyfileobj(source,output,8*1024*1024)
if temporary.stat().st_size!=total:
    raise RuntimeError('Assembled media size does not match the Drive response')
temporary.replace(target)
print(f"DONE {item['id']} {total:,} bytes",flush=True)
