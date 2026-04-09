"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, type NavItem } from "@/lib/site";
import { Logo } from "./Logo";

function isDropdownActive(pathname: string, item: Extract<NavItem, { kind: "dropdown" }>) {
  return item.items.some((sub) => pathname === sub.href);
}

function isLinkActive(pathname: string, href: string) {
  return pathname === href;
}

function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  /** 열린 드롭다운 라벨(프리미엄·세대안내 등 각각 분리) */
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="메뉴"
        aria-expanded={open}
        className="relative z-[60] rounded-full p-2 text-white"
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

  const isHome = pathname === "/" || pathname === "/home";
  const solidBar = !isHome || scrolled;
  const barBg = solidBar
    ? "bg-[#0f1f1a]/95 shadow-sm backdrop-blur-md"
    : "bg-transparent";

  const linkClass = (active: boolean) =>
    `rounded-full px-3 py-2 text-base font-medium transition-colors ${
      solidBar
        ? active
          ? "bg-white/10 text-[#c6a667]"
          : "text-white/90 hover:text-[#c6a667]"
        : active
          ? "bg-white/15 text-white"
          : "text-white/95 hover:text-[#f0e6c8]"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${barBg}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4 md:px-8 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
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
                  className={`${linkClass(parentActive)} inline-flex cursor-default items-center gap-1`}
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown
                    className={`size-4 opacity-80 transition-transform ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
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
                      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0f1f1a]/98 py-1 shadow-lg backdrop-blur-md">
                        {item.items.map((sub) => {
                          const active = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`block px-4 py-2.5 text-base transition-colors ${
                                active
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

        <MobileNav key={pathname} pathname={pathname} />
      </div>
    </header>
  );
}
