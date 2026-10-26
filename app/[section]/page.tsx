import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionRedirect } from "@/components/section-redirect";
import { isPageSlug, pageInfo } from "@/lib/portfolio";

export function generateStaticParams() { return [...Object.keys(pageInfo), "skills"].map(section => ({ section })); }
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  return isPageSlug(section) ? { title: section === "work" ? "Recent work" : section[0].toUpperCase() + section.slice(1), description: pageInfo[section].intro } : {};
}
export default async function PortfolioPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!isPageSlug(section) && section !== "skills") notFound();
  return <SectionRedirect target={`/#${section === "testimonials" ? "contact" : section}`} />;
}