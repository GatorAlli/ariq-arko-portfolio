import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/page-actions";
import { Conversation, PageIntro, SiteFooter } from "@/components/portfolio-layout";
import { awards, email, experience, isPageSlug, pageInfo, projects } from "@/lib/portfolio";

export function generateStaticParams() { return Object.keys(pageInfo).map(section => ({ section })); }
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  return isPageSlug(section) ? { title: section === "work" ? "Recent work" : section[0].toUpperCase() + section.slice(1), description: pageInfo[section].intro } : {};
}

export default async function PortfolioPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!isPageSlug(section)) notFound();
  const info = pageInfo[section];
  return <>
    <main id="main-content">
      <PageIntro title={info.title} intro={info.intro} />
      {section === "about" ? <section className="about-layout page-padding section-space">
        <div className="about-portrait"><Image src="/images/ariq-arko.jpg" alt="Ariq Arko in Dhaka" fill sizes="(max-width: 640px) 100vw, 43vw" /></div>
        <div className="about-copy"><h2 className="section-title">Stories. People.<br />A little curiosity.</h2><p className="body-large">I’m Ariq, a content creator, student leader, and community builder from Dhaka. I work across film, campaigns, and events, bringing people and ideas together.</p><p>From producing content for Bangladeshi brands to founding DAKKHINNO and leading students at DRMC, I care about work that connects with people.</p><Button asChild className="editorial-button lime-button w-fit"><Link href="/contact">Start a conversation →</Link></Button><div className="education"><span className="eyebrow">EDUCATION</span><p>Dhaka Residential Model College<br /><span className="text-muted-foreground">HSC 2026 cohort</span></p><p>Previously: Scholars School &amp; College</p></div><div className="flex flex-wrap gap-3"><Button asChild variant="outline" className="editorial-button"><Link href="/resume">View résumé →</Link></Button><Button asChild variant="ghost" className="editorial-button"><a href="/documents/ariq-arko-resume.pdf" download>Download PDF ↓</a></Button></div></div>
      </section> : null}
      {section === "experience" ? <section className="experience-list page-padding section-space" aria-label="Experience timeline">{experience.map((item, index) => <article className="experience-entry" key={`${item.org}-${index}`}><p className="eyebrow experience-date">{item.date}</p><div className="experience-copy"><h2>{item.role}</h2><p className="text-muted-foreground">{item.org}</p><p className="contribution">{item.body}</p><PhotoPlaceholder label={`${item.org} / Behind the scenes`} /></div></article>)}</section> : null}
      {section === "skills" ? <section className="skills-section page-padding section-space"><div className="skills-list">{[
        ["Storytelling", "Video editing / Cinematography / Content planning", "Documentary films, campaign content, and short-form reels."],
        ["Bringing people together", "Event management / Hosting / Team coordination", "From auditorium operations to national carnivals and community projects."],
        ["Community & leadership", "Student leadership / Social awareness / Project coordination", "Built through DAKKHINNO, the DRMC prefect team, and Science Club."],
      ].map(([title, skills, copy], index) => <article className="skill-row" key={title}><span className="eyebrow">0{index + 1}</span><div><h2>{title}</h2><p>{skills}</p><p className="text-muted-foreground">{copy}</p></div></article>)}</div><div className="languages"><h2>Languages</h2><p>Bangla / English / Hindi / Japanese</p></div></section> : null}
      {section === "work" ? <section className="work-list page-padding" aria-label="Selected projects">{projects.map(project => <article className="project-row" key={project.key}><div className="project-copy"><p className="eyebrow">{project.num} / {project.tag}</p><h2 className="project-title">{project.title}</h2><p>{project.body}</p><Button asChild variant="outline" className="editorial-button"><Link href={`/work/${project.key.toLowerCase()}`}>View project →</Link></Button></div><Link href={`/work/${project.key.toLowerCase()}`} className={`project-image-link project-${project.key.toLowerCase()}`} aria-label={`View ${project.client} project`}><PhotoPlaceholder label={`${project.client} / ${project.tag}`} /><span className="project-image-meta"><span>{project.client}</span><span>{project.date} →</span></span></Link></article>)}</section> : null}
      {section === "awards" ? <section className="awards-list page-padding section-space" aria-label="Awards and recognition">{awards.map(([year, title, issuer]) => <article className="award-row" key={title}><p className="eyebrow">{year}</p><div><h2>{title}</h2><p className="text-muted-foreground">{issuer}</p></div></article>)}</section> : null}
      {section === "research" || section === "testimonials" ? <section className="empty-editorial page-padding section-space"><h2 className="section-title">{section === "research" ? <>Curiosity is<br />part of the work.</> : <>Good work starts<br />with good people.</>}</h2><p className="body-large text-muted-foreground">{section === "research" ? "Research papers will be shared here when available." : "Words from collaborators will be shared here soon."}</p><p>{section === "research" ? "For research conversations or collaboration, get in touch." : "For references or a conversation about working together, get in touch."}</p><Button asChild className="editorial-button lime-button"><Link href="/contact">{section === "research" ? "Discuss research" : "Let’s connect"} →</Link></Button></section> : null}
      {section === "contact" ? <section className="contact-layout page-padding section-space"><div className="contact-copy"><h2 className="section-title">Let’s make<br />something matter.</h2><p>For hiring, creative projects, or research collaboration. Tell me what you have in mind.</p><a className="email-link" href={`mailto:${email}`}>{email} →</a><CopyEmail /></div><ContactForm /></section> : null}
    </main>
    {section !== "contact" ? <Conversation /> : null}
    <SiteFooter />
  </>;
}
