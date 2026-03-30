import type { Metadata } from "next";
import {
  EnvironmentSection,
  PremiumSubpageHeader,
} from "@/components/location/LocationPremiumClient";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "입지 환경",
  description: `${siteConfig.projectName}의 광역 입지와 생활 인프라, 교통·학군·자연환경을 안내합니다.`,
};

export default function LocationPage() {
  return (
    <div className="bg-[#f3efe6]">
      <PremiumSubpageHeader
        title="입지 환경"
        description="광역 교통망과 생활 인프라, 자연 환경까지 핵심 입지 요소를 한눈에 확인해 보세요."
      />
      <EnvironmentSection />
    </div>
  );
}
