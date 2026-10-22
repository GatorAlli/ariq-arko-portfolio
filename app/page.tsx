import { portfolioClass } from "@/lib/portfolio-styles";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main id="main-content" className={portfolioClass("landing")} aria-label="Ariq Arko, content creator and community builder">
      <h1 className="sr-only">Ariq Arko. I make stories. I bring people together.</h1>
      <section className={portfolioClass("letter-panel panel-a")} aria-label="Ariq Arko">
        <p className={portfolioClass("hero-identity")}>ARIQ ARKO<br /><span>CONTENT CREATOR &amp;<br />COMMUNITY BUILDER</span></p>
        <span className={portfolioClass("hero-letter")} aria-hidden="true">A</span>
        <p className={portfolioClass("hero-location")}>DHAKA, BANGLADESH</p>
        <span className={portfolioClass("panel-index")}>01</span>
      </section>
      <section className={portfolioClass("letter-panel panel-r bg-[#142020]")} aria-label="Portrait of Ariq">
        <Image src="/images/ariq-arko-cutout.png" alt="Black-and-white portrait of Ariq Arko wearing a suit" fill priority unoptimized sizes="(min-width: 768px) 82vw, 120vw" className={portfolioClass("hero-portrait")} />
        <span className={portfolioClass("hero-letter")} aria-hidden="true">R</span>
        <span className={portfolioClass("panel-index")}>02</span>
      </section>
      <section className={portfolioClass("letter-panel panel-i")} aria-label="Stories and people">
        <span className={portfolioClass("hero-letter")} aria-hidden="true">I</span>
        <p className={portfolioClass("hero-message")}>I make stories.<br />I bring people<br />together.</p>
        <span className={portfolioClass("panel-index")}>03</span>
      </section>
      <section className={portfolioClass("letter-panel panel-q")} aria-label="Explore recent work">
        <div className={portfolioClass("hero-work")}>
          <p>FILM / EVENTS / COMMUNITY<br />SELECTED PORTFOLIO 2026</p>
          <Link href="/work" className={portfolioClass("hero-work-link")}>View recent work <span aria-hidden="true">→</span></Link>
        </div>
        <span className={portfolioClass("hero-letter")} aria-hidden="true">Q</span>
        <span className={portfolioClass("panel-index")}>04</span>
      </section>
    </main>
  );
}
