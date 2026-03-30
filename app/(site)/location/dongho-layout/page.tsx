import type { Metadata } from "next";
import {
  DonghoLayoutSection,
  PremiumSubpageHeader,
} from "@/components/location/LocationPremiumClient";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "단지 배치도",
  description: `${siteConfig.projectName} 단지 배치와 흐름을 안내합니다.`,
};

export default function DonghoLayoutPage() {
  return (
    <div className="bg-[#f3efe6]">
      <PremiumSubpageHeader
        eyebrow="Dongho Layout"
        title="단지배치도"
        description="세대 배치와 동선을 중심으로 단지 구성의 흐름을 직관적으로 살펴보세요."
      />
      <DonghoLayoutSection />
    </div>
  );
}

