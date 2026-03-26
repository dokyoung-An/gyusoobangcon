"use client";

import Image from "next/image";
import { useState } from "react";
import { FadeInUp } from "@/components/ui/FadeInUp";

type CompanyRow = {
  key: string;
  category: "apartment" | "country-house";
  imageLeft: boolean;
  accent: string;
  eyebrow: string;
  englishLines: readonly [string, string];
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  detailsTable?: readonly { label: string; value: string | readonly string[] }[];
};

const companyRows: readonly CompanyRow[] = [
  {
    key: "apartment-heavenrest",
    category: "apartment",
    imageLeft: true,
    accent: "#3d5a80",
    eyebrow: "Apartment Development",
    englishLines: ["APARTMENT", "HEAVENREST"],
    title: "자연으로 빚어진 레저 아파트\n 규수방 헤븐레스트",
    description:
      "헤븐레스트 아파트는 Heaven+Rest 천국과 휴양, 휴식, 안정, 안심, 평온, 안식처의 합성어로 서비스드 레지던스 아파트먼트의 브랜드명입니다.",
    imageSrc: "/about/heaven.png",
    imageAlt: "규수방 헤븐레스트 사업 사례 이미지",
    detailsTable: [
      { label: "사업명", value: "서비스드 레지던스 아파트 규수방 헤븐레스트" },
      { label: "위치", value: "강원도 동해시 이로동" },
      {
        label: "규모",
        value: [
          "5층, 3개동 규모",
          "64.53㎡(20형) C-타입 50세대",
          "64.53㎡(20형) E-타입 2세대",
          "68.84㎡(21형) B-타입 30세대",
          "68.84㎡(21형) F-타입 28세대",
          "77.19㎡(24형) A-타입 20세대",
          "77.19㎡(24형) D-타입 5세대",
          "총 135세대",
          "상가 1층(62형), 2층(62형)",
        ],
      },
      { label: "준공여부", value: "준공완료" },
    ],
  },
  // {
  //   key: "apartment-dangjin",
  //   category: "apartment",
  //   imageLeft: false,
  //   accent: "#b45309",
  //   eyebrow: "Apartment Construction",
  //   englishLines: ["DANGJIN", "NEW BUILD"],
  //   title: "당진시 신축공사",
  //   description:
  //     "당진시 신축공사 프로젝트를 통해 기획·시공·품질관리의 실행력을 입증하며, 지역 특성을 반영한 주거 개발 예정 중에 있습니다.",
  //   imageSrc: "/about/dang.png",
  //   imageAlt: "당진시 신축공사 사업 사례 이미지",
  //   detailsTable: [
  //     { label: "사업명", value: "당진시 읍내동 공동주택 신축공사" },
  //     { label: "위치", value: "충남 당진시 읍내동" },
  //     { label: "지역지구", value: "2종일반주거지역" },
  //     { label: "구조", value: "철근 콘크리트" },
  //     { label: "규모", value: "지하 1층~지상 28층 884세대, 근린생활시설" },
  //     { label: "대지면적", value: "39,669.60㎡" },
  //     { label: "건축면적", value: "8,500.00㎡" },
  //     { label: "건폐율", value: "21.43% (법정 60%)" },
  //     { label: "연면적", value: "지상층 - 98,008.60㎡ / 지하층 - 31,640.00㎡" },
  //     { label: "용적률", value: "249.68%" },
  //   ],
  // },
  {
    key: "country-dreamhill",
    category: "country-house",
    imageLeft: true,
    accent: "#0f766e",
    eyebrow: "Country House Development",
    englishLines: ["DREAMHILL", "TOWNHOUSE"],
    title: "드림힐 타운하우스",
    description:
      "규수방종합건설은 좋은 터에 살기 좋은 집을 짓는 것을 최고의 목표로 삼고 있습니다. 자회사 규수방가구의 노하우와 최신 트렌드를 접목한 고품격 프리미엄 전원주택을 만들겠습니다.",
    imageSrc: "/about/dream.png",
    imageAlt: "드림힐 타운하우스 사업 사례 이미지",
  },
  {
    key: "country-cheongmyeong",
    category: "country-house",
    imageLeft: false,
    accent: "#7c3d4a",
    eyebrow: "Village Development",
    englishLines: ["CHEONGMYEONG", "VILLAGE"],
    title: "청명산 빌리지",
    description:
      "지형과 경관의 장점을 살린 전원형 주거 단지 개발 사례로, 설계·시공·분양의 연결성을 높여 안정적인 사업 운영을 수행했습니다.",
    imageSrc: "/about/chung.png",
    imageAlt: "청명산 빌리지 사업 사례 이미지",
  },
] as const;

