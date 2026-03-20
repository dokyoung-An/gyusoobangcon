import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "입지 소개",
  description: `교통·생활·교육 인프라를 아우르는 ${siteConfig.projectName}의 입지 장점을 안내합니다.`,
  openGraph: {
    title: `입지 소개 | ${siteConfig.name}`,
    description: `교통·생활·교육 인프라를 아우르는 ${siteConfig.projectName}의 입지 장점을 안내합니다.`,
  },
};

export default function LocationPage() {
  return (
    <div className="bg-[#f3efe6] px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1a3329]/70">
            Location
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-[#1a3329] md:text-4xl">
            입지 소개
          </h1>
        </FadeIn>
        <FadeIn delay={0.08} className="mt-10 space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base">
          <p>
            주요 업무지구와의 접근성은 물론, 생활 편의시설·공원·문화시설과의
            거리를 고려한 입지입니다. 대중교통과 도로망을 통해 이동 동선을
            최적화하였습니다.
          </p>
          <p>
            상세한 위치·교통·주변 시설은 상담 시 안내드리며, 현장 방문 예약도
            가능합니다.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
