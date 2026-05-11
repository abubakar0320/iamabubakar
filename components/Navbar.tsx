"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AbubakarLogo } from "@/components/Icons";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Resume", href: "/resume.pdf", isExternal: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 transition-all duration-300 relative z-50">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            {/* Custom Abubakar Logo */}
            <Link href="/" className="flex items-center space-x-3 mr-6 group">
              <AbubakarLogo size={32} className="transition-transform duration-500 group-hover:rotate-[360deg]" />
              <span className="text-[#242424] dark:text-white font-black tracking-tighter text-[1.2rem] uppercase">
                Abubakar
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className={cn(
                    "text-[13px] px-3 py-2 rounded-sm transition-colors",
                    pathname === link.href
                      ? "border-b-2 border-black dark:border-white font-semibold text-[#242424] dark:text-white"
                      : "text-[#242424] dark:text-gray-300 hover:underline underline-offset-4 decoration-2"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Utilities */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Sign in removed */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#242424] dark:text-white p-2"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-[#f2f2f2] dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-gray-800 transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-screen opacity-100 border-b shadow-lg" : "max-h-0 opacity-0 border-none"
        )}
      >
        <div className="flex flex-col py-2 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="text-sm text-[#242424] dark:text-gray-300 py-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 px-2"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
