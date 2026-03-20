"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { heroImage } from "@/lib/images";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end">
      <Image
        src={heroImage}
        alt="타운하우스 광역 조감도 — 프리미엄 주거 단지"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 pb-28 pt-32 text-center md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-xs font-medium uppercase tracking-[0.35em] text-[#d4b87a] md:text-sm"
        >
          Urban Forest Residence
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35 }}
          className="mt-6 font-serif text-3xl font-semibold leading-snug tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          도심 속 완벽한 여유,
          <br className="hidden sm:block" /> 자연을 품은 하이엔드 타운하우스
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mt-6 max-w-2xl text-base text-white/85 md:text-lg"
        >
          규수방 건설이 제안하는 최상위 주거문화. 숲과 도심의 균형, 프라이빗한
          일상을 만나보세요.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 flex justify-center pb-10"
      >
        <span className="flex flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">
          Scroll
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="size-5 text-[#d4b87a]" strokeWidth={1.5} />
          </motion.span>
        </span>
      </motion.div>
    </section>
  );
}
