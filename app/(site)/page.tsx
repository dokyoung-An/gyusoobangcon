import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { SloganSection } from "@/components/home/SloganSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CtaSection } from "@/components/home/CtaSection";
import { openGraphImagePath } from "@/lib/images";
import { siteConfig } from "@/lib/site";

const homeTitle = `${siteConfig.projectName} 공식 홈`;
const siteOrigin = siteConfig.url.replace(/\/$/, "");

export const metadata: Metadata = {
  title: homeTitle,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteOrigin,
    title: `${homeTitle} | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [
      {
        url: openGraphImagePath,
        width: 1200,
        height: 630,
        alt: siteConfig.projectName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${homeTitle} | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [openGraphImagePath],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SloganSection />
      <FeaturesSection />
      <CtaSection />
    </>
  );
}
