"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { projectDisplayName, siteConfig } from "@/lib/site";

function toYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.pathname === "/watch"
    ) {
      const videoId = parsed.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      }
    }

    if (parsed.hostname === "youtu.be") {
      const videoId = parsed.pathname.replace("/", "");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      }
    }
  } catch {
    return url;
  }

  return url;
}

function PromotionVideoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const embedUrl = toYouTubeEmbedUrl(siteConfig.promotionVideoEmbedUrl);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!mounted || !open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${projectDisplayName} 홍보영상`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-[#111] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-[210] flex size-11 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          aria-label="홍보영상 닫기"
        >
          <X className="size-5" strokeWidth={1.75} />
        </button>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={embedUrl}
            title={`${projectDisplayName} 홍보영상`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

export function PromotionVideoLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-2xl border border-[#1a3329]/15 bg-white/90 p-4 shadow-sm md:p-5">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group flex w-full flex-col items-start rounded-2xl border border-[#1a3329]/15 bg-white p-6 text-left shadow-sm transition-all hover:border-[#1a3329]/35 hover:shadow-md active:scale-[0.99]"
        >
          <span className="font-serif text-xl font-semibold text-[#1a3329] md:text-2xl">
            홍보영상
          </span>
          <span className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-base">
            {projectDisplayName}의 홍보영상을 팝업으로 재생해 보세요.
          </span>

          <span className="relative mt-5 block aspect-16/10 w-full overflow-hidden rounded-xl border border-[#1a3329]/10">
            <Image
              src="/premium/hap.jpg"
              alt={`${projectDisplayName} 홍보영상 썸네일`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, min(100vw, 720px)"
              priority
              quality={75}
            />
            <span className="absolute inset-0 bg-black/25" aria-hidden />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/90 px-5 py-2.5 text-sm font-semibold text-[#1a3329] shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 md:px-6 md:py-3 md:text-base">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-5"
                  aria-hidden
                >
                  <path
                    d="M8 6.5v11l8-5.5-8-5.5Z"
                    fill="currentColor"
                  />
                </svg>
                클릭해 영상 보기
              </span>
            </span>
          </span>
        </button>
      </div>

      <PromotionVideoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
