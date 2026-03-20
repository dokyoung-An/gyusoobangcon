import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

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
  return (
    <div className="relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden bg-black">
      <Image
        src="/main/main.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-black/25"
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <h1 className="font-serif text-4xl font-semibold tracking-[0.2em] text-white drop-shadow-lg md:text-6xl lg:text-7xl">
          Comming Soon
        </h1>
      </div>
    </div>
  );
}
