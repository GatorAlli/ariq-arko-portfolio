import { portfolioClass } from "@/lib/portfolio-styles";
import { RevealHeading } from "@/components/reveal-heading";

export function PageIntro({ title, intro, level = 1, headingId }: { title: string; intro: string; level?: 1 | 2; headingId?: string }) {
  if (level === 2) return <div className="section-heading">
    <div className="section-title-block"><RevealHeading id={headingId} className="section-title-text" text={title.replace(/\n/g, " ")} /></div>
  </div>;
  const Heading = level === 1 ? "h1" : "h2";
  return <div className={portfolioClass("page-intro page-padding [&_.page-title]:mt-0!")}><Heading id={headingId} className={portfolioClass("page-title")}>{title}</Heading><p className={portfolioClass("page-description")}>{intro}</p></div>;
}
