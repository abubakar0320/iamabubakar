"use client";

import React, { useEffect, useState } from "react";
import { 
  FileCode, 
  Briefcase, 
  MessageSquare, 
  MailWarning,
  TrendingUp,
  ArrowRight,
  ShoppingBag,
  Clock,
  DollarSign,
  Users,
  Activity,
  Zap,
  ArrowUpRight,
  ChevronRight,
  CreditCard,
  Plus,
  Layout
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    servicesCount: 0,
    messagesCount: 0,
    unreadMessagesCount: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/orders")
        ]);
        
        const statsData = await statsRes.json();
        const ordersData = await ordersRes.json();
        
        // Calculate revenue from verified orders
        const revenue = ordersData
          .filter((o: any) => o.status === 'verified')
          .reduce((acc: number, o: any) => {
            const price = parseFloat(o.planPrice.replace(/[^0-9.]/g, ''));
            return acc + (isNaN(price) ? 0 : price);
          }, 0);

        setStats({ ...statsData, totalRevenue: revenue });
        setRecentOrders(ordersData.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const topStats = [
    { label: "Total revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-[#0067b8]" },
    { label: "Active inquiries", value: stats.unreadMessagesCount, icon: MessageSquare, color: "text-[#0067b8]" },
    { label: "Pending orders", value: stats.pendingOrders, icon: Clock, color: "text-[#0067b8]" },
    { label: "Total assets", value: stats.projectsCount, icon: FileCode, color: "text-[#0067b8]" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0067b8]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Microsoft Style Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-[#242424] dark:text-white tracking-tight">Dashboard</h1>
      </div>

      {/* Microsoft Style Tiles (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a1a] p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <div className="flex justify-between items-start mb-4">
               <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{stat.label}</span>
               <stat.icon size={18} className={stat.color} />
            </div>
            <p className="text-3xl font-semibold text-[#242424] dark:text-white">{stat.value}</p>
            <div className="mt-4 flex items-center text-[11px] font-bold text-[#0067b8] dark:text-[#4da3ff] hover:underline cursor-pointer">
               View report <ChevronRight size={12} className="ml-1" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
        {/* Microsoft Style List - Recent Transactions */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-sm">
           <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#242424] dark:text-white">Recent orders</h2>
              <Link href="/admin/orders" className="text-xs font-bold text-[#0067b8] dark:text-[#4da3ff] hover:underline">See all</Link>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-gray-50 dark:bg-[#242424] text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    <tr>
                       <th className="px-6 py-3">Customer</th>
                       <th className="px-6 py-3">Deployment</th>
                       <th className="px-6 py-3">Status</th>
                       <th className="px-6 py-3 text-right">Amount</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {recentOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="px-6 py-4">
                           <p className="text-[13px] font-bold text-[#242424] dark:text-white">{order.customerName}</p>
                           <p className="text-[11px] text-gray-500">{order.customerEmail}</p>
                        </td>
                        <td className="px-6 py-4 text-[13px] font-medium">{order.planName}</td>
                        <td className="px-6 py-4">
                           <span className={cn(
                             "text-[10px] font-black uppercase px-2 py-0.5 rounded-sm",
                             order.status === 'verified' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                           )}>
                             {order.status === 'verified' ? "Paid" : "Pending"}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right text-[13px] font-black">{order.planPrice}</td>
                      </tr>
                    ))}
                    {recentOrders.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-gray-400 text-xs italic">No transactions in the log.</td>
                      </tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Quick Management Tiles */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                 <Link href="/admin/projects/new">
                   <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-[#242424] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group">
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-sm bg-[#0067b8] flex items-center justify-center text-white"><Plus size={16} /></div>
                         <span className="text-[13px] font-semibold">New Project Asset</span>
                      </div>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-[#0067b8]" />
                   </button>
                 </Link>
                 <Link href="/admin/services/new">
                   <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-[#242424] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group">
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-sm bg-[#0067b8] flex items-center justify-center text-white"><Briefcase size={16} /></div>
                         <span className="text-[13px] font-semibold">Deploy New Service</span>
                      </div>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-[#0067b8]" />
                   </button>
                 </Link>
                 <Link href="/admin/settings">
                   <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-[#242424] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group">
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-sm bg-gray-400 flex items-center justify-center text-white"><Layout size={16} /></div>
                         <span className="text-[13px] font-semibold">Engine Config</span>
                      </div>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-black dark:group-hover:text-white" />
                   </button>
                 </Link>
              </div>
           </div>

           <div className="bg-[#0067b8] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={100} /></div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-2 relative z-10">System Status</h3>
              <p className="text-blue-100 text-xs font-medium mb-6 relative z-10">All nodes are synchronized with the cloud infrastructure.</p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/20 w-fit px-3 py-1 rounded-sm relative z-10">
                 <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                 Operational
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
