import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { openGraphImagePath } from "@/lib/images";
import {
  getNaverWcsInflowDomain,
  NAVER_WCS_ACCOUNT_ID,
} from "@/lib/naver-wcs";

const notoSerif = Noto_Serif_KR({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif-heading",
  display: "swap",
});

const notoSans = Noto_Sans_KR({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans-body",
  display: "swap",
});

const metadataBase = new URL(siteConfig.url);
/** 크롤러가 상대 경로를 잘못 해석하지 않도록 절대 URL */
const openGraphImageUrl = new URL(openGraphImagePath, metadataBase).href;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${siteConfig.projectName} | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "규수방종합건설",
    "타운하우스",
    "수지드림더힐",
    "수지드림더힐 타운하우스",
    "규수방종합건설 타운하우스",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.projectName} | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [
      {
        url: openGraphImageUrl,
        width: 1200,
        height: 630,
        alt: siteConfig.projectName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.projectName} | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [openGraphImageUrl],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-icon.png" },
      { url: "/favicon/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon/favicon.ico"],
  },
  manifest: "/favicon/manifest.json",
  robots: { index: true, follow: true },
  verification: {
    google: "L8ejwaQzUCUcJ6p0mFAtIJYCsVfmtMt0JOQ6fhcMDto",
    other: {
      "naver-site-verification": "7c31a25a1a6a38fe1a887496119f34f4461a5c7e",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const naverWa = JSON.stringify(NAVER_WCS_ACCOUNT_ID);
  const naverInflow = JSON.stringify(getNaverWcsInflowDomain());

  return (
    <html lang="ko" className="h-full scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          crossOrigin="anonymous"
        />
        {/* 네이버 WCS PV: 가이드와 동일하게 inflow(1차도메인) + wcs_do() 1회 */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script type="text/javascript" src="https://wcs.naver.net/wcslog.js"></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `if (!wcs_add) var wcs_add={};
wcs_add["wa"] = ${naverWa};
if (!_nasa) var _nasa={};
if(window.wcs){
wcs.inflow(${naverInflow});
}
wcs_do();`,
          }}
        />
      </head>
      <body
        className={`${notoSans.variable} ${notoSerif.variable} min-h-full flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
