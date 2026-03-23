"use client";

import {
  openVrPopup,
  VR_MODELHOUSE_URLS,
  VR_WINDOW_NAMES,
} from "@/lib/vr-modelhouse";

export function SplashVrButtons() {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12 md:gap-4">
      <button
        type="button"
        onClick={() =>
          openVrPopup(
            VR_MODELHOUSE_URLS.in,
            VR_WINDOW_NAMES.in,
            "fullViewport"
          )
        }
        className="min-w-[8.5rem] rounded-full border border-white/50 bg-white/15 px-7 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition hover:bg-white/25 md:min-w-[10rem] md:px-9 md:py-3.5 md:text-base"
      >
        세대 VR
      </button>
      <button
        type="button"
        onClick={() =>
          openVrPopup(
            VR_MODELHOUSE_URLS.ex,
            VR_WINDOW_NAMES.ex,
            "fullViewport"
          )
        }
        className="min-w-[8.5rem] rounded-full border border-white/50 bg-white/15 px-7 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition hover:bg-white/25 md:min-w-[10rem] md:px-9 md:py-3.5 md:text-base"
      >
        외부 VR
      </button>
    </div>
  );
}
