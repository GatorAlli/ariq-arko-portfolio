import { portfolioClass } from "@/lib/portfolio-styles";

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
  return <section id={id} aria-labelledby={`${id}-heading`} className={compact ? "mt-12" : portfolioClass("page-padding section-space border-t border-border")}>
    <h2 id={`${id}-heading`} className={portfolioClass("section-title mb-8")}>{title}</h2>
    <div className="divide-y divide-border">
      {items.map(item => <article id={item.id} key={item.id} className="scroll-mt-28 break-inside-avoid-page space-y-3 py-6 first:pt-0">
        {item.year ? <p className={portfolioClass("eyebrow")}>{item.year}</p> : null}
        <h3 className="text-lg font-medium sm:text-xl">{item.title}</h3>
        {item.issuer ? <p className="text-muted-foreground">{item.issuer}</p> : null}
        <p className="max-w-[75ch] leading-relaxed text-muted-foreground">{item.detail}</p>
        {item.href ? <a href={item.href} className="inline-flex min-h-11 items-center underline underline-offset-4">View certificate</a> : null}
      </article>)}
    </div>
  </section>;
}
