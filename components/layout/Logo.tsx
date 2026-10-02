import Link from "next/link";
import Image from "next/image";
import { Cinzel } from "next/font/google";
import { projectDisplayName } from "@/lib/site";

const cinzel = Cinzel({
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
});

type LogoProps = {
  className?: string;
  /** light: 밝은 바탕(홈 GNB), dark: 어두운 바탕(그 외 페이지) */
  tone?: "light" | "dark";
};

export function Logo({ className = "", tone = "dark" }: LogoProps) {
  const light = tone === "light";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 md:gap-3 ${className}`}
      aria-label={`${projectDisplayName} 홈으로`}
    >
      <div className="flex items-center gap-1.5">
        <Image
          src="/main/logo-mark.png"
          alt=""
          width={170}
          height={120}
          preload
          className="h-[30px] w-auto shrink-0"
        />
        <div
          className={`hidden flex-col text-[0.6875rem] font-semibold leading-tight sm:flex xl:hidden 2xl:flex ${
            light ? "text-neutral-700" : "text-white/80"
          }`}
        >
          <span>삶의 완성을 담은</span>
          <span className={light ? "text-[#3f141b]" : "text-white"}>LIFE-END 하우스</span>
        </div>
      </div>
      <div
        className={`flex min-w-0 flex-col justify-center border-l pl-2.5 leading-none md:pl-3 ${
          light ? "border-[#3f141b]/25" : "border-white/25"
        }`}
      >
        <span
          className={`${cinzel.className} whitespace-nowrap text-[1.125rem] tracking-[0.02em] md:text-[1.375rem] ${
            light ? "text-[#3f141b]" : "text-white"
          }`}
        >
          DREAM THE HILL Ⅱ
        </span>
        <span
          className={`${cinzel.className} mt-1 whitespace-nowrap text-center text-[0.5rem] tracking-[0.28em] md:text-[0.5625rem] ${
            light ? "text-[#3f141b]/70" : "text-white/55"
          }`}
        >
          URBAN FOREST RESIDENCE
        </span>
      </div>
    </Link>
  );
}
