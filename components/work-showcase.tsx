"use client";

import { CameraShowcase } from "@/components/camera-showcase";
import { WorkProjectGalleries } from "@/components/work-project-galleries";
import { WorkFilmProvider } from "@/components/work-film-player";

export function WorkShowcase() {
  return <WorkFilmProvider><CameraShowcase/><WorkProjectGalleries/></WorkFilmProvider>;
}
