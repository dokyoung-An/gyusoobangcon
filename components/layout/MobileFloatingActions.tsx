import Link from "next/link";
import { siteConfig } from "@/lib/site";

const telHref = `tel:${siteConfig.company.tel.replace(/[^0-9+]/g, "")}`;

export function MobileFloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-[70] md:hidden">
      <div className="flex flex-col items-end gap-2">
        <a
          href={telHref}
          className="flex size-14 items-center justify-center rounded-full bg-[#1a3329] text-white shadow-lg shadow-black/25 transition-colors active:bg-[#14261f]"
          aria-label={`대표번호 ${siteConfig.company.tel} 전화 연결`}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M22 16.92v2.7a1.78 1.78 0 0 1-1.94 1.78 17.6 17.6 0 0 1-7.68-2.73 17.31 17.31 0 0 1-5.33-5.33A17.6 17.6 0 0 1 4.32 5.66 1.78 1.78 0 0 1 6.1 3.72h2.7a1.78 1.78 0 0 1 1.72 1.45c.12.92.34 1.82.67 2.68a1.78 1.78 0 0 1-.4 1.88l-1.14 1.15a14.25 14.25 0 0 0 3.47 3.47l1.15-1.14a1.78 1.78 0 0 1 1.88-.4c.86.33 1.76.55 2.68.67A1.78 1.78 0 0 1 22 16.92Z" />
          </svg>
        </a>

        <Link
          href="/contact"
          className="flex size-14 items-center justify-center rounded-full border border-[#1a3329]/25 bg-[#f6f3eb] text-center font-semibold text-[#1a3329] shadow-lg shadow-black/20 transition-colors active:bg-[#ece6d8]"
          aria-label="상담 문의 페이지 이동"
        >
          <span className="leading-[1.05]">
            <span className="block text-[12px] font-semibold">상담</span>
            <span className="block text-[12px] font-semibold">문의</span>
          </span>
        </Link>
      </div>
    </div>
  );
}

