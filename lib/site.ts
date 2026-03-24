/** 타운하우스 공식 명칭: 수지 듸림더힐 (전역 동일) */
export const projectDisplayName =
  "수지 드림더힐";

/**
 * OG·canonical·metadataBase용 절대 URL.
 * 배포 후 반드시 `.env`에 `NEXT_PUBLIC_SITE_URL=https://실제도메인` 설정 (끝 슬래시 없음).
 * Vercel은 미설정 시 `VERCEL_URL`로 대체.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}

export const siteUrl = getSiteUrl();

export const siteConfig = {
  name: "(주)규수방종합건설",
  projectName: projectDisplayName,
  description:
    `도심 속 완벽한 여유, 자연을 품은 하이엔드 타운하우스 ${projectDisplayName}. \n규수방 건설이 선사하는 프리미엄 주거문화를 경험하세요.`,
  url: siteUrl,
  company: {
    name: "(주)규수방종합건설",
    ceo: "대표이사 홍길동",
    bizNo: "527-88-02156",
    /** 단지·건설 현장 등 */
    address: "경기도 수지구 동천동 483-8 번지",
    /** 분양 홍보관 */
    promotionHallAddress: "경기도 수지구 동천동 483-13 번지",
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
    label: "프리미엄",
    items: [
      { href: "/location", label: "입지 환경" },
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
  { kind: "link", href: "/contact", label: "상담 문의" },
] as const;
