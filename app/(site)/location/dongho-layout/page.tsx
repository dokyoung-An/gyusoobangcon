import type { Metadata } from "next";
import {
  DonghoLayoutSection,
  PremiumSubpageHeader,
} from "@/components/location/LocationPremiumClient";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "동호수배치도",
  description: `${siteConfig.projectName} 동호수 배치와 흐름을 안내합니다.`,
};

export default function DonghoLayoutPage() {
  return (
    <div className="bg-[#f3efe6]">
      <PremiumSubpageHeader eyebrow="Dongho Layout" title="동호수배치도" />
      <DonghoLayoutSection />
    </div>
  );
}

