/** 타운하우스 공식 명칭: 수지 듸림더힐 (전역 동일) */
export const projectDisplayName =
  "수지 드림더힐";

export const siteConfig = {
  name: "규수방 건설",
  projectName: projectDisplayName,
  description:
    `도심 속 완벽한 여유, 자연을 품은 하이엔드 타운하우스 ${projectDisplayName}. 규수방 건설이 선사하는 프리미엄 주거문화를 경험하세요.`,
  url: "https://gyusoobang.example.com",
  company: {
    name: "규수방 건설 주식회사",
    ceo: "대표이사 홍길동",
    bizNo: "123-45-67890",
    /** 단지·건설 현장 등 */
    address: "경기도 수지구 동천동 438-8외",
    /** 분양 홍보관 */
    promotionHallAddress: "경기도 수지구 동천동 483-13",
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
  { kind: "link", href: "/about", label: "사업 소개" },
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
