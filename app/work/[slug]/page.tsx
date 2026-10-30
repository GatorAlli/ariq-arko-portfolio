import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionRedirect } from "@/components/section-redirect";
import { projects } from "@/lib/portfolio";

export function generateStaticParams() { return projects.map(project => ({ slug: project.key.toLowerCase() })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.key.toLowerCase() === slug);
  return project ? { title: project.client, description: project.body } : {};
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!projects.some(item => item.key.toLowerCase() === slug)) notFound();
  return <SectionRedirect target="/#work" />;
}
