import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const { company } = siteConfig;

  return (
    <footer className="border-t border-white/10 bg-[#0a1411] text-white/80">
      <div className="mx-auto max-w-7xl px-8 py-14 md:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/65">
              {siteConfig.description}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#c6a667]">
              연락처
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>대표전화 {company.tel}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#c6a667]">
              회사 정보
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>{company.name}</li>
              <li>사업자등록번호 {company.bizNo}</li>
              <li className="leading-relaxed">현장 주소: {company.address}</li>
              <li className="leading-relaxed">
                홍보관 주소: {company.promotionHallAddress}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <Link href="/contact#privacy" className="hover:text-[#c6a667]">
            개인정보처리방침
          </Link>
        </div>
      </div>
    </footer>
  );
}
