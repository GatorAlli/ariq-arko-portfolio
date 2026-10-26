"use client";

import { useState } from "react";
import { email } from "@/lib/portfolio";

export function CopyEmail() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try { await navigator.clipboard.writeText(email); setStatus("copied"); }
    catch { setStatus("error"); }
  }
  return <div><button type="button" className="contact-copy-email" onClick={copy}>{status === "copied" ? "Email copied" : "Copy email"}</button><p className="mt-2 text-xs text-muted-foreground" role="status">{status === "error" ? "Please select and copy the email address above." : status === "copied" ? "Ready to paste." : ""}</p></div>;
}
