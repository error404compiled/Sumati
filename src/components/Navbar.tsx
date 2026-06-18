"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import type { SearchItem } from "@/types/search";
import { Logo } from "./Logo";
import { SearchModal } from "./SearchModal";
import { CloseIcon, MenuIcon, SearchIcon } from "./icons";

export function Navbar({ searchItems }: { searchItems: SearchItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-40 w-full px-4 pt-4"
      >
        <nav
          className={`container-page flex items-center justify-between gap-3 rounded-full border border-white/60 px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "bg-white/90 shadow-float backdrop-blur-md"
              : "bg-white/70 shadow-soft backdrop-blur"
          }`}
          aria-label="Primary"
        >
          {/* Left: search */}
          <div className="flex flex-1 items-center">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-full bg-blush-50 px-3 py-2 text-sm text-muted transition hover:bg-blush-100"
              aria-label="Open search"
            >
              <SearchIcon className="h-4 w-4 text-blush-500" />
              <span className="hidden sm:inline">Quick Search…</span>
            </button>
          </div>

          {/* Center: logo */}
          <div className="flex justify-center">
            <Logo />
          </div>

          {/* Right: subscribe + menu */}
          <div className="flex flex-1 items-center justify-end gap-2">
            <Link href="#newsletter" className="btn-primary hidden sm:inline-flex">
              Subscribe
            </Link>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blush-50 text-ink transition hover:bg-blush-100"
            >
              {menuOpen ? (
                <CloseIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="container-page mt-2"
            >
              <div className="card flex flex-col gap-1 p-3">
                {siteConfig.navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-blush-50 hover:text-blush-600"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="#newsletter"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary mt-1 sm:hidden"
                >
                  Subscribe
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        items={searchItems}
      />
    </>
  );
}
