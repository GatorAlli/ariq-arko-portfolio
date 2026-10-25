"use client";

import { useEffect } from "react";

export function SectionRedirect({ target }: { target: string }) {
  useEffect(() => {
    const destination = window.location.hash ? `/${window.location.hash}` : target;
    window.location.replace(destination);
  }, [target]);
  return <main id="main-content" className="legacy-redirect"><p>This content is now part of the main portfolio.</p><a href={target}>Continue to the section</a></main>;
}
