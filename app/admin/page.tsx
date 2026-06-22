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
  Globe,
  UserCircle,
  LayoutTemplate,
  Pencil,
  Eye,
  ListTodo
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
    { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, href: "/admin/orders", accent: "#0067b8" },
    { label: "Unread Messages", value: stats.unreadMessagesCount, icon: MessageSquare, href: "/admin/messages", accent: "#107c10" },
    { label: "Pending Orders", value: stats.pendingOrders, icon: Clock, href: "/admin/orders", accent: "#d83b01" },
    { label: "Total Projects", value: stats.projectsCount, icon: FileCode, href: "/admin/projects", accent: "#5c2d91" },
  ];

  const commandModules = [
    {
      title: "Projects",
      icon: FileCode,
      color: "#0067b8",
      desc: "Manage portfolio projects",
      actions: [
        { label: "Add New", href: "/admin/projects/new", icon: Plus, primary: true },
        { label: "View All", href: "/admin/projects", icon: ListTodo, primary: false },
      ]
    },
    {
      title: "Services",
      icon: Briefcase,
      color: "#107c10",
      desc: "Manage offered services",
      actions: [
        { label: "Add New", href: "/admin/services/new", icon: Plus, primary: true },
        { label: "Manage", href: "/admin/services", icon: Settings, primary: false },
      ]
    },
    {
      title: "Profile & About",
      icon: UserCircle,
      color: "#d83b01",
      desc: "Update bio & skills",
      actions: [
        { label: "Edit Profile", href: "/admin/about", icon: Pencil, primary: true },
        { label: "View Live", href: "/about", icon: Eye, primary: false },
      ]
    },
    {
      title: "Home Content",
      icon: LayoutTemplate,
      color: "#5c2d91",
      desc: "Hero section & features",
      actions: [
        { label: "Edit Home", href: "/admin/home", icon: Pencil, primary: true },
      ]
    },
    {
      title: "Messages",
      icon: Mail,
      color: "#0067b8",
      desc: "Client inquiries & leads",
      actions: [
        { label: "Inbox", href: "/admin/messages", icon: MessageSquare, primary: true },
      ]
    },
    {
      title: "Orders",
      icon: DollarSign,
      color: "#107c10",
      desc: "Service payments & status",
      actions: [
        { label: "All Orders", href: "/admin/orders", icon: ListTodo, primary: true },
      ]
    }
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
    <div className="space-y-10 font-sans pb-10 max-w-7xl mx-auto">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0067b8] text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-2 flex items-center gap-2">
            <Globe size={12} /> System Online
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Command Center
          </h1>
          <p className="text-sm text-blue-100 font-medium max-w-xl">
            Welcome back, Abu Bakar. Manage your entire portfolio, services, and client interactions from here.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white text-[#0067b8] font-bold px-6 py-3 hover:bg-gray-100 transition-colors text-xs uppercase tracking-widest"
          >
            <Eye size={15} /> View Live Site
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 border border-blue-300 text-white font-bold px-4 py-3 hover:bg-white/10 transition-colors text-xs uppercase tracking-widest"
          >
            <Settings size={15} />
          </Link>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={card.href}>
              <div className="bg-white dark:bg-[#1a1a1a] border-l-4 border-y border-r border-gray-200 dark:border-gray-800 p-6 hover:bg-[#f8fafc] dark:hover:bg-[#242424] transition-colors group cursor-pointer h-full" style={{ borderLeftColor: card.accent }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {card.label}
                  </span>
                  <card.icon size={16} style={{ color: card.accent }} />
                </div>
                <p className="text-3xl font-bold tracking-tight text-[#242424] dark:text-white">
                  {card.value}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ── Command Modules (Action Grid) ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-4 bg-[#0067b8]" />
          <h2 className="text-lg font-bold text-[#242424] dark:text-white uppercase tracking-wider">Quick Controls</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commandModules.map((module, i) => (
            <motion.div key={module.title} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 flex flex-col h-full">
                <div className="p-5 flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-50 dark:bg-[#242424]">
                      <module.icon size={16} style={{ color: module.color }} />
                    </div>
                    <h3 className="font-bold text-[#242424] dark:text-white text-base">{module.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 font-medium pl-11">{module.desc}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#242424] border-t border-gray-100 dark:border-gray-800 flex gap-2">
                  {module.actions.map((act) => (
                    <Link
                      key={act.label}
                      href={act.href}
                      className={cn(
                        "flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors text-center",
                        act.primary
                          ? "bg-[#0067b8] text-white hover:bg-[#005da6]"
                          : "bg-white dark:bg-[#1a1a1a] text-[#242424] dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#0067b8] hover:text-[#0067b8]"
                      )}
                    >
                      <act.icon size={12} /> {act.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Charts Grid ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-4 bg-[#5c2d91]" />
          <h2 className="text-lg font-bold text-[#242424] dark:text-white uppercase tracking-wider">Analytics</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Revenue Chart */}
          <div className="lg:col-span-8 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#0067b8] mb-1">Growth</div>
                <h2 className="text-sm font-bold text-[#242424] dark:text-white">Revenue Overview</h2>
              </div>
              <Activity size={16} className="text-gray-400" />
            </div>
            <div className="p-6 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0067b8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0067b8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="#0067b8" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Traffic Chart */}
          <div className="lg:col-span-4 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#5c2d91] mb-1">Visitors</div>
                <h3 className="text-sm font-bold text-[#242424] dark:text-white">Weekly Traffic</h3>
              </div>
              <BarChart3 size={16} className="text-gray-400" />
            </div>
            <div className="p-6 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dy={5} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="views" fill="#5c2d91" radius={[0, 0, 0, 0]} barSize={10} />
                  <Bar dataKey="visitors" fill="#0067b8" radius={[0, 0, 0, 0]} barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Orders ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-[#107c10]" />
            <h2 className="text-lg font-bold text-[#242424] dark:text-white uppercase tracking-wider">Recent Orders</h2>
          </div>
          <Link href="/admin/orders" className="text-[10px] font-black uppercase tracking-widest text-[#0067b8] hover:underline flex items-center gap-1">
            View All <ArrowUpRight size={12} />
          </Link>
        </div>
        
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f3f2f1] dark:bg-[#242424] border-b border-gray-200 dark:border-gray-800">
              <tr>
                {["Customer", "Plan", "Status", "Amount", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-[#242424]/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-[13px] font-bold text-[#242424] dark:text-white">{order.customerName}</p>
                    <p className="text-[11px] text-gray-500">{order.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-[12px] font-bold text-[#242424] dark:text-gray-300">
                    {order.planName}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2.5 py-1",
                      order.status === "verified"
                        ? "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400"
                        : "bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400"
                    )}>
                      {order.status === "verified" ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                      {order.status === "verified" ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] font-black text-[#242424] dark:text-white">
                    {order.planPrice}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/orders/${order._id}`} className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#0067b8] border border-[#0067b8] hover:bg-[#0067b8] hover:text-white transition-colors">
                      <Eye size={12} /> View
                    </Link>
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-xs text-gray-400 font-medium">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
