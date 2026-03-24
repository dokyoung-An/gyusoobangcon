"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInUp } from "@/components/ui/FadeInUp";

type FeatureBlockProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  /** 첫 화면(Above the fold)용: 지연 로딩 대신 즉시 로드 */
  priority?: boolean;
};

export function FeatureBlock({
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

  const textBlock = (
    <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
      <h2 className="font-serif text-2xl font-semibold text-[#1a3329] md:text-3xl">
        {title}
      </h2>
      <p className="mt-5 text-sm leading-relaxed text-neutral-600 md:text-base">
        {description}
      </p>
    </div>
  );

  const imageBlock = (
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
