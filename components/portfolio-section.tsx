import Image from "next/image";
import { portfolioClass } from "@/lib/portfolio-styles";
import { Button } from "@/components/ui/button";
import { ExperienceGallery } from "@/components/experience-gallery";
import { AboutSkills } from "@/components/about-skills";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/page-actions";
import { PageIntro } from "@/components/portfolio-layout";
import { PortfolioRecords } from "@/components/portfolio-records";
import { ProjectShowcase } from "@/components/project-showcase";
import { EvidenceText } from "@/components/evidence-text";
import { ChapterCurve } from "@/components/chapter-curve";
import { RevealHeading } from "@/components/reveal-heading";
import { ResumeViewer } from "@/components/resume-viewer";
import { certifications, events, participations, milestones, awards, email, phone, experience, pageInfo, type PageSlug } from "@/lib/portfolio";

export function PortfolioSection({ section }: { section: PageSlug }) {
  const info = pageInfo[section];
  return <section id={section} className="portfolio-section" aria-labelledby={section === "contact" ? "contact-heading" : `${section}-heading`}>
      <ChapterCurve />
      {section !== "contact" && section !== "experience" ? <PageIntro title={info.title} intro={info.intro} level={2} headingId={`${section}-heading`} /> : null}
      {section === "about" ? <section className={portfolioClass("about-layout page-padding pb-14 md:pb-20")}>
        <div className={portfolioClass("about-portrait")}><Image src="/images/experience/about-beach.jpg" alt="Ariq Arko smiling at the beach at night" fill sizes="(max-width: 640px) 100vw, 43vw" /></div>
        <div className={portfolioClass("about-copy")}><h2 className={portfolioClass("section-title")}>Stories. People.<br />A little curiosity.</h2><p className={portfolioClass("body-large")}>I’m Ariq, a content creator, student leader, and community builder from Dhaka. I create films, contribute to creative campaigns, and organize live experiences.</p><p>I founded <strong>DAKKHINNO</strong>, served as a <strong>College Prefect</strong>, and became <strong>Joint Secretary of the DRMC Science Club</strong>. My production work includes Freeland and Duckpeon Digital.</p><div className={portfolioClass("education")}><h3>Education</h3><p>Dhaka Residential Model College<br /><span className="text-muted-foreground">Grade 3 through HSC 2026</span></p><p>Previously: Scholars School &amp; College<br /><span className="text-muted-foreground">Grades 1–3</span></p></div><div className="flex flex-wrap gap-3"><ResumeViewer id="resume-full" /><a href="/documents/ariq-arko-resume.pdf" download className="resume-download">Download PDF</a></div></div>
      </section> : null}
      {section === "experience" ? <div className="experience-intro">
        <div className="experience-intro-copy">
          <div className="section-title-block"><RevealHeading id="experience-heading" className="section-title-text" text={info.title} /></div>
          <p className="experience-intro-lead">{info.intro}</p>
          <div className="school-story">
            <p className={portfolioClass("eyebrow")}>The early years</p>
            <h3>School years at DRMC</h3>
            <p>My time at Dhaka Residential Model College spans <strong>Grade 3 through HSC 2026</strong>. The experience below traces my work in student leadership, community projects, and creative production.</p>
          </div>
        </div>
        <figure className="experience-intro-photo"><Image src="/images/experience/early-school.jpg" alt="Ariq during his early school years at Dhaka Residential Model College" fill sizes="(max-width: 767px) 85vw, 380px" className="object-cover object-top" /></figure>
      </div> : null}
      {section === "experience" ? <section className={portfolioClass("experience-list page-padding section-space")} aria-label="Experience timeline">
        {experience.map((item, index) => <article className="experience-editorial" key={`${item.org}-${index}`}>
          <div className="experience-heading">
            <h2 className="experience-organization">{item.org}</h2>
            <p className="experience-period" aria-label={`Period: ${item.date}`}>{item.date}</p>
          </div>
          <div className="experience-body">
            <h3>{item.role}</h3>
            <p className="experience-summary"><EvidenceText text={item.body} /></p>
            {"highlights" in item && item.highlights?.length ? <ul className="mt-4 space-y-3">{item.highlights.map(highlight => <li key={highlight} className="ml-5 list-disc leading-relaxed text-muted-foreground"><EvidenceText text={highlight} /></li>)}</ul> : null}
            <ExperienceGallery organization={item.org} certificates={item.certificates} />
          </div>
        </article>)}
      </section> : null}
      {section === "experience" ? <PortfolioRecords id="event-contributions" title="Volunteer leadership & events" items={events} /> : null}
      {section === "about" ? <><AboutSkills /><PortfolioRecords id="personal-milestones" title="Beyond the everyday" items={milestones} /></> : null}
      {section === "work" ? <ProjectShowcase /> : null}
      {section === "awards" ? <><PortfolioRecords id="honors" title="Honors & achievements" items={awards} /><PortfolioRecords id="certifications" title="Awards & certifications" items={certifications} /><PortfolioRecords id="participations" title="Event participation & competitions" items={participations} /></> : null}
      {section === "testimonials" ? <section className={portfolioClass("empty-editorial page-padding section-space")}><h2 className={portfolioClass("section-title")}>Good work starts<br />with good people.</h2><p className={portfolioClass("body-large text-muted-foreground")}>Words from collaborators will be shared here soon.</p><p>For references or a conversation about working together, get in touch.</p><Button asChild className={portfolioClass("editorial-button lime-button")}><a href="#contact">Let’s connect</a></Button></section> : null}
      {section === "contact" ? <section className="contact-page" aria-labelledby="contact-heading">
        <div className="contact-masthead"><div className="section-title-block"><RevealHeading id="contact-heading" className="section-title-text" text="Get in touch" /></div></div>
        <div className="contact-editorial-grid">
          <aside className="contact-direct" aria-label="Direct contact details">
            <div><p className="contact-caption">Email</p><a className="contact-email" href={`mailto:${email}`}>{email}</a><CopyEmail /></div>
            <dl className="contact-details"><div><dt>Phone</dt><dd><a href={phone.href}>{phone.label}</a></dd></div><div><dt>Based in</dt><dd>Dhaka, Bangladesh</dd></div></dl>
          </aside>
          <ContactForm />
        </div>
      </section> : null}
  </section>;
}
