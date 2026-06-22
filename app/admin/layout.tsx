"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileCode,
  Briefcase,
  MessageSquare,
  Settings,
  User,
  Home,
  LogOut,
  Menu,
  X,
  Globe,
  ShoppingBag,
  Bell,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const menuItems = [
  { name: "Dashboard",    href: "/admin",           icon: LayoutDashboard },
  { name: "Orders",       href: "/admin/orders",    icon: ShoppingBag },
  { name: "Home Content", href: "/admin/home",      icon: Home },
  { name: "About Me",     href: "/admin/about",     icon: User },
  { name: "Projects",     href: "/admin/projects",  icon: FileCode },
  { name: "Services",     href: "/admin/services",  icon: Briefcase },
  { name: "Messages",     href: "/admin/messages",  icon: MessageSquare },
  { name: "Settings",     href: "/admin/settings",  icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <AuthProvider>{children}</AuthProvider>;
  }

  // Build breadcrumb
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumb = segments.map((seg, i) => ({
    label: seg.replace(/-/g, " ").toUpperCase(),
    href: "/" + segments.slice(0, i + 1).join("/"),
  }));

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#f3f2f1] dark:bg-[#111111] flex flex-col font-sans">

        {/* ══════════════════════════════════════════
            TOP HEADER BAR
            ══════════════════════════════════════════ */}
        <header className="h-12 bg-[#0067b8] text-white flex items-center justify-between px-4 shrink-0 z-50 fixed top-0 left-0 right-0">
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button
              className="p-2 hover:bg-black/10 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Logo */}
            <Link href="/admin" className="flex items-center gap-3">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-white" />
                <div className="w-1.5 h-1.5 bg-white/60" />
                <div className="w-1.5 h-1.5 bg-white/60" />
                <div className="w-1.5 h-1.5 bg-white" />
              </div>
              <span className="text-sm font-black tracking-[0.2em] uppercase hidden sm:block">
                Admin Center
              </span>
            </Link>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button className="p-2 hover:bg-black/10 transition-colors" aria-label="Notifications">
              <Bell size={17} />
            </button>
            <Link
              href="/"
              target="_blank"
              className="hidden md:flex items-center gap-1.5 ml-2 mr-2 text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              <Globe size={13} />
              Live Site
            </Link>
            <div className="flex items-center gap-3 pl-3 border-l border-white/20">
              <span className="text-[11px] font-black uppercase tracking-widest hidden lg:block text-white/80">
                Abu Bakar
              </span>
              <div className="w-8 h-8 bg-white/20 border border-white/30 flex items-center justify-center text-[10px] font-black">
                AB
              </div>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════
            BODY (Sidebar + Main)
            ══════════════════════════════════════════ */}
        <div className="flex flex-grow pt-12">

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* ── SIDEBAR ── */}
          <aside className={cn(
            "fixed top-12 left-0 bottom-0 z-40 w-60 bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-200",
            "lg:translate-x-0 lg:static lg:top-0 lg:z-auto",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}>

            {/* Nav Items */}
            <nav className="flex-grow py-4 overflow-y-auto">
              {menuItems.map((item) => {
                const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3.5 px-5 py-2.5 text-[12.5px] font-semibold transition-all border-l-[3px]",
                      active
                        ? "bg-[#e6f0fa] dark:bg-[#0067b8]/10 border-[#0067b8] text-[#0067b8] dark:text-[#4da3ff]"
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#242424] dark:hover:text-white"
                    )}
                  >
                    <item.icon size={17} strokeWidth={active ? 2.5 : 2} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="border-t border-gray-100 dark:border-gray-800 py-3 px-3 space-y-0.5">
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="w-full flex items-center gap-3.5 px-4 py-2.5 text-[12.5px] font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
              >
                <LogOut size={17} />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="flex-grow overflow-y-auto min-w-0 bg-[#f3f2f1] dark:bg-[#111111]">

            {/* Breadcrumb Bar */}
            <div className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 px-6 lg:px-10 py-2.5 flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              {breadcrumb.map((crumb, i) => (
                <React.Fragment key={crumb.href}>
                  {i > 0 && <ChevronRight size={11} className="text-gray-300" />}
                  {i === breadcrumb.length - 1 ? (
                    <span className="text-[#242424] dark:text-white">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-[#0067b8] transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Page Content */}
            <div className="p-6 lg:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
