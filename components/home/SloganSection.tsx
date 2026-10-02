import Image from "next/image";
import type { CSSProperties } from "react";
import { RevealGroup } from "@/components/ui/RevealGroup";

/** 하단 숲·지평선 실루엣 — 브랜드 그린 톤 */
function SloganBackdropSilhouette({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="slogan-silhouette-fade"
          x1="720"
          y1="40"
          x2="720"
          y2="280"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <path
        fill="url(#slogan-silhouette-fade)"
        d="M0 180c120-28 240-20 360 8s280 18 400-6 260-34 400-26 200 22 280 38v86H0v-110Z"
      />
      <g fill="currentColor" opacity="0.35">
        <path d="M80 195 95 142h-8l15-38 15 38h-8l15 53h-29Z" />
        <path d="M1180 188 1198 125h-10l18-48 18 48h-10l18 63h-32Z" />
        <path d="M1320 200 1332 158h-6l12-32 12 32h-6l12 42h-24Z" />
      </g>
      <g fill="currentColor" opacity="0.22">
        <path d="m200 205 22-58h-12l14-36 14 36h-12l22 58H200Z" />
        <path d="m520 198 18-48h-10l12-30 12 30h-10l18 48H520Z" />
        <path d="m900 202 26-62h-14l16-40 16 40h-14l26 62H900Z" />
        <path d="m1080 208 14-36h-7l9-24 9 24h-7l14 36h-28Z" />
      </g>
    </svg>
  );
}

/** md 이상에서는 콜라주 박스 안 절대 위치, 모바일에서는 좌우 엇갈림 세로 배치 */
const lifeCuts = [
  {
    src: "/main/slogan-traffic.jpg",
    alt: "숲 사이로 이어지는 고속도로",
    caption: "출퇴근은 더 편리하게,",
    position: "self-start md:absolute md:left-0 md:top-[9%] md:w-[42%]",
  },
  {
    src: "/main/slogan-education.jpg",
    alt: "가로수길 옆 학교로 걸어가는 아이들",
    caption: "학교와 교육환경은 더 안심되게,",
    position: "self-end md:absolute md:right-0 md:top-0 md:w-[42%]",
  },
  {
    src: "/main/slogan-life.jpg",
    alt: "쇼핑몰과 조경 광장이 있는 생활 거리",
    caption: "도심의 주요 생활권은 더 가깝게,",
    position: "self-start md:absolute md:left-[27%] md:top-[56%] md:w-[42%]",
  },
] as const;

function revealStyle(delay: number, y: string): CSSProperties {
  return { "--reveal-delay": `${delay}s`, "--reveal-y": y } as CSSProperties;
}

/** 은은한 그리드·잎사귀 느낌 패턴 (타일) */
function SloganGrainPattern({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <pattern
          id="slogan-grain"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="4" cy="8" r="0.9" fill="currentColor" opacity="0.06" />
          <circle cx="28" cy="22" r="0.7" fill="currentColor" opacity="0.05" />
          <circle cx="16" cy="38" r="0.8" fill="currentColor" opacity="0.04" />
          <path
            d="M40 6c2 4 4 8 2 12"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.05"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#slogan-grain)" />
    </svg>
  );
}

export function SloganSection() {
  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden px-6 pt-20 pb-28 md:min-h-dvh md:px-8 md:pt-24 md:pb-32 lg:px-10"
      aria-labelledby="slogan-heading"
    >
      {/* 베이스 그라데이션 — 크림·베이지 톤을 줄이고 연한 뉴트럴 그레이지 */}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#ecebe8] via-[#f4f3f1] to-[#ebeae7]"
        aria-hidden
      />
      {/* 가장자리 비네팅 */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,transparent_40%,rgba(26,51,41,0.06)_100%)]"
        aria-hidden
      />
      {/* 중앙 하이라이트 — 골드 대신 아주 옅은 뉴트럴(노란기 최소화) */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[min(100vw,52rem)] w-[min(100vw,52rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35 blur-[100px]"
        aria-hidden
      />
      {/* 미세 패턴 */}
      <SloganGrainPattern className="pointer-events-none absolute inset-0 text-[#1a3329]" />

      {/* 하단 실루엣 */}
      <SloganBackdropSilhouette className="pointer-events-none absolute -bottom-px left-1/2 min-w-[1200px] -translate-x-1/2 text-[#1a3329] md:min-w-full" />

      <RevealGroup
        threshold={0.15}
        className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-20 md:px-2 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-28 lg:px-4 xl:gap-36"
      >
        {/* 왼쪽: 교통·교육·생활 이미지 콜라주 */}
        <div className="flex flex-col gap-10 md:relative md:mx-auto md:block md:aspect-[10/9] md:w-full md:max-w-3xl">
          {lifeCuts.map((cut, i) => (
            <figure key={cut.src} className={`w-[82%] ${cut.position}`}>
              <div
                className="reveal-up relative aspect-[4/3] overflow-hidden rounded-sm shadow-[0_24px_48px_-24px_rgba(26,20,16,0.45)]"
                style={revealStyle(i * 0.35, "56px")}
              >
                <Image
                  src={cut.src}
                  alt={cut.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 40vw, 82vw"
                  className="object-cover"
                />
              </div>
              <figcaption
                className="reveal-up mt-3 break-keep font-serif text-[1.1rem] text-neutral-700 md:mt-4 md:text-[1.17rem]"
                style={revealStyle(i * 0.35 + 0.2, "16px")}
              >
                {cut.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* 오른쪽: 메인 카피 */}
        <div className="text-right font-serif text-[#3f141b]">
          <p
            className="reveal-up break-keep text-lg md:text-2xl"
            style={revealStyle(1.1, "20px")}
          >
            집이 갖춰야 할 모든 것을 넘어
          </p>
          <h2
            id="slogan-heading"
            className="reveal-up mt-3 break-keep text-[1.75rem] font-bold leading-[1.35] tracking-tight text-balance md:mt-4 md:text-4xl lg:text-[2.5rem]"
            style={revealStyle(1.3, "24px")}
          >
            삶이 원하는 모든 것을 담았습니다.
          </h2>
          <div
            className="reveal-up mt-8 space-y-5 break-keep text-[0.9375rem] leading-[1.9] text-neutral-600 md:mt-10 md:text-base"
            style={revealStyle(1.5, "16px")}
          >
            <p>
              집이 갖춰야 할 모든 것을 넘어
              <br />
              삶이 원하는 모든 것을 담았습니다.
            </p>
          </div>
        </div>
      </RevealGroup>
    </section>
  );
}
