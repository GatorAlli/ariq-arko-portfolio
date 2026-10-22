"use client";

import { portfolioClass } from "@/lib/portfolio-styles";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { email } from "@/lib/portfolio";

export function FooterActions() {
  return <div className="flex flex-wrap gap-3"><Button variant="outline" className={portfolioClass("editorial-button")} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>Back to top ↑</Button><Button variant="ghost" className={portfolioClass("editorial-button")} onClick={() => window.print()}>Print portfolio →</Button></div>;
}

export function CopyEmail() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try { await navigator.clipboard.writeText(email); setStatus("copied"); }
    catch { setStatus("error"); }
  }
  return <div><Button variant="outline" className={portfolioClass("editorial-button")} onClick={copy}>{status === "copied" ? "Email copied ✓" : "Copy email →"}</Button><p className="mt-2 text-xs text-muted-foreground" role="status">{status === "error" ? "Please select and copy the email address above." : status === "copied" ? "Ready to paste." : ""}</p></div>;
}
