"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/lib/site";
import { Logo } from "./Logo";

function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

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
            className="fixed inset-x-0 top-[4.5rem] z-50 border-t border-white/10 bg-[#0f1f1a]/98 backdrop-blur-lg"
          >
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 md:px-8">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`border-b border-white/5 py-3 text-sm font-medium ${
                      active ? "text-[#d4b87a]" : "text-white/95"
                    }`}
                  >
                    {item.label}
                  </Link>
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/home";
  const solidBar = !isHome || scrolled;
  const barBg = solidBar
    ? "bg-[#0f1f1a]/95 shadow-sm backdrop-blur-md"
    : "bg-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${barBg}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  solidBar
                    ? active
                      ? "bg-white/10 text-[#d4b87a]"
                      : "text-white/90 hover:text-[#d4b87a]"
                    : active
                      ? "bg-white/15 text-white"
                      : "text-white/95 hover:text-[#f0e6c8]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <MobileNav key={pathname} pathname={pathname} />
      </div>
    </header>
  );
}
