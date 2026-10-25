"use client";

import { useEffect, useRef } from "react";

export function FabricBackground() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (!video.current) return;
      if (motion.matches || document.hidden) video.current.pause();
      else void video.current.play().catch(() => {});
    };
    syncPlayback();
    motion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      motion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  return (
    <div className="fabric-background" aria-hidden="true">
      <video ref={video} autoPlay muted loop playsInline preload="metadata" poster="/images/home-purple-satin-poster.webp" tabIndex={-1}>
        <source media="(max-width: 767px)" src="/media/purple-satin-loop-mobile.mp4" type="video/mp4" />
        <source src="/media/purple-satin-loop-hq.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
