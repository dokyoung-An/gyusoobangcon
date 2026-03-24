import Link from "next/link";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import { projectDisplayName } from "@/lib/site";

const bebasLogo = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type LogoProps = {
  className?: string;
};

/** 심볼 이미지 + 타이포그래픽 워드마크 — 다크 배경(헤더·푸터)용 */
export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/home"
      className={`group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 md:gap-3 ${className}`}
      aria-label={`${projectDisplayName} 홈으로`}
    >
      <Image
        src="/top_logo2.png"
        alt=""
        width={140}
        height={44}
        priority
        className="h-10 w-auto shrink-0 md:h-11"
        sizes="140px"
        quality={85}
      />
      <div className="flex min-w-0 flex-col justify-center py-1 border-l border-white/20 pl-2.5 leading-none md:py-1.5 md:pl-3">
        <p
          className={`${bebasLogo.className} text-[1.5rem] tracking-[0.06em] text-white md:text-[1.75rem] md:tracking-[0.08em]`}
        >
          <span className="text-white">DREAM THE </span>
          <span className="text-[#c6a667]">HIL</span>
        </p>
        <p className="text-[0.5625rem] font-medium tracking-[0.12em] text-white/45 transition-colors group-hover:text-white/60 md:text-[0.625rem] md:tracking-[0.14em]">
          수지드림더힐
        </p>
      </div>
    </Link>
  );
}
