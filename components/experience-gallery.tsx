"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

type Certificate = { id: string; label: string; image: string };
type GalleryItem = { label: string; image?: string; placeholder?: number };

function GalleryVisual({ item, thumbnail = false }: { item: GalleryItem; thumbnail?: boolean }) {
  if (item.image) return <Image src={item.image} alt={item.label} fill sizes={thumbnail ? "180px" : "(max-width: 767px) 90vw, 65vw"} className="object-contain" />;
  const backgrounds = ["bg-card", "bg-[#1c1125]", "bg-[#182015]"];
  return <div role="img" aria-label={`${item.label}, photo coming soon`} className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-3 text-center text-muted-foreground ${backgrounds[item.placeholder ?? 0]}`}>
    <ImageIcon aria-hidden="true" className={thumbnail ? "size-5" : "size-10"} strokeWidth={1} />
    <span className={thumbnail ? "text-[10px]" : "text-sm"}>{thumbnail ? `Photo ${(item.placeholder ?? 0) + 1}` : item.label}</span>
    {!thumbnail ? <span className="text-[9px] uppercase tracking-widest">Image to be added</span> : null}
  </div>;
}

export function ExperienceGallery({ organization, certificates = [] }: { organization: string; certificates?: Certificate[] }) {
  const photos: GalleryItem[] = Array.from({ length: 3 }, (_, index) => ({ label: `${organization} / Behind the scenes ${index + 1}`, placeholder: index }));
  const items: GalleryItem[] = [...photos, ...certificates];
  const [selectedIndex, setSelectedIndex] = useState(certificates.length ? photos.length : 0);
  const selected = items[selectedIndex];

  function thumbnail(item: GalleryItem, index: number) {
    return <button key={item.label} type="button" aria-label={`Preview ${item.label}`} aria-pressed={selectedIndex === index} onClick={() => setSelectedIndex(index)} className={`relative aspect-video min-w-0 overflow-hidden border-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${selectedIndex === index ? "border-primary" : "border-border hover:border-primary/60"}`}>
      <GalleryVisual item={item} thumbnail />
    </button>;
  }

  return <div id={certificates[0]?.id} role="group" aria-label={`${organization} image gallery`} className="mt-8 scroll-mt-28 grid items-start gap-4 sm:grid-cols-[minmax(0,4fr)_minmax(90px,1fr)]">
    <div className="min-w-0">
      <div className="relative aspect-[16/10] overflow-hidden border border-border bg-card" aria-live="polite" aria-atomic="true">
        <div key={selectedIndex} className="absolute inset-0 animate-in fade-in duration-300 motion-reduce:animate-none"><GalleryVisual item={selected} /></div>
      </div>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-2 text-xs text-muted-foreground">
        <p>{selected.label}</p>
        {selectedIndex < photos.length ? <span>{selectedIndex + 1} / {photos.length}</span> : null}
      </div>
    </div>
    <div className="min-w-0 space-y-4">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-1" aria-label="Experience photos">{photos.map(thumbnail)}</div>
      {certificates.length ? <div className="space-y-3"><h3 className="text-xs font-medium tracking-wide">Certification</h3><div className="grid grid-cols-3 gap-3 sm:grid-cols-1">{certificates.map((item, index) => thumbnail(item, photos.length + index))}</div></div> : null}
    </div>
  </div>;
}
