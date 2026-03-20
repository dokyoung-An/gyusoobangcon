"use client";

import { useState } from "react";

const VR_URLS = {
  in: "https://ttdesign-jk.synology.me/VR/20260307GSB/in/index.html",
  ex: "https://ttdesign-jk.synology.me/VR/20260307GSB/ex/index.html",
} as const;

type VrMode = keyof typeof VR_URLS;

const labels: Record<VrMode, string> = {
  in: "세대 VR",
  ex: "외부 VR",
};

export function ModelHouseVr() {
  const [mode, setMode] = useState<VrMode>("in");

  return (
    <div className="mt-8 space-y-5">
      <div className="flex flex-wrap gap-3">
        {(Object.keys(VR_URLS) as VrMode[]).map((key) => {
          const active = mode === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key)}
              className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition-all md:px-8 md:py-3 md:text-base ${
                active
                  ? "border-[#1a3329] bg-[#1a3329] text-white shadow-md"
                  : "border-[#1a3329]/25 bg-white/80 text-[#1a3329] hover:border-[#1a3329]/50 hover:bg-white"
              }`}
            >
              {labels[key]}
            </button>
          );
        })}
      </div>

      <div
        className="relative w-full overflow-hidden rounded-2xl border border-[#1a3329]/15 bg-[#0a1411] shadow-xl
          aspect-[9/16] max-h-[92dvh] w-full
          md:aspect-video md:max-h-[min(75vh,820px)]"
      >
        <iframe
          key={mode}
          src={VR_URLS[mode]}
          title={labels[mode]}
          className="h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
