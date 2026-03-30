"use client";

import Image from "next/image";
import { FadeInUp } from "@/components/ui/FadeInUp";

type RowConfig = {
  key: string;
  imageLeft: boolean;
  accent: string;
  /** 영문 위 작은 영문 라벨 */
  eyebrow: string;
  englishLines: readonly [string, string];
  mainImage: string;
  titleBefore: string;
  titleHighlight: string;
  description: string;
};

const rows: readonly RowConfig[] = [
  {
    key: "traffic",
    imageLeft: true,
    accent: "#b45309",
    eyebrow: "Premium Access",
    englishLines: ["FAST", "TRAFFIC"],
    mainImage: "/location/location.png",
    titleBefore: "편리한 접근성 및 ",
    titleHighlight: "쾌속교통망",
    description:
      "수도권 주요 고속도로·IC와 인접한 접근성으로 일상의 이동을 빠르고 편안하게 연결합니다.",
  },
  {
    key: "nature",
    imageLeft: false,
    accent: "#0f766e",
    eyebrow: "Green Living",
    englishLines: ["NATURE", "PREMIUM"],
    mainImage: "/premium/hap.jpg",
    titleBefore: "숲이 일상이 되는 ",
    titleHighlight: "자연 환경",
    description:
      "광교산의 확 트인 전망 아래 맑은 공기와 피톤치드 등을 마음껏 마실 수 있는 나만의 마당이 있는 단독주택입니다.",
  },
  {
    key: "central",
    imageLeft: true,
    accent: "#3d5a80",
    eyebrow: "Urban Core",
    englishLines: ["CENTRAL", "LOCATION"],
    mainImage: "/premium/land.png",
    titleBefore: "삶의 질을 높여주는 ",
    titleHighlight: "상권 중심",
    description:
      "우수한 명문학군, 초/중/고등학교 도보 통학! 서울대병원 연세대세브란스병원 등 우수 의료시설과 접근성이 용이해 도심 아파트의 삶을 그대로 옮겨놓은 편의시설을 누릴수 있습니다.",
  },
  {
    key: "private",
    imageLeft: false,
    accent: "#7c3d4a",
    eyebrow: "Luxury Living",
    englishLines: ["LUXURY", "PRIMIUM"],
    mainImage: "/vr/livingroom.png",
    titleBefore: "입주민만의 품격, ",
    titleHighlight: "프라이빗 라이프",
    description:
      "친환경 자재 사용과 고객을 최우선으로 생각하는 규슈방 가구의 40년 전통 원목가구 인테리어가 주택의 품격을 한층 높여드립니다.",
  },
];

function MainImagePane({
  src,
  alt,
  eager,
}: {
  src: string;
  alt: string;
  /** 히어로 직후 보이는 상단 행들은 즉시 로드 */
  eager?: boolean;
}) {
  return (
    <div className="relative min-h-[240px] w-full overflow-hidden md:min-h-[min(48vh,400px)] lg:min-h-[420px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={eager}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        quality={75}
      />
    </div>
  );
}

function KoreanCopy({ row }: { row: RowConfig }) {
  return (
    <>
      <h3 className="text-lg font-bold leading-snug text-neutral-900 md:text-xl">
        {row.titleBefore}
        <span style={{ color: row.accent }}>{row.titleHighlight}</span>
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600 md:text-[15px]">
        {row.description}
      </p>
    </>
  );
}

/** 큰 메인 이미지 옆 카피 — 작은 이미지 없음, 1~4행 동일 스타일 */
function EditorialContentBlock({ row }: { row: RowConfig }) {
  const english = (
    <p
      className="font-serif text-[clamp(1.75rem,5vw,3.25rem)] font-semibold leading-[0.95] tracking-tight md:text-[clamp(2rem,3.8vw,3.25rem)]"
      style={{ color: row.accent }}
    >
      <span className="block">{row.englishLines[0]}</span>
      <span className="mt-1 block md:mt-1.5">{row.englishLines[1]}</span>
    </p>
  );

  return (
    <div className="relative flex min-h-[280px] flex-col justify-center bg-gradient-to-br from-neutral-100/95 via-neutral-200/85 to-[#e5e0d8] px-5 py-8 md:min-h-[min(48vh,400px)] md:px-8 md:py-10 lg:min-h-[420px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(-12deg, ${row.accent} 0px, ${row.accent} 1px, transparent 1px, transparent 10px)`,
        }}
        aria-hidden
      />
      <div className="relative z-[1] flex flex-col gap-6 md:gap-7">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-500">
            {row.eyebrow}
          </p>
          <div className="mt-2">{english}</div>
          <div
            className="mt-4 h-px w-14"
            style={{ backgroundColor: row.accent }}
            aria-hidden
          />
        </div>

        <div
          className="rounded-xl border border-white/70 bg-white/55 px-4 py-5 shadow-sm backdrop-blur-sm md:px-5 md:py-6"
          style={{
            boxShadow: `inset 0 0 0 1px ${row.accent}22, 0 12px 32px -16px rgba(0,0,0,0.2)`,
          }}
        >
          <div
            className="mb-4 h-1 w-10 rounded-full"
            style={{ backgroundColor: row.accent }}
            aria-hidden
          />
          <KoreanCopy row={row} />
        </div>
      </div>
    </div>
  );
}

export function PremiumZigzagSection() {
  return (
    <section
      className="border-t border-[#1a3329]/10 bg-[#e8e6e1]/50 px-8 py-16 md:px-8 md:py-24"
      aria-labelledby="premium-zigzag-heading"
    >
      <h2 id="premium-zigzag-heading" className="sr-only">
        프리미엄 가치
      </h2>
      <div className="mx-auto max-w-6xl">
        {rows.map((row, index) => (
          <FadeInUp
            key={row.key}
            delay={0.04 * index}
            viewport={{ amount: 0.05, once: true, margin: "0px 0px -8% 0px" }}
          >
            <div className="break-keep grid grid-cols-1 overflow-hidden rounded-2xl border border-neutral-300/70 bg-neutral-100/40 md:grid-cols-2">
              {row.imageLeft ? (
                <>
                  <MainImagePane
                    src={row.mainImage}
                    alt={`${row.englishLines.join(" ")} 관련 이미지`}
                    eager={index < 2}
                  />
                  <EditorialContentBlock row={row} />
                </>
              ) : (
                <>
                  <EditorialContentBlock row={row} />
                  <MainImagePane
                    src={row.mainImage}
                    alt={`${row.englishLines.join(" ")} 관련 이미지`}
                    eager={index < 2}
                  />
                </>
              )}
            </div>
            {index < rows.length - 1 ? (
              <div className="h-6 md:h-8" aria-hidden />
            ) : null}
          </FadeInUp>
        ))}
      </div>
    </section>
  );
}
