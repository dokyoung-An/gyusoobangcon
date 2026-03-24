import { FadeInUp } from "@/components/ui/FadeInUp";
import { SloganShimmerText } from "@/components/home/SloganShimmerText";

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

/** 상단 얇은 장식 라인 + 골드 포인트 */
function SloganTopOrnament({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 12h160M240 12h160"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
      />
      <circle cx="200" cy="12" r="3.5" fill="currentColor" fillOpacity="0.85" />
      <circle cx="200" cy="12" r="7" stroke="currentColor" strokeOpacity="0.25" />
    </svg>
  );
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
      className="relative overflow-hidden px-8 py-16 md:px-8 md:py-24 lg:py-32"
      aria-labelledby="slogan-heading"
    >
      {/* 베이스 그라데이션 */}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#e5dfd4] via-[#f3efe6] to-[#ebe4d6]"
        aria-hidden
      />
      {/* 가장자리 비네팅 */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,transparent_40%,rgba(26,51,41,0.07)_100%)]"
        aria-hidden
      />
      {/* 중앙 골드 소프트 글로우 */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[min(100vw,52rem)] w-[min(100vw,52rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c6a667]/15 blur-[100px]"
        aria-hidden
      />
      {/* 미세 패턴 */}
      <SloganGrainPattern className="pointer-events-none absolute inset-0 text-[#1a3329]" />

      {/* 하단 실루엣 */}
      <SloganBackdropSilhouette className="pointer-events-none absolute -bottom-px left-1/2 min-w-[1200px] -translate-x-1/2 text-[#1a3329] md:min-w-full" />

      <div className="relative z-10 mx-auto max-w-4xl text-center mt-[-2rem] md:mt-[-4rem]">
        <FadeInUp>
          <div className="mx-auto mb-8 flex flex-col items-center gap-5 md:mb-10">
            <SloganTopOrnament className="h-6 w-[min(100%,20rem)] text-[#c6a667]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#1a3329]/55 md:text-[11px]">
              Urban Forest Residence
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.08}>
          <h2
            id="slogan-heading"
            className="break-keep font-serif text-[1.65rem] font-medium leading-[1.45] tracking-tight text-balance sm:text-3xl md:text-4xl md:leading-[1.4] lg:text-[2.65rem] lg:leading-[1.38]"
          >
            <SloganShimmerText />
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.2} className="mt-8 md:mt-6">
          <div className="mx-auto max-w-2xl  px-4 py-8 backdrop-blur-[2px] md:px-10 md:py-4">
            <p className="text-sm leading-[1.85] text-neutral-600 md:text-base break-keep">
              프라이빗 가든과 세련된 볼륨감, 그리고 여유로운 동선.
              <br className="hidden md:block" />
              하이엔드 라이프스타일을 완성하는 타운하우스의 철학을 담았습니다.
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.28} className="mt-8 md:mt-10">
          <div
            className="mx-auto h-px w-24 bg-linear-to-r from-transparent via-[#c6a667]/80 to-transparent md:w-32"
            aria-hidden
          />
        </FadeInUp>
      </div>
    </section>
  );
}
