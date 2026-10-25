"""Animate the supplied satin texture; requires Pillow, NumPy, SciPy and ffmpeg.

The image stays in a locked frame. Periodic displacement and highlight fields
close at exactly 2*pi. The first and final source frames are identical.
The 4K export scales the image-derived 1080p animation, rather than simulating cloth.
"""
import argparse
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import map_coordinates

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--master', type=Path, required=True, help='Destination for the 4K MP4 export')
MASTER = parser.parse_args().master.resolve()
MASTER.parent.mkdir(parents=True, exist_ok=True)
WEB = ROOT / 'public/media/purple-satin-loop.mp4'
W, H, FPS, FRAMES = 1920, 1080, 24, 289
texture = np.asarray(Image.open(ROOT / 'public/images/home-purple-texture.jpg').convert('RGB').resize((W, H), Image.Resampling.LANCZOS), dtype=np.float32)
y, x = np.mgrid[:H, :W].astype(np.float32)
u, v = x / W, y / H
tau = 2 * np.pi
process = subprocess.Popen([
    'ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
    '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
    '-filter_complex', '[0:v]split=2[master][web];[master]scale=3840:2160:flags=lanczos[uhd];[web]scale=1280:720:flags=lanczos[light]',
    '-map', '[uhd]', '-an', '-c:v', 'libx264', '-threads', '4', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(MASTER),
    '-map', '[light]', '-an', '-c:v', 'libx264', '-threads', '2', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(WEB)
], stdin=subprocess.PIPE)
first = None
for i in range(FRAMES):
    if i == FRAMES - 1:
        frame = first
    else:
        t = tau * i / (FRAMES - 1)
        dx = W * (.012 * np.sin(t + tau * (.65*v + .15*u)) + .006 * np.sin(2*t + tau * (.3*v - .45*u)))
        dy = H * (.015 * np.cos(t + tau * (.55*u - .2*v)) + .005 * np.sin(2*t + tau * (.7*v + .15*u)))
        coords = np.array([y + dy, x + dx])
        moved = np.stack([map_coordinates(texture[:, :, c], coords, order=1, mode='reflect', prefilter=False) for c in range(3)], axis=-1)
        sheen = 1 + .08 * np.sin(t + tau * (.3*u + .5*v)) + .04 * np.sin(2*t + tau * (.9*u - .2*v))
        frame = np.clip(np.rint(moved * sheen[:, :, None]), 0, 255).astype(np.uint8).tobytes()
        if i == 0:
            first = frame
    process.stdin.write(frame)
    if i % 48 == 0:
        print(f'Rendered {i}/{FRAMES} frames', flush=True)
process.stdin.close()
if process.wait():
    raise RuntimeError('Satin video encoding failed')
print(f'Finished: {MASTER}; {WEB}', flush=True)
