import data from "./portfolio-data.json";

export const { experience, awards, projects } = data;
export const email = "ariqalt16@gmail.com";
export const navigation = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "Recent Work", href: "/work" },
  { label: "Research", href: "/research" },
  { label: "Awards", href: "/awards" },
  { label: "Testimonials", href: "/testimonials" },
] as const;

export const pageInfo = {
  about: { title: "A little\nabout me.", intro: "A content creator, student leader, and community builder from Dhaka." },
  experience: { title: "Learning by\ndoing.", intro: "Production, creative campaigns, event operations, and leadership." },
  skills: { title: "A few things\nI bring.", intro: "Capabilities built through creative work and community projects." },
  work: { title: "Work with\npeople in it.", intro: "Selected contributions across film, fashion, events, and community." },
  research: { title: "A curious\nmind.", intro: "A space for research and future collaborations." },
  awards: { title: "Recognition\nalong the way.", intro: "From cinematography and science to sport and student leadership." },
  testimonials: { title: "People make\nthe work.", intro: "A place for references and words from collaborators." },
  contact: { title: "Start a\nconversation.", intro: "Hiring, projects, research, or a good idea." },
} as const;

export type PageSlug = keyof typeof pageInfo;
export function isPageSlug(value: string): value is PageSlug { return Object.prototype.hasOwnProperty.call(pageInfo, value); }
export const searchEntries = [
  { label: "Home", href: "/", description: "Ariq Arko, content creator and community builder" },
  ...navigation.map(item => ({ ...item, description: pageInfo[item.href.slice(1) as PageSlug].intro })),
  { label: "Contact", href: "/contact", description: "Hiring, projects, research and collaboration" },
  ...projects.map(p => ({ label: p.client, href: `/work/${p.key.toLowerCase()}`, description: `${p.role} ${p.body} ${p.detail}` })),
  ...experience.map(p => ({ label: `${p.role} · ${p.org}`, href: "/experience", description: p.body })),
];
