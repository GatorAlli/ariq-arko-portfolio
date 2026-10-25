import Image from "next/image";
import { MapPin } from "lucide-react";

const tools = [
  ["premiere-pro", "Adobe Premiere Pro"],
  ["after-effects", "Adobe After Effects"],
  ["capcut", "CapCut"],
  ["photoshop", "Adobe Photoshop"],
  ["illustrator", "Adobe Illustrator"],
];

export default function Home() {
  return (
    <main id="main-content" className="homepage px-[var(--page-gutter)] pb-12 sm:pb-16">
      <section className="home-hero" aria-label="Meet Ariq Arko">
        <div className="hero-copy"><p className="hero-kicker">Content creator · Community builder</p>
          <h2 className="max-w-[22ch] text-[clamp(24px,2.5vw,36px)] font-medium leading-[1.35] tracking-[-.035em]">I make stories.<br />I bring people together.</h2>
          <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted-foreground">Film, campaigns, and experiences that connect people. A little curiosity in everything I create.</p>
          <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="size-3.5" aria-hidden="true" /> Dhaka, Bangladesh</p>
        </div>
        <div className="hero-portrait">
          <div className="relative aspect-square overflow-hidden border-2 border-primary bg-[#142020] [border-radius:60%_40%_35%_65%/55%_40%_60%_45%] motion-safe:animate-[portrait-morph_8s_ease-in-out_infinite]">
            <Image src="/images/ariq-arko-cutout.png" alt="Ariq Arko wearing a navy suit" fill priority unoptimized sizes="(min-width: 1024px) 360px, 72vw" className="object-cover object-[48%_top] [transform:scale(1.4)] [transform-origin:50%_0%]" />
          </div>
        </div>
      </section>
      <section className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-border pt-6 lg:mt-12" aria-label="Creative toolkit">
        <p className="text-xs font-medium uppercase tracking-[.12em] text-muted-foreground">My creative toolkit</p>
        <div className="hidden h-6 w-px bg-border sm:block" aria-hidden="true" />
        <ul className="flex flex-wrap items-center gap-5 sm:gap-7">{tools.map(([logo, name]) => <li key={logo}><Image src={`/images/software/${logo}.svg`} alt={name} title={name} width={32} height={32} className="size-8 object-contain" /></li>)}</ul>
      </section>
    </main>
  );
}
