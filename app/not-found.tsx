import { portfolioClass } from "@/lib/portfolio-styles";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return <main id="main-content" className={portfolioClass("not-found page-padding")}><p className={portfolioClass("eyebrow")}>404 · A SMALL DETOUR</p><h1 className={portfolioClass("page-title")}>Let’s find<br />our way back.</h1><p>This page isn’t here. There’s plenty more to explore.</p><Button asChild className={portfolioClass("editorial-button lime-button")}><a href="/">Back to Ariq</a></Button></main>;
}
