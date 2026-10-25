import { portfolioClass } from "@/lib/portfolio-styles";
import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ExperienceGallery } from "@/components/experience-gallery";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { AboutSkills } from "@/components/about-skills";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/page-actions";
import { PageIntro, SiteFooter } from "@/components/portfolio-layout";
import { PortfolioRecords } from "@/components/portfolio-records";
import { certifications, events, participations, milestones, awards, email, phone, experience, isPageSlug, pageInfo, projects } from "@/lib/portfolio";

export function generateStaticParams() { return Object.keys(pageInfo).map(section => ({ section })); }
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  return isPageSlug(section) ? { title: section === "contact" ? "Get in touch" : section === "work" ? "Recent work" : section[0].toUpperCase() + section.slice(1), description: pageInfo[section].intro } : {};
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
      {section !== "contact" ? <PageIntro title={info.title} intro={info.intro} /> : null}
      {section === "about" ? <section className={portfolioClass("about-layout page-padding pb-14 md:pb-20")}>
        <div className={portfolioClass("about-portrait")}><Image src="/images/experience/about-beach.jpg" alt="Ariq Arko smiling at the beach at night" fill sizes="(max-width: 640px) 100vw, 43vw" /></div>
        <div className={portfolioClass("about-copy")}><h2 className={portfolioClass("section-title")}>Stories. People.<br />A little curiosity.</h2><p className={portfolioClass("body-large")}>I’m Ariq, a content creator, student leader, and community builder from Dhaka. My work sits at the intersection of film, campaigns, and live experiences, all driven by an interest in how stories bring people together.</p><p>From creating content for Bangladeshi brands to founding DAKKHINNO and leading student initiatives at DRMC, I’ve explored how creative thinking can move beyond ideas and make a difference in people’s lives.</p><p>I’m interested in the space where creativity meets strategy, and where individual ideas become something people can experience together.</p><div className={portfolioClass("education")}><span className={portfolioClass("eyebrow")}>EDUCATION</span><p>Dhaka Residential Model College<br /><span className="text-muted-foreground">Grade 3 through HSC 2026</span></p><p>Previously: Scholars School &amp; College<br /><span className="text-muted-foreground">Grades 1–3</span></p></div><div className="flex flex-wrap gap-3"><Button asChild variant="outline" className={portfolioClass("editorial-button")}><a href="/resume">View résumé</a></Button></div></div>
      </section> : null}
      {section === "experience" ? <section className={portfolioClass("school-memory page-padding")}><div className="school-memory-image"><Image src="/images/experience/early-school.jpg" alt="Ariq during his early school years at Dhaka Residential Model College" fill sizes="(max-width: 767px) 75vw, 240px" className="object-cover" /></div><div><p className={portfolioClass("eyebrow")}>The early years</p><h2 className="mt-4 text-3xl font-medium leading-tight">School years at DRMC</h2><p className="mt-5 max-w-[36ch] text-muted-foreground">Dhaka Residential Model College, from Grade 3 through HSC 2026.</p></div></section> : null}
      {section === "experience" ? <section className={portfolioClass("experience-list page-padding section-space")} aria-label="Experience timeline">
        {experience.map((item, index) => <article className="experience-editorial" key={`${item.org}-${index}`}>
          <div className="experience-heading">
            <h2 className="experience-organization">{item.org}</h2>
            <p className="experience-period" aria-label={`Period: ${item.date}`}>{item.date}</p>
          </div>
          <div className="experience-body">
            <h3>{item.role}</h3>
            <p className="experience-summary">{item.body}</p>
            <ul className="mt-5 space-y-3">{("highlights" in item ? item.highlights ?? [] : []).map(highlight => <li key={highlight} className="ml-5 list-disc leading-relaxed text-muted-foreground">{highlight}</li>)}</ul>
            <ExperienceGallery organization={item.org} certificates={item.certificates} />
          </div>
        </article>)}
      </section> : null}
      {section === "experience" ? <PortfolioRecords id="event-contributions" title="Volunteer leadership & events" items={events} /> : null}
      {section === "about" ? <><AboutSkills /><PortfolioRecords id="personal-milestones" title="Beyond the everyday" items={milestones} /></> : null}
      {section === "work" ? <section className={portfolioClass("work-list page-padding")} aria-label="Selected projects">{projects.map(project => <article className={portfolioClass("project-row")} key={project.key}><div className={portfolioClass("project-copy")}><p className={portfolioClass("eyebrow")}>{project.num} · {project.tag}</p><h2 className={portfolioClass("project-title")}>{project.title}</h2><p>{project.body}</p><Button asChild variant="outline" className={portfolioClass("editorial-button")}><a href={`/work/${project.key.toLowerCase()}`}>View project</a></Button></div><a href={`/work/${project.key.toLowerCase()}`} className={portfolioClass(`project-image-link project-${project.key.toLowerCase()}`)} aria-label={`View ${project.client} project`}><PhotoPlaceholder label={`${project.client} · ${project.tag}`} /><span className={portfolioClass("project-image-meta")}><span>{project.client}</span><span>{project.date}</span></span></a></article>)}</section> : null}
      {section === "awards" ? <><PortfolioRecords id="honors" title="Honors & achievements" items={awards} /><PortfolioRecords id="certifications" title="Awards & certifications" items={certifications} /><PortfolioRecords id="participations" title="Event participation & competitions" items={participations} /></> : null}
      {section === "testimonials" ? <section className={portfolioClass("empty-editorial page-padding section-space")}><h2 className={portfolioClass("section-title")}>Good work starts<br />with good people.</h2><p className={portfolioClass("body-large text-muted-foreground")}>Words from collaborators will be shared here soon.</p><p>For references or a conversation about working together, get in touch.</p><Button asChild className={portfolioClass("editorial-button lime-button")}><a href="/contact">Let’s connect</a></Button></section> : null}
      {section === "contact" ? <section className="contact-page" aria-labelledby="contact-heading">
        <div className="contact-masthead"><h1 id="contact-heading">Get in touch</h1><p>For projects, collaborations, and opportunities. Tell me what you have in mind.</p></div>
        <div className="contact-editorial-grid">
          <aside className="contact-direct" aria-label="Direct contact details">
            <div><p className="contact-caption">Email Ariq</p><a className="contact-email" href={`mailto:${email}`}>{email}</a><CopyEmail /></div>
            <dl className="contact-details"><div><dt>Phone</dt><dd><a href={phone.href}>{phone.label}</a></dd></div><div><dt>Based in</dt><dd>Dhaka, Bangladesh</dd></div></dl>
          </aside>
          <ContactForm />
        </div>
      </section> : null}
    </main>

  </>;
}
