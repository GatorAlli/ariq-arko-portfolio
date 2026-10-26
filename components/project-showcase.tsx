import Image from "next/image";
import { Button } from "@/components/ui/button";
import { portfolioClass } from "@/lib/portfolio-styles";
import { projects } from "@/lib/portfolio";
import { EvidenceText } from "@/components/evidence-text";

function ProjectVisual({ project }: { project: (typeof projects)[number] }) {
  const image = project.key === "Carnival" ? "/images/experience/science-carnival.jpg" : project.key === "Freeland" ? "/images/certificates/freeland-completion.png" : null;
  return <div className="project-visual">
    {image ? <Image src={image} alt={project.key === "Carnival" ? "The DRMC National Science Carnival team" : "Ariq Arko’s internship certificate from Freeland"} fill sizes="(max-width: 767px) 90vw, 50vw" className={project.key === "Freeland" ? "object-contain bg-white" : "object-cover"} /> : <strong>{project.cover}</strong>}
  </div>;
}

export function ProjectShowcase() {
  return <div className={portfolioClass("work-list page-padding")} aria-label="Selected projects">
    {projects.map((project, index) => <article className={portfolioClass("project-row")} key={project.key}>
      <div className={portfolioClass("project-copy")}>
        <h3 className={portfolioClass("project-title")}>{project.title}</h3>
        <p><EvidenceText text={project.body} /></p>
        <Button asChild variant="outline" className={portfolioClass("editorial-button")}><a href={`/#project-${project.key.toLowerCase()}`}>View project</a></Button>
      </div>
      <a href={`/#project-${project.key.toLowerCase()}`} className={portfolioClass(`project-image-link project-${project.key.toLowerCase()}`)} aria-label={`View ${project.client} project`}>
        <span className="project-organization">{project.client}</span>
        <ProjectVisual project={project} />
      </a>
      <details id={`project-${project.key.toLowerCase()}`} className="project-details">
        <summary>Close project details</summary>
        <dl className={portfolioClass("project-metadata")}>
          {[["Organization", project.client], ["Role", project.role], ["Period", project.year]].map(([label, value]) => <div key={label}><dt className={portfolioClass("eyebrow")}>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <div className={portfolioClass("case-contribution")}>
          <h4 className={portfolioClass("section-title")}>The contribution</h4>
          <p className={portfolioClass("body-large")}><EvidenceText text={project.detail} /></p>
          <ul className={portfolioClass("project-facts")}>{project.facts.map(fact => <li key={fact}><h5>{fact}</h5></li>)}</ul>
          <a className="text-link" href={`/#project-${projects[(index + 1) % projects.length].key.toLowerCase()}`}>Next project: {projects[(index + 1) % projects.length].client}</a>
        </div>
      </details>
    </article>)}
  </div>;
}
