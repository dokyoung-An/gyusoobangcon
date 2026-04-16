import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { openGraphImagePath } from "@/lib/images";

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
  return (
    <html lang="ko" className="h-full scroll-smooth">
      <head>
        {/* Google Tag Manager — 공식 스니펫(head 최상단). @next/third-parties 대신 태그매니저 안내 그대로 사용 */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga -- GTM 설치 가이드 인라인 스크립트 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WNWK5MMZ');`,
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${notoSans.variable} ${notoSerif.variable} min-h-full flex flex-col antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WNWK5MMZ"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
