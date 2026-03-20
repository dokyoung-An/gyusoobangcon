import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { ModelHouseVr } from "@/components/modelhouse/ModelHouseVr";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "모델하우스",
  description: `${siteConfig.projectName} 사이버 모델하우스 VR 투어입니다.`,
  openGraph: {
    title: `모델하우스 | ${siteConfig.name}`,
    description: `${siteConfig.projectName} 사이버 모델하우스 VR 투어입니다.`,
  },
};

export default function ModelhousePage() {
  return (
    <div className="bg-[#f3efe6] px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1a3329]/70">
            Model House
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-[#1a3329] md:text-4xl">
            사이버 모델하우스
          </h1>
        </FadeIn>
        <FadeIn delay={0.08} className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-700 md:text-base">
          <p>
            세대 내부와 단지 외부를 VR로 둘러보실 수 있습니다. 아래에서 보고
            싶은 구역을 선택해 주세요.
          </p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <ModelHouseVr />
        </FadeIn>
      </div>
    </div>
  );
}
