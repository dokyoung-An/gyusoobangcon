"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const HERO_VIDEO_SRC = "/0324.mp4";
/** 비디오 첫 프레임 전까지 보여 줄 정적 이미지 (영상과 톤이 맞는 파일로 교체 가능) */
const HERO_POSTER_SRC = "/main/hero1.webp";

export function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const readyRef = useRef(false);

  const markVideoReady = useCallback(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    setVideoReady(true);
  }, []);

  /** 데스크톱에서도 모바일처럼 영상 요청을 일찍 시작 */
  useEffect(() => {
    const id = "hero-0324-preload";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "preload";
    link.as = "video";
    link.href = HERO_VIDEO_SRC;
    link.type = "video/mp4";
    document.head.appendChild(link);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (el && el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      queueMicrotask(() => markVideoReady());
    }
  }, [markVideoReady]);

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end">
      <Image
        src="/premium/hap.webp"
        alt=""
        fill
        priority
        fetchPriority="high"
        className="object-cover"
        sizes="100vw"
        quality={75}
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-8 pb-28 pt-32 text-center md:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#c6a667] [text-shadow:0_2px_14px_rgb(0_0_0_/_0.3),0_1px_5px_rgb(0_0_0_/_0.3)] md:text-sm">
          Urban Forest Residence
        </p>
        <h1 className="mt-6 font-serif text-3xl font-semibold leading-snug tracking-tight text-white [text-shadow:0_2px_24px_rgb(0_0_0_/_0.3),0_1px_8px_rgb(0_0_0_/_0.3)] md:[text-shadow:0_3px_32px_rgb(0_0_0_/_0.3),0_2px_12px_rgb(0_0_0_/_0.3)] md:text-5xl lg:text-6xl">
          세월이 지나도 변하지 않는
          <br className="hidden sm:block" /> 고품격 하이엔드 주거공간의 새로운 기준
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base break-keep text-white/85 [text-shadow:0_2px_16px_rgb(0_0_0_/_0.3),0_1px_6px_rgb(0_0_0_/_0.3)] md:text-lg">
          동천동 최고의 전세대 남향 조망권 확보, 도심 속 대단지 전원주택 단독형
          타운하우스
          <br />
          수지드림 더 힐 타운하우스가 제시합니다
        </p>
      </div>

      <div className="relative z-10 flex justify-center pb-10">
        <span className="flex flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">
          Scroll
          <span>
            <ChevronDown className="size-5 text-[#c6a667]" strokeWidth={1.5} />
          </span>
        </span>
      </div>
    </section>
  );
}
