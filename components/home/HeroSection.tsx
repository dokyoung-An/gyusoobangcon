import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { ArrowRight, ChevronDown, NotebookPen } from "lucide-react";
import { OpeningBadge } from "./OpeningBadge";

const heroTitleFont = localFont({
  src: "../../app/fonts/WavvePADO-Regular.woff2",
  weight: "400",
  display: "swap",
});

const textShadow =
  "[text-shadow:0_2px_18px_rgb(0_0_0_/_0.45),0_1px_6px_rgb(0_0_0_/_0.35)]";

const heroPoints = [
  { en: "Fast Traffic", ko: "도심을 빠르게" },
  { en: "Nature Premium", ko: "자연을 일상으로" },
  { en: "Central Location", ko: "생활의 중심을 가까이" },
  { en: "Luxury Living", ko: "삶의 품격을 완성" },
] as const;

/** GNB와 같은 가로 틀 — 배지·버튼 오른쪽 끝을 GNB 전화번호 끝과 맞춤 */
const gnbFrame = "mx-auto flex max-w-[1440px] md:px-8 lg:px-10";

export function HeroSection() {
  return (
    <section className="relative min-h-dvh overflow-hidden md:h-dvh md:min-h-[560px]">
      <Image
        src="/main/hero-img.jpg"
        alt="석양 아래 도심과 숲에 둘러싸인 수지 드림 더 힐 2차 단지 전경"
        fill
        preload
        fetchPriority="high"
        className="object-cover object-center"
        sizes="100vw"
        quality={75}
      />
      {/* 투명 GNB 뒤(상단)는 어둡게 하지 않아 로고·메뉴 글씨가 읽히도록 위쪽을 흐림 */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/0 [mask-image:linear-gradient(to_bottom,transparent_0,black_240px)]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col justify-start px-6 pb-48 pt-36 md:h-full md:justify-center md:px-10 md:pb-32 md:pt-32 lg:px-16">
        <div className={`break-keep text-left ${textShadow}`}>
          <div className="inline-block max-w-full rounded-md bg-[#3f141b]/90 px-5 py-6 md:px-10 md:py-9">
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.35em] text-white/85 md:text-xs">
              Urban Forest Residence
            </p>
            <h1
              className={`${heroTitleFont.className} mt-4 text-[1.875rem] leading-[1.2] tracking-tight text-white md:mt-5 md:text-5xl lg:text-[3.5rem]`}
            >
              <span className="text-[0.8em]">집을 사는 시대에서-</span>
              <br />
              삶을 사는 시대로.
            </h1>
            <Image
              src="/main/hero-wordmark-white.png"
              alt="하이엔드를 넘어 삶의 완성을 담은 LIFE-END 하우스, SUJI DREAM THE HILL Ⅱ 수지 드림 더 힐 2차"
              width={1314}
              height={277}
              preload
              sizes="(min-width: 768px) 20rem, 13rem"
              className="mx-auto mt-6 block h-auto w-[13rem] md:mt-8 md:w-[20rem]"
            />
          </div>

          <ul className="mt-10 grid max-w-3xl grid-cols-2 gap-x-4 gap-y-5 md:mt-12 md:flex md:gap-8">
            {heroPoints.map((point) => (
              <li key={point.en} className="border-l border-white/50 pl-3 md:pl-4">
                <p className="text-[0.5625rem] font-medium uppercase tracking-[0.12em] text-white/75 md:text-[0.625rem]">
                  {point.en}
                </p>
                <p className="mt-1 text-[0.8125rem] font-semibold text-white md:text-[0.9375rem]">
                  {point.ko}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-20 z-10 md:bottom-[11.5rem] md:top-auto">
        <div className={`${gnbFrame} justify-end px-3`}>
          <OpeningBadge className="pointer-events-auto w-[76px] md:w-40 lg:w-44" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-24 z-10 md:bottom-14">
        <div className={`${gnbFrame} justify-start px-6 md:justify-end`}>
          <Link
            href="/contact"
            className="pointer-events-auto inline-flex items-center gap-3 rounded-full bg-[#efe4d2] py-3 pl-5 pr-5 text-[#3f141b] shadow-[0_10px_30px_rgb(0_0_0_/_0.3)] transition-colors hover:bg-white md:gap-4 md:py-4 md:pl-7 md:pr-6"
          >
            <NotebookPen className="size-5 md:size-6" strokeWidth={1.75} aria-hidden />
            <span className="text-[0.9375rem] font-bold md:text-lg">관심고객 등록</span>
            <ArrowRight className="size-4 md:size-5" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center md:bottom-8">
        <span className="flex flex-col items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">
          Scroll
          <ChevronDown className="size-5 text-[#e3c79a]" strokeWidth={1.5} aria-hidden />
        </span>
      </div>
    </section>
  );
}
