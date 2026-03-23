"use client";

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
    mainImage: "/main/hero1.jpg",
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
    mainImage: "/main/hero3.jpg",
    titleBefore: "숲이 일상이 되는 ",
    titleHighlight: "자연 환경",
    description:
      "녹지·공원·수변과 맞닿은 쾌적한 주거 환경으로, 도심 속 그린 라이프를 완성합니다.",
  },
  {
    key: "central",
    imageLeft: true,
    accent: "#3d5a80",
    eyebrow: "Urban Core",
    englishLines: ["CENTRAL", "LOCATION"],
    mainImage: "/main/hero5.jpg",
    titleBefore: "삶의 질을 높여주는 ",
    titleHighlight: "상권 중심",
    description:
      "백화점·마트·문화시설 등 생활 편의가 한데 모인 입지로 프리미엄 라이프스타일을 지원합니다.",
  },
  {
    key: "private",
    imageLeft: false,
    accent: "#7c3d4a",
    eyebrow: "Exclusive Life",
    englishLines: ["PRIVATE", "PREMIUM"],
    mainImage: "/main/hero4.jpg",
    titleBefore: "입주민만의 품격, ",
    titleHighlight: "프라이빗 라이프",
    description:
      "단지 설계와 커뮤니티로 프라이빗한 일상을 강화한 하이엔드 타운하우스의 가치를 담았습니다.",
  },
];

function MainImagePane({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative min-h-[240px] w-full overflow-hidden md:min-h-[min(48vh,400px)] lg:min-h-[420px]">
      {/* eslint-disable-next-line @next/next/no-img-element -- /_next/image 최적화 미사용(직접 로드) */}
      <img
        src={src}
        alt={alt}
        width={1600}
        height={1200}
        className="h-full w-full min-h-[240px] object-cover md:min-h-[min(48vh,400px)] lg:min-h-[420px]"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
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
      className="border-t border-[#1a3329]/10 bg-[#e8e6e1]/50 pb-20 pt-0"
      aria-labelledby="premium-zigzag-heading"
    >
      <h2 id="premium-zigzag-heading" className="sr-only">
        프리미엄 가치
      </h2>
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {rows.map((row, index) => (
          <FadeInUp
            key={row.key}
            delay={0.05 * index}
            viewport={{ amount: 0.15, once: true }}
          >
            <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-neutral-300/70 bg-neutral-100/40 md:grid-cols-2">
              {row.imageLeft ? (
                <>
                  <MainImagePane
                    src={row.mainImage}
                    alt={`${row.englishLines.join(" ")} 관련 이미지`}
                    priority={index === 0}
                  />
                  <EditorialContentBlock row={row} />
                </>
              ) : (
                <>
                  <EditorialContentBlock row={row} />
                  <MainImagePane
                    src={row.mainImage}
                    alt={`${row.englishLines.join(" ")} 관련 이미지`}
                    priority={false}
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
