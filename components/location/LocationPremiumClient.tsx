"use client";

import Image from "next/image";
import {
  GraduationCap,
  Lock,
  MapPin,
  Trees,
  TrainFront,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { PremiumZigzagSection } from "@/components/location/PremiumZigzagSection";
import {
  LocationConfigurableZigzagSection,
  type LocationZigzagRow,
} from "@/components/location/LocationConfigurableZigzagSection";

const advantages = [
  {
    key: "nature",
    title: "자연환경",
    description:
      "녹지와 수변, 산책로가 어우러진 쾌적한 주거 환경. 도심 속에서도 자연의 리듬을 일상으로 누릴 수 있습니다.",
    icon: Trees,
  },
  {
    key: "traffic",
    title: "탁월한 교통 환경",
    description:
      "고속도로·광역 도로망과 인접한 접근성, 인근 지하철·버스 노선으로 업무·생활 동선을 효율적으로 연결합니다.",
    icon: TrainFront,
  },
  {
    key: "school",
    title: "우수한 학군",
    description:
      "인근 초·중·고 및 교육 시설과의 거리를 고려한 입지로, 자녀 교육과 가족의 미래 가치를 함께 설계했습니다.",
    icon: GraduationCap,
  },
  {
    key: "private",
    title: "프라이빗 혜택",
    description:
      "단지 설계와 커뮤니티 구성으로 입주민만의 여유와 품격을 강화했습니다. 프라이빗한 일상을 완성합니다.",
    icon: Lock,
  },
] as const;

/** 지도 옆 교통 소요 시간 (차량 등 이동 수단 기준 안내) */
const transitAccess = [
  { key: "dongcheon", label: "동천역", time: "5분" },
  { key: "pangyo", label: "판교역", time: "10분" },
  { key: "bundang", label: "분당", time: "10분" },
  { key: "gangnam", label: "강남", time: "10분" },
] as const;

export function PremiumSubpageHeader({
  eyebrow = "Premium",
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="border-b border-[#1a3329]/10 bg-[#f3efe6] px-8 pb-8 pt-28 md:px-8 md:pb-10 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <FadeInUp>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1a3329]/70">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-[#1a3329] md:text-4xl">
            {title}
          </h1>
        </FadeInUp>
      </div>
    </div>
  );
}

/** 입지·프리미엄 상단 공용 풀블리드 히어로 */
function LocationBillboardHero() {
  const { projectName } = siteConfig;

  return (
    <section className="relative min-h-[72vh] overflow-hidden md:min-h-[78vh]">
      <Image
        src="/main/hero1.webp"
        alt=""
        fill
        priority
        fetchPriority="high"
        className="object-cover"
        sizes="100vw"
        quality={75}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-[72vh] flex-col items-center justify-center px-6 py-24 text-center md:min-h-[78vh] md:py-32">
        <FadeInUp className="max-w-3xl">
          <p className="text-sm font-light tracking-wide text-white/90 md:text-base">
            입지, 교육, 교통, 편의시설까지.
          </p>
          <p className="mt-2 text-sm font-light text-white/80 md:text-base">
            생활 인프라와 미래 가치에 기대를 품다.
          </p>
          <h2 className="mt-8 font-serif text-2xl font-semibold leading-snug text-white md:text-4xl lg:text-[2.35rem]">
            더 완벽한 프리미엄 라이프의 시작,
            <br className="hidden sm:block" />
            중심에서 누리는 또 다른 여유
          </h2>
          <div className="mx-auto my-8 h-12 w-px bg-[#c6a667]/90" aria-hidden />
          <p className="font-serif text-xl font-semibold tracking-[0.35em] text-white md:text-2xl">
            {projectName}
          </p>
        </FadeInUp>
      </div>
      <div className="relative z-10 border-t border-white/10 bg-[#1a3329]/95 px-8 py-4 text-center text-sm text-white/95 md:text-base">
        <p>
          나의 삶이 프리미엄이 되는 순간,{" "}
          <span className="font-medium text-[#c6a667]">{projectName}</span>
          에서 시작됩니다.
        </p>
      </div>
    </section>
  );
}

/** /location — 입지 환경 본문 */
export function EnvironmentSection() {
  const { projectName } = siteConfig;

  return (
    <>
      <LocationBillboardHero />

      <section className="px-8 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <FadeInUp>
            <div className="text-center">
              <h3 className="font-serif text-xl font-semibold text-[#1a3329] md:text-2xl">
                광역 입지, 한눈에 보는 위치
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
                동천동 일대와 주요 도로·생활권의 관계를 지도로 확인하실 수
                있습니다.
              </p>
            </div>
          </FadeInUp>
          {/* 지도는 FadeInUp 밖에 두어 로드·표시 지연(불투명 애니메이션) 방지 */}
          <div className="mt-10">
            <div className="overflow-hidden rounded-2xl border border-[#1a3329]/10 bg-white p-4 shadow-xl shadow-black/10 md:p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-5 lg:gap-8">
                <aside
                  className="grid shrink-0 grid-cols-2 justify-items-center gap-3 sm:max-w-md sm:mx-auto sm:grid-cols-4 md:mx-0 md:w-[7.5rem] md:grid-cols-1 md:justify-items-stretch md:gap-3.5 lg:w-[8.75rem]"
                  aria-label="주요 거점까지 소요 시간 안내"
                >
                  {transitAccess.map((item) => (
                    <div
                      key={item.key}
                      className="flex aspect-square w-full max-w-[7.25rem] flex-col items-center justify-center rounded-full border-4 #1a3329 bg-white px-2 py-3 text-center shadow-md md:max-w-none"
                    >
                      <TrainFront
                        className="mb-1.5 size-7 shrink-0 text-[#1a3329] md:size-8"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span className="text-[11px] font-semibold leading-tight text-[#1a3329] md:text-xs">
                        {item.label}
                      </span>
                      <span className="mt-1 font-serif text-lg font-semibold tabular-nums text-[#c6a667] md:text-xl">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </aside>
                <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-xl bg-neutral-100 sm:min-h-[280px] md:min-h-[min(52vw,420px)] lg:min-h-[380px]">
                  <Image
                    src="/location/location.jpeg"
                    alt={`${projectName} 입지 안내 지도`}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 900px"
                    priority
                    fetchPriority="high"
                    quality={75}
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-[#1a3329] md:justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#1a3329]/5 px-4 py-2">
                  <MapPin className="size-4 text-[#c6a667]" aria-hidden />
                  경기도 수지구 동천동 438-8 번지
                </span>
                <span className="text-neutral-500">
                  상세 노선·시설은 상담 시 안내드립니다.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#1a3329]/10 bg-white px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <FadeInUp className="text-center">
            <h3 className="font-serif text-xl font-semibold text-[#1a3329] md:text-2xl">
              입지의 4가지 가치
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600">
              자연·교통·학군·프라이빗을 균형 있게 갖춘 주거 환경을 제안합니다.
            </p>
          </FadeInUp>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 break-keep">
            {advantages.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeInUp key={item.key} delay={0.08 * i}>
                  <div className="flex gap-4 rounded-2xl border border-[#1a3329]/10 bg-[#f3efe6]/40 p-6 shadow-sm transition hover:border-[#1a3329]/20 hover:shadow-md md:gap-5 md:p-8">
                    <div className="flex size-[4.75rem] shrink-0 items-center justify-center rounded-xl border-4 border-[#c6a667] bg-white shadow-md md:size-[5.25rem]">
                      <Icon
                        className="size-7 shrink-0 text-[#1a3329] md:size-8"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-[#1a3329] md:text-xl">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeInUp>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

/** /location/premium — 프리미엄 본문 (입지와 동일 히어로 + 지그재그) */
export function PremiumSection() {
  return (
    <>
      <LocationBillboardHero />
      <PremiumZigzagSection />
    </>
  );
}

const danjiLayoutRows: readonly LocationZigzagRow[] = [
  {
    key: "danji-layout",
    imageLeft: true,
    accent: "#c6a667",
    eyebrow: "Danji Layout",
    englishLines: ["SITE", "PLAN"],
    mainImage: "/location/location.jpeg",
    titleBefore: "단지의 흐름을 담은 ",
    titleHighlight: "배치 계획",
    description:
      "단지 출입 동선과 주요 커뮤니티, 프라이빗 영역을 체계적으로 구성한 배치 계획을 소개합니다.",
  },
];

const donghoLayoutRows: readonly LocationZigzagRow[] = [
  {
    key: "dongho-layout",
    imageLeft: true,
    accent: "#3d5a80",
    mainImage: "/batch/batch.webp",
    imageContain: true,
  },
];

const systemRows: readonly LocationZigzagRow[] = [
  {
    key: "system",
    imageLeft: true,
    accent: "#0f766e",
    eyebrow: "System",
    englishLines: ["DESIGN", "SYSTEM"],
    mainImage: "/premium/traffic.png",
    titleBefore: "일상을 지키는 ",
    titleHighlight: "시스템",
    description:
      "생활 편의와 동선 효율을 높이는 설계 시스템을 중심으로 안내드립니다. 이미지와 문구는 추후 교체 가능합니다.",
  },
];

export function DanjiLayoutSection() {
  return (
    <>
      <LocationBillboardHero />
      <LocationConfigurableZigzagSection rows={danjiLayoutRows} />
    </>
  );
}

export function DonghoLayoutSection() {
  return (
    <>
      <LocationBillboardHero />
      <LocationConfigurableZigzagSection rows={donghoLayoutRows} />
    </>
  );
}

export function LocationSystemSection() {
  return (
    <>
      <LocationBillboardHero />
      <LocationConfigurableZigzagSection rows={systemRows} />
    </>
  );
}
