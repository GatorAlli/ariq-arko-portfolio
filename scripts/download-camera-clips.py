"""Download only the four personal films approved for the camera showcase."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import urllib.request

ROOT = Path(__file__).resolve().parents[1] / '.media-source' / 'personal'
CLIPS = [
    ('kella.mov', '1g8YguFFQuUdI7fKsg9Rz0lDsjE3R7Vaq'),
    ('nepal.mp4', '1UTubJHxKIf-m-S4ZHmEZmQhpHdQCpfgG'),
    ('readers.mp4', '11aKP28Pejj-hSL-T8GUGgCyP5DBbERSg'),
    ('study.mp4', '1oSfuQD5uP9hdTHnc7QMAJM1__m7OQbMH'),
]

def download(item):
    name, file_id = item
    target = ROOT / name
    if target.exists() and target.stat().st_size > 100_000:
        return f'{name}: already downloaded ({target.stat().st_size} bytes)'
    request = urllib.request.Request(
        f'https://drive.usercontent.google.com/download?id={file_id}&export=download',
        headers={'User-Agent': 'Mozilla/5.0'},
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        content_type = response.headers.get('content-type', '')
        if 'text/html' in content_type:
            raise RuntimeError(f'{name}: Drive returned a page instead of video; no file saved')
        partial = target.with_suffix(target.suffix + '.part')
        with partial.open('wb') as output:
            while chunk := response.read(1024 * 1024):
                output.write(chunk)
        partial.replace(target)
    return f'{name}: {target.stat().st_size} bytes'

if __name__ == '__main__':
    ROOT.mkdir(parents=True, exist_ok=True)
    with ThreadPoolExecutor(max_workers=4) as pool:
        for result in pool.map(download, CLIPS):
            print(result, flush=True)
