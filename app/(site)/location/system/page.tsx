import type { Metadata } from "next";
import { PremiumSubpageHeader } from "@/components/location/LocationPremiumClient";
import { SystemCategoryClient } from "@/components/location/SystemCategoryClient";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "시스템",
  description: `${siteConfig.projectName} 설계 시스템과 생활 편의 구성을 안내합니다.`,
};

export default function SystemPage() {
  return (
    <div className="bg-[#f3efe6]">
      <PremiumSubpageHeader
        eyebrow="System"
        title="시스템"
        description="스마트·편의 시스템으로 완성되는 주거 공간의 기술과 생활 가치를 소개합니다."
      />
      <SystemCategoryClient />
    </div>
  );
}

