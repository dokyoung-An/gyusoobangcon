"use client";

import { useState } from "react";
import { InteriorGuide } from "@/components/interior/InteriorGuide";
import { ExteriorInteriorGuide } from "@/components/interior/ExteriorInteriorGuide";

type CategoryKey = "in" | "ex";

export function InteriorCategoryGuide() {
  const [category, setCategory] = useState<CategoryKey>("in");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setCategory("in")}
          className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition-all md:px-8 md:py-3 md:text-base ${
            category === "in"
              ? "border-[#1a3329] bg-[#1a3329] text-white shadow-md"
              : "border-[#1a3329]/25 bg-white/80 text-[#1a3329] hover:border-[#1a3329]/50 hover:bg-white"
          }`}
        >
          실내인테리어
        </button>

        <button
          type="button"
          onClick={() => setCategory("ex")}
          className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition-all md:px-8 md:py-3 md:text-base ${
            category === "ex"
              ? "border-[#1a3329] bg-[#1a3329] text-white shadow-md"
              : "border-[#1a3329]/25 bg-white/80 text-[#1a3329] hover:border-[#1a3329]/50 hover:bg-white"
          }`}
        >
          외관인테리어
        </button>
      </div>

      {category === "in" ? <InteriorGuide /> : <ExteriorInteriorGuide />}
    </div>
  );
}

