import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Bus,
  MapPinned,
  TrendingUp,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { BUSINESS_OVERVIEW_ROWS } from "@/lib/business-overview";
import { siteConfig, projectDisplayName } from "@/lib/site";

export const metadata: Metadata = {
  title: "사업 소개",
  description: `${siteConfig.name}의 타운하우스 분양 사업 비전과 브랜드 철학을 소개합니다.`,
  openGraph: {
    title: `사업 소개 | ${siteConfig.name}`,
    description: `${siteConfig.name}의 타운하우스 분양 사업 비전과 브랜드 철학을 소개합니다.`,
  },
};

const HIGHLIGHT_CARDS = [
  {
    icon: MapPinned,
    title: "꿈을 실현하는 라이프 스타일 하우스",
    body: "당신의 삶을 바꾸는 공간, 스크린 골프와 수영장, 홈바와 핀란드식 사우나, 엘리베이터로 각 층으로 이어지는 하나의 공간을 창조합니다.",
  },
  {
    icon: TrendingUp,
    title: "조리 난방비 등을 절감합니다.",
    body: "아파트와 동일한 난방을 사용함으로써 난방비에 대한 걱정을 줄였습니다.",
  },
  {
    icon: Bus,
    title: "걸어서 통학 가능",
    body: "걸어서 통학이 가능한 학교와 단지 앞 동천동 어린이공원, 신설유치원 등 어린 자녀를 둔 입주자의 만족도를 더욱 높여드립니다.",
  },
  {
    icon: Building2,
    title: "맞춤형 인테리어 적용",
    body: "친환경 자재 사용과 고객을 최우선으로 생각하는 고객 감동, 품질만족의 기업 이념을 실현하는 규수방종합건설 자회사 규수방가구의 40년 전통 원목가구 인테리어가 주택의 품격을 한층 높여드립니다.",
  }
] as const;

export default function AboutPage() {
  return (
    <div className="bg-[#f6f3eb] text-[#1a1a1a]">
      {/* 히어로 */}
      <section className="border-b border-[#1a3329]/8 bg-white/80 px-8 pb-10 pt-24 text-center backdrop-blur-sm md:px-8 md:pb-12 md:pt-28">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#1a3329]/55">
              Business
            </p>

            <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#1a3329] md:mt-5 md:text-4xl lg:text-[2.75rem]">
              {projectDisplayName}
            </h1>

            <div className="mt-5 space-y-4 md:mt-6 md:space-y-5">
              <p className="text-base font-bold leading-snug text-[#1a3329] sm:text-lg md:text-xl lg:text-2xl">
                도심속 대단지 1차{" "}
                <span className="whitespace-nowrap"><span className="text-[#c6a667]">29세대 입주 완료</span></span>
                <span className="text-[#1a3329]">에 이은</span>
              </p>

              <p className="font-serif text-2xl font-bold leading-tight text-[#1a3329] sm:text-3xl md:text-4xl lg:text-5xl">
                <span className="underline decoration-[#c6a667] decoration-[0.22em] underline-offset-[0.18em] [text-decoration-skip-ink:none] [text-underline-position:from-font]">
                  2차 46세대 분양!
                </span>
              </p>

              <div className="flex flex-col items-center gap-2 pt-1">
                <blockquote className="max-w-xl text-[0.9375rem] font-medium leading-relaxed text-[#1a3329]/50 md:text-lg">
                  “부동산 가치 지속 성장 미래 수익”
                </blockquote>
                <p className="flex items-center gap-1.5 text-xl font-extrabold tracking-tight text-[#1a3329] md:text-2xl">
                  UP!
                  <TrendingUp
                    className="size-7 text-[#b8944a] md:size-8"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </p>
              </div>
            </div>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-neutral-600 md:mt-6 md:text-base break-keep">
              {siteConfig.name}이 선보이는 {projectDisplayName}은(는) 검증된
              1차 단지의 흐름 위에서,<br/> 2차 분양으로 완성도를 더해갑니다.
            </p>

            <div className="mt-5 flex justify-center md:mt-6">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#1a3329] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#14261f] md:gap-3 md:px-6 md:py-3 md:text-base"
              >
                상담 문의하기
                <span
                  className="flex size-8 items-center justify-center rounded-full bg-white text-[#1a3329] transition group-hover:bg-[#c6a667] group-hover:text-[#1a1a1a] md:size-9"
                  aria-hidden
                >
                  <ArrowUpRight className="size-[1.05rem] md:size-5" strokeWidth={2.2} />
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 메인 비주얼 + 사업 개요 */}
      <section
        className="bg-[#f6f3eb] px-8 py-12 md:px-8 md:py-16"
        aria-labelledby="heading-business-overview"
      >
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="flex flex-col gap-8 lg:gap-10">
              <div className="text-center lg:text-left">
                <h2
                  id="heading-business-overview"
                  className="font-serif text-lg font-semibold text-[#1a3329] md:text-xl lg:text-2xl"
                >
                  사업 개요
                </h2>
                <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-neutral-600 md:mt-3 md:text-sm lg:mx-0">
                  {projectDisplayName} 2차 분양 단지의 주요 사업 조건을 요약했습니다.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-12">
                <div className="relative aspect-[16/10] min-h-[200px] w-full overflow-hidden rounded-2xl bg-[#1a3329]/5 shadow-lg shadow-[#1a3329]/5 md:rounded-3xl lg:aspect-auto lg:min-h-[min(22rem,52vh)] lg:h-full">
                  <Image
                    src="/main/main.png"
                    alt={`${projectDisplayName} 단지 조감`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    quality={75}
                  />
                </div>

                <div className="flex min-h-0 w-full flex-col justify-center lg:h-full lg:min-h-[min(22rem,52vh)]">
                  <table className="w-full border-0 text-left text-[11px] leading-snug text-neutral-800 md:text-xs">
                    <tbody className="divide-y divide-neutral-200/90">
                      {BUSINESS_OVERVIEW_ROWS.map((row) => (
                        <tr key={row.label}>
                          <th
                            scope="row"
                            className="w-[34%] border-0 py-1.5 align-top font-semibold text-[#1a3329] md:py-2 lg:w-[32%]"
                          >
                            {row.label}
                          </th>
                          <td className="border-0 py-1.5 align-top text-neutral-700 md:py-2">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 하단: 비전 + 카드 */}
      <section className="border-t border-[#1a3329]/8 bg-white px-8 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16">
          <FadeIn>
            <div className="flex w-full flex-col gap-8">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#1a3329] md:text-3xl">
                  사업의 목표
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600 md:text-base break-keep">
                  도심 속 대단지 타운하우스로서 입지·품질·브랜드를 한데 모아,<br/>
                  입주 이후에도 이어지는 가치를 설계합니다.
                </p>
              </div>
              <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl md:p-2">
                <Image
                  src="/main/house.png"
                  alt={`${siteConfig.name} 로고`}
                  width={720}
                  height={720}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  quality={80}
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <ul className="flex flex-col gap-4 md:gap-5">
              {HIGHLIGHT_CARDS.map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="rounded-2xl border border-neutral-200/90 bg-[#faf9f6] p-6 shadow-sm transition hover:border-[#1a3329]/15 hover:shadow-md md:p-7"
                >
                  <div className="flex gap-4">
                    <div
                      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#1a3329] text-[#c6a667]"
                      aria-hidden
                    >
                      <Icon className="size-5" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1a3329] md:text-lg">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-[0.9375rem]">
                        {body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <div className="h-px bg-[#1a3329]/6" />
    </div>
  );
}
