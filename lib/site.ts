export const siteConfig = {
  name: "규수방 건설",
  projectName: "도심 속 숲 고급 타운하우스",
  description:
    "도심 속 완벽한 여유, 자연을 품은 하이엔드 타운하우스. 규수방 건설이 선사하는 프리미엄 주거문화를 경험하세요.",
  url: "https://gyusoobang.example.com",
  company: {
    name: "규수방 건설 주식회사",
    ceo: "대표이사 홍길동",
    bizNo: "123-45-67890",
    address: "서울특별시 강남구 테헤란로 000",
    tel: "02-0000-0000",
    fax: "02-0000-0001",
    email: "info@gyusoobang.co.kr",
  },
} as const;

export const navItems = [
  { href: "/home", label: "홈" },
  { href: "/about", label: "사업 소개" },
  { href: "/location", label: "입지 소개" },
  { href: "/floorplan", label: "평면도" },
  { href: "/modelhouse", label: "모델하우스" },
  { href: "/contact", label: "상담 문의" },
] as const;
