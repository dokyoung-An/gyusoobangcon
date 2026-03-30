import type { Metadata } from "next";
import {
  PremiumSection,
  PremiumSubpageHeader,
} from "@/components/location/LocationPremiumClient";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "프리미엄",
  description: `${siteConfig.projectName}이 제안하는 하이엔드 타운하우스의 프리미엄 가치를 안내합니다.`,
};

export default function LocationPremiumPage() {
  return (
    <div className="bg-[#f3efe6]">
      <PremiumSubpageHeader
        title="프리미엄"
        description="수지 드림더힐이 제안하는 프라이빗 주거 가치와 차별화된 특화 요소를 안내합니다."
      />
      <PremiumSection />
    </div>
  );
}
