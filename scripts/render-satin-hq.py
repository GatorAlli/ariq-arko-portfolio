"""Render the cleaned background as a seamless, high-quality 1080p loop.

Requires Pillow, NumPy, SciPy, and either ffmpeg on PATH or imageio-ffmpeg.
The original background assets remain available for comparison.
"""
import shutil
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import map_coordinates

ROOT = Path(__file__).resolve().parents[1]
ffmpeg = shutil.which("ffmpeg")
if not ffmpeg:
    import imageio_ffmpeg
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

width, height, fps, frames = 1920, 1080, 30, 360
texture = np.asarray(
    Image.open(ROOT / "public/images/home-purple-texture-hq.png")
    .convert("RGB").resize((width, height), Image.Resampling.LANCZOS),
    dtype=np.float32,
)
y, x = np.mgrid[:height, :width].astype(np.float32)
u, v = x / width, y / height
tau = 2 * np.pi
desktop = ROOT / "public/media/purple-satin-loop-hq.mp4"
mobile = ROOT / "public/media/purple-satin-loop-mobile.mp4"
process = subprocess.Popen([
    ffmpeg, "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24",
    "-s", f"{width}x{height}", "-r", str(fps), "-i", "-",
    "-filter_complex", "[0:v]split=2[desktop][small];[small]scale=1280:720:flags=lanczos[mobile]",
    "-map", "[desktop]", "-an", "-c:v", "libx264", "-threads", "4",
    "-preset", "medium", "-crf", "16", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", str(desktop),
    "-map", "[mobile]", "-an", "-c:v", "libx264", "-threads", "2",
    "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", str(mobile),
], stdin=subprocess.PIPE)

try:
    for index in range(frames):
        phase = tau * index / frames
        dx = width * (.012 * np.sin(phase + tau * (.65 * v + .15 * u))
                      + .006 * np.sin(2 * phase + tau * (.3 * v - .45 * u)))
        dy = height * (.015 * np.cos(phase + tau * (.55 * u - .2 * v))
                       + .005 * np.sin(2 * phase + tau * (.7 * v + .15 * u)))
        coordinates = np.array([y + dy, x + dx])
        moved = np.stack([
            map_coordinates(texture[:, :, channel], coordinates, order=1,
                            mode="reflect", prefilter=False)
            for channel in range(3)
        ], axis=-1)
        sheen = (1 + .08 * np.sin(phase + tau * (.3 * u + .5 * v))
                 + .04 * np.sin(2 * phase + tau * (.9 * u - .2 * v)))
        frame = np.clip(np.rint(moved * sheen[:, :, None]), 0, 255).astype(np.uint8)
        if index == 0:
            Image.fromarray(frame).save(
                ROOT / "public/images/home-purple-satin-poster.webp", quality=94,
            )
        process.stdin.write(frame.tobytes())
        if index % 30 == 0:
            print(f"Rendered {index}/{frames} frames", flush=True)
finally:
    process.stdin.close()

if process.wait():
    raise RuntimeError("Background encoding failed")
print(f"Finished: {desktop.name} and {mobile.name}", flush=True)
