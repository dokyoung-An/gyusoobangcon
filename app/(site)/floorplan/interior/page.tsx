import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
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
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1a3329]/70">
            Interior
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-[#1a3329] md:text-4xl">
            인테리어
          </h1>
        </FadeIn>
        <FadeIn
          delay={0.08}
          className="mt-10 space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base"
        >
          <p>
            주방·욕실·바닥·벽면 등 주요 마감재와 옵션 구성은 상담 및
            브로슈어를 통해 안내됩니다. 모델하우스 방문 시 실제 적용감을
            확인하실 수 있습니다.
          </p>
          <div className="rounded-2xl border border-[#1a3329]/10 bg-white/60 p-8 text-center text-neutral-500">
            인테리어 이미지·상세 자료는 준비 중이며, 곧 게시 예정입니다.
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
