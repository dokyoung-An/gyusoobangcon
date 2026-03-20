import Link from "next/link";

type LogoProps = {
  className?: string;
};

/** 레드/화이트 브랜드 — 다크 배경(헤더·푸터)용 */
export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/home"
      className={`group inline-flex flex-col leading-none transition-opacity hover:opacity-90 ${className}`}
    >
      <span className="font-serif text-lg font-semibold tracking-tight md:text-xl">
        <span className="text-[#e53935]">규수방</span>
        <span className="text-white"> 건설</span>
      </span>
      <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/75 md:text-xs">
        Gyusubang Construction
      </span>
    </Link>
  );
}
