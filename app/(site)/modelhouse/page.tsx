import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "모델하우스",
  description: `${siteConfig.projectName} 사이버 모델하우스 투어 및 현장 방문 예약 안내입니다.`,
  openGraph: {
    title: `모델하우스 | ${siteConfig.name}`,
    description: `${siteConfig.projectName} 사이버 모델하우스 투어 및 현장 방문 예약 안내입니다.`,
  },
};

export default function ModelhousePage() {
  return (
    <div className="bg-[#f3efe6] px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1a3329]/70">
            Model House
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-[#1a3329] md:text-4xl">
            사이버 모델하우스
          </h1>
        </FadeIn>
        <FadeIn delay={0.08} className="mt-10 space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base">
          <p>
            360° VR·동영상 등 사이버 모델하우스 콘텐츠는 연동 예정입니다.
            현장 모델하우스 운영 시간 및 예약은 상담 문의 페이지에서
            요청하실 수 있습니다.
          </p>
          <div className="aspect-video w-full rounded-2xl bg-[#1a3329]/10" />
        </FadeIn>
      </div>
    </div>
  );
}
