"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { FloorPlanTypeId } from "@/lib/floorplan-data";
import { FLOOR_PLAN_TYPES } from "@/lib/floorplan-data";
import { FadeInUp } from "@/components/ui/FadeInUp";

type LightboxState = { src: string; alt: string; title: string };

function ExteriorImageLightbox({
  state,
  onClose,
}: {
  state: LightboxState | null;
  onClose: () => void;
}) {
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

  if (typeof document === "undefined") return null;

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
              <Image
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

export function ExteriorInteriorGuide() {
  const [activeId, setActiveId] = useState<FloorPlanTypeId>("A");
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const current = useMemo(
    () => FLOOR_PLAN_TYPES.find((t) => t.id === activeId) ?? FLOOR_PLAN_TYPES[0],
    [activeId]
  );

  // ex_{타입}-1.jpg / ex_{타입}-2.jpg
  const srcTop = `/exterior/ex_${current.id}-1.jpg`;
  const srcBottom = `/exterior/ex_${current.id}-2.jpg`;

  return (
    <div className="space-y-6">
      <ExteriorImageLightbox state={lightbox} onClose={() => setLightbox(null)} />
      <FadeInUp>
        <div
          className="overflow-hidden rounded-xl border border-[#1a3329]/15 bg-white shadow-sm"
          role="tablist"
          aria-label="외관 인테리어 타입 선택"
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
                  id={`exterior-tab-${t.id}`}
                  aria-controls={`exterior-panel-${t.id}`}
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

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.id}
          id={`exterior-panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`exterior-tab-${current.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.65, ease: [0.33, 1, 0.68, 1] }}
          className="space-y-4"
        >
          <div className="flex flex-col items-start gap-2 border-b border-[#1a3329]/10 pb-4">
            <h2 className="font-serif text-lg font-semibold text-[#1a3329] md:text-xl ">
              {current.tabLabel} 외관 인테리어
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mt-[-60px]">
            <FadeInUp delay={0.06}>
              <div className="overflow-hidden rounded-2xl">
                <div className="relative aspect-square w-full cursor-zoom-in md:aspect-square">
                  <Image
                    src={srcTop}
                    alt={`${current.tabLabel} 외관 인테리어 1`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    quality={75}
                  />
                  <button
                    type="button"
                    className="absolute inset-0 z-[1] bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c6a667]"
                    aria-label={`${current.tabLabel} 외관 인테리어 1 크게 보기`}
                    onClick={() =>
                      setLightbox({
                        src: srcTop,
                        alt: `${current.tabLabel} 외관 인테리어 1`,
                        title: `${current.tabLabel} · 외관 인테리어 1`,
                      })
                    }
                  />
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <div className="overflow-hidden rounded-2xl">
                <div className="relative aspect-square w-full cursor-zoom-in md:aspect-square">
                  <Image
                    src={srcBottom}
                    alt={`${current.tabLabel} 외관 인테리어 2`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                  />
                  <button
                    type="button"
                    className="absolute inset-0 z-[1] bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c6a667]"
                    aria-label={`${current.tabLabel} 외관 인테리어 2 크게 보기`}
                    onClick={() =>
                      setLightbox({
                        src: srcBottom,
                        alt: `${current.tabLabel} 외관 인테리어 2`,
                        title: `${current.tabLabel} · 외관 인테리어 2`,
                      })
                    }
                  />
                </div>
              </div>
            </FadeInUp>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

