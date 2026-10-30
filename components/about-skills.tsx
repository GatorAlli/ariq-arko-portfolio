import Image from "next/image";
import { portfolioClass } from "@/lib/portfolio-styles";

const skills = [
  ["Storytelling through film", "Film production · Cinematography · Content strategy", "I develop visual stories across documentaries, brand campaigns, and short-form content."],
  ["Turning ideas into experiences", "Event production · Hosting · Team coordination", "I work with people to bring campaigns, events, and shared ideas to life."],
  ["Building communities", "Student leadership · Social initiatives · Project coordination", "Through DAKKHINNO and student leadership, I’ve pursued opportunities to bring people together around a shared purpose."],
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
    <section id="skills" aria-labelledby="excel-heading stack-heading" className={portfolioClass("page-padding section-space")}>
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col">
          <h2 id="excel-heading" className="skills-heading">What I excel at</h2>
          <div className="flex flex-col gap-7">
          {skills.map(([title, capabilities, copy]) => (
            <article key={title}>
              <div className="space-y-2">
                <h3 className="text-[clamp(21px,1.9vw,30px)] font-medium leading-[1.4] tracking-[-.025em]">{title}</h3>
                <p>{capabilities}</p>
                <p className="text-muted-foreground">{copy}</p>
              </div>
            </article>
          ))}

          </div>
        </div>
        <div className="flex flex-col">
          <h2 id="stack-heading" className="skills-heading">My Stack</h2>
          <div className="flex flex-col gap-4">
            {softwareGroups.map(group => (
              <section key={group.label} aria-label={group.label} className="flex flex-col gap-4 bg-card p-5 sm:p-6">
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
          <div className="languages-block">
            <h3>Languages</h3>
            <ul aria-label="Languages"><li>Bangla</li><li>English</li><li>Hindi</li></ul>
          </div>
        </div>
      </div>
    </section>
  );
}
