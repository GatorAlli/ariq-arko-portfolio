import { portfolioClass } from "@/lib/portfolio-styles";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { FooterActions } from "@/components/page-actions";
import { PageIntro, SiteFooter } from "@/components/portfolio-layout";
import { awards, email, experience } from "@/lib/portfolio";

export const metadata: Metadata = { title: "Résumé" };
export default function ResumePage() {
  return <><main id="main-content" className="resume-page"><PageIntro title="Ariq Arko" intro="Content creator, student leader & community builder · Dhaka, Bangladesh" backHref="/about" backLabel="About" /><section className={portfolioClass("page-padding resume-content")}><div className={portfolioClass("resume-actions flex flex-wrap items-center gap-4")}><Button asChild className={portfolioClass("editorial-button lime-button")}><a href="/documents/ariq-arko-resume.pdf" download>Download original résumé ↓</a></Button><FooterActions /></div><p><a href={`mailto:${email}`}>{email}</a></p><h2 className={portfolioClass("section-title")}>Experience</h2>{experience.map(item => <article key={item.org} className={portfolioClass("resume-entry")}><p className={portfolioClass("eyebrow")}>{item.date}</p><h3>{item.role} · {item.org}</h3><p>{item.body}</p></article>)}<h2 className={portfolioClass("section-title")}>Education</h2><p>Dhaka Residential Model College · HSC 2026 cohort<br />Previously: Scholars School &amp; College</p><h2 className={portfolioClass("section-title")}>Awards & recognition</h2>{awards.map(([year, award, issuer]) => <p key={award}><strong>{award}</strong><br /><span className="text-muted-foreground">{issuer} / {year}</span></p>)}</section></main><SiteFooter /></>;
}
