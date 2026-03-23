"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeInUp } from "@/components/ui/FadeInUp";

export function CtaSection() {
  return (
    <section className="bg-[#1a3329] px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <FadeInUp>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a667]">
            Premium Living
          </p>
          <h2 className="mt-5 font-serif text-2xl font-semibold text-white md:text-4xl">
            최상위 주거문화,
            <br />
            지금 바로 경험해보세요.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            분양 상담 및 현장 안내를 통해 입지와 평면을 직접 확인해 보실 수
            있습니다.
          </p>
        </FadeInUp>
        <FadeInUp delay={0.12} className="mt-10">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#c6a667]/50 bg-[#c6a667] px-10 py-4 text-sm font-semibold text-[#1a1a1a] shadow-lg shadow-black/20 transition-colors hover:bg-[#c6a667]/90 md:text-base"
            >
              상담 문의하기
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 md:size-5" />
            </Link>
          </motion.div>
        </FadeInUp>
      </div>
    </section>
  );
}
