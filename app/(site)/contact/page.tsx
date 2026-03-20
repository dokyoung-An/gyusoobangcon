import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "상담 문의",
  description: `${siteConfig.projectName} 분양 상담·현장 방문 예약 및 문의 채널입니다.`,
  openGraph: {
    title: `상담 문의 | ${siteConfig.name}`,
    description: `${siteConfig.projectName} 분양 상담·현장 방문 예약 및 문의 채널입니다.`,
  },
};

export default function ContactPage() {
  const { company } = siteConfig;

  return (
    <div className="bg-[#f3efe6] px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1a3329]/70">
            Contact
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-[#1a3329] md:text-4xl">
            상담 문의
          </h1>
        </FadeIn>
        <FadeIn delay={0.08} className="mt-10 space-y-8">
          <div className="rounded-2xl border border-[#1a3329]/10 bg-white/70 p-8 shadow-sm">
            <dl className="space-y-4 text-sm text-neutral-700 md:text-base">
              <div>
                <dt className="font-semibold text-[#1a3329]">대표번호</dt>
                <dd className="mt-1">
                  <a href={`tel:${company.tel.replace(/-/g, "")}`} className="hover:text-[#1a3329]">
                    {company.tel}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1a3329]">이메일</dt>
                <dd className="mt-1">
                  <a href={`mailto:${company.email}`} className="hover:underline">
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1a3329]">주소</dt>
                <dd className="mt-1 leading-relaxed">{company.address}</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs text-neutral-500">
              운영 시간 및 방문 예약은 전화 또는 이메일로 접수해 주세요.
            </p>
          </div>

          <section
            id="privacy"
            className="scroll-mt-28 rounded-2xl border border-[#1a3329]/10 bg-white/40 p-8"
          >
            <h2 className="font-serif text-lg font-semibold text-[#1a3329]">
              개인정보처리방침
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-neutral-600 md:text-sm">
              규수방 건설은 상담 및 분양 관련 문의 처리를 위해 필요한 최소한의
              개인정보를 수집·이용할 수 있습니다. 상세 내용은 추후 정책 페이지로
              게시 예정이며, 문의 시 안내드립니다.
            </p>
          </section>

          <Link
            href="/home"
            className="inline-block text-sm font-medium text-[#1a3329] underline-offset-4 hover:underline"
          >
            ← 홈으로
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
