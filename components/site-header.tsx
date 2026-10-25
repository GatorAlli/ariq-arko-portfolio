"use client";

import { portfolioClass } from "@/lib/portfolio-styles";
import { RotatingStar } from "@/components/rotating-star";


import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { navigation, searchEntries } from "@/lib/portfolio";

export function SiteHeader() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = words.length ? searchEntries.filter(entry => words.every(word => `${entry.label} ${entry.description}`.toLowerCase().includes(word))) : searchEntries.slice(1, 5);

  useEffect(() => {
    // Dynamic section routes share a layout. Each newly opened page starts at its introduction.
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(open => !open);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`directory-header ${pathname === "/" ? "directory-header-home" : ""}`}>
      <div className="directory-inner">
        <div className="directory-identity"><a href="/" className="directory-wordmark" aria-label="Ariq Arko home">aa.</a></div>
        <nav className="directory-group" aria-label="Main navigation"><span className="directory-label">Explore</span><div className="directory-links">{navigation.map(item => <a key={item.href} href={item.href} aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}>{item.label}<span className="nav-link-arrow" aria-hidden="true" /></a>)}</div></nav>
        <nav className="directory-group" aria-label="Social profiles"><span className="directory-label">Contact</span><div className="directory-links"><a href="https://www.instagram.com/ariqqarko" target="_blank" rel="noopener noreferrer">Instagram<span className="nav-link-arrow" aria-hidden="true" /></a><a href="https://www.facebook.com/share/1DLkv2CoUD/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Facebook<span className="nav-link-arrow" aria-hidden="true" /></a><a href="https://www.linkedin.com/in/ariqarko-/" target="_blank" rel="noopener noreferrer">LinkedIn<span className="nav-link-arrow" aria-hidden="true" /></a></div></nav>
        <div className="directory-actions"><a href="/contact" className={portfolioClass("contact-orbit")} aria-current={pathname === "/contact" ? "page" : undefined}><span className="contact-label">Get in touch<span className="nav-link-arrow" aria-hidden="true" /></span></a></div>
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogContent className={portfolioClass("search-dialog")}>
            <DialogHeader><DialogTitle>Find your way.</DialogTitle><DialogDescription>Search work, experience, skills, and more.</DialogDescription></DialogHeader>
            <Input aria-label="Search portfolio" placeholder="Try film, leadership, or Freeland…" value={query} onChange={event => setQuery(event.target.value)} className={portfolioClass("portfolio-input")} />
            <p className={portfolioClass("eyebrow")} aria-live="polite">{words.length ? `${results.length} ${results.length === 1 ? "result" : "results"}` : "EXPLORE THE PORTFOLIO"}</p>
            <div className={portfolioClass("search-results")}>
              {results.length ? results.map((entry, i) => <DialogClose asChild key={`${entry.href}-${i}`}><a href={entry.href} className={portfolioClass("search-result")}><span>{entry.label}</span></a></DialogClose>) : <p className="text-muted-foreground py-6">No matches for “{query}”. Try a project, role, or skill.</p>}
            </div>
            <p className="text-xs text-muted-foreground">Esc to close · ⌘K or Ctrl K to search</p>
          </DialogContent>
        </Dialog>
{pathname === "/" ? (<div className="name-selection header-name-selection">
          <RotatingStar className="masthead-star" />
          <h1 className="masthead-name">ARIQ ARKO</h1>
          {["nw", "n", "ne", "w", "e", "sw", "s", "se"].map(position => <span key={position} className={`selection-handle handle-${position}`} aria-hidden="true" />)}
          <svg className="selection-cursor" viewBox="0 0 40 44" aria-hidden="true"><path d="M3 2 36 21 22 24 29 36 21 41 14 28 5 38Z" fill="currentColor" stroke="#111815" strokeWidth="1.5" /></svg>
        </div>) : null}
      </div>
      {pathname !== "/" ? <div className={portfolioClass("scroll-progress")} aria-hidden="true" /> : null}
    </header>
  );
}
