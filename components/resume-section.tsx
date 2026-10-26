import { RevealHeading } from "@/components/reveal-heading";
import { ChapterCurve } from "@/components/chapter-curve";
import { ResumeViewer } from "@/components/resume-viewer";

export function ResumeSection() {
  return <section id="resume" className="portfolio-section resume-section" aria-labelledby="resume-heading">
    <ChapterCurve />
    <div className="resume-intro">
      <RevealHeading id="resume-heading" className="section-title-text" text="Résumé" />
      <div className="resume-actions">
        <ResumeViewer id="resume-full" />
        <a href="/documents/ariq-arko-resume.pdf" download className="resume-download">Download PDF</a>
      </div>
    </div>
  </section>;
}
