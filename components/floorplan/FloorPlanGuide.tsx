"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import NextImage from "next/image";
import {
  FLOOR_LEVELS_META,
  FLOOR_PLAN_TYPES,
  resolveIsoSrc,
  resolvePlan2dSrc,
  type FloorPlanTypeId,
} from "@/lib/floorplan-data";
import { FadeInUp } from "@/components/ui/FadeInUp";

type LightboxState = { src: string; alt: string; title: string };

function FloorPlanImageLightbox({
  state,
  onClose,
}: {
  state: LightboxState | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [state, onClose]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {state ? (
        <motion.div
          key={state.src}
          role="dialog"
          aria-modal="true"
          aria-label={state.title}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/88 p-3 backdrop-blur-[2px] sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="fixed right-3 top-3 z-[210] flex size-11 items-center justify-center rounded-full bg-white/15 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a667] sm:right-5 sm:top-5"
              aria-label="닫기"
            >
              <X className="size-6" strokeWidth={1.75} />
            </button>
            <div className="relative h-[min(88dvh,920px)] w-[min(96vw,1200px)] min-h-[40vh]">
              <NextImage
                src={state.src}
                alt={state.alt}
                fill
                className="object-contain object-center shadow-2xl"
                sizes="(max-width: 768px) 96vw, min(96vw, 1200px)"
                quality={85}
                priority
              />
            </div>
            <p className="mt-3 max-w-[min(96vw,1200px)] text-center text-xs text-white/90 sm:text-sm">
              {state.title}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

function FloorImageCard({
  label,
  caption,
  src,
  alt,
  aspectClassName,
  placeholderHint,
  onExpand,
  priority = false,
}: {
  label: string;
  caption: string;
  src: string | null;
  alt: string;
  aspectClassName: string;
  placeholderHint: string;
  onExpand?: (detail: LightboxState) => void;
  priority?: boolean;
}) {
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
  }, [src]);

  const showImage = Boolean(src) && !loadFailed;
  const expandable = Boolean(showImage && onExpand);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#1a3329]/12 bg-gradient-to-b from-white to-neutral-100/80 shadow-sm ${expandable ? "cursor-zoom-in" : ""}`}
    >
      <div className="absolute left-3 top-3 z-10 rounded-md bg-[#1a3329] px-3 py-1.5 text-xs font-semibold tracking-wide text-white shadow-md">
        {label}
      </div>
      <div
        className={`relative w-full bg-neutral-100/90 pt-12 ${aspectClassName}`}
      >
        {showImage ? (
          <>
            <div className="absolute inset-0 z-0 p-3 md:p-4">
              <div className="relative h-full w-full">
                <NextImage
                  src={src!}
                  alt={alt}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={priority ? "eager" : "lazy"}
                  fetchPriority={priority ? "high" : "auto"}
                  quality={72}
                  onError={() => setLoadFailed(true)}
                />
              </div>
            </div>
            {onExpand ? (
              <button
                type="button"
                className="absolute inset-0 z-[1] rounded-b-2xl bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c6a667]"
                aria-label={`${alt} 크게 보기`}
                onClick={() =>
                  onExpand({
                    src: src!,
                    alt,
                    title: `${caption} · ${label}`,
                  })
                }
              />
            ) : null}
          </>
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
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const current =
    FLOOR_PLAN_TYPES.find((t) => t.id === activeId) ?? FLOOR_PLAN_TYPES[0];

  /** 첫 행(2장) 이후 타일은 네트워크 한가할 때 미리 받아 두어 스크롤 시 체감 지연 완화 */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const cfg =
      FLOOR_PLAN_TYPES.find((t) => t.id === activeId) ?? FLOOR_PLAN_TYPES[0];
    const urls: string[] = [];
    for (let i = 2; i < FLOOR_LEVELS_META.length; i++) {
      const code = FLOOR_LEVELS_META[i]!.code;
      const p = resolvePlan2dSrc(cfg, code);
      const iso = resolveIsoSrc(cfg, code);
      if (p) urls.push(p);
      if (iso) urls.push(iso);
    }
    const run = () => {
      for (const href of urls) {
        const im = document.createElement("img");
        im.decoding = "async";
        im.src = href;
      }
    };
    const w = window;
    const id =
      "requestIdleCallback" in w
        ? w.requestIdleCallback(run, { timeout: 2000 })
        : globalThis.setTimeout(run, 400);
    return () => {
      if ("cancelIdleCallback" in w) {
        w.cancelIdleCallback(id as number);
      } else {
        globalThis.clearTimeout(id as number);
      }
    };
  }, [activeId]);

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
              <div className="flex size-[4.375rem] shrink-0 items-center justify-center border-4 border-[#1a3329] bg-white shadow-inner sm:size-[3.625rem]">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#1a3329] sm:text-3xl">
                  {current.id}
                </span>
              </div>
              {/* <p className="text-center text-xs font-medium text-neutral-600 lg:text-left">
                {current.households}
              </p> */}
            </div>

            <div className="rounded-2xl border border-neutral-200/90 bg-neutral-100/70 p-5 shadow-sm md:p-6">
              <h2 className="text-center text-[11px] font-bold uppercase tracking-[0.28em] text-[#1a3329]/80">
                Unit Plan
              </h2>
              <div className="mt-4 overflow-hidden rounded-lg border border-neutral-200/80">
                <table className="w-full border-collapse text-center text-sm">
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
                          <td className="bg-white/95 px-3 py-2.5 text-center text-sm font-semibold tabular-nums text-[#1a3329] sm:px-4">
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
                Exterior
              </h2>
              <div className="mt-4 flex min-h-0 flex-1 flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-200/80 sm:aspect-[5/4]">
                  <NextImage
                    src={current.exteriorSrc}
                    alt={`${current.tabLabel} 외관 참고 이미지`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    quality={75}
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
              비교할 수 있습니다. 이미지를 누르면 화면 중앙에서 크게 볼 수
              있습니다.
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
                      onExpand={setLightbox}
                      priority={i < 2}
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
                이미지를 누르면 확대해서 볼 수 있습니다.
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
                      onExpand={setLightbox}
                      priority={i < 2}
                    />
                  </FadeInUp>
                );
              })}
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      <FloorPlanImageLightbox
        state={lightbox}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
}
