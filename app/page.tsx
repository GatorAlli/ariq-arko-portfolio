import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main id="main-content" className="landing" aria-label="Ariq Arko, content creator and community builder">
      <h1 className="sr-only">Ariq Arko. I make stories. I bring people together.</h1>
      <section className="letter-panel panel-a" aria-label="Ariq Arko">
        <p className="hero-identity">ARIQ ARKO<br /><span>CONTENT CREATOR &amp;<br />COMMUNITY BUILDER</span></p>
        <span className="hero-letter" aria-hidden="true">A</span>
        <p className="hero-location">DHAKA, BANGLADESH</p>
        <span className="panel-index">01</span>
      </section>
      <section className="letter-panel panel-r" aria-label="Portrait of Ariq">
        <Image src="/images/ariq-arko.jpg" alt="Ariq Arko outdoors at Dhaka Residential Model College" fill priority sizes="25vw" className="hero-portrait" />
        <div className="portrait-scrim" />
        <span className="hero-letter" aria-hidden="true">R</span>
        <span className="panel-index">02</span>
      </section>
      <section className="letter-panel panel-i" aria-label="Stories and people">
        <span className="hero-letter" aria-hidden="true">I</span>
        <p className="hero-message">I make stories.<br />I bring people<br />together.</p>
        <span className="panel-index">03</span>
      </section>
      <section className="letter-panel panel-q" aria-label="Explore recent work">
        <div className="hero-work">
          <p>FILM / EVENTS / COMMUNITY<br />SELECTED PORTFOLIO 2026</p>
          <Link href="/work" className="hero-work-link">View recent work <span aria-hidden="true">→</span></Link>
        </div>
        <span className="hero-letter" aria-hidden="true">Q</span>
        <span className="panel-index">04</span>
      </section>
    </main>
  );
}
