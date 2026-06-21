"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { AbubakarLogo } from "@/components/Icons";

const navLinks = [
  { name: "Home",     href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "About",    href: "/about" },
  { name: "Contact",  href: "/contact" },
];

export function Navbar() {
  const [isOpen,    setIsOpen]    = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [cvUrl,     setCvUrl]     = useState<string | null>(null);
  const pathname = usePathname();

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch CV url from settings
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => setCvUrl(d?.contact?.cvUrl || null))
      .catch(() => {});
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <nav
      className={cn(
        "w-full fixed top-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 dark:bg-[#0d0d0d]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm"
          : "bg-white dark:bg-[#0d0d0d] border-b border-gray-200 dark:border-gray-800"
      )}
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ───────────────────────────────── */}
          <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Abubakar Home">
            <div className="w-8 h-8 bg-[#0067b8] flex items-center justify-center transition-all group-hover:bg-[#005da6]">
              <AbubakarLogo size={20} className="text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[#242424] dark:text-white font-black tracking-tight text-[0.95rem] uppercase leading-none">
                Abu Bakar
              </span>
              <span className="text-[#0067b8] text-[9px] font-black uppercase tracking-[0.2em] leading-none mt-0.5">
                MERN Developer
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ───────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-[12px] font-black uppercase tracking-widest transition-colors",
                    isActive
                      ? "text-[#0067b8] dark:text-[#4da3ff]"
                      : "text-[#505050] dark:text-gray-400 hover:text-[#0067b8] dark:hover:text-white"
                  )}
                >
                  {link.name}
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#0067b8]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop Right Actions ───────────────── */}
          <div className="hidden md:flex items-center gap-3">
            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#505050] dark:text-gray-400 hover:text-[#0067b8] transition-colors"
              >
                <Download size={13} /> CV
              </a>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-[#0067b8] text-white text-[11px] font-black uppercase tracking-widest px-5 py-2.5 hover:bg-[#005da6] transition-colors"
            >
              Hire Me <ChevronRight size={13} />
            </Link>
          </div>

          {/* ── Mobile Hamburger ────────────────────── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 text-[#242424] dark:text-white hover:text-[#0067b8] transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown ─────────────────────────── */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-white dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="max-w-[1600px] mx-auto px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center justify-between px-4 py-3.5 text-xs font-black uppercase tracking-widest transition-colors",
                  isActive
                    ? "bg-[#0067b8]/5 text-[#0067b8] border-l-2 border-[#0067b8]"
                    : "text-[#505050] dark:text-gray-400 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:text-[#0067b8] border-l-2 border-transparent"
                )}
              >
                {link.name}
                <ChevronRight size={14} className="opacity-40" />
              </Link>
            );
          })}

          <div className="pt-3 pb-2 border-t border-gray-100 dark:border-gray-800 mt-2 flex flex-col gap-2">
            {cvUrl && (
              <a href={cvUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest text-[#505050] dark:text-gray-400 hover:text-[#0067b8]">
                <Download size={14} /> Download CV
              </a>
            )}
            <Link href="/contact"
              className="mx-4 flex items-center justify-center gap-2 bg-[#0067b8] text-white text-xs font-black uppercase tracking-widest py-3 hover:bg-[#005da6] transition-colors">
              Hire Me <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
