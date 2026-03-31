import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { PromotionVideoLauncher } from "@/components/promotion-video/PromotionVideoLauncher";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "홍보영상",
  description: `${siteConfig.projectName} 홍보영상입니다.`,
  openGraph: {
    title: `홍보영상 | ${siteConfig.name}`,
    description: `${siteConfig.projectName} 홍보영상입니다.`,
  },
};

export default function PromotionVideoPage() {
  return (
    <div className="bg-[#f3efe6] px-8 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1a3329]/70">
            Promotion Video
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-[#1a3329] md:text-4xl">
            홍보영상
          </h1>
        </FadeIn>

        <FadeIn
          delay={0.08}
          className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-700 md:text-base"
        >
          <p>{siteConfig.projectName} 홍보영상을 확인해 보세요.</p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <PromotionVideoLauncher />
        </FadeIn>
      </div>
    </div>
  );
}
