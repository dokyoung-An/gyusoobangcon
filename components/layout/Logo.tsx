import Link from "next/link";
import Image from "next/image";
import { projectDisplayName } from "@/lib/site";

type LogoProps = {
  className?: string;
};

/** 레드/화이트 브랜드 — 다크 배경(헤더·푸터)용 */
export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/home"
      className={`group inline-flex items-center transition-opacity hover:opacity-90 ${className}`}
    >
      <Image
        src="/top_logo.png"
        alt={`${projectDisplayName} 로고`}
        width={140}
        height={44}
        priority
        className="h-10 w-auto md:h-11"
      />
    </Link>
  );
}
