import type { Metadata } from "next";
import Image from "next/image";
import { Manrope } from "next/font/google";
import { preload } from "react-dom";
import { siteConfig } from "@/lib/site";

const SPLASH_HERO = "/main/main.jpg";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Comming Soon",
  description: `${siteConfig.name} 공식 홈페이지 오픈 예정입니다.`,
  robots: { index: false, follow: false },
  openGraph: {
    title: "Comming Soon",
    description: `${siteConfig.name} 공식 홈페이지 오픈 예정입니다.`,
  },
};

export default function SplashPage() {
  preload(SPLASH_HERO, { as: "image" });

  return (
    <div className="relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden bg-black">
      <Image
        src={SPLASH_HERO}
        alt=""
        fill
        priority
        fetchPriority="high"
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-black/25"
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <p className="mb-4 text-sm text-white/80">
          {siteConfig.projectName} 공식 홈페이지 오픈 예정입니다.
        </p>
        <h1
          className={`${manrope.className} text-4xl font-semibold tracking-[0.2em] text-white drop-shadow-lg md:text-6xl lg:text-7xl`}
        >
          COMING SOON
        </h1>
      </div>
    </div>
  );
}
