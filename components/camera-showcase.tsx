"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CameraInfo } from "@/components/camera-info";
import type { CameraControls, CameraHandle } from "@/components/camera-scene";
import { useWorkFilms } from "@/components/work-film-player";
import clips from "@/lib/camera-clips.json";

const CameraStage = dynamic(() => import("@/components/camera-scene"), { ssr: false });

export function CameraShowcase() {
  const [selected, setSelected] = useState(0);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const { previewsEnabled,viewerOpen,openFilm } = useWorkFilms();
  const root = useRef<HTMLDivElement>(null);
  const previews = useRef<(HTMLVideoElement | null)[]>([]);
  const selection = useRef(selected);
  const camera = useRef<CameraHandle | null>(null);
  const [controls, setControls] = useState<CameraControls | null>(null);
  const clip = clips[selected];
  const handleReady = useCallback(() => setReady(true), []);
  const handleFailure = useCallback(() => setFailed(true), []);
  const handleControls = useCallback((positions: CameraControls) => setControls(positions), []);
  useEffect(()=>{selection.current=selected;},[selected]);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const visibilityObserver = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    visibilityObserver.observe(element);
    return () => visibilityObserver.disconnect();
  }, []);
  useEffect(() => {
    let cancelled = false;
    const syncPlayback = () => {
      previews.current.forEach((video, index) => {
        if (!video) return;
        if (index === selected && visible && previewsEnabled) video.play().catch(error => { if (!cancelled && error.name !== "AbortError") setPlaybackError(true); });
        else video.pause();
      });
    };
    syncPlayback(); previews.current.forEach(video => video?.addEventListener("loadeddata", syncPlayback));
    const elements = previews.current.slice();
    return () => { cancelled = true; elements.forEach(video => { video?.pause(); video?.removeEventListener("loadeddata", syncPlayback); }); };
  }, [visible, previewsEnabled, selected]);
  const selectFilm = (index: number) => {
    if (index === selected) return;
    setSelected(index); setPlaybackError(false);
  };
  const stepFilm = (direction: number, fromWheel = false) => { if (!fromWheel) camera.current?.press(direction); selectFilm((selected + direction + clips.length) % clips.length); };
  const showFilm = useCallback(() => openFilm(clips[selection.current]), [openFilm]);
  return <div ref={root} className="camera-showcase" aria-label="Personal films">
    <div className="camera-stage-shell" data-ready={ready && !failed} onKeyDown={event => {
      if (event.target instanceof HTMLCanvasElement) return;
      if (event.key === "ArrowLeft") { event.preventDefault(); stepFilm(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); stepFilm(1); }
    }}>
      {!failed ? <Image src="/images/pentax-camera-poster.webp" alt="" fill preload unoptimized sizes="(max-width: 1000px) 92vw, 960px" className="camera-instant-poster" /> : null}
      {clips.map((film, index) => <video key={film.id} ref={element => { previews.current[index] = element; }} src={film.preview} poster={film.poster} muted loop playsInline preload="auto" className={failed && index === selected ? "camera-video-fallback" : "camera-video-source"} tabIndex={-1} aria-hidden="true" onError={() => { if (index === selected) setPlaybackError(true); }} />)}
      {!failed ? <CameraStage videoRefs={previews} handleRef={camera} selected={selected} active={visible && !viewerOpen} onReady={handleReady} onFailure={handleFailure} onControls={handleControls} onWatch={showFilm} /> : null}
      <button className="camera-screen-open sr-only" type="button" onClick={showFilm}>Watch {clip.title}</button>
      {ready && !failed && controls?.visible ? <>{([-1, 1] as const).map(direction => {
        const point = direction === -1 ? controls.previous : controls.next;
        return <button key={direction} type="button" className="camera-wheel-button" style={{ left: `${point[0]}%`, top: `${point[1]}%` }} onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); camera.current?.press(direction,true); }} onPointerUp={() => camera.current?.release()} onPointerCancel={() => camera.current?.release()} onKeyDown={event => { if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) camera.current?.press(direction,true); }} onKeyUp={() => camera.current?.release()} onClick={() => { camera.current?.release(); stepFilm(direction,true); }} aria-label={`${direction === -1 ? "Previous" : "Next"} film using camera wheel`} title={direction === -1 ? "Previous film" : "Next film"} />;
      })}</> : null}
      <button type="button" className="camera-step camera-step-previous" onClick={() => stepFilm(-1)} aria-label="Previous film" title="Previous film"><svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true"><path d="M19 2 3 12 19 22 13 12Z" /></svg></button>
      <button type="button" className="camera-step camera-step-next" onClick={() => stepFilm(1)} aria-label="Next film" title="Next film"><svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true"><path d="M5 2 21 12 5 22 11 12Z" /></svg></button>
      <CameraInfo />
    </div>
    <span className="sr-only" role="status" aria-atomic="true">{clip.title}</span>
    {playbackError ? <p className="camera-media-message" role="status">Preview paused. Open the film to watch.</p> : null}
  </div>;
}
