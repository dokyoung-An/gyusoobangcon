import type { Metadata } from "next";
import Image from "next/image";
import { Manrope } from "next/font/google";
import { siteConfig, siteUrl } from "@/lib/site";
import { openGraphImagePath } from "@/lib/images";
import { SplashVrButtons } from "@/components/splash/SplashVrButtons";

const SPLASH_HERO = "/main/main.png";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const splashOgImage = new URL(openGraphImagePath, new URL(siteUrl)).href;

export const metadata: Metadata = {
  title: "Comming Soon",
  description: `${siteConfig.name} 공식 홈페이지 오픈 예정입니다.`,
  robots: { index: false, follow: false },
  openGraph: {
    title: "Comming Soon",
    description: `${siteConfig.name} 공식 홈페이지 오픈 예정입니다.`,
    images: [{ url: splashOgImage, width: 1200, height: 630, alt: "" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comming Soon",
    description: `${siteConfig.name} 공식 홈페이지 오픈 예정입니다.`,
    images: [splashOgImage],
  },
};

export default function SplashPage() {
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
        quality={75}
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
        <SplashVrButtons />
      </div>
    </div>
  );
}
