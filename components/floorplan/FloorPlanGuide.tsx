"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FLOOR_LEVELS_META,
  FLOOR_PLAN_TYPES,
  resolveIsoSrc,
  resolvePlan2dSrc,
  type FloorPlanTypeId,
} from "@/lib/floorplan-data";
import { FadeInUp } from "@/components/ui/FadeInUp";

const KEY_MAP_IMAGE = "/main/keymap.png";

function FloorImageCard({
  label,
  caption,
  src,
  alt,
  aspectClassName,
  placeholderHint,
}: {
  label: string;
  caption: string;
  src: string | null;
  alt: string;
  aspectClassName: string;
  placeholderHint: string;
}) {
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
  }, [src]);

  const showImage = Boolean(src) && !loadFailed;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#1a3329]/12 bg-gradient-to-b from-white to-neutral-100/80 shadow-sm">
      <div className="absolute left-3 top-3 z-10 rounded-md bg-[#1a3329] px-3 py-1.5 text-xs font-semibold tracking-wide text-white shadow-md">
        {label}
      </div>
      <div
        className={`relative w-full bg-neutral-100/90 pt-12 ${aspectClassName}`}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- 큰 PNG 직접 로드
          <img
            src={src!}
            alt={alt}
            className="absolute inset-0 m-auto h-full max-h-full w-full max-w-full object-contain p-3 md:p-4"
            loading="lazy"
            decoding="async"
            onError={() => setLoadFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <div className="h-px w-16 bg-[#c6a667]/60" aria-hidden />
            <p className="text-sm font-medium text-[#1a3329]/85">{caption}</p>
            <p className="max-w-[14rem] text-xs leading-relaxed text-neutral-500">
              {src
                ? "이미지를 불러오지 못했습니다. 경로·파일명을 확인해 주세요."
                : placeholderHint}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function FloorPlanGuide() {
  const [activeId, setActiveId] = useState<FloorPlanTypeId>("A");
  const current =
    FLOOR_PLAN_TYPES.find((t) => t.id === activeId) ?? FLOOR_PLAN_TYPES[0];

  return (
    <div className="space-y-10 md:space-y-12">
      <FadeInUp>
        <div
          className="overflow-hidden rounded-xl border border-[#1a3329]/15 bg-white shadow-sm"
          role="tablist"
          aria-label="세대 타입 선택"
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
                  id={`tab-${t.id}`}
                  aria-controls={`panel-${t.id}`}
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
          id={`panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10 md:space-y-14"
        >
          <div className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch lg:gap-8">
            <div className="flex flex-col items-center gap-2 lg:items-start">
              <div className="flex aspect-square w-full max-w-[9.5rem] items-center justify-center border-4 border-[#1a3329] bg-white shadow-inner sm:max-w-[10.5rem]">
                <span className="font-serif text-3xl font-bold tracking-tight text-[#1a3329] sm:text-4xl">
                  {current.unitCode}
                </span>
              </div>
              <p className="text-center text-xs font-medium text-neutral-600 lg:text-left">
                {current.households}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/90 bg-neutral-100/70 p-5 shadow-sm md:p-6">
              <h2 className="text-center text-[11px] font-bold uppercase tracking-[0.28em] text-[#1a3329]/80">
                Unit Plan
              </h2>
              <div className="mt-4 overflow-hidden rounded-lg border border-neutral-200/80">
                <table className="w-full border-collapse text-left text-sm">
                  <tbody className="divide-y divide-neutral-200/90">
                    {current.unitPlan.map((section) =>
                      section.rows.map((row, rowIndex) => (
                        <tr key={`${section.category}-${row.label}`}>
                          {rowIndex === 0 ? (
                            <th
                              rowSpan={section.rows.length}
                              scope="row"
                              className="w-[4.5rem] align-middle border-r border-neutral-200/80 bg-[#f0ebe2]/90 px-2 py-2.5 text-center text-xs font-bold text-[#1a3329] sm:w-[5.25rem] sm:px-3 sm:text-sm"
                            >
                              {section.category}
                            </th>
                          ) : null}
                          <td className="bg-white/95 px-3 py-2.5 text-[11px] font-medium text-neutral-600 sm:px-4 sm:text-xs">
                            {row.label}
                          </td>
                          <td className="bg-white/95 px-3 py-2.5 text-right text-sm font-semibold tabular-nums text-[#1a3329] sm:px-4">
                            {row.value}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl border border-neutral-200/90 bg-neutral-100/70 p-5 shadow-sm md:p-6">
              <h2 className="text-center text-[11px] font-bold uppercase tracking-[0.28em] text-[#1a3329]/80">
                Key Map
              </h2>
              <div className="mt-4 flex min-h-[70px] flex-1 flex-col sm:min-h-[90px]">
                <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-xl p-1.5 sm:p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={KEY_MAP_IMAGE}
                    alt={`${current.tabLabel} 단지 배치 KEY MAP`}
                    className="max-h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] text-neutral-600">
                선택 타입:{" "}
                <span className="font-semibold text-[#1a3329]">
                  {current.tabLabel}
                </span>
              </p>
            </div>
          </div>

          <section aria-labelledby="heading-2d">
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#1a3329]/10 pb-3">
              <h2
                id="heading-2d"
                className="font-serif text-lg font-semibold text-[#1a3329] md:text-xl"
              >
                평면도 <span className="text-sm font-normal text-neutral-500">(2D)</span>
              </h2>
              <span className="hidden text-xs text-neutral-500 sm:inline">
                {current.tabLabel} · 층별 4면
              </span>
            </div>
            <p className="mb-5 max-w-2xl text-sm leading-relaxed text-neutral-600">
              지하 1층, 1·2·3층 도면을 동일 그리드로 배치해 층간 관계를 바로
              비교할 수 있습니다.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
              {FLOOR_LEVELS_META.map(({ label, code }, i) => {
                const src = resolvePlan2dSrc(current, code);
                return (
                  <FadeInUp key={code} delay={0.05 * i}>
                    <FloorImageCard
                      label={label}
                      caption={`${current.unitCode} ${label} 평면도`}
                      src={src}
                      alt={`${current.tabLabel} ${label} 평면도`}
                      aspectClassName="aspect-[4/3] md:aspect-[5/3]"
                      placeholderHint="lib/floorplan-data.ts에서 images.plan2d 또는 기본 경로 public/floorplan/TOP_{타입}_{층}.png 를 확인하세요."
                    />
                  </FadeInUp>
                );
              })}
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-[#1a3329]/15 to-transparent" />

          <section aria-labelledby="heading-iso">
            <div className="mb-5 border-b border-[#1a3329]/10 pb-3">
              <h2
                id="heading-iso"
                className="font-serif text-lg font-semibold text-[#1a3329] md:text-xl"
              >
                아이소메트릭{" "}
                <span className="text-sm font-normal text-neutral-500">(3D 투시)</span>
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                층별 공간감을 한눈에 파악할 수 있도록 지하 1층부터 3층까지
                4면을 배치했습니다. 실제 마감·가구 배치는 준공 기준에 따릅니다.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
              {FLOOR_LEVELS_META.map(({ label, code }, i) => {
                const src = resolveIsoSrc(current, code);
                return (
                  <FadeInUp key={`iso-${code}`} delay={0.06 * i}>
                    <FloorImageCard
                      label={label}
                      caption={`${current.unitCode} ${label} 아이소`}
                      src={src}
                      alt={`${current.tabLabel} ${label} 아이소메트릭`}
                      aspectClassName="aspect-[5/4] md:aspect-[4/3]"
                      placeholderHint="lib/floorplan-data.ts에서 images.iso 또는 기본 경로 public/iso/iso_{타입}-{층} 01.png 를 확인하세요."
                    />
                  </FadeInUp>
                );
              })}
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
