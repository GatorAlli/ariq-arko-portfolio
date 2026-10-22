import data from "./portfolio-data.json";

export const { experience, awards, projects, certifications, events, participations, milestones } = data;
export const email = "ariqalt16@gmail.com";
export const phone = { label: "+880 1344-370575", href: "tel:+8801344370575" };
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
  awards: { title: "Recognition\nalong the way.", intro: "Honors, certifications, and competition experience across film, science, language, and sport." },
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
  { label: "Résumé", href: "/resume", description: "Education, experience, awards, certifications and event participation" },
  ...awards.map(item => ({ label: `${item.title} · ${item.issuer}`, href: `/awards#${item.id}`, description: `${item.year} ${item.detail}` })),
  ...certifications.map(item => ({ label: item.title, href: `/awards#${item.id}`, description: `${item.issuer} ${item.detail}` })),
  ...events.map(item => ({ label: item.title, href: `/experience#${item.id}`, description: item.detail })),
  ...participations.map(item => ({ label: item.title, href: `/awards#${item.id}`, description: `${item.year} ${item.detail}` })),
  ...milestones.map(item => ({ label: item.title, href: `/about#${item.id}`, description: item.detail })),
  ...experience.map(p => ({ label: `${p.role} · ${p.org}`, href: "/experience", description: `${p.body} ${"highlights" in p ? p.highlights?.join(" ") : ""}` })),
];
