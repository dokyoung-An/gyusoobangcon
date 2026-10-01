"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { SVGProps } from "react";
import { House, Trees } from "lucide-react";
import { FadeInUp } from "@/components/ui/FadeInUp";

/** 부모 두 명과 아이 — lucide 아이콘과 같은 24px 선 스타일 */
function FamilyIcon({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="6.5" cy="5.5" r="2.25" />
      <circle cx="17.5" cy="5.5" r="2.25" />
      <circle cx="12" cy="12.25" r="1.75" />
      <path d="M2.5 20v-5.5a4 4 0 0 1 6.6-3.05" />
      <path d="M21.5 20v-5.5a4 4 0 0 0-6.6-3.05" />
      <path d="M9 20v-1a3 3 0 0 1 6 0v1" />
    </svg>
  );
}

/** 서버 컴포넌트에서 아이콘 컴포넌트를 직접 넘길 수 없어 키로 받습니다. */
const featureIcons = {
  forest: Trees,
  house: House,
  family: FamilyIcon,
} as const;

export type FeatureIconKey = keyof typeof featureIcons;

type FeatureBlockProps = {
  icon: FeatureIconKey;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  /** 첫 화면(Above the fold)용: 지연 로딩 대신 즉시 로드 */
  priority?: boolean;
};

export function FeatureBlock({
  icon,
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  priority = false,
}: FeatureBlockProps) {
  // next/image는 상대 경로(`./...`)를 URL로 해석하려고 해서 실패합니다.
  // public 경로는 항상 `/...` 형태로 정규화합니다.
  const normalizedSrc =
    imageSrc.startsWith("./") ? imageSrc.slice(1) : imageSrc;

  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [1.06, 1, 1.02]);

  const Icon = featureIcons[icon];

  const textBlock = (
    <div className="flex flex-col items-start text-left">
      <Icon
        className="h-14 w-14 text-[#50635c] md:h-16 md:w-16"
        strokeWidth={1.25}
        aria-hidden
      />
      <h2 className="mt-2.5 font-serif text-2xl font-semibold text-[#1a3329] md:mt-3 md:text-3xl">
        {title}
      </h2>
      <p className="mt-5 text-sm leading-relaxed text-neutral-600 md:text-base">
        {description}
      </p>
    </div>
  );

  const imageBlock = (
    <figure>
      <div
        className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-xl shadow-black/10 md:aspect-5/4"
      >
        <div ref={imgRef} className="absolute inset-0">
          <motion.div style={{ scale }} className="h-full w-full">
            <Image
              src={normalizedSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              quality={75}
            />
          </motion.div>
        </div>
      </div>
      <figcaption className="mt-3 text-right text-[11px] leading-snug text-neutral-400 md:text-xs">
        *상기 CG는 소비자의 이해를 돕기위한 것으로 실제와 다를 수 있습니다.
      </figcaption>
    </figure>
  );

  return (
    <FadeInUp className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* 모바일: 항상 텍스트 -> 이미지
          데스크탑(lg): reverse에 따라 좌/우만 뒤집기 */}
      <div className={`order-1 ${reverse ? "lg:order-2" : "lg:order-1"}`}>
        {textBlock}
      </div>
      <div className={`order-2 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
        {imageBlock}
      </div>
    </FadeInUp>
  );
}
