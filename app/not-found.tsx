import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return <main id="main-content" className="not-found page-padding"><p className="eyebrow">404 / A SMALL DETOUR</p><h1 className="page-title">Let’s find<br />our way back.</h1><p>This page isn’t here. There’s plenty more to explore.</p><Button asChild className="editorial-button lime-button"><Link href="/">Back to Ariq →</Link></Button></main>;
}
