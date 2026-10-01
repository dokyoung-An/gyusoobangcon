"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, siteConfig, type NavItem } from "@/lib/site";
import { Logo } from "./Logo";

const telDisplay = siteConfig.company.tel.replace(/-/g, ".");
const telHref = `tel:${siteConfig.company.tel.replace(/[^0-9+]/g, "")}`;

function isDropdownActive(pathname: string, item: Extract<NavItem, { kind: "dropdown" }>) {
  return item.items.some((sub) => pathname === sub.href);
}

function isLinkActive(pathname: string, href: string) {
  return pathname === href;
}

function MobileNav({ pathname, light }: { pathname: string; light: boolean }) {
  const [open, setOpen] = useState(false);
  /** 열린 드롭다운 라벨(프리미엄·세대안내 등 각각 분리) */
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label="메뉴"
        aria-expanded={open}
        className={`relative z-[60] rounded-full p-2 ${light ? "text-[#3f141b]" : "text-white"}`}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-[4.5rem] z-50 max-h-[min(70vh,calc(100vh-5rem))] overflow-y-auto border-t border-white/10 bg-[#0f1f1a]/98 backdrop-blur-lg"
          >
            <nav className="mx-auto flex max-w-7xl flex-col px-8 py-4 md:px-8">
              {navItems.map((item) => {
                if (item.kind === "link") {
                  const active = isLinkActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`border-b border-white/5 py-3 text-base font-medium ${
                        active ? "text-[#c6a667]" : "text-white/95"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }

                const parentActive = isDropdownActive(pathname, item);
                const isExpanded = expandedDropdown === item.label;
                return (
                  <div key={item.label} className="border-b border-white/5">
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between py-3 text-left text-base font-medium ${
                        parentActive ? "text-[#c6a667]" : "text-white/95"
                      }`}
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpandedDropdown((cur) =>
                          cur === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={`size-4 shrink-0 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-3"
                        >
                          {item.items.map((sub) => {
                            const active = pathname === sub.href;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className={`block border-l border-white/10 py-2.5 pl-3 text-base ${
                                  active ? "text-[#c6a667]" : "text-white/80"
                                }`}
                                onClick={() => {
                                  setOpen(false);
                                  setExpandedDropdown(null);
                                }}
                              >
                                {sub.label}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <a
                href={telHref}
                className="flex items-center gap-2 py-4 text-base font-semibold text-white"
              >
                <Phone className="size-4 text-[#c6a667]" aria-hidden />
                {telDisplay}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  /** 데스크톱: 현재 열린 드롭다운의 라벨 (여러 개 동시에 열리지 않도록) */
  const [openDropdownLabel, setOpenDropdownLabel] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenDropdownLabel(null);
  }, [pathname]);

  /** 홈: 히어로 위에 반투명 흰 바탕으로 겹치고, 스크롤하면 불투명. 그 외 페이지는 어두운 GNB */
  const light = pathname === "/" || pathname === "/home";
  const barBg = light
    ? scrolled
      ? "bg-white shadow-sm"
      : "bg-white/55 backdrop-blur-md"
    : "bg-[#0f1f1a]/95 shadow-sm backdrop-blur-md";

  const linkClass = (active: boolean) =>
    `rounded-full px-2.5 py-2 text-[0.9375rem] font-medium transition-colors ${
      light
        ? active
          ? "text-[#3f141b] font-semibold"
          : "text-black hover:text-[#3f141b]"
        : active
          ? "bg-white/10 text-[#c6a667]"
          : "text-white/90 hover:text-[#c6a667]"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${barBg}`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-4 md:px-8 lg:px-10">
        <Logo tone={light ? "light" : "dark"} />

        <div className="hidden items-center gap-6 xl:flex">
        <nav className="flex items-center">
          {navItems.map((item) => {
            if (item.kind === "link") {
              const active = isLinkActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClass(active)}
                >
                  {item.label}
                </Link>
              );
            }

            const parentActive = isDropdownActive(pathname, item);
            const menuOpen = openDropdownLabel === item.label;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdownLabel(item.label)}
                onMouseLeave={() => setOpenDropdownLabel(null)}
              >
                <button
                  type="button"
                  className={linkClass(parentActive)}
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  onFocus={() => setOpenDropdownLabel(item.label)}
                >
                  {item.label}
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full z-[60] min-w-[12rem] pt-1"
                    >
                      <div
                        className={`overflow-hidden rounded-xl border py-1 shadow-lg backdrop-blur-md ${
                          light
                            ? "border-neutral-200 bg-white"
                            : "border-white/10 bg-[#0f1f1a]/98"
                        }`}
                      >
                        {item.items.map((sub) => {
                          const active = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`block px-4 py-2.5 text-[0.9375rem] transition-colors ${
                                light
                                  ? active
                                    ? "bg-[#3f141b]/5 text-[#3f141b]"
                                    : "text-black hover:bg-[#3f141b]/5 hover:text-[#3f141b]"
                                  : active
                                    ? "bg-white/10 text-[#c6a667]"
                                    : "text-white/90 hover:bg-white/5 hover:text-[#c6a667]"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-6">
          <span
            className={`h-5 w-px ${light ? "bg-black/30" : "bg-white/30"}`}
            aria-hidden
          />
          <a
            href={telHref}
            aria-label={`대표번호 ${siteConfig.company.tel} 전화 연결`}
            className={`flex items-center gap-2 text-xl font-bold tracking-tight ${
              light ? "text-[#3f141b]" : "text-white"
            }`}
          >
            <Phone className="size-5" strokeWidth={2.25} aria-hidden />
            {telDisplay}
          </a>
        </div>
        </div>

        <MobileNav key={pathname} pathname={pathname} light={light} />
      </div>
    </header>
  );
}
