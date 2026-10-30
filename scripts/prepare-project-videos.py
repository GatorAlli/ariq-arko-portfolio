"""Make browser-ready films, lightweight looping previews, and a mapped catalog."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import argparse
import json
import subprocess
import sys
import time

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.media-tools'))
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
SOURCE = ROOT / '.media-source' / 'projects'
OUTPUT = ROOT / 'public' / 'media' / 'projects'
CATALOG = ROOT / 'lib' / 'project-media.json'
MANIFEST = ROOT / 'scripts' / 'project-video-batch.json'


def probe(path):
    reader = imageio_ffmpeg.read_frames(str(path), output_params=['-frames:v','1'])
    try:
        metadata=next(reader)
        for _frame in reader:
            pass
        return metadata
    finally:
        reader.close()


def run(arguments):
    result = subprocess.run([FFMPEG,'-hide_banner','-loglevel','error','-y']+arguments, capture_output=True, text=True, encoding='utf-8', errors='replace')
    if result.returncode:
        raise RuntimeError(result.stderr[-1600:])


def prepare(item):
    source = SOURCE / (item['id'] + item['extension'])
    film = OUTPUT / (item['id'] + '.mp4')
    preview = OUTPUT / (item['id'] + '-preview.mp4')
    poster = OUTPUT / (item['id'] + '.webp')
    metadata = probe(source)
    duration = metadata.get('duration') or 1
    scale = "scale='min(1920,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2"
    if not film.exists():
        temporary = film.with_suffix('.encoding.mp4')
        can_remux = (metadata['codec']=='h264' and metadata.get('audio_codec') in ('aac',None,'')
                     and 'yuv420p' in metadata.get('pix_fmt','') and '10' not in metadata.get('pix_fmt','')
                     and max(metadata['size'])<=1920 and source.stat().st_size<60_000_000)
        arguments=['-i',str(source),'-map','0:v:0','-map','0:a:0?','-map_metadata','-1']
        if can_remux:
            arguments += ['-c','copy']
        else:
            # Keep each published file below Git's per-file limit while retaining
            # the original full-quality download in the ignored source directory.
            rate = max(450,min(6000,int(75_000_000*8/1000/duration)-260))
            arguments += ['-vf',scale,'-c:v','libx264','-threads','2','-preset','fast','-crf','21','-maxrate',f'{rate}k','-bufsize',f'{rate*2}k','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k']
        run(arguments+['-movflags','+faststart',str(temporary)])
        temporary.replace(film)
    start = min(3,max(0,duration*.12))
    if not preview.exists():
        temporary = preview.with_suffix('.encoding.mp4')
        fps = max(1,min(30,metadata.get('fps') or 30))
        run(['-ss',str(start),'-i',str(film),'-t','12','-an','-vf',f"scale='min(960,iw)':'min(960,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,fps={fps:.3f}",'-c:v','libx264','-threads','2','-preset','fast','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart',str(temporary)])
        temporary.replace(preview)
    if not poster.exists():
        run(['-ss',str(start),'-i',str(film),'-frames:v','1','-vf',"scale='min(960,iw)':'min(960,ih)':force_original_aspect_ratio=decrease",'-quality','88',str(poster)])
    size = probe(film)['size']
    if film.stat().st_size>=95_000_000:
        raise RuntimeError(f"{item['id']}: encoded film exceeds the publication size budget")
    return {'id':item['id'],'category':item['category'],'subsection':item['subsection'],'title':item['title'],
            'width':size[0],'height':size[1], 'src':f"/media/projects/{item['id']}.mp4",
            'preview':f"/media/projects/{item['id']}-preview.mp4",'poster':f"/media/projects/{item['id']}.webp"}


def save_catalog(results, manifest):
    ordered = [results[item['id']] for item in manifest if item['id'] in results]
    temporary = CATALOG.with_suffix('.tmp')
    temporary.write_text(json.dumps(ordered,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    temporary.replace(CATALOG)


if __name__ == '__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--watch',action='store_true')
    args=parser.parse_args()
    OUTPUT.mkdir(parents=True,exist_ok=True)
    results={entry['id']:entry for entry in json.loads(CATALOG.read_text(encoding='utf-8'))} if CATALOG.exists() else {}
    submitted=set(results)
    failures=[]
    running={}
    with ThreadPoolExecutor(max_workers=2) as pool:
        while True:
            manifest=json.loads(MANIFEST.read_text(encoding='utf-8'))
            for item in manifest:
                if len(running)>=2:
                    break
                if item['id'] not in submitted and (SOURCE/(item['id']+item['extension'])).exists():
                    print('ENCODING '+item['id'],flush=True)
                    running[pool.submit(prepare,item)]=item
                    submitted.add(item['id'])
            for future in list(running):
                if not future.done():
                    continue
                item=running.pop(future)
                try:
                    entry=future.result()
                    results[item['id']]=entry
                    save_catalog(results,manifest)
                    print(f"PUBLISHED {item['id']} {(OUTPUT/(item['id']+'.mp4')).stat().st_size:,} bytes",flush=True)
                except Exception as error:
                    failures.append(item['id'])
                    print(f"FAILED {item['id']}: {error}",flush=True)
            remaining=[item for item in manifest if item['id'] not in submitted]
            if not running and (not remaining or not args.watch):
                break
            time.sleep(2)
    save_catalog(results,manifest)
    print(f'{len(results)} films ready; {len(failures)} conversion failures',flush=True)
    if failures:
        raise SystemExit(1)
