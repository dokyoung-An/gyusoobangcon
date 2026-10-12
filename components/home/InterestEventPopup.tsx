"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

const STORAGE_KEY = "suji-interest-event-hide-date";

function todayKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function InterestEventPopup() {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setOpen(localStorage.getItem(STORAGE_KEY) !== todayKey());
    } catch {
      setOpen(true);
    }
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const hideForToday = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, todayKey());
    } catch {
      // 저장이 막혀 있어도 이번 화면에서는 닫는다.
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/55 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="w-[min(86vw,380px)] overflow-hidden rounded-2xl bg-[#3a1520] shadow-2xl">
        <h2 id={titleId} className="sr-only">
          수지드림더힐 2차 관심고객등록 이벤트
        </h2>
        <Link
          href="/contact"
          className="block"
          onClick={close}
          aria-label="관심고객등록 바로가기"
        >
          <Image
            src="/main/pop.png"
            alt="관심고객등록 이벤트. 2026년 11월 29일까지 등록 시 스타벅스 커피교환권 30명 추첨"
            width={1544}
            height={2290}
            sizes="380px"
            quality={85}
            priority
            className="h-auto max-h-[calc(100dvh-7.5rem)] w-full object-contain"
          />
        </Link>
        <div className="grid grid-cols-2 border-t border-white/15 text-sm text-[#f6efe6]">
          <button
            type="button"
            onClick={hideForToday}
            className="h-12 border-r border-white/15 transition hover:bg-white/10"
          >
            오늘만 보기
          </button>
          <button
            type="button"
            onClick={close}
            className="h-12 font-semibold transition hover:bg-white/10"
          >
            닫기
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
