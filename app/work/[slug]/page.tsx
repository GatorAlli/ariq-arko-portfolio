import { portfolioClass } from "@/lib/portfolio-styles";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Conversation, PageIntro, SiteFooter } from "@/components/portfolio-layout";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { projects } from "@/lib/portfolio";

export function generateStaticParams() { return projects.map(project => ({ slug: project.key.toLowerCase() })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.key.toLowerCase() === slug);
  return project ? { title: project.client, description: project.body } : {};
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.key.toLowerCase() === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <><main id="main-content"><PageIntro title={project.title} intro={project.body} backHref="/work" backLabel="Recent work" /><section className={portfolioClass("case-study page-padding")}><PhotoPlaceholder className={portfolioClass("case-hero")} label={`${project.client} / Project film & photography`} /><dl className={portfolioClass("project-metadata")}>{[["Organization", project.client], ["Role", project.role], ["Period", project.year]].map(([label, value]) => <div key={label}><dt className={portfolioClass("eyebrow")}>{label}</dt><dd>{value}</dd></div>)}</dl><section className={portfolioClass("case-contribution")}><h2 className={portfolioClass("section-title")}>The contribution</h2><p className={portfolioClass("body-large")}>{project.detail}</p><ol className={portfolioClass("project-facts")}>{project.facts.map((fact, index) => <li key={fact}><span className={portfolioClass("eyebrow")}>0{index + 1}</span><h3>{fact}</h3></li>)}</ol><PhotoPlaceholder label={`${project.client} / People & process`} /><p className="text-muted-foreground">Project films, photographs, and individual credits will be added when supplied.</p><div className="flex flex-wrap gap-4"><Button asChild variant="outline" className={portfolioClass("editorial-button")}><Link href="/work">← All recent work</Link></Button><Button asChild variant="outline" className={portfolioClass("editorial-button")}><Link href={`/work/${next.key.toLowerCase()}`}>Next: {next.client} →</Link></Button></div></section></section></main><Conversation /><SiteFooter /></>;
}
