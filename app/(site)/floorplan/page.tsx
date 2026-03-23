import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { FloorPlanGuide } from "@/components/floorplan/FloorPlanGuide";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "평면안내",
  description: `${siteConfig.projectName} 세대별 평면 구성과 특화 설계를 확인하세요.`,
  openGraph: {
    title: `평면안내 | ${siteConfig.name}`,
    description: `${siteConfig.projectName} 세대별 평면 구성과 특화 설계를 확인하세요.`,
  },
};

export default function FloorplanPage() {
  return (
    <div className="bg-[#f3efe6] px-8 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1a3329]/70">
            Floor Plan
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-[#1a3329] md:text-4xl">
            평면안내
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
            타입을 선택하면 해당 세대의 면적 정보·배치 위치·평면·아이소 구성을
            한 화면에서 확인할 수 있습니다. 수치 및 도면은 확정안 기준으로
            갱신될 수 있으며, 상세는 상담을 통해 안내됩니다.
          </p>
        </FadeIn>

        <div className="mt-10 md:mt-12">
          <FloorPlanGuide />
        </div>
      </div>
    </div>
  );
}
