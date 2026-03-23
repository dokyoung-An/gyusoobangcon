"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HERO_VIDEO_SRC = "/0323.mp4";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="수지 드림더힐 단지 소개 영상"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-8 pb-28 pt-32 text-center md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-xs font-medium uppercase tracking-[0.35em] text-[#c6a667] md:text-sm"
        >
          Urban Forest Residence
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35 }}
          className="mt-6 font-serif text-3xl font-semibold leading-snug tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          세월이 지나도 변하지 않는
          <br className="hidden sm:block" /> 고품격 하이엔드 주거공간의 새로운 기준
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mt-6 max-w-2xl text-base break-keep text-white/85 md:text-lg"
        >
          동천동 최고의 전세대 남향 조망권 확보, 도심 속 대단지 전원주택 단독형
          타운하우스
          <br />
          수지드림 더 힐 타운하우스가 제시합니다
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
            <ChevronDown className="size-5 text-[#c6a667]" strokeWidth={1.5} />
          </motion.span>
        </span>
      </motion.div>
    </section>
  );
}
