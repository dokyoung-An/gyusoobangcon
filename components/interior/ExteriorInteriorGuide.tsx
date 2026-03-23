"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type {
  FloorPlanTypeId,
} from "@/lib/floorplan-data";
import {
  FLOOR_PLAN_TYPES,
} from "@/lib/floorplan-data";
import { FadeInUp } from "@/components/ui/FadeInUp";

export function ExteriorInteriorGuide() {
  const [activeId, setActiveId] = useState<FloorPlanTypeId>("A");

  const current = useMemo(
    () => FLOOR_PLAN_TYPES.find((t) => t.id === activeId) ?? FLOOR_PLAN_TYPES[0],
    [activeId]
  );

  // ex_{타입}-1.jpg / ex_{타입}-2.jpg
  const srcTop = `/exterior/ex_${current.id}-1.jpg`;
  const srcBottom = `/exterior/ex_${current.id}-2.jpg`;

  return (
    <div className="space-y-6">
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
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="flex flex-col items-start gap-2">
            <h2 className="font-serif text-lg font-semibold text-[#1a3329] md:text-xl">
              {current.tabLabel} 외관 인테리어
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mt-[-60px]">
            <FadeInUp delay={0.06}>
              <div className="overflow-hidden rounded-2xl">
                <div className="relative aspect-square w-full md:aspect-square">
                  <Image
                    src={srcTop}
                    alt={`${current.tabLabel} 외관 인테리어 1`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <div className="overflow-hidden rounded-2xl">
                <div className="relative aspect-square w-full md:aspect-square">
                  <Image
                    src={srcBottom}
                    alt={`${current.tabLabel} 외관 인테리어 2`}
                    fill
                    className="object-contain"
                    sizes="100vw"
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

