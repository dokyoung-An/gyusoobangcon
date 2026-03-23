import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactLocationSection } from "@/components/contact/ContactLocationSection";
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
    <div className="bg-[#f3efe6]">
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-8 pb-20 pt-28 md:px-8 md:pb-24 md:pt-32">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1a3329]/70">
              Contact
            </p>
            <h1 className="mt-4 font-serif text-3xl font-semibold text-[#1a3329] md:text-4xl">
              상담 문의
            </h1>
          </FadeIn>
          <div className="mt-10">
            <ContactLocationSection />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-8 pb-24 pt-12 md:px-8 md:pt-14">
        <FadeIn delay={0.06}>
          <ContactForm />
        </FadeIn>
      </div>
    </div>
  );
}
