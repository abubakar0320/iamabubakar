"use client";

import React, { useEffect, useState } from "react";
import {
  FileCode,
  Briefcase,
  MessageSquare,
  Clock,
  DollarSign,
  ChevronRight,
  Plus,
  Settings,
  ArrowUpRight,
  Mail,
  CheckCircle2,
  AlertCircle,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

// Mock Data for Charts
const revenueData = [
  { month: "Jan", revenue: 1250, orders: 12 },
  { month: "Feb", revenue: 1800, orders: 18 },
  { month: "Mar", revenue: 2400, orders: 25 },
  { month: "Apr", revenue: 2100, orders: 20 },
  { month: "May", revenue: 3200, orders: 35 },
  { month: "Jun", revenue: 4500, orders: 42 },
];

const trafficData = [
  { day: "Mon", visitors: 120, views: 300 },
  { day: "Tue", visitors: 180, views: 420 },
  { day: "Wed", visitors: 150, views: 380 },
  { day: "Thu", visitors: 220, views: 510 },
  { day: "Fri", visitors: 280, views: 650 },
  { day: "Sat", visitors: 320, views: 780 },
  { day: "Sun", visitors: 290, views: 710 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-3 shadow-sm rounded-none">
        <p className="text-[12px] font-bold text-[#242424] dark:text-white mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-[11px] font-medium uppercase tracking-wider" style={{ color: entry.color || entry.payload.fill }}>
            {entry.name}: <span className="font-bold">{entry.name === "revenue" ? `$${entry.value}` : entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

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

  const verifiedOrders = stats.totalOrders > 0 ? stats.totalOrders - stats.pendingOrders : 15;
  const pendingOrdersVal = stats.totalOrders > 0 ? stats.pendingOrders : 4;

  const orderStatusData = [
    { name: "Paid", value: verifiedOrders, color: "#107c10" },
    { name: "Pending", value: pendingOrdersVal, color: "#d83b01" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-[#0067b8]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans pb-10">

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
            Welcome back, Abu Bakar. Here's what's happening.
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
              <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-colors group cursor-pointer h-full">
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

      {/* ── Charts Grid (Row 1) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#0067b8] mb-1">Analytics</div>
              <h2 className="text-base font-semibold text-[#242424] dark:text-white">Revenue & Orders</h2>
            </div>
            <Activity size={16} className="text-gray-400" />
          </div>
          <div className="p-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0067b8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0067b8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#888' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#888' }}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0067b8" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Pie Chart */}
        <div className="lg:col-span-4 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#107c10] mb-1">Distribution</div>
              <h2 className="text-base font-semibold text-[#242424] dark:text-white">Order Status</h2>
            </div>
            <PieChartIcon size={16} className="text-gray-400" />
          </div>
          <div className="p-6 h-[320px] flex flex-col justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-4">
              {orderStatusData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-none" style={{ backgroundColor: entry.color }} />
                  <span className="text-[11px] font-bold text-[#242424] dark:text-gray-300 uppercase tracking-widest">
                    {entry.name} ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Grid (Row 2) ── */}
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

        {/* Right Column (Traffic & Actions) */}
        <div className="lg:col-span-4 space-y-6">

          {/* Traffic Chart */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#5c2d91] mb-1">Visitors</div>
                <h3 className="text-base font-semibold text-[#242424] dark:text-white">Weekly Traffic</h3>
              </div>
              <BarChart3 size={16} className="text-gray-400" />
            </div>
            <div className="p-6 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#888' }} 
                    dy={5}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#888' }}
                  />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="views" fill="#5c2d91" radius={[0, 0, 0, 0]} barSize={12} />
                  <Bar dataKey="visitors" fill="#0067b8" radius={[0, 0, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

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

        </div>
      </div>
    </div>
  );
}
