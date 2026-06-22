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
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const menuItems = [
  { name: "Dashboard",    href: "/admin",           icon: LayoutDashboard, color: "#00d4ff" },
  { name: "Orders",       href: "/admin/orders",    icon: ShoppingBag, color: "#00d15e" },
  { name: "Home Content", href: "/admin/home",      icon: Home, color: "#e10098" },
  { name: "About Me",     href: "/admin/about",     icon: User, color: "#ff4d4d" },
  { name: "Projects",     href: "/admin/projects",  icon: FileCode, color: "#00d4ff" },
  { name: "Services",     href: "/admin/services",  icon: Briefcase, color: "#5c2d91" },
  { name: "Messages",     href: "/admin/messages",  icon: MessageSquare, color: "#e10098" },
  { name: "Settings",     href: "/admin/settings",  icon: Settings, color: "#00d4ff" },
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
      <div className="min-h-screen bg-[#f3f2f1] dark:bg-[#0a0a0a] flex flex-col font-sans">

        {/* ══════════════════════════════════════════
            TOP HEADER BAR (Vibrant Premium)
            ══════════════════════════════════════════ */}
        <header className="h-14 bg-gradient-to-r from-[#0067b8] via-[#5c2d91] to-[#e10098] text-white flex items-center justify-between px-4 shrink-0 z-50 fixed top-0 left-0 right-0 shadow-[0_0_20px_rgba(92,45,145,0.4)] border-b border-white/10">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="flex items-center gap-4 relative z-10">
            {/* Hamburger */}
            <button
              className="p-2 hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="grid grid-cols-2 gap-0.5 group-hover:rotate-90 transition-transform duration-500">
                <div className="w-1.5 h-1.5 bg-cyan-300 shadow-[0_0_5px_#00d4ff]" />
                <div className="w-1.5 h-1.5 bg-pink-300 shadow-[0_0_5px_#e10098]" />
                <div className="w-1.5 h-1.5 bg-emerald-300 shadow-[0_0_5px_#00d15e]" />
                <div className="w-1.5 h-1.5 bg-amber-300 shadow-[0_0_5px_#f59e0b]" />
              </div>
              <span className="text-sm font-black tracking-[0.25em] uppercase hidden sm:flex items-center gap-2">
                Command <span className="text-pink-200">Center</span>
              </span>
            </Link>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 relative z-10">
            <ThemeToggle />
            <button className="p-2 hover:bg-white/10 rounded-md transition-colors relative group" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_5px_#ff4d4d] border border-[#e10098]"></span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="hidden md:flex items-center gap-2 ml-2 mr-4 text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] transition-all bg-white/5 px-3 py-1.5 border border-white/10 rounded-sm"
            >
              <Globe size={13} />
              Live Output
            </Link>
            <div className="flex items-center gap-3 pl-4 border-l border-white/20">
              <span className="text-[11px] font-black uppercase tracking-widest hidden lg:block text-white">
                Abu Bakar
              </span>
              <div className="w-8 h-8 bg-gradient-to-br from-[#00d4ff] to-[#e10098] p-[1.5px] rounded-sm">
                <div className="w-full h-full bg-[#121212] flex items-center justify-center text-[10px] font-black text-white">
                  AB
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════
            BODY (Sidebar + Main)
            ══════════════════════════════════════════ */}
        <div className="flex flex-grow pt-14">

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* ── SIDEBAR ── */}
          <aside className={cn(
            "fixed top-14 left-0 bottom-0 z-40 w-64 bg-white dark:bg-[#121212] border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300 shadow-xl",
            "lg:translate-x-0 lg:static lg:top-0 lg:z-auto",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}>

            {/* Nav Items */}
            <nav className="flex-grow py-6 overflow-y-auto space-y-1 px-3">
              {menuItems.map((item) => {
                const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 text-[12px] font-black uppercase tracking-widest transition-all relative overflow-hidden group",
                      active
                        ? "text-white"
                        : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    )}
                  >
                    {/* Active Background Glow */}
                    {active && (
                      <>
                        <div className="absolute inset-0 opacity-10" style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}></div>
                        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: item.color, boxShadow: `0 0 15px ${item.color}` }}></div>
                      </>
                    )}
                    
                    {/* Hover Background */}
                    {!active && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity" style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}></div>
                    )}

                    <div className={cn(
                      "flex items-center justify-center transition-colors relative z-10",
                      active ? "" : "opacity-60 group-hover:opacity-100"
                    )} style={active ? { color: item.color, filter: `drop-shadow(0 0 5px ${item.color}80)` } : {}}>
                      <item.icon size={18} strokeWidth={active ? 2.5 : 2} />
                    </div>
                    
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="border-t border-gray-100 dark:border-gray-800 p-4">
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-black uppercase tracking-widest text-gray-500 hover:text-red-500 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_15px_#ff4d4d]"></div>
                <LogOut size={18} className="relative z-10 group-hover:drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                <span className="relative z-10">Sign Out</span>
              </button>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="flex-grow overflow-y-auto min-w-0 bg-[#f3f2f1] dark:bg-[#0a0a0a]">

            {/* Breadcrumb Bar */}
            <div className="bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800 px-6 lg:px-10 py-3 flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest shadow-sm relative z-10">
              <Sparkles size={12} className="text-[#e10098] mr-1" />
              {breadcrumb.map((crumb, i) => (
                <React.Fragment key={crumb.href}>
                  {i > 0 && <ChevronRight size={12} className="text-gray-600" />}
                  {i === breadcrumb.length - 1 ? (
                    <span className="text-[#00d4ff] drop-shadow-[0_0_5px_rgba(0,212,255,0.4)]">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Page Content */}
            <div className="p-6 lg:p-10 relative">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
