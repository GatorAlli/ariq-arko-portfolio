import { portfolioClass } from "@/lib/portfolio-styles";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FooterActions } from "@/components/page-actions";
import { email } from "@/lib/portfolio";

export function PageIntro({ title, intro, backHref = "/", backLabel = "Back" }: { title: string; intro: string; backHref?: string; backLabel?: string }) {
  return <section className={portfolioClass("page-intro page-padding")}><Button asChild variant="outline" className={portfolioClass("editorial-button back-button")}><Link href={backHref}>← {backLabel}</Link></Button><h1 className={portfolioClass("page-title")}>{title}</h1><p className={portfolioClass("page-description")}>{intro}</p></section>;
}

export function Conversation() {
  return (
    <section className={portfolioClass("conversation page-padding")} aria-labelledby="conversation-heading">
      <h2 id="conversation-heading">Have a story<br />in mind?</h2>
      <div className={portfolioClass("conversation-action")}>
        <p>For hiring, creative projects, or research collaboration, start a conversation.</p>
        <Button asChild className={portfolioClass("editorial-button ink-button")}>
          <Link href="/contact">Let’s talk <span aria-hidden="true">→</span></Link>
        </Button>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return <footer className={portfolioClass("site-footer page-padding")}><div className={portfolioClass("footer-top")}><div><Link href="/" className={portfolioClass("footer-name")}>Ariq Arko</Link><p>Dhaka, Bangladesh</p></div><div className={portfolioClass("footer-contact")}><a href={`mailto:${email}`}>{email} →</a><FooterActions /></div></div><div className={portfolioClass("footer-bottom")}><p>© 2026 Ariq Arko</p><p>Stories. People. A little curiosity.</p></div></footer>;
}
