"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  FLOOR_PLAN_TYPES,
  type FloorPlanTypeId,
} from "@/lib/floorplan-data";
import { getInteriorRoomLabel, INTERIOR_IMAGES } from "@/lib/interior-data";
import { FadeInUp } from "@/components/ui/FadeInUp";

const AUTO_MS = 4200;
const THUMB_COUNT = 4;

function slideAt(images: readonly string[], i: number): string {
  return images[i % images.length]!;
}

type InteriorCarouselProps = {
  images: readonly string[];
  typeLabel: string;
};

function InteriorCarousel({ images, typeLabel }: InteriorCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mainFailed, setMainFailed] = useState(false);
  const n = images.length;

  useEffect(() => {
    setIndex(0);
    setMainFailed(false);
  }, [images]);

  useEffect(() => {
    setMainFailed(false);
  }, [index, images]);

  useEffect(() => {
    if (n <= 1 || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [n, paused, images]);

  const goToOffset = useCallback(
    (offset: number) => {
      if (n === 0) return;
      setIndex((i) => (i + offset) % n);
    },
    [n]
  );

  if (n === 0) {
    return (
      <div className="rounded-2xl border border-[#1a3329]/12 bg-white/70 p-12 text-center text-sm text-neutral-500">
        등록된 인테리어 이미지가 없습니다.{" "}
        <code className="text-xs text-neutral-400">lib/interior-data.ts</code>
        를 확인해 주세요.
      </div>
    );
  }

  const mainSrc = slideAt(images, index);
  const mainRoomLabel = getInteriorRoomLabel(mainSrc);
  const thumbSlots = Array.from({ length: THUMB_COUNT }, (_, k) => ({
    offset: k,
    src: slideAt(images, index + k),
  }));

  return (
    <div
      className="space-y-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#1a3329]/12 bg-neutral-900/5 shadow-sm">
        <div className="relative aspect-[16/10] w-full bg-neutral-200/40 md:aspect-[2/1]">
          <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-md bg-black/55 px-3 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
            {mainRoomLabel}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${typeLabel}-${index}-${mainSrc}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {!mainFailed ? (
                <Image
                  src={mainSrc}
                  alt={`${typeLabel} 인테리어 이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  quality={72}
                  onError={() => setMainFailed(true)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-neutral-100 px-6 text-center">
                  <p className="text-sm font-medium text-[#1a3329]/85">
                    이미지를 불러올 수 없습니다
                  </p>
                  <p className="max-w-xs text-xs text-neutral-500">
                    경로: <span className="break-all">{mainSrc}</span>
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => goToOffset(-1)}
            disabled={n <= 1}
            aria-label="이전 이미지"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/60 bg-white/85 p-2 text-[#1a3329] shadow-md backdrop-blur-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 md:left-3"
          >
            <ChevronLeft className="size-5" strokeWidth={2.2} />
          </button>

          <button
            type="button"
            onClick={() => goToOffset(1)}
            disabled={n <= 1}
            aria-label="다음 이미지"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/60 bg-white/85 p-2 text-[#1a3329] shadow-md backdrop-blur-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 md:right-3"
          >
            <ChevronRight className="size-5" strokeWidth={2.2} />
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {typeLabel} 갤러리 {index + 1}번째 이미지 표시 중, 자동 전환
          {paused ? " 일시정지" : ""}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {thumbSlots.map(({ offset, src }) => {
          const active = offset === 0;
          return (
            <button
              key={`thumb-${offset}`}
              type="button"
              onClick={() => goToOffset(offset)}
              className={`group relative overflow-hidden rounded-xl border-2 transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a3329] ${
                active
                  ? "border-[#1a3329] shadow-md ring-2 ring-[#c6a667]/50"
                  : "border-transparent opacity-90 hover:border-[#1a3329]/25 hover:opacity-100"
              }`}
              aria-label={`${typeLabel} 이미지 ${((index + offset) % n) + 1}번 보기`}
              aria-current={active ? "true" : undefined}
            >
              <div className="relative aspect-[5/3] w-full overflow-hidden bg-neutral-200/50">
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 24vw, 200px"
                  loading="lazy"
                  quality={65}
                />
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-center text-[11px] text-neutral-500">
        아래 썸네일을 눌러 이동할 수 있습니다. 마우스를 올리면 자동 재생이
        잠시 멈춥니다.
      </p>
    </div>
  );
}

export function InteriorGuide() {
  const [activeId, setActiveId] = useState<FloorPlanTypeId>("A");
  const current =
    FLOOR_PLAN_TYPES.find((t) => t.id === activeId) ?? FLOOR_PLAN_TYPES[0];
  const images = INTERIOR_IMAGES[current.id];

  return (
    <div className="space-y-10 md:space-y-12">
      <FadeInUp>
        <div
          className="overflow-hidden rounded-xl border border-[#1a3329]/15 bg-white shadow-sm"
          role="tablist"
          aria-label="인테리어 타입 선택"
        >
          <div className="grid grid-cols-5 divide-x divide-[#1a3329]/10">
            {FLOOR_PLAN_TYPES.map((t) => {
              const on = t.id === activeId;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  id={`interior-tab-${t.id}`}
                  aria-controls={`interior-panel-${t.id}`}
                  onClick={() => setActiveId(t.id)}
                  className={`py-3.5 text-center text-xs font-semibold transition-colors sm:text-sm ${
                    on
                      ? "bg-[#e8dfd0] text-[#1a3329]"
                      : "bg-white text-neutral-600 hover:bg-neutral-50 hover:text-[#1a3329]"
                  }`}
                >
                  {t.tabLabel}
                </button>
              );
            })}
          </div>
        </div>
      </FadeInUp>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          id={`interior-panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`interior-tab-${current.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-2 border-b border-[#1a3329]/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#1a3329] md:text-xl">
                {current.tabLabel} 인테리어
              </h2>
              {/* <p className="mt-1 text-sm text-neutral-600">
                {current.unitCode} · {current.households}
              </p> */}
            </div>
           
          </div>

          <InteriorCarousel
            images={images}
            typeLabel={current.tabLabel}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
