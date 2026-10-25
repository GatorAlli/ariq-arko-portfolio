import { portfolioClass } from "@/lib/portfolio-styles";

export function PageIntro({ title, intro }: { title: string; intro: string }) {
  return <section className={portfolioClass("page-intro page-padding [&_.page-title]:mt-0!")}><h1 className={portfolioClass("page-title")}>{title}</h1><p className={portfolioClass("page-description")}>{intro}</p></section>;
}

export function SiteFooter() { return null; }
