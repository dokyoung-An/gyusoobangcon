import type { Metadata } from "next";
import {
  LocationSystemSection,
  PremiumSubpageHeader,
} from "@/components/location/LocationPremiumClient";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "시스템",
  description: `${siteConfig.projectName} 설계 시스템과 생활 편의 구성을 안내합니다.`,
};

export default function SystemPage() {
  return (
    <div className="bg-[#f3efe6]">
      <PremiumSubpageHeader eyebrow="System" title="시스템" />
      <LocationSystemSection />
    </div>
  );
}

