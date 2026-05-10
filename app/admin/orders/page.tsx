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
  Hash
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
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-sm text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border border-emerald-200/50"><CheckCircle size={10} /> Paid</span>;
      case "cancelled":
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-sm text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border border-red-200/50"><XCircle size={10} /> Cancelled</span>;
      default:
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-sm text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border border-amber-200/50"><Clock size={10} /> Pending</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0067b8]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-[#242424] dark:text-white tracking-tight">Order Management</h1>
        <p className="text-sm text-gray-500 mt-2">Monitor and authorize technical deployment investments.</p>
      </div>

      {/* Microsoft Style Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total transactions", value: orders.length, icon: ShoppingBag, color: "text-[#0067b8]" },
          { label: "Pending verification", value: orders.filter(o => o.status === 'pending').length, icon: Clock, color: "text-[#0067b8]" },
          { label: "Verified revenue", value: `$${orders.filter(o => o.status === 'verified').reduce((acc, o) => acc + parseFloat(o.planPrice.replace(/[^0-9.]/g, '') || "0"), 0).toLocaleString()}`, icon: CreditCard, color: "text-[#0067b8]" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a1a] p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{stat.label}</span>
               <stat.icon size={18} className={stat.color} />
            </div>
            <p className="text-3xl font-semibold text-[#242424] dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-sm mt-10 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search customers or TID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none text-[12px] font-bold uppercase tracking-widest cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#242424] text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Customer identity</th>
                <th className="px-6 py-4">Asset plan</th>
                <th className="px-6 py-4">Verification node</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-6">
                    <p className="text-[13px] font-bold text-[#242424] dark:text-white uppercase tracking-tight">{order.customerName}</p>
                    <div className="flex flex-col gap-1 mt-1">
                      <a href={`mailto:${order.customerEmail}`} className="text-[11px] text-[#0067b8] hover:underline flex items-center gap-1.5"><Mail size={10} /> {order.customerEmail}</a>
                      <a href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, "")}`} target="_blank" className="text-[11px] text-emerald-600 hover:underline flex items-center gap-1.5"><Phone size={10} /> {order.customerPhone}</a>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-xs font-bold text-[#242424] dark:text-white uppercase">{order.planName}</p>
                    <p className="text-[13px] font-black mt-1 text-[#0067b8]">{order.planPrice}</p>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Gateway: {order.paymentMethod}</p>
                    <code className="text-[11px] font-mono font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/80 px-2 py-0.5 rounded-sm">{order.transactionId}</code>
                  </td>
                  <td className="px-6 py-6">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex justify-end gap-3">
                      <Link href={`/receipt/${order._id}`} target="_blank">
                        <button className="text-[#0067b8] dark:text-[#4da3ff] hover:underline font-bold text-[11px] flex items-center gap-1">
                          RECEIPT <ExternalLink size={12} />
                        </button>
                      </Link>
                      {order.status === "pending" && (
                        <>
                          <button 
                            className="bg-[#0067b8] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 hover:bg-[#005da6] transition-all"
                            onClick={() => updateStatus(order._id, "verified")}
                          >
                            Approve
                          </button>
                          <button 
                            className="text-red-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
                            onClick={() => updateStatus(order._id, "cancelled")}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <button 
                        className="text-gray-400 hover:text-red-600 p-1.5"
                        onClick={() => deleteOrder(order._id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-gray-400 text-xs italic">
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
