import { portfolioClass } from "@/lib/portfolio-styles";
import { EvidenceText } from "@/components/evidence-text";
import { RevealHeading } from "@/components/reveal-heading";

// Shared by the full portfolio and résumé so every record stays in sync.
type RecordEntry = {
  id: string;
  title: string;
  detail: string;
  year?: string;
  issuer?: string;
  href?: string;
};

export function PortfolioRecords({ id, title, items, compact = false }: {
  id: string;
  title: string;
  items: RecordEntry[];
  compact?: boolean;
}) {
  return <section id={id} aria-labelledby={`${id}-heading`} className={compact ? "mt-12" : portfolioClass("page-padding section-space")}>
    <RevealHeading as="h3" id={`${id}-heading`} className="record-group-title" text={title} />
    <div className={`records-list${compact ? " records-list-compact" : ""}`}>
      {items.map(item => <article id={item.id} key={item.id} className="record-entry break-inside-avoid-page space-y-2">
        {item.year ? <p className={portfolioClass("eyebrow")}>{item.year}</p> : null}
        <h4 className="text-lg font-medium sm:text-xl">{item.title}</h4>
        {item.issuer ? <p className="text-muted-foreground">{item.issuer}</p> : null}
        <p className="max-w-[75ch] leading-relaxed text-muted-foreground"><EvidenceText text={item.detail} /></p>
        {item.href ? <a href={item.href} className="inline-flex min-h-11 items-center underline underline-offset-4">View certificate</a> : null}
      </article>)}
    </div>
  </section>;
}
