import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "평면도",
  description: `${siteConfig.projectName} 세대별 평면 구성과 특화 설계를 확인하세요.`,
  openGraph: {
    title: `평면도 | ${siteConfig.name}`,
    description: `${siteConfig.projectName} 세대별 평면 구성과 특화 설계를 확인하세요.`,
  },
};

export default function FloorplanPage() {
  return (
    <div className="bg-[#f3efe6] px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1a3329]/70">
            Floor Plan
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-[#1a3329] md:text-4xl">
            평면도
          </h1>
        </FadeIn>
        <FadeIn delay={0.08} className="mt-10 space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base">
          <p>
            전용면적·세대 구성·테라스·수납 등 실제 평면은 PDF 브로슈어 및
            상담을 통해 제공됩니다. 방문 상담 시 모델하우스와 함께 상세
            안내가 가능합니다.
          </p>
          <div className="rounded-2xl border border-[#1a3329]/10 bg-white/60 p-8 text-center text-neutral-500">
            평면도 이미지·PDF는 준비 중이며, 곧 게시 예정입니다.
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
