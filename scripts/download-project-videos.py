"""Download only the reviewed, explicitly mapped project-video batch."""
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urlparse
import argparse
import json
import time
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / '.media-source' / 'projects'
MANIFEST = ROOT / 'scripts' / 'project-video-batch.json'


class DownloadForm(HTMLParser):
    """Read Drive's normal large-file Download anyway form without executing HTML."""
    def __init__(self):
        super().__init__()
        self.action = None
        self.fields = {}
        self.inside = False

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == 'form' and attrs.get('id') == 'download-form':
            self.action = attrs.get('action')
            self.inside = True
        elif tag == 'input' and self.inside and attrs.get('name'):
            self.fields[attrs['name']] = attrs.get('value', '')

    def handle_endtag(self, tag):
        if tag == 'form':
            self.inside = False


def open_media(opener, file_id, offset):
    url = f'https://drive.usercontent.google.com/download?id={file_id}&export=download'
    headers = {'User-Agent': 'Mozilla/5.0'}
    if offset:
        headers['Range'] = f'bytes={offset}-'
    response = opener.open(urllib.request.Request(url, headers=headers), timeout=90)
    if 'text/html' not in response.headers.get('Content-Type', ''):
        return response
    page = response.read(2_000_000).decode('utf-8', errors='replace')
    response.close()
    form = DownloadForm()
    form.feed(page)
    if (not form.action or urlparse(form.action).hostname != 'drive.usercontent.google.com'
            or urlparse(form.action).path != '/download' or form.fields.get('id') != file_id):
        raise RuntimeError('Drive did not provide a public media download; no page saved as video')
    # These files were explicitly selected by the user. Follow the supplied form
    # unchanged, including Drive's ordinary large-file confirmation fields.
    response = opener.open(urllib.request.Request(form.action + '?' + urlencode(form.fields), headers=headers), timeout=90)
    if 'text/html' in response.headers.get('Content-Type', ''):
        response.close()
        raise RuntimeError('Drive returned an access or quota page instead of media')
    return response


def download(item):
    target = DESTINATION / (item['id'] + item['extension'])
    if target.exists() and target.stat().st_size > 100_000:
        return f"READY {item['id']} {target.stat().st_size:,} bytes"
    partial = target.with_suffix(target.suffix + '.part')
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(CookieJar()))
    last_error = None
    for attempt in range(3):
        try:
            offset = partial.stat().st_size if partial.exists() else 0
            with open_media(opener, item['driveId'], offset) as response:
                resumed = response.status == 206
                if resumed and not response.headers.get('Content-Range', '').startswith(f'bytes {offset}-'):
                    raise RuntimeError('Unexpected download range')
                if not resumed:
                    offset = 0
                size = offset
                remaining = response.headers.get('Content-Length')
                expected = offset + int(remaining) if remaining else None
                last_report = size
                with partial.open('ab' if resumed else 'wb') as output:
                    while chunk := response.read(1024 * 1024):
                        output.write(chunk)
                        size += len(chunk)
                        if size - last_report >= 64 * 1024 * 1024:
                            print(f"DOWNLOADING {item['id']} {size // 1_000_000} MB", flush=True)
                            last_report = size
                if expected and size != expected:
                    raise RuntimeError(f'Incomplete download: {size} of {expected} bytes')
                if size < 100_000:
                    raise RuntimeError('Unexpectedly small media response')
            partial.replace(target)
            return f"DONE {item['id']} {size:,} bytes"
        except Exception as error:
            last_error = error
            if attempt < 2:
                time.sleep(2 ** (attempt + 1))
    raise RuntimeError(f"{item['id']}: {last_error}")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--manifest',type=Path,default=MANIFEST)
    args = parser.parse_args()
    DESTINATION.mkdir(parents=True, exist_ok=True)
    items = [item for item in json.loads(args.manifest.read_text(encoding='utf-8')) if item.get('driveId')]
    failures = []
    completed = []
    with ThreadPoolExecutor(max_workers=3) as pool:
        futures = {pool.submit(download, item): item for item in items}
        for future in as_completed(futures):
            try:
                print(future.result(), flush=True)
                completed.append(futures[future]['id'])
            except Exception as error:
                failures.append(str(error))
                print('FAILED ' + str(error), flush=True)
    (DESTINATION / f'download-report-{args.manifest.stem}.json').write_text(json.dumps({'requested':[item['id'] for item in items],'completed':completed,'failures':failures},indent=2)+'\n',encoding='utf-8')
    if failures:
        raise SystemExit(f'{len(failures)} downloads need attention')
