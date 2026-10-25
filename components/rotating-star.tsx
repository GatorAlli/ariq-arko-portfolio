"use client";

import { useEffect, useRef } from "react";

export function RotatingStar({ className = "" }: { className?: string }) {
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

  return <div className={`rotating-star ${className}`} aria-hidden="true"><video ref={video} autoPlay loop muted playsInline preload="auto" poster="/images/rotating-star-poster.jpg" tabIndex={-1}><source src="/media/rotating-star-seamless.mp4" type="video/mp4" /></video></div>;
}
