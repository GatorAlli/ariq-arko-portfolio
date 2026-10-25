import Image from "next/image";
import { portfolioClass } from "@/lib/portfolio-styles";

const skills = [
  ["CREATIVE", "Storytelling through film", "Film production · Cinematography · Content strategy", "I develop visual stories across documentaries, brand campaigns, and short-form content."],
  ["COLLABORATION", "Turning ideas into experiences", "Event production · Hosting · Team coordination", "I work with people to bring campaigns, events, and shared ideas to life."],
  ["INITIATIVE", "Building communities", "Student leadership · Social initiatives · Project coordination", "Through DAKKHINNO and student leadership, I’ve pursued opportunities to bring people together around a shared purpose."],
];

const softwareGroups = [
  {
    label: "Video Editing",
    programs: [
      { name: "Adobe Premiere Pro", logo: "premiere-pro", use: "Video editing" },
      { name: "CapCut", logo: "capcut", use: "Fast editing" },
    ],
  },
  {
    label: "Motion Graphics",
    programs: [{ name: "Adobe After Effects", logo: "after-effects", use: "Motion graphics" }],
  },
  {
    label: "Photo Editing",
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
          {skills.map(([category, title, capabilities, copy], index) => (
            <article key={title} className="border-b border-border py-8 first:pt-0">
              <p className={portfolioClass("eyebrow mb-4")}>0{index + 1} · {category}</p>
              <div className="space-y-3">
                <h3 className="text-[clamp(21px,1.9vw,30px)] font-medium leading-[1.4] tracking-[-.025em]">{title}</h3>
                <p>{capabilities}</p>
                <p className="text-muted-foreground">{copy}</p>
              </div>
            </article>
          ))}

          </div>
        </div>
        <div className="flex flex-col">
          <h2 id="stack-heading" className={portfolioClass("section-title mb-10")}>My Stack</h2>
          <div className="flex flex-1 flex-col gap-4">
            {softwareGroups.map(group => (
              <section key={group.label} aria-label={group.label} className="flex flex-1 flex-col gap-4 border border-border bg-card p-5 sm:p-6">
                <h3 className="text-lg font-semibold leading-tight tracking-[-.015em] sm:text-xl">{group.label}</h3>
                <ul className="flex flex-wrap gap-x-6 gap-y-4">
                  {group.programs.map(program => (
                    <li key={program.logo} className="flex min-w-0 flex-[1_1_210px] items-center gap-4">
                      <Image src={`/images/software/${program.logo}.svg`} alt={`${program.name} logo`} width={56} height={56} className="size-14 shrink-0 object-contain" />
                      <div className="min-w-0">
                        <h4 className="text-lg font-medium leading-snug">{program.name}</h4>
                        <p className="mt-1 text-base text-muted-foreground">{program.use}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
        <div className="pt-2 text-center lg:col-span-2">
          <h3 className="text-[clamp(24px,2vw,30px)] font-medium leading-[1.4] tracking-[-.025em]">Languages</h3>
          <p className="mt-4">Bangla · English · Hindi</p>
        </div>
      </div>
    </section>
  );
}
