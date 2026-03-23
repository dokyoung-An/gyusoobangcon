import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { InteriorGuide } from "@/components/interior/InteriorGuide";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "인테리어",
  description: `${siteConfig.projectName} 세대 인테리어 구성 및 마감재 안내입니다.`,
  openGraph: {
    title: `인테리어 | ${siteConfig.name}`,
    description: `${siteConfig.projectName} 세대 인테리어 구성 및 마감재 안내입니다.`,
  },
};

export default function InteriorPage() {
  return (
    <div className="bg-[#f3efe6] px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1a3329]/70">
            Interior
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-[#1a3329] md:text-4xl">
            인테리어
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
            타입별 대표 인테리어 컷을 갤러리로 확인하실 수 있습니다. 실제
            마감·옵션은 준공 및 계약 조건에 따르며, 상세는 모델하우스 및
            상담을 통해 안내됩니다.
          </p>
        </FadeIn>

        <div className="mt-10 md:mt-12">
          <InteriorGuide />
        </div>
      </div>
    </div>
  );
}
