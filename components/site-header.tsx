"use client";

import { portfolioClass } from "@/lib/portfolio-styles";
import { RotatingStar } from "@/components/rotating-star";


import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { navigation, searchEntries } from "@/lib/portfolio";

export function SiteHeader() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = words.length ? searchEntries.filter(entry => words.every(word => `${entry.label} ${entry.description}`.toLowerCase().includes(word))) : searchEntries.slice(1, 5);

  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const resize = () => document.documentElement.style.setProperty("--nav-height", `${element.offsetHeight}px`);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Dynamic section routes share a layout. Each newly opened page starts at its introduction.
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = ["about", "experience", "work", "awards", "contact"];
      const current = sections.filter(id => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= window.innerHeight * .3;
      }).at(-1);
      setActiveSection(current || "");
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("hashchange", schedule);
    window.addEventListener("resize", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("hashchange", schedule); window.removeEventListener("resize", schedule); cancelAnimationFrame(frame); };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggle.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

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
    <><div id="top" aria-hidden="true" /><header ref={header} data-active-section={activeSection || "intro"} data-menu-open={menuOpen} className={`directory-header${scrollProgress > .002 ? " is-scrolled" : ""}`} onClick={event => { if (event.target instanceof Element && event.target.closest("a")) setMenuOpen(false); }}>
      <div className="directory-inner">
        <div className="directory-identity"><button type="button" className="directory-wordmark" aria-label="Refresh page" title="Refresh page" onClick={() => window.location.reload()}>aa.</button></div>
        <button ref={menuToggle} type="button" className="directory-menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="main-navigation social-navigation" onClick={() => setMenuOpen(open => !open)}><span>{menuOpen ? "Close" : "Menu"}</span><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6" /></svg></button>
        <nav id="main-navigation" className="directory-group" aria-label="Main navigation"><span className="directory-label">Explore</span><div className="directory-links">{navigation.map(item => <a key={item.href} href={item.href} className="hover-target" aria-current={activeSection === item.href.slice(2) ? "location" : undefined}><span className="hover-label">{item.label}</span><span className="nav-link-arrow" aria-hidden="true" /></a>)}</div></nav>
        <nav id="social-navigation" className="directory-group" aria-label="Social profiles"><span className="directory-label">Contact</span><div className="directory-links"><a className="hover-target" href="https://www.instagram.com/ariqqarko" target="_blank" rel="noopener noreferrer"><span className="hover-label">Instagram</span><span className="nav-link-arrow" aria-hidden="true" /></a><a className="hover-target" href="https://www.facebook.com/share/1DLkv2CoUD/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><span className="hover-label">Facebook</span><span className="nav-link-arrow" aria-hidden="true" /></a><a className="hover-target" href="https://www.linkedin.com/in/ariqarko-/" target="_blank" rel="noopener noreferrer"><span className="hover-label">LinkedIn</span><span className="nav-link-arrow" aria-hidden="true" /></a></div></nav>
        <div className="directory-actions"><a href={pathname === "/" ? "#contact" : "/#contact"} className={`${portfolioClass("contact-orbit")} hover-target`} aria-current={activeSection === "contact" ? "location" : undefined}><span className="contact-label"><span className="contact-button-text hover-label">Get in touch</span><span className="nav-link-arrow" aria-hidden="true" /></span></a></div>
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
      </div>
      <div className="nav-reading-progress" role="progressbar" aria-label="Page scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(scrollProgress * 100)}><span style={{ left: `${scrollProgress * 100}%` }} /></div>
    </header>
{pathname === "/" ? (<div className="directory-masthead"><div className="name-selection header-name-selection">
          <RotatingStar className="masthead-star" />
          <h1 className="masthead-name">ARIQ ARKO</h1>
          {["nw", "ne", "sw", "se"].map(position => <span key={position} className={`selection-handle handle-${position}`} aria-hidden="true" />)}
          <svg className="selection-cursor" viewBox="0 0 40 44" aria-hidden="true"><path d="M3 2 36 21 22 24 29 36 21 41 14 28 5 38Z" fill="currentColor" stroke="#111815" strokeWidth="1.5" /></svg>
        </div></div>) : null}</>
  );
}
