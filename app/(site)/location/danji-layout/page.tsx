import type { Metadata } from "next";
import {
  DanjiLayoutSection,
  PremiumSubpageHeader,
} from "@/components/location/LocationPremiumClient";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "동호수배치도",
  description: `${siteConfig.projectName} 단지 배치와 동선 구성을 안내합니다.`,
};

export default function DanjiLayoutPage() {
  return (
    <div className="bg-[#f3efe6]">
      <PremiumSubpageHeader eyebrow="Danji Layout" title="동호수배치도" />
      <DanjiLayoutSection />
    </div>
  );
}

