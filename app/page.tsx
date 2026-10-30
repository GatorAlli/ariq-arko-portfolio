import Image from "next/image";
import { MapPin } from "lucide-react";
import { PortfolioSection } from "@/components/portfolio-section";
import { SinglePageNavigation } from "@/components/single-page-navigation";
import { BackToTop } from "@/components/back-to-top";

export default function Home() {
  return <main id="main-content" className="homepage">
    <SinglePageNavigation />
    <div className="landing-content">
      <section className="home-hero" aria-label="Meet Ariq Arko">
        <div className="hero-copy">
          <h2 className="hero-title">I make stories.<br />I bring people together.</h2>
          <p className="hero-description">Films, creative campaigns, and community projects, shaped by student leadership in Dhaka.</p>
          <p className="hero-location"><MapPin size={14} aria-hidden="true" /> Dhaka, Bangladesh · HSC 2026</p>
        </div>
        <div className="hero-portrait">
          <div className="portrait-backdrop relative aspect-square overflow-hidden border border-primary/60 [border-radius:60%_40%_35%_65%/55%_40%_60%_45%] motion-safe:animate-[portrait-morph_8s_ease-in-out_infinite]">
            <Image src="/images/ariq-arko-cutout.png" alt="Ariq Arko wearing a navy suit" fill priority unoptimized sizes="(min-width: 1024px) 360px, 72vw" className="object-cover object-[48%_top] [transform:scale(1.4)] [transform-origin:50%_0%]" />
          </div>
        </div>
      </section>
    </div>
    <PortfolioSection section="about" />
    <PortfolioSection section="experience" />
    <PortfolioSection section="work" />
    <PortfolioSection section="awards" />
    <PortfolioSection section="contact" />
    <BackToTop />
  </main>;
}
