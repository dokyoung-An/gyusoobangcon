"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

type FeatureBlockProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
};

export function FeatureBlock({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
}: FeatureBlockProps) {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [1.06, 1, 1.02]);

  const textBlock = (
    <FadeIn className="flex flex-col justify-center">
      <h2 className="font-serif text-2xl font-semibold text-[#1a3329] md:text-3xl">
        {title}
      </h2>
      <p className="mt-5 text-sm leading-relaxed text-neutral-600 md:text-base">
        {description}
      </p>
    </FadeIn>
  );

  const imageBlock = (
    <FadeIn className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl shadow-black/10 md:aspect-[5/4]">
      <div ref={imgRef} className="absolute inset-0">
        <motion.div style={{ scale }} className="h-full w-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </FadeIn>
  );

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {reverse ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}
