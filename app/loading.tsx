import { portfolioClass } from "@/lib/portfolio-styles";
export default function Loading() { return <main id="portfolio-loading" className={portfolioClass("loading-page page-padding")} role="status"><span className={portfolioClass("loading-mark")} aria-hidden="true">aa.</span><p>Loading portfolio…</p></main>; }
