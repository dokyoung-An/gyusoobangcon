/** 타운하우스 공식 명칭: 수지 듸림더힐 (전역 동일) */
export const projectDisplayName =
  "수지드림더힐";

/** 서비스 공식 도메인 (sitemap·OG·canonical 기본값). 다른 도메인 쓰면 `NEXT_PUBLIC_SITE_URL`로 덮어씀. */
export const canonicalSiteUrl = "https://www.gyusoobangcon.kr";

/**
 * OG·canonical·metadataBase·sitemap용 절대 URL.
 * - `NEXT_PUBLIC_SITE_URL`이 있으면 최우선 (끝 슬래시 없음).
 * - Vercel **Production** 배포는 공식 도메인 사용 → Search Console과 sitemap URL 일치.
 * - Vercel **Preview**만 `VERCEL_URL`(배포 전용 호스트) 사용.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv === "production") {
    return canonicalSiteUrl;
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return canonicalSiteUrl;
}

export const siteUrl = getSiteUrl();

export const siteConfig = {
  name: "(주)규수방종합건설",
  projectName: projectDisplayName,
  description:
    `도심 속 완벽한 여유, 자연을 품은 하이엔드 타운하우스 ${projectDisplayName}. \n(주)규수방종합건설이 약속하는 프리미엄 주거문화를 경험하세요.`,
  url: siteUrl,
  promotionVideoEmbedUrl:
    "https://www.youtube.com/watch?v=PjgZmDh_HZo",
  company: {
    name: "(주)규수방종합건설",
    ceo: "대표이사 양군석",
    bizNo: "527-88-02156",
    /** 단지·건설 현장 등 */
    address: "경기도 수지구 동천동 483-8 번지",
    /** 분양 홍보관 */
    promotionHallAddress: "경기도 수지구 동천동 483-8 번지",
    tel: "1551-8959",
    fax: "02-0000-0001",
    email: "info@gyusoobang.co.kr",
  },
} as const;

/** 헤더 네비: 단일 링크 또는 드롭다운(하위 메뉴) */
export type NavItem =
  | { kind: "link"; href: string; label: string }
  | {
      kind: "dropdown";
      label: string;
      items: readonly { href: string; label: string }[];
    };

export const navItems: readonly NavItem[] = [
  {
    kind: "dropdown",
    label: "사업 소개",
    items: [
      { href: "/about/company", label: "회사소개" },
      { href: "/about", label: "사업소개" },
    ],
  },
  {
    kind: "dropdown",
    label: "단지소개",
    items: [
      // { href: "/location/danji-layout", label: "단지배치도" },
      { href: "/location/dongho-layout", label: "단지배치도" },
      { href: "/location/system", label: "시스템" },
      { href: "/location", label: "입지환경" },
      { href: "/location/premium", label: "프리미엄" },
     
    ],
  },
  {
    kind: "dropdown",
    label: "세대안내",
    items: [
      { href: "/floorplan", label: "평면안내" },
      { href: "/floorplan/interior", label: "인테리어" },
    ],
  },
  { kind: "link", href: "/modelhouse", label: "사이버 모델하우스" },
  { kind: "link", href: "/promotion-video", label: "홍보영상" },
  { kind: "link", href: "/contact", label: "상담 문의" },
] as const;
