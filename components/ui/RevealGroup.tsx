"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /** 요소가 얼마나 보여야 재생할지 (0~1) */
  threshold?: number;
};

/**
 * 뷰포트에 들어오면 data-reveal="shown"으로 바뀌어,
 * 내부 `.reveal-up` 요소들의 CSS 키프레임(globals.css)이 한 번 재생됩니다.
 */
export function RevealGroup({ children, className, threshold = 0.2 }: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className} data-reveal={shown ? "shown" : "pending"}>
      {children}
    </div>
  );
}
