import { portfolioClass } from "@/lib/portfolio-styles";
import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { AboutSkills } from "@/components/about-skills";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/page-actions";
import { Conversation, PageIntro, SiteFooter } from "@/components/portfolio-layout";
import { awards, email, experience, isPageSlug, pageInfo, projects } from "@/lib/portfolio";

export function generateStaticParams() { return Object.keys(pageInfo).map(section => ({ section })); }
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  return isPageSlug(section) ? { title: section === "work" ? "Recent work" : section[0].toUpperCase() + section.slice(1), description: pageInfo[section].intro } : {};
}

export default function PortfolioPage({ params }: { params: Promise<{ section: string }> }) {
  return <>
    <Suspense fallback={<PortfolioSectionSkeleton />}>
      <PortfolioSection params={params} />
    </Suspense>
    <SiteFooter />
  </>;
}

function PortfolioSectionSkeleton() {
  return <main id="main-content" aria-busy="true">
    <PageIntro title="Ariq Arko" intro="Loading this section…" />
    <section className={portfolioClass("page-padding section-space")} role="status" aria-label="Loading portfolio content">
      <div className="grid gap-8 sm:grid-cols-2" aria-hidden="true">
        <div className="min-h-72 border border-border bg-muted" />
        <div className="space-y-6">
          <div className="h-10 w-3/4 bg-muted" />
          <div className="h-5 w-full bg-muted" />
          <div className="h-5 w-full bg-muted" />
          <div className="h-5 w-2/3 bg-muted" />
        </div>
      </div>
    </section>
  </main>;
}

async function PortfolioSection({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (section === "skills") redirect("/about#skills");
  if (!isPageSlug(section)) notFound();
  const info = pageInfo[section];
  return <>
    <main id="main-content">
      <PageIntro title={info.title} intro={info.intro} />
      {section === "about" ? <section className={portfolioClass("about-layout page-padding section-space")}>
        <div className={portfolioClass("about-portrait")}><Image src="/images/ariq-arko.jpg" alt="Ariq Arko in Dhaka" fill sizes="(max-width: 640px) 100vw, 43vw" /></div>
        <div className={portfolioClass("about-copy")}><h2 className={portfolioClass("section-title")}>Stories. People.<br />A little curiosity.</h2><p className={portfolioClass("body-large")}>I’m Ariq, a content creator, student leader, and community builder from Dhaka. I work across film, campaigns, and events, bringing people and ideas together.</p><p>From producing content for Bangladeshi brands to founding DAKKHINNO and leading students at DRMC, I care about work that connects with people.</p><Button asChild className={portfolioClass("editorial-button lime-button w-fit")}><Link href="/contact">Start a conversation →</Link></Button><div className={portfolioClass("education")}><span className={portfolioClass("eyebrow")}>EDUCATION</span><p>Dhaka Residential Model College<br /><span className="text-muted-foreground">HSC 2026 cohort</span></p><p>Previously: Scholars School &amp; College</p></div><div className="flex flex-wrap gap-3"><Button asChild variant="outline" className={portfolioClass("editorial-button")}><Link href="/resume">View résumé →</Link></Button><Button asChild variant="ghost" className={portfolioClass("editorial-button")}><a href="/documents/ariq-arko-resume.pdf" download>Download PDF ↓</a></Button></div></div>
      </section> : null}
      {section === "experience" ? <section className={portfolioClass("experience-list page-padding section-space")} aria-label="Experience timeline">{experience.map((item, index) => <article className={portfolioClass("experience-entry")} key={`${item.org}-${index}`}><p className={portfolioClass("eyebrow experience-date")}>{item.date}</p><div className={portfolioClass("experience-copy")}><h2>{item.role}</h2><p className="text-muted-foreground">{item.org}</p><p className={portfolioClass("contribution")}>{item.body}</p><PhotoPlaceholder label={`${item.org} / Behind the scenes`} /></div></article>)}</section> : null}
      {section === "about" ? <AboutSkills /> : null}
      {section === "work" ? <section className={portfolioClass("work-list page-padding")} aria-label="Selected projects">{projects.map(project => <article className={portfolioClass("project-row")} key={project.key}><div className={portfolioClass("project-copy")}><p className={portfolioClass("eyebrow")}>{project.num} / {project.tag}</p><h2 className={portfolioClass("project-title")}>{project.title}</h2><p>{project.body}</p><Button asChild variant="outline" className={portfolioClass("editorial-button")}><Link href={`/work/${project.key.toLowerCase()}`}>View project →</Link></Button></div><Link href={`/work/${project.key.toLowerCase()}`} className={portfolioClass(`project-image-link project-${project.key.toLowerCase()}`)} aria-label={`View ${project.client} project`}><PhotoPlaceholder label={`${project.client} / ${project.tag}`} /><span className={portfolioClass("project-image-meta")}><span>{project.client}</span><span>{project.date} →</span></span></Link></article>)}</section> : null}
      {section === "awards" ? <section className={portfolioClass("awards-list page-padding section-space")} aria-label="Awards and recognition">{awards.map(([year, title, issuer]) => <article className={portfolioClass("award-row")} key={title}><p className={portfolioClass("eyebrow")}>{year}</p><div><h2>{title}</h2><p className="text-muted-foreground">{issuer}</p></div></article>)}</section> : null}
      {section === "testimonials" ? <section className={portfolioClass("empty-editorial page-padding section-space")}><h2 className={portfolioClass("section-title")}>Good work starts<br />with good people.</h2><p className={portfolioClass("body-large text-muted-foreground")}>Words from collaborators will be shared here soon.</p><p>For references or a conversation about working together, get in touch.</p><Button asChild className={portfolioClass("editorial-button lime-button")}><Link href="/contact">Let’s connect →</Link></Button></section> : null}
      {section === "contact" ? <section className={portfolioClass("contact-layout page-padding section-space")}><div className={portfolioClass("contact-copy")}><h2 className={portfolioClass("section-title")}>Let’s make<br />something matter.</h2><p>For hiring, creative projects, or research collaboration. Tell me what you have in mind.</p><a className={portfolioClass("email-link")} href={`mailto:${email}`}>{email} →</a><CopyEmail /></div><ContactForm /></section> : null}
    </main>
    {section !== "contact" ? <Conversation /> : null}
  </>;
}
