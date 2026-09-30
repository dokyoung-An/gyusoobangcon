import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const { company, developer } = siteConfig;

  return (
    <footer className="border-t border-white/10 bg-[#0a1411] text-white/80">
      <div className="mx-auto max-w-7xl px-8 py-14 md:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <Link
              href="/"
              aria-label={`${siteConfig.projectName} 홈으로`}
              className="inline-block transition-opacity hover:opacity-80"
            >
              <Image
                src="/footer_logo.png"
                alt="SUJI DREAM THE HILL II 수지 드림 더 힐 2차"
                width={1024}
                height={187}
                className="h-10 w-auto md:h-12"
                sizes="280px"
              />
            </Link>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#c6a667]">
              시행사
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>{developer.name}</li>
              <li>대표자명 : {developer.ceo}</li>
              <li>사업자등록번호 : {developer.bizNo}</li>
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
