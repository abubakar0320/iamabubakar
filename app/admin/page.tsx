"use client";

import React, { useEffect, useState } from "react";
import {
  FileCode,
  Briefcase,
  MessageSquare,
  ShoppingBag,
  Clock,
  DollarSign,
  ChevronRight,
  Plus,
  Settings,
  ArrowUpRight,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    servicesCount: 0,
    messagesCount: 0,
    unreadMessagesCount: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/orders"),
        ]);
        const statsData = await statsRes.json();
        const ordersData = await ordersRes.json();

        const revenue = ordersData
          .filter((o: any) => o.status === "verified")
          .reduce((acc: number, o: any) => {
            const price = parseFloat(o.planPrice.replace(/[^0-9.]/g, ""));
            return acc + (isNaN(price) ? 0 : price);
          }, 0);

        setStats({ ...statsData, totalRevenue: revenue });
        setRecentOrders(Array.isArray(ordersData) ? ordersData.slice(0, 5) : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      href: "/admin/orders",
      accent: "#0067b8",
    },
    {
      label: "Unread Messages",
      value: stats.unreadMessagesCount,
      icon: MessageSquare,
      href: "/admin/messages",
      accent: "#107c10",
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      href: "/admin/orders",
      accent: "#d83b01",
    },
    {
      label: "Total Projects",
      value: stats.projectsCount,
      icon: FileCode,
      href: "/admin/projects",
      accent: "#5c2d91",
    },
  ];

  const quickActions = [
    { label: "Add New Project",   href: "/admin/projects/new",  icon: FileCode,     color: "#0067b8" },
    { label: "Add New Service",   href: "/admin/services/new",  icon: Briefcase,    color: "#107c10" },
    { label: "View Messages",     href: "/admin/messages",      icon: Mail,         color: "#d83b01" },
    { label: "Site Settings",     href: "/admin/settings",      icon: Settings,     color: "#5c2d91" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-[#0067b8]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">

      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-black uppercase text-[#0067b8] tracking-widest mb-2">
            Overview
          </div>
          <h1 className="text-3xl font-semibold text-[#242424] dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Welcome back, Abu Bakar. Here&apos;s what&apos;s happening.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-[#0067b8] text-white font-bold px-5 py-2.5 hover:bg-[#005da6] transition-colors text-xs uppercase tracking-widest"
        >
          <Plus size={15} /> New Project
        </Link>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Link href={card.href}>
              <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-colors group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {card.label}
                  </span>
                  <div
                    className="w-8 h-8 flex items-center justify-center"
                    style={{ backgroundColor: card.accent + "15", color: card.accent }}
                  >
                    <card.icon size={16} />
                  </div>
                </div>
                <p
                  className="text-4xl font-semibold tracking-tight"
                  style={{ color: card.accent }}
                >
                  {card.value}
                </p>
                <div className="mt-4 flex items-center text-[10px] font-black text-[#0067b8] uppercase tracking-widest group-hover:underline">
                  View details <ChevronRight size={11} className="ml-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#0067b8] mb-1">Latest</div>
              <h2 className="text-base font-semibold text-[#242424] dark:text-white">Recent Orders</h2>
            </div>
            <Link
              href="/admin/orders"
              className="text-[10px] font-black text-[#0067b8] uppercase tracking-widest hover:underline flex items-center gap-1"
            >
              See All <ArrowUpRight size={11} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#f3f2f1] dark:bg-[#242424]">
                <tr>
                  {["Customer", "Plan", "Status", "Amount"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-[#f3f2f1] dark:hover:bg-[#242424] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-[13px] font-bold text-[#242424] dark:text-white">
                        {order.customerName}
                      </p>
                      <p className="text-[11px] text-gray-500">{order.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4 text-[12px] font-medium text-[#242424] dark:text-gray-300">
                      {order.planName}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2.5 py-1",
                          order.status === "verified"
                            ? "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400"
                            : "bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400"
                        )}
                      >
                        {order.status === "verified" ? (
                          <CheckCircle2 size={10} />
                        ) : (
                          <AlertCircle size={10} />
                        )}
                        {order.status === "verified" ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-[13px] font-black text-[#242424] dark:text-white">
                      {order.planPrice}
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-xs text-gray-400 font-medium">
                      No orders yet. Share your services to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-4">

          {/* Quick Actions */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#0067b8] mb-1">Shortcuts</div>
              <h3 className="text-base font-semibold text-[#242424] dark:text-white">Quick Actions</h3>
            </div>
            <div className="p-3 space-y-1">
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href}>
                  <div className="flex items-center justify-between px-4 py-3 hover:bg-[#f3f2f1] dark:hover:bg-[#242424] transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-8 h-8 flex items-center justify-center"
                        style={{ backgroundColor: action.color + "15", color: action.color }}
                      >
                        <action.icon size={15} />
                      </div>
                      <span className="text-[12.5px] font-semibold text-[#242424] dark:text-white">
                        {action.label}
                      </span>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-gray-300 group-hover:text-[#0067b8] transition-colors"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-[#0067b8] p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative z-10">
              <div className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-3">System</div>
              <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">All Systems Online</h3>
              <p className="text-blue-100 text-xs font-medium mb-6 leading-relaxed">
                Your portfolio site is live and running smoothly on all nodes.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">
                  Operational
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
