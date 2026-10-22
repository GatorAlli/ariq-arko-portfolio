"use client";

import { portfolioClass } from "@/lib/portfolio-styles";


import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { navigation, searchEntries } from "@/lib/portfolio";

export function SiteHeader() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
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
    <header className={portfolioClass("site-header")}>
      <Link href="/" className={portfolioClass("wordmark")} aria-label="Ariq Arko home">aa<span className={portfolioClass("logo-dot")}>.</span></Link>
      <nav className={portfolioClass("desktop-nav")} aria-label="Main navigation">
        {navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}>{item.label}</Link>)}
      </nav>
      <div className={portfolioClass("header-actions")}>
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogTrigger asChild><Button variant="ghost" size="icon" className={portfolioClass("icon-button search-trigger")} aria-label="Search the portfolio"><svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" /><path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.5" /></svg></Button></DialogTrigger>
          <DialogContent className={portfolioClass("search-dialog")}>
            <DialogHeader><DialogTitle>Find your way.</DialogTitle><DialogDescription>Search work, experience, skills, and more.</DialogDescription></DialogHeader>
            <Input aria-label="Search portfolio" placeholder="Try film, leadership, or Freeland…" value={query} onChange={event => setQuery(event.target.value)} className={portfolioClass("portfolio-input")} />
            <p className={portfolioClass("eyebrow")} aria-live="polite">{words.length ? `${results.length} ${results.length === 1 ? "result" : "results"}` : "EXPLORE THE PORTFOLIO"}</p>
            <div className={portfolioClass("search-results")}>
              {results.length ? results.map((entry, i) => <DialogClose asChild key={`${entry.href}-${i}`}><Link href={entry.href} className={portfolioClass("search-result")}><span>{entry.label}</span><span aria-hidden="true">→</span></Link></DialogClose>) : <p className="text-muted-foreground py-6">No matches for “{query}”. Try a project, role, or skill.</p>}
            </div>
            <p className="text-xs text-muted-foreground">Esc to close · ⌘ / Ctrl K to search</p>
          </DialogContent>
        </Dialog>
        <Link href="/contact" className={portfolioClass("contact-orbit")} aria-current={pathname === "/contact" ? "page" : undefined}><span>Contact <span className={portfolioClass("contact-arrow")} aria-hidden="true">→</span></span></Link>
        <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
          <DialogTrigger asChild><Button variant="ghost" size="icon" className={portfolioClass("icon-button mobile-menu-trigger")} aria-label="Open navigation"><svg width="24" height="18" viewBox="0 0 24 18" aria-hidden="true"><path d="M1 3h22M1 9h22M1 15h22" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></Button></DialogTrigger>
          <DialogContent className={portfolioClass("mobile-menu")}>
            <DialogHeader><DialogTitle>Explore.</DialogTitle><DialogDescription>Ariq Arko · Dhaka, Bangladesh</DialogDescription></DialogHeader>
            <nav aria-label="Mobile navigation">{navigation.map((item, index) => <DialogClose asChild key={item.href}><Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}><span className={portfolioClass("eyebrow")}>0{index + 1}</span>{item.label}<span aria-hidden="true">→</span></Link></DialogClose>)}</nav>
            <DialogClose asChild><Link href="/contact" className={portfolioClass("lime-link")}>Start a conversation →</Link></DialogClose>
          </DialogContent>
        </Dialog>
      </div>
      {pathname !== "/" ? <div className={portfolioClass("scroll-progress")} aria-hidden="true" /> : null}
    </header>
  );
}
