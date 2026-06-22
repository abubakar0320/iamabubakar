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
      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-3 shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-none">
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
    { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, href: "/admin/orders", color: "#00d4ff", bg: "from-[#00d4ff]/10 to-transparent" },
    { label: "Unread Messages", value: stats.unreadMessagesCount, icon: MessageSquare, href: "/admin/messages", color: "#e10098", bg: "from-[#e10098]/10 to-transparent" },
    { label: "Pending Orders", value: stats.pendingOrders, icon: Clock, href: "/admin/orders", color: "#ff4d4d", bg: "from-[#ff4d4d]/10 to-transparent" },
    { label: "Total Projects", value: stats.projectsCount, icon: FileCode, href: "/admin/projects", color: "#00d15e", bg: "from-[#00d15e]/10 to-transparent" },
  ];

  const commandModules = [
    {
      title: "Projects",
      icon: FileCode,
      color: "#00d4ff",
      desc: "Manage portfolio projects",
      actions: [
        { label: "Add New", href: "/admin/projects/new", icon: Plus, primary: true },
        { label: "View All", href: "/admin/projects", icon: ListTodo, primary: false },
      ]
    },
    {
      title: "Services",
      icon: Briefcase,
      color: "#00d15e",
      desc: "Manage offered services",
      actions: [
        { label: "Add New", href: "/admin/services/new", icon: Plus, primary: true },
        { label: "Manage", href: "/admin/services", icon: Settings, primary: false },
      ]
    },
    {
      title: "Profile & About",
      icon: UserCircle,
      color: "#ff4d4d",
      desc: "Update bio & skills",
      actions: [
        { label: "Edit Profile", href: "/admin/about", icon: Pencil, primary: true },
        { label: "View Live", href: "/about", icon: Eye, primary: false },
      ]
    },
    {
      title: "Home Content",
      icon: LayoutTemplate,
      color: "#9d4edd",
      desc: "Hero section & features",
      actions: [
        { label: "Edit Home", href: "/admin/home", icon: Pencil, primary: true },
      ]
    },
    {
      title: "Messages",
      icon: Mail,
      color: "#e10098",
      desc: "Client inquiries & leads",
      actions: [
        { label: "Inbox", href: "/admin/messages", icon: MessageSquare, primary: true },
      ]
    },
    {
      title: "Orders",
      icon: DollarSign,
      color: "#f59e0b",
      desc: "Service payments & status",
      actions: [
        { label: "All Orders", href: "/admin/orders", icon: ListTodo, primary: true },
      ]
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-cyan-500" />
      </div>
    );
  }

  return (
    <div className="space-y-10 font-sans pb-10 max-w-7xl mx-auto">

      {/* ── Page Header (Vibrant Gradient) ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-gradient-to-r from-[#0067b8] via-[#5c2d91] to-[#e10098] text-white p-8 relative overflow-hidden shadow-[0_0_40px_rgba(0,103,184,0.3)]">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-cyan-200 mb-2 flex items-center gap-2">
            <Globe size={12} /> System Online
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Command Center
          </h1>
          <p className="text-sm text-pink-100 font-medium max-w-xl">
            Welcome back, Abu Bakar. Manage your entire portfolio, services, and client interactions from here.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white text-[#00d4ff] font-bold px-6 py-3 hover:bg-gray-100 transition-colors text-xs uppercase tracking-widest shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_5px_25px_rgba(255,255,255,0.3)]"
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

      {/* ── Stat Cards (Neon Multi-color) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={card.href}>
              <div 
                className={cn(
                  "relative bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-6 overflow-hidden group cursor-pointer transition-all duration-300",
                  "hover:border-transparent hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.02)] h-full"
                )}
              >
                {/* Animated Glowing Left Border */}
                <div className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-2" style={{ backgroundColor: card.color, boxShadow: `0 0 15px ${card.color}` }}></div>
                
                {/* Subtle Gradient Background on Hover */}
                <div className={cn("absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500", card.bg)}></div>

                <div className="relative z-10 flex items-start justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {card.label}
                  </span>
                  <div className="p-2 rounded-sm" style={{ backgroundColor: `${card.color}15` }}>
                    <card.icon size={16} style={{ color: card.color }} />
                  </div>
                </div>
                <p className="relative z-10 text-3xl font-bold tracking-tight text-[#242424] dark:text-white">
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
          <div className="w-1.5 h-4 bg-[#00d4ff] shadow-[0_0_10px_#00d4ff]" />
          <h2 className="text-lg font-bold text-[#242424] dark:text-white uppercase tracking-wider">Quick Controls</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commandModules.map((module, i) => (
            <motion.div key={module.title} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 flex flex-col h-full group hover:border-transparent hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all">
                <div className="p-5 flex-grow relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl rounded-full" style={{ backgroundColor: module.color }}></div>
                  <div className="relative z-10 flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 group-hover:border-transparent transition-colors" style={{ boxShadow: `inset 0 0 10px ${module.color}20` }}>
                      <module.icon size={16} style={{ color: module.color }} />
                    </div>
                    <h3 className="font-bold text-[#242424] dark:text-white text-base transition-colors" style={{ textShadow: `0 0 10px ${module.color}40` }}>{module.title}</h3>
                  </div>
                  <p className="relative z-10 text-xs text-gray-500 font-medium pl-11">{module.desc}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#1a1a1a] border-t border-gray-100 dark:border-gray-800 flex gap-2 relative z-10">
                  {module.actions.map((act) => (
                    <Link
                      key={act.label}
                      href={act.href}
                      className={cn(
                        "flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-all text-center",
                        act.primary
                          ? `text-black border border-transparent shadow-[0_0_15px_rgba(0,0,0,0.5)]`
                          : "bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:text-white"
                      )}
                      style={act.primary ? { backgroundColor: module.color, boxShadow: `0 0 15px ${module.color}60` } : {}}
                      onMouseEnter={(e) => {
                         if(!act.primary) {
                           e.currentTarget.style.borderColor = module.color;
                           e.currentTarget.style.color = module.color;
                           e.currentTarget.style.boxShadow = `0 0 10px ${module.color}40`;
                         }
                      }}
                      onMouseLeave={(e) => {
                         if(!act.primary) {
                           e.currentTarget.style.borderColor = '';
                           e.currentTarget.style.color = '';
                           e.currentTarget.style.boxShadow = '';
                         }
                      }}
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
        <div className="flex items-center gap-2 mb-4 mt-8">
          <div className="w-1.5 h-4 bg-[#e10098] shadow-[0_0_10px_#e10098]" />
          <h2 className="text-lg font-bold text-[#242424] dark:text-white uppercase tracking-wider">Analytics</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-8 bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#00d4ff]/30 transition-colors">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#00d4ff] mb-1">Growth</div>
                <h2 className="text-sm font-bold text-[#242424] dark:text-white">Revenue Overview</h2>
              </div>
              <Activity size={16} className="text-gray-400 group-hover:text-[#00d4ff] transition-colors" />
            </div>
            <div className="p-6 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="#00d4ff" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" style={{ filter: `drop-shadow(0px 0px 5px rgba(0,212,255,0.5))` }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Traffic Chart */}
          <div className="lg:col-span-4 bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#e10098]/30 transition-colors">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#e10098] mb-1">Visitors</div>
                <h3 className="text-sm font-bold text-[#242424] dark:text-white">Weekly Traffic</h3>
              </div>
              <BarChart3 size={16} className="text-gray-400 group-hover:text-[#e10098] transition-colors" />
            </div>
            <div className="p-6 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dy={5} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="views" fill="#e10098" radius={[0, 0, 0, 0]} barSize={10} style={{ filter: `drop-shadow(0px 0px 5px rgba(225,0,152,0.5))` }} />
                  <Bar dataKey="visitors" fill="#00d4ff" radius={[0, 0, 0, 0]} barSize={10} style={{ filter: `drop-shadow(0px 0px 5px rgba(0,212,255,0.5))` }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Orders ── */}
      <div>
        <div className="flex items-center justify-between mb-4 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-[#00d15e] shadow-[0_0_10px_#00d15e]" />
            <h2 className="text-lg font-bold text-[#242424] dark:text-white uppercase tracking-wider">Recent Orders</h2>
          </div>
          <Link href="/admin/orders" className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400 flex items-center gap-1 transition-colors">
            View All <ArrowUpRight size={12} />
          </Link>
        </div>
        
        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f3f2f1] dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800">
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
                <tr key={order._id} className="group hover:bg-gray-50 dark:hover:bg-[#1a1a1a]/50 transition-colors relative">
                  <td className="px-6 py-5">
                    <p className="text-[13px] font-bold text-[#242424] dark:text-white group-hover:text-emerald-500 transition-colors">{order.customerName}</p>
                    <p className="text-[11px] text-gray-500">{order.customerEmail}</p>
                  </td>
                  <td className="px-6 py-5 text-[12px] font-bold text-[#242424] dark:text-gray-300">
                    {order.planName}
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border",
                      order.status === "verified"
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    )}>
                      {order.status === "verified" ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                      {order.status === "verified" ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-[13px] font-black text-[#242424] dark:text-white">
                    {order.planPrice}
                  </td>
                  <td className="px-6 py-5">
                    <Link href={`/admin/orders/${order._id}`} className="inline-flex items-center justify-center gap-1 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-emerald-500 border border-emerald-500 hover:bg-emerald-500 hover:text-black hover:shadow-[0_0_15px_rgba(0,209,94,0.4)] transition-all">
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
