import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

const handles = ["-left-1.5 -top-1.5", "left-1/2 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 top-1/2", "-right-1.5 top-1/2", "-bottom-1.5 -left-1.5", "-bottom-1.5 left-1/2", "-bottom-1.5 -right-1.5"];
const tools = [
  ["premiere-pro", "Adobe Premiere Pro"],
  ["after-effects", "Adobe After Effects"],
  ["capcut", "CapCut"],
  ["photoshop", "Adobe Photoshop"],
  ["illustrator", "Adobe Illustrator"],
];

export default function Home() {
  return (
    <main id="main-content" className="mx-auto flex min-h-[calc(100svh-var(--header-height))] max-w-[1440px] flex-col justify-center px-[var(--page-gutter)] py-12 sm:py-16 lg:py-14">
      <section className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20" aria-label="Meet Ariq Arko">
        <div className="min-w-0">
          <p className="mb-8 text-xs font-medium uppercase tracking-[.18em] text-muted-foreground">Content creator · Community builder</p>
          <div className="relative mb-10 flex items-center justify-center border border-primary px-3 py-5 sm:px-4 sm:py-6">
            <h1 className="translate-y-[.035em] whitespace-nowrap text-center font-heading text-[clamp(34px,6.2vw,90px)] leading-[1.15] tracking-[-.065em]">ARIQ ARKO</h1>
            {handles.map(position => <span key={position} aria-hidden="true" className={`absolute size-3 border-2 border-primary bg-background ${position}`} />)}
            <div aria-hidden="true" className="absolute -bottom-8 right-5 flex items-start gap-1 text-primary">
              <svg viewBox="0 0 740 740" className="size-10 shrink-0" aria-hidden="true"><path fill="black" d="M89 43 650 310 446 393 615 608 501 696 336 485 204 654Z" /><path fill="currentColor" d="M117 80 599 310 417 387 586 605 505 663 336 449 215 606Z" /></svg>
              <span className="mt-4 bg-primary px-2 py-0.5 text-[10px] font-medium text-black">Ariq</span>
            </div>
          </div>
          <h2 className="max-w-[22ch] text-[clamp(24px,2.5vw,36px)] font-medium leading-[1.35] tracking-[-.035em]">I make stories.<br />I bring people together.</h2>
          <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted-foreground">Film, campaigns, and experiences that connect people. A little curiosity in everything I create.</p>
          <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="size-3.5" aria-hidden="true" /> Dhaka, Bangladesh</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/work" className="inline-flex min-h-12 items-center justify-between gap-6 border border-primary bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary/80">View recent work <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
            <Link href="/about" className="inline-flex min-h-12 items-center gap-6 border border-border px-5 text-sm transition-colors hover:border-primary">A little about me <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="relative mx-auto w-3/5 max-w-[264px] lg:max-w-none">
          <div className="relative aspect-square overflow-hidden border-2 border-primary bg-[#142020] [border-radius:60%_40%_35%_65%/55%_40%_60%_45%] motion-safe:animate-[portrait-morph_8s_ease-in-out_infinite]">
            <Image src="/images/ariq-arko-cutout.png" alt="Ariq Arko wearing a navy suit" fill priority unoptimized sizes="(min-width: 1024px) 42vw, 90vw" className="object-cover object-[48%_top] [transform:scale(1.4)] [transform-origin:50%_0%]" />
          </div>
          <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">Stories. People. A little curiosity.</p>
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
