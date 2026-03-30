"use client";

import Image from "next/image";
import { FadeInUp } from "@/components/ui/FadeInUp";

export type LocationZigzagRow = {
  key: string;
  imageLeft: boolean;
  accent: string;

  eyebrow?: string;
  englishLines?: readonly [string, string];

  mainImage?: string;
  imageContain?: boolean;
  /** 이미지 비율 유지용(세로 높이 자동 계산). */
  imageW?: number;
  imageH?: number;
  titleBefore?: string;
  titleHighlight?: string;
  description?: string;
};

function MainImagePane({
  src,
  alt,
  eager,
  imageContain = false,
  imageW,
  imageH,
}: {
  src: string;
  alt: string;
  eager?: boolean;
  imageContain?: boolean;
  imageW?: number;
  imageH?: number;
}) {
  const w = imageW ?? 1200;
  const h = imageH ?? 800;

  return (
    <div
      className="relative w-full overflow-hidden"
    >
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        className={imageContain ? "h-auto w-full object-contain" : "h-auto w-full object-cover"}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={eager}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        quality={75}
      />
    </div>
  );
}

function KoreanCopy({
  row,
}: {
  row: LocationZigzagRow & {
    titleBefore?: string;
    titleHighlight?: string;
    description?: string;
  };
}) {
  const titleBefore = row.titleBefore ?? "";
  const titleHighlight = row.titleHighlight ?? "";
  const description = row.description ?? "";

  const hasTitle = Boolean(titleBefore || titleHighlight);
  const hasDescription = Boolean(description);

  if (!hasTitle && !hasDescription) return null;

  return (
    <>
      {hasTitle ? (
        <h3 className="text-lg font-bold leading-snug text-neutral-900 md:text-xl">
          {titleBefore}
          {titleHighlight ? (
            <span style={{ color: row.accent }}>{titleHighlight}</span>
          ) : null}
        </h3>
      ) : null}
      {hasDescription ? (
        <p className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-base">
          {description}
        </p>
      ) : null}
    </>
  );
}

function EditorialContentBlock({ row }: { row: LocationZigzagRow }) {
  const hasEyebrow = Boolean(row.eyebrow);
  const hasEnglish = Boolean(row.englishLines?.[0] && row.englishLines?.[1]);
  const hasCopy = Boolean(row.titleBefore || row.titleHighlight || row.description);

  if (!hasEyebrow && !hasEnglish && !hasCopy) return null;

  const english = row.englishLines ? (
    <p
      className="font-serif text-[clamp(1.75rem,5vw,3.25rem)] font-semibold leading-[0.95] tracking-tight md:text-[clamp(2rem,3.8vw,3.25rem)]"
      style={{ color: row.accent }}
    >
      <span className="block">{row.englishLines[0]}</span>
      <span className="mt-1 block md:mt-1.5">{row.englishLines[1]}</span>
    </p>
  ) : null;

  return (
    <div
      className="relative flex min-h-[280px] flex-col justify-center bg-gradient-to-br from-neutral-100/95 via-neutral-200/85 to-[#e5e0d8] px-5 py-8 md:min-h-[min(48vh,400px)] md:px-8 md:py-10 lg:min-h-[420px]"
      aria-label="내용 블록"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(-12deg, ${row.accent} 0px, ${row.accent} 1px, transparent 1px, transparent 10px)`,
        }}
        aria-hidden
      />

      <div className="relative z-[1] flex flex-col gap-6 md:gap-7">
        <div>
          {hasEyebrow ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-500">
              {row.eyebrow}
            </p>
          ) : null}
          {english ? <div className="mt-2">{english}</div> : null}

          <div
            className="mt-4 h-px w-14"
            style={{ backgroundColor: row.accent }}
            aria-hidden
          />
        </div>

        {hasCopy ? (
          <div
            className="rounded-xl border border-white/70 bg-white/55 px-4 py-5 shadow-sm backdrop-blur-sm md:px-5 md:py-6"
            style={{
              boxShadow: `inset 0 0 0 1px ${row.accent}22, 0 12px 32px -16px rgba(0,0,0,0.2)`,
            }}
          >
            <div className="mb-4 h-1 w-10 rounded-full" style={{ backgroundColor: row.accent }} aria-hidden />
            <KoreanCopy row={row} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function LocationConfigurableZigzagSection({
  rows,
}: {
  rows: readonly LocationZigzagRow[];
}) {
  return (
    <section
      className="border-t border-[#1a3329]/10 bg-[#e8e6e1]/50  py-16  md:py-24"
      aria-label="단지 소개 콘텐츠"
    >
      <div className="mx-auto max-w-6xl w-full">
        {rows.map((row, index) => {
          const hasImage = Boolean(row.mainImage);
          const hasCopy =
            Boolean(row.eyebrow) ||
            Boolean(row.englishLines?.[0] && row.englishLines?.[1]) ||
            Boolean(row.titleBefore || row.titleHighlight || row.description);

          return (
            <FadeInUp
              key={row.key}
              delay={0.04 * index}
              viewport={{ amount: 0.05, once: true, margin: "0px 0px -8% 0px" }}
            >
              <div
                className={[
                  "break-keep overflow-hidden rounded-2xl bg-neutral-100/40",
                  row.imageContain && !hasCopy ? "border-0 bg-transparent" : "border border-neutral-300/70",
                  hasImage && hasCopy
                    ? "grid grid-cols-1 md:grid-cols-2"
                    : "grid grid-cols-1 md:grid-cols-1",
                ].join(" ")}
              >
                {hasImage && hasCopy ? (
                  row.imageLeft ? (
                    <>
                      <MainImagePane
                        src={row.mainImage!}
                        alt={`${row.englishLines?.join(" ") ?? "단지 소개"} 관련 이미지`}
                        eager={index < 2}
                        imageContain={row.imageContain}
                      />
                      <EditorialContentBlock row={row} />
                    </>
                  ) : (
                    <>
                      <EditorialContentBlock row={row} />
                      <MainImagePane
                        src={row.mainImage!}
                        alt={`${row.englishLines?.join(" ") ?? "단지 소개"} 관련 이미지`}
                        eager={index < 2}
                        imageContain={row.imageContain}
                      />
                    </>
                  )
                ) : hasImage ? (
                  <MainImagePane
                    src={row.mainImage!}
                    alt={`${row.englishLines?.join(" ") ?? "단지 소개"} 관련 이미지`}
                    eager={index < 2}
                    imageContain={row.imageContain}
                  />
                ) : (
                  <EditorialContentBlock row={row} />
                )}
              </div>

              {index < rows.length - 1 ? (
                <div className="h-6 md:h-8" aria-hidden />
              ) : null}
            </FadeInUp>
          );
        })}
      </div>
    </section>
  );
}

