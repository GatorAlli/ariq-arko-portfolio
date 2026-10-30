"use client";

import { useEffect, useRef } from "react";
import { Info, Pause, Play } from "lucide-react";
import { useWorkFilms } from "@/components/work-film-player";
import cameraInfo from "@/lib/camera-model.json";

export function CameraInfo() {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const { previewsEnabled, togglePreviews } = useWorkFilms();
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !disclosure.current?.contains(event.target)) disclosure.current?.removeAttribute("open");
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !disclosure.current?.open) return;
      disclosure.current.open = false;
      disclosure.current.querySelector("summary")?.focus();
    };
    window.addEventListener("pointerdown", outside);
    window.addEventListener("keydown", escape);
    return () => { window.removeEventListener("pointerdown", outside); window.removeEventListener("keydown", escape); };
  }, []);
  return <details ref={disclosure} className="camera-info">
    <summary aria-label="Camera credits and preview settings" title="Camera credits and preview settings"><Info size={18} strokeWidth={1.5} aria-hidden="true" /></summary>
    <div className="camera-info-panel" role="region" aria-label="Camera credits and preview settings">
      <p><a href={cameraInfo.credit.url} target="_blank" rel="noopener noreferrer">{cameraInfo.credit.title}</a> by {cameraInfo.credit.author}, <a href={cameraInfo.credit.license} target="_blank" rel="noopener noreferrer">CC BY 4.0</a>. Screen pose, control labels, and textures adapted.</p>
      <button type="button" onClick={togglePreviews}>{previewsEnabled ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}<span>{previewsEnabled ? "Pause video previews" : "Play video previews"}</span></button>
    </div>
  </details>;
}
