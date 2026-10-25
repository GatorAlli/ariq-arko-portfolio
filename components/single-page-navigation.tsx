"use client";

import { useEffect } from "react";

export function SinglePageNavigation() {
  useEffect(() => {
    function revealTarget() {
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      for (let node: HTMLElement | null = target; node; node = node.parentElement) {
        if (node instanceof HTMLDetailsElement && !node.open) node.open = true;
      }
      requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior: "auto" }));
    }
    function onClick(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (link && link.origin === window.location.origin && link.pathname === "/" && link.hash === window.location.hash) requestAnimationFrame(revealTarget);
    }
    revealTarget();
    window.addEventListener("hashchange", revealTarget);
    document.addEventListener("click", onClick);
    return () => { window.removeEventListener("hashchange", revealTarget); document.removeEventListener("click", onClick); };
  }, []);
  return null;
}
