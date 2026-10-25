import { portfolioClass } from "@/lib/portfolio-styles";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { FabricBackground } from "@/components/fabric-background";
import "./globals.css";

const poppins = localFont({ src: [
  { path: "./fonts/poppins-regular.ttf", weight: "400", style: "normal" },
  { path: "./fonts/poppins-medium.ttf", weight: "500", style: "normal" },
  { path: "./fonts/poppins-semibold.ttf", weight: "600", style: "normal" },
], variable: "--font-poppins", display: "swap" });
const gravitas = localFont({ src: "./fonts/gravitas-one.ttf", variable: "--font-gravitas", weight: "400", display: "swap" });
const handwriting = localFont({ src: "./fonts/neonderthaw.ttf", variable: "--font-handwriting", weight: "400", display: "swap", preload: false });

const navMono = localFont({ src: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", variable: "--font-nav-mono", weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Ariq Arko | Stories, people & a little curiosity", template: "%s | Ariq Arko" },
  description: "Ariq Arko is a content creator, student leader, and community builder in Dhaka. Selected work across film, fashion, events, and community.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${poppins.variable} ${gravitas.variable} ${handwriting.variable} ${navMono.variable}`}>
      <body>
        <FabricBackground />
        <a href="#main-content" className={portfolioClass("skip-link")}>Skip to content</a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
