import type { Metadata } from "next";
import { SectionRedirect } from "@/components/section-redirect";
export const metadata: Metadata = { title: "Résumé" };
export default function ResumePage() { return <SectionRedirect target="/#resume-full" />; }
