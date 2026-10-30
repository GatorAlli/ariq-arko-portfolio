import importedProjects from "@/lib/project-media.json";

export type FilmMedia = {
  id: string;
  title: string;
  src: string;
  preview: string;
  poster: string;
  width: number;
  height: number;
  sample?: boolean;
};

// Publish only supplied project films. Keep pending names in work-categories.ts
// so future imports can fill their approved places without showing sample work.
export const projectMedia: Record<string, Record<string, FilmMedia[]>> = {};
const importedFilms: (FilmMedia & {category:string;subsection:string})[]=importedProjects;
for (const film of importedFilms) {
  const category=projectMedia[film.category]??(projectMedia[film.category]={});
  (category[film.subsection]??(category[film.subsection]=[])).push(film);
}

export function getProjectFilms(category: string, subsection: string): FilmMedia[] {
  return projectMedia[category]?.[subsection] ?? [];
}
