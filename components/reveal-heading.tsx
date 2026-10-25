"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

export function RevealHeading({ text, id, className, as: Heading = "h2" }: {
  text: string;
  id?: string;
  className?: string;
  as?: "h2" | "h3";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  // Server-rendered content remains readable without JavaScript.
  const [state, setState] = useState("visible");
  useEffect(() => {
    const heading = ref.current;
    if (!heading || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Never hide a heading that was already visible when the page loaded.
    if (heading.getBoundingClientRect().top < window.innerHeight) return;
    setState("waiting");
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setState("revealed");
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0 });
    observer.observe(heading);
    return () => observer.disconnect();
  }, []);
  return <Heading ref={ref} id={id} className={`scroll-text ${className ?? ""}`} data-reveal={state}>
    {text.split(/\s+/).map((word, index) => <span key={`${word}-${index}`}><span className="reveal-word" style={{ "--word-delay": `${Math.min(index, 6) * 55}ms` } as CSSProperties}>{word}</span>{" "}</span>)}
  </Heading>;
}
