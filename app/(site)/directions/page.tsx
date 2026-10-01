import type { Metadata } from "next";
import { ContactLocationSection } from "@/components/contact/ContactLocationSection";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "오시는길",
  description: `${siteConfig.projectName} 위치 및 교통 안내입니다.`,
  openGraph: {
    title: `오시는길 | ${siteConfig.name}`,
    description: `${siteConfig.projectName} 위치 및 교통 안내입니다.`,
  },
};

export default function DirectionsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-8 pb-20 pt-28 md:px-8 md:pb-24 md:pt-32">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1a3329]/70">
            Location
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-[#1a3329] md:text-4xl">
            오시는길
          </h1>
        </FadeIn>
        <div className="mt-10">
          <ContactLocationSection />
        </div>
      </div>
    </div>
  );
}
