"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import pages from "@/lib/resume-pages.json";

const pdf = "/documents/ariq-arko-resume.pdf";

export function ResumeViewer({ id }: { id?: string }) {
  const [zoom, setZoom] = useState("100");
  return <Dialog>
    <DialogTrigger asChild><button id={id} type="button" className="resume-cta">View résumé</button></DialogTrigger>
    <DialogContent className="resume-pdf-dialog">
      <DialogHeader className="resume-pdf-header">
        <DialogTitle>Résumé</DialogTitle>
        <DialogDescription className="sr-only">Read Ariq Arko’s actual résumé PDF. Close this window to return to the portfolio.</DialogDescription>
        <a href={pdf} download className="resume-pdf-download">Download PDF</a>
      </DialogHeader>
      <div className="resume-pdf-tools"><label htmlFor={`${id ?? "about"}-pdf-zoom`}>Zoom</label><select id={`${id ?? "about"}-pdf-zoom`} value={zoom} onChange={event => setZoom(event.target.value)}><option value="100">Fit width</option><option value="150">150%</option><option value="200">200%</option></select></div>
      <div className="resume-pdf-pages" role="region" aria-label="Résumé PDF pages" tabIndex={0}>
        <div className="resume-pdf-sheet-stack" style={{ width: `${zoom}%` }}>
          {pages.map((page, index) => <Image key={page.src} src={page.src} width={page.width} height={page.height} alt={`Original résumé PDF, page ${index + 1} of ${pages.length}. Download the PDF for selectable text.`} unoptimized className="resume-pdf-sheet" />)}
        </div>
      </div>
    </DialogContent>
  </Dialog>;
}
