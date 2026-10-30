"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { FilmMedia } from "@/lib/work-media";

type FilmPlayback = {
  previewsEnabled: boolean;
  viewerOpen: boolean;
  togglePreviews: () => void;
  openFilm: (film: FilmMedia, trigger?: HTMLElement | null) => void;
};
const FilmContext = createContext<FilmPlayback | null>(null);

export function useWorkFilms() {
  const context = useContext(FilmContext);
  if (!context) throw new Error("Work film controls require WorkFilmProvider.");
  return context;
}

export function WorkFilmProvider({ children }: { children: ReactNode }) {
  const [film,setFilm] = useState<FilmMedia | null>(null);
  const [paused,setPaused] = useState(false);
  const [motionAllowed,setMotionAllowed] = useState(false);
  const [pageVisible,setPageVisible] = useState(true);
  const [error,setError] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);

  useEffect(()=>{
    const preference=window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion=()=>setMotionAllowed(!preference.matches);
    const updateVisibility=()=>setPageVisible(!document.hidden);
    updateMotion(); updateVisibility();
    preference.addEventListener("change",updateMotion);
    document.addEventListener("visibilitychange",updateVisibility);
    return ()=>{ preference.removeEventListener("change",updateMotion); document.removeEventListener("visibilitychange",updateVisibility); };
  },[]);

  const openFilm = useCallback((media: FilmMedia, opener?: HTMLElement | null)=>{
    trigger.current=opener??(document.activeElement instanceof HTMLElement?document.activeElement:null);
    setError(false); setFilm(media);
  },[]);
  const togglePreviews=useCallback(()=>{
    if (!motionAllowed) { setMotionAllowed(true); setPaused(false); }
    else setPaused(value=>!value);
  },[motionAllowed]);
  const previewsEnabled=!paused&&motionAllowed&&pageVisible&&!film;
  const playback=useMemo(()=>({previewsEnabled,viewerOpen:!!film,togglePreviews,openFilm}),[previewsEnabled,film,togglePreviews,openFilm]);

  return <FilmContext.Provider value={playback}>
    {children}
    <Dialog open={!!film} onOpenChange={open=>{if (!open) setFilm(null);}}>
      <DialogContent className="film-viewer-dialog" onCloseAutoFocus={event=>{ event.preventDefault(); trigger.current?.focus({preventScroll:true}); }}>
        <DialogTitle className="sr-only">{film?.title}</DialogTitle>
        <DialogDescription className="sr-only">Watch the full film. Close this player to return to the portfolio.</DialogDescription>
        {film ? <video key={film.src} src={film.src} poster={film.poster} controls autoPlay playsInline preload="metadata" className="film-viewer-video" aria-label={`${film.title} full film`} onError={()=>setError(true)}/> : null}
        {error&&film ? <p className="camera-media-message" role="alert">This video couldn’t load. <a href={film.src}>Open the video file</a>.</p> : null}
      </DialogContent>
    </Dialog>
  </FilmContext.Provider>;
}
