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
  Mail, 
  Phone,
  Filter,
  CreditCard,
  Eye,
  DollarSign
} from "lucide-react";
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
        return <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border border-emerald-500/20"><CheckCircle size={10} /> Paid</span>;
      case "cancelled":
        return <span className="px-3 py-1.5 bg-red-500/10 text-red-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border border-red-500/20"><XCircle size={10} /> Cancelled</span>;
      default:
        return <span className="px-3 py-1.5 bg-amber-500/10 text-amber-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border border-amber-500/20"><Clock size={10} /> Pending</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-[#00d15e]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 font-sans pb-10 max-w-7xl mx-auto">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-gradient-to-r from-[#107c10] via-[#00d15e] to-[#00d4ff] text-white p-8 relative overflow-hidden shadow-[0_0_40px_rgba(0,209,94,0.2)]">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-green-100 mb-2 flex items-center gap-2">
            <DollarSign size={12} /> Revenue Node
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Order Management
          </h1>
          <p className="text-sm text-green-50 font-medium max-w-xl">
            Monitor transactions, authorize payments, and manage client subscriptions from this central ledger.
          </p>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Total Transactions", value: orders.length, icon: ShoppingBag, color: "#00d4ff", bg: "from-[#00d4ff]/10 to-transparent" },
          { label: "Pending Verification", value: orders.filter(o => o.status === 'pending').length, icon: Clock, color: "#f59e0b", bg: "from-[#f59e0b]/10 to-transparent" },
          { label: "Verified Revenue", value: `$${orders.filter(o => o.status === 'verified').reduce((acc, o) => acc + parseFloat(o.planPrice.replace(/[^0-9.]/g, '') || "0"), 0).toLocaleString()}`, icon: CreditCard, color: "#00d15e", bg: "from-[#00d15e]/10 to-transparent" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="relative bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-6 overflow-hidden group hover:border-transparent hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 cursor-default h-full">
              <div className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-2" style={{ backgroundColor: stat.color, boxShadow: `0 0 15px ${stat.color}` }}></div>
              <div className={cn("absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500", stat.bg)}></div>
              
              <div className="relative z-10 flex items-start justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </span>
                <div className="p-2 rounded-sm" style={{ backgroundColor: `${stat.color}15` }}>
                   <stat.icon size={16} style={{ color: stat.color }} />
                </div>
              </div>
              <p className="relative z-10 text-4xl font-bold tracking-tight text-[#242424] dark:text-white">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Ledger Data Grid ── */}
      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 shadow-sm mt-10 group hover:border-[#00d15e]/30 transition-colors">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50 dark:bg-[#1a1a1a]">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="p-1.5 bg-green-500/10 border border-green-500/20">
               <Filter size={14} className="text-[#00d15e]" />
            </div>
            <h2 className="text-sm font-bold text-[#242424] dark:text-white uppercase tracking-wider">Transaction Ledger</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-grow sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search customers or TID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-700 focus:border-[#00d15e] outline-none transition-all text-[11px] font-bold uppercase tracking-wider"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-700 focus:border-[#00d15e] outline-none text-[11px] font-bold uppercase tracking-widest cursor-pointer w-full sm:w-auto"
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
                <th className="px-6 py-5">Customer Identity</th>
                <th className="px-6 py-5">Asset Plan</th>
                <th className="px-6 py-5">Verification Node</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:border-gray-800 dark:divide-gray-800">
              <AnimatePresence>
                {filteredOrders.map((order) => (
                  <motion.tr 
                    key={order._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group/row hover:bg-gray-50 dark:hover:bg-[#1a1a1a]/50 transition-colors relative"
                  >
                    <td className="px-6 py-6">
                      <p className="text-[13px] font-bold text-[#242424] dark:text-white uppercase tracking-tight group-hover/row:text-[#00d15e] transition-colors">{order.customerName}</p>
                      <div className="flex flex-col gap-1 mt-2">
                        <a href={`mailto:${order.customerEmail}`} className="text-[10px] font-bold text-[#00d4ff] hover:underline flex items-center gap-1.5"><Mail size={10} /> {order.customerEmail}</a>
                        <a href={`https://wa.me/${order.customerPhone?.replace(/[^0-9]/g, "")}`} target="_blank" className="text-[10px] font-bold text-emerald-500 hover:underline flex items-center gap-1.5"><Phone size={10} /> {order.customerPhone}</a>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-xs font-bold text-[#242424] dark:text-white uppercase">{order.planName}</p>
                      <p className="text-[13px] font-black mt-1 text-[#00d15e]">{order.planPrice}</p>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Gateway: {order.paymentMethod}</p>
                      <code className="text-[10px] font-mono font-bold text-[#00d4ff] bg-cyan-500/10 px-2 py-1 uppercase tracking-wider border border-cyan-500/20">
                        {order.transactionId}
                      </code>
                    </td>
                    <td className="px-6 py-6">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex justify-end gap-3 items-center opacity-70 group-hover/row:opacity-100 transition-opacity">
                        <Link href={`/receipt/${order._id}`} target="_blank">
                          <button className="border border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-black hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] font-black text-[9px] uppercase tracking-widest px-4 py-2 flex items-center gap-1.5 transition-all">
                            <Eye size={10} /> Receipt
                          </button>
                        </Link>
                        {order.status === "pending" && (
                          <>
                            <button 
                              className="bg-[#00d15e] text-black text-[9px] font-black uppercase tracking-widest px-4 py-2 hover:bg-[#00e667] hover:shadow-[0_0_15px_rgba(0,209,94,0.4)] transition-all"
                              onClick={() => updateStatus(order._id, "verified")}
                            >
                              Approve
                            </button>
                            <button 
                              className="bg-red-500/20 text-red-500 border border-red-500/50 text-[9px] font-black uppercase tracking-widest px-4 py-2 hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all"
                              onClick={() => updateStatus(order._id, "cancelled")}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        <button 
                          className="text-gray-500 hover:text-red-500 p-2 transition-colors border border-transparent hover:border-red-500/50 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] ml-2"
                          onClick={() => deleteOrder(order._id)}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-gray-500 text-[11px] font-black uppercase tracking-widest">
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
