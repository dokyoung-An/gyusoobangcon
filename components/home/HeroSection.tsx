"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { preload } from "react-dom";

export function HeroSection() {
  const slides = useMemo(
    () => [
      {
        src: "/main/hero1.jpg",
        alt: "도심 속 숲 프리미엄 타운하우스 조감도 1",
      },
      {
        src: "/main/hero2.jpg",
        alt: "도심 속 숲 프리미엄 타운하우스 조감도 2",
      },
      {
        src: "/main/hero3.jpg",
        alt: "도심 속 숲 프리미엄 타운하우스 조감도 3",
      },
      {
        src: "/main/hero4.jpg",
        alt: "도심 속 숲 프리미엄 타운하우스 조감도 4",
      },
      {
        src: "/main/hero5.jpg",
        alt: "도심 속 숲 프리미엄 타운하우스 조감도 5",
      },
      {
        src: "/main/hero6.jpg",
        alt: "도심 속 숲 프리미엄 타운하우스 조감도 6",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(id);
  }, [slides.length]);

  // 초기 진입 시 회색 텀이 생기지 않도록 슬라이드 5장을 미리 선로딩합니다.
  useEffect(() => {
    slides.forEach((s) => preload(s.src, { as: "image" }));
  }, [slides]);

  useEffect(() => {
    const nextIndex = (activeIndex + 1) % slides.length;
    preload(slides[nextIndex].src, { as: "image" });
  }, [activeIndex, slides]);

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end">
      {/* 모든 슬라이드를 겹쳐두고 opacity만 linear로 전환합니다. */}
      {slides.map((slide, i) => {
        const isActive = i === activeIndex;

        return (
          <motion.div
            key={slide.src}
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.55, ease: "linear" }}
            className="absolute inset-0"
            style={{
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              fetchPriority={isActive ? "high" : "auto"}
              unoptimized
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        );
      })}

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20"
        aria-hidden
      />

      {/* 오른쪽 세로 인디케이터(해시) */}
      <div className="absolute right-3 top-1/2 z-20 -translate-y-1/2">
        <div className="relative h-[150px] w-[28px] sm:h-[170px]">
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-white/15" />
          {slides.map((_, i) => {
            const top = slides.length === 1 ? 0 : (i / (slides.length - 1)) * 100;
            const active = i === activeIndex;

            return (
              <button
                key={i}
                type="button"
                aria-label={`슬라이드 ${i + 1} 보기`}
                onClick={() => setActiveIndex(i)}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${top}%` }}
              >
                <span
                  className={`h-[10px] w-[10px] rounded-full border transition-colors ${
                    active
                      ? "border-[#c6a667] bg-[#c6a667]"
                      : "border-white/25 bg-white/10 hover:bg-white/20"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 pb-28 pt-32 text-center md:px-8">
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
            <ChevronDown className="size-5 text-[#c6a667]" strokeWidth={1.5} />
          </motion.span>
        </span>
      </motion.div>
    </section>
  );
}
