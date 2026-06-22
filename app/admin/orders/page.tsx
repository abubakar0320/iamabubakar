"use client";

import React, { useEffect, useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trash2, 
  ExternalLink, 
  Mail, 
  Phone,
  Filter,
  CreditCard,
  ChevronRight,
  TrendingUp,
  Activity,
  User,
  Hash,
  Eye,
  Settings as SettingsIcon,
  LayoutTemplate,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setOrders(orders.map(order => order._id === id ? { ...order, status } : order));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction record?")) return;
    try {
      const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      if (res.ok) {
        setOrders(orders.filter(order => order._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || (filterStatus === "verified" ? order.status === "verified" : order.status === filterStatus);
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <span className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/10 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border border-emerald-200/50 dark:border-emerald-800/50"><CheckCircle size={10} /> Paid</span>;
      case "cancelled":
        return <span className="px-3 py-1 bg-red-50 text-red-700 dark:bg-red-900/10 dark:text-red-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border border-red-200/50 dark:border-red-800/50"><XCircle size={10} /> Cancelled</span>;
      default:
        return <span className="px-3 py-1 bg-amber-50 text-amber-700 dark:bg-amber-900/10 dark:text-amber-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border border-amber-200/50 dark:border-amber-800/50"><Clock size={10} /> Pending</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-[#107c10]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 font-sans pb-10 max-w-7xl mx-auto">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#107c10] text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-green-200 mb-2 flex items-center gap-2">
            <DollarSign size={12} /> Revenue Node
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Order Management
          </h1>
          <p className="text-sm text-green-100 font-medium max-w-xl">
            Monitor transactions, authorize payments, and manage client subscriptions from this central ledger.
          </p>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Transactions", value: orders.length, icon: ShoppingBag, color: "#0067b8" },
          { label: "Pending Verification", value: orders.filter(o => o.status === 'pending').length, icon: Clock, color: "#d83b01" },
          { label: "Verified Revenue", value: `$${orders.filter(o => o.status === 'verified').reduce((acc, o) => acc + parseFloat(o.planPrice.replace(/[^0-9.]/g, '') || "0"), 0).toLocaleString()}`, icon: CreditCard, color: "#107c10" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="bg-white dark:bg-[#1a1a1a] border-l-4 border-y border-r border-gray-200 dark:border-gray-800 p-6 hover:bg-[#f8fafc] dark:hover:bg-[#242424] transition-colors group cursor-pointer h-full" style={{ borderLeftColor: stat.color }}>
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </span>
                <stat.icon size={16} style={{ color: stat.color }} />
              </div>
              <p className="text-3xl font-bold tracking-tight text-[#242424] dark:text-white">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Ledger Data Grid ── */}
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-sm mt-10">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50 dark:bg-[#242424]">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter size={16} className="text-[#107c10]" />
            <h2 className="text-sm font-bold text-[#242424] dark:text-white uppercase tracking-wider">Transaction Ledger</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search customers or TID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-600 focus:border-[#107c10] outline-none transition-all text-[11px] font-bold uppercase tracking-wider"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-600 focus:border-[#107c10] outline-none text-[11px] font-bold uppercase tracking-widest cursor-pointer w-full sm:w-auto"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Paid</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Customer Identity</th>
                <th className="px-6 py-4">Asset Plan</th>
                <th className="px-6 py-4">Verification Node</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="group hover:bg-gray-50 dark:hover:bg-[#242424]/50 transition-colors">
                  <td className="px-6 py-5">
                    <p className="text-[13px] font-bold text-[#242424] dark:text-white uppercase tracking-tight">{order.customerName}</p>
                    <div className="flex flex-col gap-1 mt-2">
                      <a href={`mailto:${order.customerEmail}`} className="text-[10px] font-bold text-[#0067b8] hover:underline flex items-center gap-1.5"><Mail size={10} /> {order.customerEmail}</a>
                      <a href={`https://wa.me/${order.customerPhone?.replace(/[^0-9]/g, "")}`} target="_blank" className="text-[10px] font-bold text-[#107c10] hover:underline flex items-center gap-1.5"><Phone size={10} /> {order.customerPhone}</a>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-bold text-[#242424] dark:text-white uppercase">{order.planName}</p>
                    <p className="text-[13px] font-black mt-1 text-[#107c10]">{order.planPrice}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Gateway: {order.paymentMethod}</p>
                    <code className="text-[10px] font-mono font-bold text-[#0067b8] dark:text-[#4da3ff] bg-blue-50 dark:bg-blue-900/10 px-2 py-1 uppercase tracking-wider border border-blue-100 dark:border-blue-900/30">
                      {order.transactionId}
                    </code>
                  </td>
                  <td className="px-6 py-5">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 items-center">
                      <Link href={`/receipt/${order._id}`} target="_blank">
                        <button className="border border-[#0067b8] text-[#0067b8] dark:border-[#4da3ff] dark:text-[#4da3ff] hover:bg-[#0067b8] hover:text-white dark:hover:bg-[#4da3ff] dark:hover:text-[#1a1a1a] font-black text-[9px] uppercase tracking-widest px-3 py-1.5 flex items-center gap-1 transition-all">
                          <Eye size={10} /> Receipt
                        </button>
                      </Link>
                      {order.status === "pending" && (
                        <>
                          <button 
                            className="bg-[#107c10] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 hover:bg-[#0b5c0b] transition-all"
                            onClick={() => updateStatus(order._id, "verified")}
                          >
                            Approve
                          </button>
                          <button 
                            className="bg-[#d83b01] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 hover:bg-[#b02e00] transition-all"
                            onClick={() => updateStatus(order._id, "cancelled")}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <button 
                        className="text-gray-300 hover:text-red-600 p-1.5 transition-colors"
                        onClick={() => deleteOrder(order._id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-gray-400 text-[11px] font-black uppercase tracking-widest">
                     No transaction records found in this sector.
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
