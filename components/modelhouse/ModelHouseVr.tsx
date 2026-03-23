"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { projectDisplayName } from "@/lib/site";
import {
  openVrPopup,
  VR_MODELHOUSE_URLS,
  VR_WINDOW_NAMES,
  type VrModelhouseKey,
} from "@/lib/vr-modelhouse";

const items: {
  key: VrModelhouseKey;
  label: string;
  description: string;
  thumbnail: string;
}[] = [
  {
    key: "in",
    label: "세대 VR",
    description: "세대 내부 공간을 360°로 둘러봅니다.",
    thumbnail: "/vr/livingroom.png",
  },
  {
    key: "ex",
    label: "외부 VR",
    description: "단지 외부·조경을 360°로 둘러봅니다.",
    thumbnail: "/vr/extrerior.png",
  },
];

export function ModelHouseVr() {
  const [selected, setSelected] = useState<VrModelhouseKey>("in");
  const current = useMemo(
    () => items.find((item) => item.key === selected) ?? items[0],
    [selected]
  );

  return (
    <div className="mt-8 space-y-6">
      <p className="text-sm text-neutral-600 md:text-base">
        {projectDisplayName} 사이버 모델하우스 VR 투어입니다.
      </p>

      <div className="flex flex-wrap gap-3">
        {items.map(({ key, label }) => {
          const active = key === selected;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition-all md:px-8 md:py-3 md:text-base ${
                active
                  ? "border-[#1a3329] bg-[#1a3329] text-white shadow-md"
                  : "border-[#1a3329]/25 bg-white/80 text-[#1a3329] hover:border-[#1a3329]/50 hover:bg-white"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() =>
          openVrPopup(
            VR_MODELHOUSE_URLS[current.key],
            VR_WINDOW_NAMES[current.key],
            "default"
          )
        }
        className="group flex w-full flex-col items-start rounded-2xl border border-[#1a3329]/15 bg-white/90 p-6 text-left shadow-sm transition-all hover:border-[#1a3329]/35 hover:shadow-md active:scale-[0.99]"
      >
        <span className="flex w-full items-center justify-between gap-3">
          <span className="font-serif text-lg font-semibold text-[#1a3329] md:text-xl">
            {current.label}
          </span>
          <ExternalLink
            className="size-5 shrink-0 text-[#1a3329]/50 transition-colors group-hover:text-[#c6a667]"
            strokeWidth={1.75}
            aria-hidden
          />
        </span>
        <span className="mt-2 text-sm leading-relaxed text-neutral-600">
          {current.description}
        </span>
        <span className="relative mt-4 block aspect-16/10 w-full overflow-hidden rounded-xl border border-[#1a3329]/10">
          <Image
            src={current.thumbnail}
            alt={`${current.label} 썸네일`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="100vw"
            priority={selected === "in"}
            loading={selected === "in" ? "eager" : "lazy"}
            fetchPriority={selected === "in" ? "high" : "auto"}
            unoptimized={selected === "in"}
          />
          <span className="absolute inset-0 bg-black/25" aria-hidden />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/90 px-5 py-2.5 text-sm font-semibold text-[#1a3329] shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 md:px-6 md:py-3 md:text-base">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-5 animate-[handTap_1.2s_ease-in-out_infinite]"
                aria-hidden
              >
                <path
                  d="M12 3.5v8m0 0 2-2m-2 2-2-2M7.8 11.5l.8 6.2a2.6 2.6 0 0 0 2.6 2.3h3.6a2.6 2.6 0 0 0 2.6-2.3l.8-4.8a2 2 0 0 0-3.8-1l-.2.6-.3-6a1.6 1.6 0 0 0-3.2 0v4.7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              클릭해 체험하기
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}