function CompanyZigzagRow({ row }: { row: CompanyRow }) {
  const imagePane = (
    <div className="relative min-h-[200px] w-full overflow-hidden md:min-h-[min(38vh,300px)] lg:min-h-[340px]">
      <Image
        src={row.imageSrc}
        alt={row.imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={76}
      />
    </div>
  );

  const textPane = (
    <div className="relative flex min-h-[200px] flex-col justify-center bg-gradient-to-br from-neutral-100/95 via-neutral-200/85 to-[#e5e0d8] px-5 py-8 md:min-h-[min(38vh,300px)] md:px-8 md:py-10 lg:min-h-[340px]">
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
          <p
            className="mt-2 font-serif text-[clamp(1.65rem,4.2vw,2.85rem)] font-semibold leading-[0.95] tracking-tight"
            style={{ color: row.accent }}
          >
            <span className="block">{row.englishLines[0]}</span>
            <span className="mt-1 block md:mt-1.5">{row.englishLines[1]}</span>
          </p>
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
          <h3 className="font-serif text-xl font-semibold text-[#1a3329] md:text-2xl whitespace-pre-line">
            {row.title}
          </h3>
          <p className="mt-3 max-w-xl break-keep text-sm leading-relaxed text-neutral-600 md:text-base">
            {row.description}
          </p>
        </div>
      </div>
    </div>
  );

  if (row.detailsTable) {
    return (
      <div className="overflow-hidden p-4 md:p-5">
        <div className=" border-t  border-[#1a3329]/10 mb-4 from-neutral-100/95 via-neutral-200/85 to-[#e5e0d8] px-4 py-5 md:px-5 md:py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-500">
            {row.eyebrow}
          </p>
          <p
            className="mt-2 font-serif text-[clamp(2rem,4.8vw,3.65rem)] font-semibold leading-[0.95] tracking-tight"
            style={{ color: row.accent }}
          >
            <span className="block">{row.englishLines[0]}</span>
            <span className="mt-1 block md:mt-1.5">{row.englishLines[1]}</span>
          </p>
          <div
            className="mt-4 h-px w-16 md:w-20"
            style={{ backgroundColor: row.accent }}
            aria-hidden
          />
          <h3 className="mt-4 font-serif text-xl font-semibold text-[#1a3329] md:text-2xl whitespace-pre-line">
            {row.title}
          </h3>
          <p className="mt-2 break-keep text-sm leading-relaxed text-neutral-600 md:text-base">
            {row.description}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <div className="relative min-h-[190px] overflow-hidden rounded-lg border border-[#1a3329]/10 bg-white md:min-h-[260px]">
            <Image
              src={row.imageSrc}
              alt={row.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={76}
            />
          </div>
          <div className="overflow-hidden rounded-lg border border-[#1a3329]/10 bg-white/95">
            <table className="w-full border-collapse text-left text-[12px] leading-relaxed text-neutral-700 md:text-sm">
              <tbody>
                {row.detailsTable.map((item) => (
                  <tr key={`${row.key}-${item.label}`} className="border-b border-[#1a3329]/10 last:border-b-0">
                    <th className="text-center w-[5.5rem] bg-[#1a3329] px-3 py-2 align-top font-semibold text-white md:w-[6.5rem]">
                      {item.label}
                    </th>
                    <td className="text-center px-3 py-2 align-top">
                      {Array.isArray(item.value) ? (
                        <ul className="space-y-1 break-keep">
                          {item.value.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="break-keep">{item.value}</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1a3329]/10 bg-[#f6f3eb] md:grid md:grid-cols-2">
      {row.imageLeft ? (
        <>
          {imagePane}
          {textPane}
        </>
      ) : (
        <>
          {textPane}
          {imagePane}
        </>
      )}
    </div>
  );
}

export function CompanyOverviewClient() {
  const [activeCategory, setActiveCategory] = useState<
    "apartment" | "country-house"
  >("apartment");
  const filteredRows = companyRows.filter((row) => row.category === activeCategory);

  return (
    <div className="bg-[#f3efe6]">
      <section className="relative min-h-[72vh] overflow-hidden md:min-h-[78vh]">
        <Image
          src="/about/a-hero.png"
          alt="규수방종합건설 회사소개 배경 이미지"
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
          quality={75}
          unoptimized
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55"
          aria-hidden
        />
        <div className="relative z-10 flex min-h-[72vh] flex-col items-center justify-center px-6 py-24 text-center md:min-h-[78vh] md:py-32">
          <FadeInUp className="max-w-4xl">
            <p className="text-sm font-light tracking-wide text-white/90 [text-shadow:0_2px_14px_rgb(0_0_0_/_0.3),0_1px_5px_rgb(0_0_0_/_0.3)] md:text-base">
              고객만족과 품질만족
            </p>
            <p className="mt-2 text-sm font-light text-white/80 [text-shadow:0_2px_14px_rgb(0_0_0_/_0.3),0_1px_5px_rgb(0_0_0_/_0.3)] md:text-base">
              아파트시행, 전원주택개발을 주축으로.
            </p>
            <h1 className="mt-8 break-keep font-serif text-2xl font-semibold leading-snug text-white [text-shadow:0_2px_24px_rgb(0_0_0_/_0.3),0_1px_8px_rgb(0_0_0_/_0.3)] md:[text-shadow:0_3px_32px_rgb(0_0_0_/_0.3),0_2px_12px_rgb(0_0_0_/_0.3)] md:text-4xl lg:text-[2.35rem]">
              성실하고, 정직하게 최고의 품질 서비스를
              <br className="hidden sm:block" /> <span className="font-medium text-[#c6a667] ">(주)규수방종합건설</span>이 제공합니다.
            </h1>
          </FadeInUp>
        </div>
        <div className="relative z-10 border-t border-white/10 bg-[#1a3329]/95 px-8 py-4 text-center text-sm text-white/95 md:text-base">
          <p>
            삶의 가치와 공간의 완성도를 높이는 개발 파트너,
            <span className="font-medium text-[#c6a667]">
              {" "}
              (주)규수방종합건설
            </span>
            입니다.
          </p>
        </div>
      </section>


      <section className="border-t border-[#1a3329]/10 px-8 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <FadeInUp className="text-center">
            <h2 className="font-serif text-xl font-semibold text-[#1a3329] md:text-2xl">
              사업 실적
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
              규수방종합건설은 아파트 시행과 전원주택 개발을 중심으로 주거 가치를
              설계합니다.
            </p>
          </FadeInUp>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:mt-10">
            <button
              type="button"
              onClick={() => setActiveCategory("apartment")}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors md:text-base ${
                activeCategory === "apartment"
                  ? "border-[#1a3329] bg-[#1a3329] text-white"
                  : "border-[#1a3329]/20 bg-white text-[#1a3329] hover:border-[#1a3329]/40"
              }`}
            >
              아파트 시행
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("country-house")}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors md:text-base ${
                activeCategory === "country-house"
                  ? "border-[#1a3329] bg-[#1a3329] text-white"
                  : "border-[#1a3329]/20 bg-white text-[#1a3329] hover:border-[#1a3329]/40"
              }`}
            >
              전원주택 개발
            </button>
          </div>

          <div className="mt-10 space-y-6 md:mt-12 md:space-y-8">
            {filteredRows.map((row, i) => (
              <FadeInUp key={row.key} delay={0.08 * i}>
                <CompanyZigzagRow row={row} />
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

