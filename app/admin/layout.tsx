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
  Search,
  HelpCircle,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Home Content", href: "/admin/home", icon: Home },
  { name: "About Me", href: "/admin/about", icon: User },
  { name: "Projects", href: "/admin/projects", icon: FileCode },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <AuthProvider>{children}</AuthProvider>;
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#f3f2f1] dark:bg-[#111111] flex flex-col font-sans">
        {/* Microsoft Admin Top Bar */}
        <header className="h-12 bg-[#0067b8] text-white flex items-center justify-between px-4 shrink-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              className="p-2 hover:bg-black/10 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={18} />
            </button>
            <Link href="/admin" className="flex items-center gap-3">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-white"></div>
                <div className="w-1.5 h-1.5 bg-white"></div>
                <div className="w-1.5 h-1.5 bg-white"></div>
                <div className="w-1.5 h-1.5 bg-white"></div>
              </div>
              <span className="text-sm font-semibold tracking-tight uppercase">Admin Center</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-1">
             <div className="relative hidden md:block mr-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={14} />
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  className="bg-white/10 border-none rounded-sm py-1.5 pl-9 pr-4 text-xs w-64 focus:bg-white focus:text-black outline-none transition-all placeholder:text-white/60"
                />
             </div>
             <button className="p-2 hover:bg-black/10 rounded-sm"><Bell size={18} /></button>
             <button className="p-2 hover:bg-black/10 rounded-sm"><HelpCircle size={18} /></button>
             <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
                <span className="text-xs font-semibold hidden lg:block uppercase tracking-widest">muhammadyahya</span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black border border-white/40">MY</div>
             </div>
          </div>
        </header>

        <div className="flex flex-grow relative overflow-hidden">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Microsoft Sidebar */}
          <aside className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 transition-transform lg:translate-x-0 lg:static lg:inset-0 pt-12 lg:pt-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <div className="h-full flex flex-col py-4">
              <nav className="flex-grow space-y-0.5">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-4 px-4 py-2.5 text-[13px] font-semibold transition-all border-l-4",
                      pathname === item.href
                        ? "bg-gray-100 dark:bg-gray-800 border-[#0067b8] text-[#0067b8] dark:text-[#4da3ff]"
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
                    )}
                  >
                    <item.icon size={18} strokeWidth={pathname === item.href ? 2.5 : 2} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 px-2 space-y-1">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center space-x-4 px-3 py-2.5 text-[13px] font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-sm"
                >
                  <Globe size={18} />
                  <span>Public View</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="w-full flex items-center space-x-4 px-3 py-2.5 text-[13px] font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-sm transition-all"
                >
                  <LogOut size={18} />
                  <span>Terminate Session</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-grow overflow-y-auto min-w-0 bg-[#f3f2f1] dark:bg-[#111111]">
             {/* Sub Header / Breadcrumbs */}
             <div className="bg-white dark:bg-[#1a1a1a] px-8 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-4 text-xs font-bold text-gray-400">
                <Link href="/admin" className="hover:text-[#0067b8]">ADMIN</Link>
                <ChevronRight size={12} />
                <span className="text-gray-900 dark:text-white uppercase tracking-widest">{pathname.split("/").pop() || "DASHBOARD"}</span>
             </div>

             <div className="p-8 lg:p-12">
               {children}
             </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
