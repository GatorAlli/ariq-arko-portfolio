import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FooterActions } from "@/components/page-actions";
import { email } from "@/lib/portfolio";

export function PageIntro({ title, intro, backHref = "/", backLabel = "Back" }: { title: string; intro: string; backHref?: string; backLabel?: string }) {
  return <section className="page-intro page-padding"><Button asChild variant="outline" className="editorial-button back-button"><Link href={backHref}>← {backLabel}</Link></Button><h1 className="page-title">{title}</h1><p className="page-description">{intro}</p></section>;
}

export function Conversation() {
  return (
    <section className="conversation page-padding" aria-labelledby="conversation-heading">
      <h2 id="conversation-heading">Have a story<br />in mind?</h2>
      <div className="conversation-action">
        <p>For hiring, creative projects, or research collaboration, start a conversation.</p>
        <Button asChild className="editorial-button ink-button">
          <Link href="/contact">Let’s talk <span aria-hidden="true">→</span></Link>
        </Button>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return <footer className="site-footer page-padding"><div className="footer-top"><div><Link href="/" className="footer-name">Ariq Arko</Link><p>Dhaka, Bangladesh</p></div><div className="footer-contact"><a href={`mailto:${email}`}>{email} →</a><FooterActions /></div></div><div className="footer-bottom"><p>© 2026 Ariq Arko</p><p>Stories. People. A little curiosity.</p></div></footer>;
}
