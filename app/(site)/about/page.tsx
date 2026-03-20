import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "사업 소개",
  description: `${siteConfig.name}의 타운하우스 분양 사업 비전과 브랜드 철학을 소개합니다.`,
  openGraph: {
    title: `사업 소개 | ${siteConfig.name}`,
    description: `${siteConfig.name}의 타운하우스 분양 사업 비전과 브랜드 철학을 소개합니다.`,
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#f3efe6] px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1a3329]/70">
            About
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-[#1a3329] md:text-4xl">
            사업 소개
          </h1>
        </FadeIn>
        <FadeIn delay={0.08} className="mt-10 space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base">
          <p>
            규수방 건설은 도심과 자연의 균형을 중시하며, 입주민의 삶의 질을
            최우선으로 하는 주거 공간을 설계·시공합니다. 본 타운하우스는
            프리미엄 마감재와 세련된 볼륨감으로 하이엔드 주거문화를
            제안합니다.
          </p>
          <p>
            단지 내 녹지·동선·커뮤니티를 유기적으로 연결하여, 일상 속에서
            여유와 품격을 동시에 누릴 수 있도록 계획되었습니다.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
