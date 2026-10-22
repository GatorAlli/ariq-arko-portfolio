import data from "./portfolio-data.json";

export const { experience, awards, projects } = data;
export const email = "ariqalt16@gmail.com";
export const navigation = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Recent Work", href: "/work" },
  { label: "Awards", href: "/awards" },
] as const;

export const pageInfo = {
  about: { title: "A little\nabout me.", intro: "A content creator, student leader, and community builder from Dhaka." },
  experience: { title: "Learning by\ndoing.", intro: "Production, creative campaigns, event operations, and leadership." },
  work: { title: "Work with\npeople in it.", intro: "Selected contributions across film, fashion, events, and community." },
  awards: { title: "Recognition\nalong the way.", intro: "From cinematography and science to sport and student leadership." },
  testimonials: { title: "People make\nthe work.", intro: "A place for references and words from collaborators." },
  contact: { title: "Start a\nconversation.", intro: "Hiring, projects, research, or a good idea." },
} as const;

export type PageSlug = keyof typeof pageInfo;
export function isPageSlug(value: string): value is PageSlug { return Object.prototype.hasOwnProperty.call(pageInfo, value); }
export const searchEntries = [
  { label: "Home", href: "/", description: "Ariq Arko, content creator and community builder" },
  ...navigation.map(item => ({ ...item, description: pageInfo[item.href.slice(1) as PageSlug].intro })),
  { label: "Skills", href: "/about#skills", description: "Storytelling, video editing, cinematography, content planning, event management, hosting, team coordination, community, leadership, Bangla, English, Hindi" },
  { label: "Contact", href: "/contact", description: "Hiring, projects, research and collaboration" },
  ...projects.map(p => ({ label: p.client, href: `/work/${p.key.toLowerCase()}`, description: `${p.role} ${p.body} ${p.detail}` })),
  ...experience.map(p => ({ label: `${p.role} · ${p.org}`, href: "/experience", description: p.body })),
];
