import Image from "next/image";
import { portfolioClass } from "@/lib/portfolio-styles";

const skills = [
  ["Storytelling", "Video editing / Cinematography / Content planning", "Documentary films, campaign content, and short-form reels."],
  ["Bringing people together", "Event management / Hosting / Team coordination", "From auditorium operations to national carnivals and community projects."],
  ["Community & leadership", "Student leadership / Social awareness / Project coordination", "Built through DAKKHINNO, the DRMC prefect team, and Science Club."],
];

const softwareGroups = [
  {
    label: "Video Editing",
    highlighted: true,
    programs: [
      { name: "Adobe Premiere Pro", logo: "premiere-pro", use: "Video editing" },
      { name: "CapCut", logo: "capcut", use: "Fast editing" },
    ],
  },
  {
    label: "Motion Graphics",
    highlighted: false,
    programs: [{ name: "Adobe After Effects", logo: "after-effects", use: "Motion graphics" }],
  },
  {
    label: "Photo Editing",
    highlighted: false,
    programs: [
      { name: "Adobe Photoshop", logo: "photoshop", use: "Photo editing" },
      { name: "Adobe Illustrator", logo: "illustrator", use: "Graphics & illustration" },
    ],
  },
];

export function AboutSkills() {
  return (
    <section id="skills" aria-labelledby="excel-heading stack-heading" className={portfolioClass("page-padding section-space border-t border-border")}>
      <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col">
          <h2 id="excel-heading" className={portfolioClass("section-title mb-10")}>What I excel at</h2>
          <div className="flex flex-1 flex-col justify-between">
          {skills.map(([title, capabilities, copy], index) => (
            <article key={title} className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 border-b border-border py-8 first:pt-0 sm:gap-6">
              <span className={portfolioClass("eyebrow pt-2")}>0{index + 1}</span>
              <div className="space-y-3">
                <h3 className="text-[clamp(21px,1.9vw,30px)] font-medium leading-[1.4] tracking-[-.025em]">{title}</h3>
                <p>{capabilities}</p>
                <p className="text-muted-foreground">{copy}</p>
              </div>
            </article>
          ))}
          <div className="pt-8">
            <h3 className="text-[clamp(21px,1.9vw,30px)] font-medium leading-[1.4] tracking-[-.025em]">Languages</h3>
            <p className="mt-4">Bangla / English / Hindi</p>
          </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 id="stack-heading" className={portfolioClass("section-title mb-10")}>My Stack</h2>
          <div className="flex flex-1 flex-col gap-4">
            {softwareGroups.map(group => (
              <section key={group.label} aria-label={group.label} className={`flex flex-col border px-5 pt-5 sm:px-6 ${group.programs.length > 1 ? "flex-[2]" : "flex-1"} ${group.highlighted ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
                <h3 className="mb-1 text-xs font-medium uppercase tracking-[.1em]">{group.label}</h3>
                <ul className="flex flex-1 flex-wrap gap-x-6">
                  {group.programs.map(program => (
                    <li key={program.logo} className="flex min-w-0 flex-[1_1_210px] items-center gap-4 py-4">
                      <Image src={`/images/software/${program.logo}.svg`} alt={`${program.name} logo`} width={48} height={48} className="size-12 shrink-0 object-contain" />
                      <div className="min-w-0">
                        <h4 className="text-base font-medium leading-snug">{program.name}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{program.use}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
