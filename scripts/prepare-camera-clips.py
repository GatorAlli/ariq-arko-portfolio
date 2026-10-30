"""Encode approved personal films and small silent camera-screen previews."""
from pathlib import Path
import concurrent.futures
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.media-tools'))
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
OUT = ROOT / 'public/media/personal'
OUT.mkdir(parents=True, exist_ok=True)

def encode(item):
    slug, ext, title = item
    source = ROOT / '.media-source/personal' / (slug + ext)
    film = OUT / (slug + '.mp4')
    preview = OUT / (slug + '-preview.mp4')
    poster = OUT / (slug + '.webp')
    common = [FFMPEG, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(source)]
    # Cap long dimension at 1920, maintaining the original aspect ratio and audio.
    if ext == '.mp4':
        # These originals already use browser-compatible H.264/AAC. Preserve quality and size.
        subprocess.run(common + ['-map','0:v:0','-map','0:a?','-c','copy','-movflags','+faststart',str(film)], check=True)
    elif not film.exists():
        subprocess.run(common + ['-map','0:v:0','-map','0:a?','-vf',"scale='min(1920,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",'-c:v','libx264','-threads','2','-preset','medium','-crf','21','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k','-movflags','+faststart',str(film)], check=True)
    if not preview.exists():
        subprocess.run(common + ['-t','12','-an','-vf',"scale='min(960,iw)':'min(960,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,fps=24",'-c:v','libx264','-threads','2','-preset','medium','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart',str(preview)], check=True)
    if not poster.exists():
        subprocess.run(common + ['-ss','1','-frames:v','1','-vf',"scale='min(960,iw)':'min(960,ih)':force_original_aspect_ratio=decrease",'-quality','85',str(poster)], check=True)
    dimensions = {'kella': (1920,1080), 'nepal': (1080,1920), 'readers': (720,1280), 'study': (1080,1920)}
    width,height = dimensions[slug]
    return {'id':slug,'title':title,'width':width,'height':height,'src':f'/media/personal/{slug}.mp4','preview':f'/media/personal/{slug}-preview.mp4','poster':f'/media/personal/{slug}.webp'}

if __name__ == '__main__':
    clips = [('kella','.mov','KELLA'),('nepal','.mp4','NEPAL'),('readers','.mp4','Readers'),('study','.mp4','Study')]
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        results = list(pool.map(encode, clips))
    (ROOT / 'lib/camera-clips.json').write_text(json.dumps(results,indent=2)+'\n',encoding='utf-8')
    for clip in results:
        print(clip['title'],(OUT/(clip['id']+'.mp4')).stat().st_size,'bytes',flush=True)
