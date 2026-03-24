"use client";

import { motion } from "framer-motion";
import { type ComponentProps, type ReactNode } from "react";

type MotionViewport = NonNullable<ComponentProps<typeof motion.div>["viewport"]>;

type FadeInUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** 기본 ~1.2s — 짧게 쓰려면 duration prop으로 덮어쓰기 */
  duration?: number;
  /** 기본 22 — 작을수록 덜 밑에서 올라옴 */
  initialY?: number;
  /** 기본: once + amount 기준으로 안정적으로 트리거 (과도한 margin 제거) */
  viewport?: Partial<MotionViewport>;
};

const defaultViewport: MotionViewport = {
  once: true,
  amount: 0.2,
};

/**
 * 뷰포트에 진입하면 아래에서 위로 부드럽게 나타나는 애니메이션.
 * once=true로 스크롤을 올렸다/내렸다 해도 중복 실행되지 않습니다.
 */
export function FadeInUp({
  children,
  className,
  delay = 0,
  duration = 1.2,
  initialY = 22,
  viewport: viewportOverrides,
}: FadeInUpProps) {
  const viewport: MotionViewport = {
    ...defaultViewport,
    ...viewportOverrides,
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration,
        delay,
        ease: [0.33, 1, 0.68, 1],
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

