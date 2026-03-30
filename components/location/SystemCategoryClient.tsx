"use client";

import Image from "next/image";
import { FadeInUp } from "@/components/ui/FadeInUp";

type SystemRow = {
  key: string;
  indexLabel: string;
  title: string;
  imageSrc: string;
  imageW: number;
  imageH: number;
  imageAlt: string;
  description: string;
  imageLeft: boolean;
  points: readonly {
    key: string;
    lottieSrc: string;
    iconImageSrc?: string;
    label: string;
  }[];
  bullets: readonly string[];
};

const SYSTEM_ROWS: readonly SystemRow[] = [
  {
    key: "solar",
    indexLabel: "01",
    title: "전 세대 태양광 패널 설치",
    imageSrc: "/system/1.png",
    imageW: 1920,
    imageH: 4408,
    imageAlt: "태양광 시스템 안내 이미지",
    description:
      "태양광 에너지 활용으로 주거 효율을 높이고, 지속 가능한 생활 환경을 제안합니다.",
    imageLeft: true,
    points: [
      {
        key: "eco",
        lottieSrc: "https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json",
        iconImageSrc: "/sys-icon/1.png",
        label: "친환경",
      },
      {
        key: "cost",
        lottieSrc: "https://assets10.lottiefiles.com/packages/lf20_touohxv0.json",
        iconImageSrc: "/sys-icon/2.png",
        label: "비용절감",
      },
      {
        key: "efficiency",
        lottieSrc: "https://assets10.lottiefiles.com/packages/lf20_5ngs2ksb.json",
        iconImageSrc: "/sys-icon/3.png",
        label: "고효율",
      },
    ],
    bullets: [
      "세대별 전력 사용 부담을 줄이는 친환경 설계",
      "태양광 발전 연계로 에너지 자립도 향상",
      "장기적 관점의 유지비 절감 효과 기대",
    ],
  },
  {
    key: "charger",
    indexLabel: "02",
    title: "세대별 전기차 충전기 설치",
    imageSrc: "/system/2.png",
    imageW: 1920,
    imageH: 2630,
    imageAlt: "전기차 충전 시스템 안내 이미지",
    description:
      "각 세대 중심의 충전 인프라로 일상 속 전기차 이용 편의성을 강화합니다.",
    imageLeft: false,
    points: [
      {
        key: "convenience",
        lottieSrc: "https://assets10.lottiefiles.com/packages/lf20_touohxv0.json",
        iconImageSrc: "/sys-icon/4.png",
        label: "충전편의",
      },
      {
        key: "daily",
        lottieSrc: "https://assets3.lottiefiles.com/packages/lf20_iwmd6pyr.json",
        iconImageSrc: "/sys-icon/5.png",
        label: "일상충전",
      },
      {
        key: "future",
        lottieSrc: "https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json",
        iconImageSrc: "/sys-icon/6.png",
        label: "미래가치",
      },
    ],
    bullets: [
      "귀가 후 바로 충전 가능한 생활 중심 동선",
      "전기차 사용 증가에 대응하는 세대별 인프라",
      "차세대 모빌리티 환경을 고려한 주거 구성",
    ],
  },
  {
    key: "iot",
    indexLabel: "03",
    title: "스마트홈 IOT 시스템 운영",
    imageSrc: "/system/3.jpg",
    imageW: 1200,
    imageH: 800,
    imageAlt: "스마트홈 IoT 시스템 이미지",
    description:
      "조명·보안·환경 제어를 통합한 스마트홈 운영으로 더 안전하고 편리한 생활을 지원합니다.",
    imageLeft: true,
    points: [
      {
        key: "control",
        lottieSrc: "https://assets3.lottiefiles.com/packages/lf20_iwmd6pyr.json",
        iconImageSrc: "/sys-icon/7.png",
        label: "원격제어",
      },
      {
        key: "secure",
        lottieSrc: "https://assets10.lottiefiles.com/packages/lf20_5ngs2ksb.json",
        iconImageSrc: "/sys-icon/8.png",
        label: "보안강화",
      },
      {
        key: "connected",
        lottieSrc: "https://assets10.lottiefiles.com/packages/lf20_touohxv0.json",
        iconImageSrc: "/sys-icon/9.png",
        label: "연동성",
      },
    ],
    bullets: [
      "앱을 통한 집안 디바이스 제어 및 생활편리 서비스 제공",
      "공동현관 및 세대 방문자 확인/통화/문열림 및 세대간 통화, 부재중 방문자 영상확인 및 영상 자동녹화 가능",
      "홈컨트롤 기능으로 조명/대기전력 콘센트/일괄/난방/에어컨/커튼/가스밸브/전기쿡탑/환기 조정",
    ],
  },
];

export function SystemCategoryClient() {
  return (
    <section className="px-8 pb-16 pt-6 md:px-8 md:pb-24 md:pt-8">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-14 md:space-y-20">
          {SYSTEM_ROWS.map((row, i) => (
            <FadeInUp key={row.key} delay={0.05 * i}>
              <article className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-18">
                <div className={row.imageLeft ? "order-1 md:order-1" : "order-1 md:order-2"}>
                  <SystemImagePane row={row} />
                </div>
                <div className={row.imageLeft ? "order-2 md:order-2" : "order-2 md:order-1"}>
                  <SystemTextPane row={row} />
                </div>
              </article>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemImagePane({ row }: { row: SystemRow }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#1a3329]/10 bg-white shadow-sm">
      <Image
        src={row.imageSrc}
        alt={row.imageAlt}
        width={row.imageW}
        height={row.imageH}
        className="h-auto w-full"
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
        quality={78}
      />
    </div>
  );
}

function SystemTextPane({ row }: { row: SystemRow }) {
  return (
    <div className="px-1 text-left">
      <p className="font-sans text-[2.25rem] font-light tracking-tight text-neutral-300 md:text-[3rem]">
        {row.indexLabel}
      </p>
      <h3 className="mt-1 font-sans text-base font-semibold leading-snug text-[#1a3329] md:text-xl">
        {row.title}
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base">
        {row.description}
      </p>
      <div className="mt-4 h-px w-14 bg-[#c6a667]/70" aria-hidden />
      <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-neutral-600 md:text-sm px-4">
        {row.bullets.map((line) => (
          <li key={line} className="flex items-start gap-2 break-keep">
            <span className="mt-[0.4em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#c6a667]" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <div className="mt-10 grid grid-cols-3 gap-3 px-10">
        {row.points.map((point) => {
          return (
            <div
              key={point.key}
              className="flex flex-col items-center justify-center  px-2 py-3 text-center"
            >
              {point.iconImageSrc ? (
                <Image
                  src={point.iconImageSrc}
                  alt=""
                  width={80}
                  height={80}
                  className="h-16 w-16 object-contain"
                  loading="lazy"
                />
              ) : (
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-[#1a3329]/15 bg-[#f3efe6] text-[10px] font-semibold text-[#1a3329]/60"
                  aria-hidden
                >
                  ICON
                </div>
              )}
              <p className="mt-1.5 text-[11px] font-medium text-neutral-600 md:text-xs break-keep">
                {point.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
