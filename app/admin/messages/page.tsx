"use client";

import React, { useEffect, useState } from "react";
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  Mail, 
  Clock, 
  CheckCircle, 
  Loader2, 
  User, 
  Filter, 
  ArrowRight, 
  Zap, 
  TrendingUp,
  Activity,
  Globe,
  Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "read" }),
      });
      if (res.ok) {
        setMessages(messages.map(msg => msg._id === id ? { ...msg, status: "read" } : msg));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to purge this communication?")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter(msg => msg._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#e10098]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 font-sans pb-10 max-w-7xl mx-auto">
      
      {/* ── Page Header (Vibrant Gradient) ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-gradient-to-r from-[#e10098] via-[#ff4d4d] to-[#f59e0b] text-white p-8 relative overflow-hidden shadow-[0_0_40px_rgba(225,0,152,0.2)]">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-pink-200 mb-2 flex items-center gap-2">
            <MessageSquare size={12} /> Inbox Hub
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Communications Array
          </h1>
          <p className="text-sm text-pink-100 font-medium max-w-xl">
            Monitor and acknowledge global inquiry transmissions securely.
          </p>
        </div>
      </div>

      {/* ── Stat Cards (Neon Multi-color) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Inquiries", value: messages.length, icon: MessageSquare, color: "#e10098", bg: "from-[#e10098]/10 to-transparent" },
          { label: "New Signals", value: messages.filter(m => m.status === 'unread').length, icon: Bell, color: "#ff4d4d", bg: "from-[#ff4d4d]/10 to-transparent" },
          { label: "Hub Status", value: "Operational", icon: Activity, color: "#00d15e", bg: "from-[#00d15e]/10 to-transparent" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="relative bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-6 overflow-hidden group hover:border-transparent hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 cursor-default h-full">
              <div className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-2" style={{ backgroundColor: stat.color, boxShadow: `0 0 15px ${stat.color}` }}></div>
              <div className={cn("absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500", stat.bg)}></div>
              
              <div className="relative z-10 flex justify-between items-start mb-4">
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</span>
                 <div className="p-2 rounded-sm" style={{ backgroundColor: `${stat.color}15` }}>
                   <stat.icon size={16} style={{ color: stat.color }} />
                 </div>
              </div>
              <p className="relative z-10 text-3xl font-bold text-[#242424] dark:text-white uppercase tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Messages Grid/Table ── */}
      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 shadow-sm mt-10 group hover:border-[#e10098]/30 transition-colors">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 bg-gray-50 dark:bg-[#1a1a1a]">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search origin, subject or content nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-700 focus:border-[#e10098] outline-none transition-all text-xs font-bold uppercase tracking-wider"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-8 py-5">Origin Hub</th>
                <th className="px-8 py-5">Transmission Info</th>
                <th className="px-8 py-5">Signal Content</th>
                <th className="px-8 py-5 text-right">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <AnimatePresence>
                {filteredMessages.map((msg) => (
                  <motion.tr 
                    key={msg._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      "group/row transition-all hover:bg-gray-50 dark:hover:bg-[#1a1a1a]/50 relative",
                      msg.status === "unread" ? "bg-pink-50/50 dark:bg-pink-900/10 font-bold" : ""
                    )}
                  >
                    <td className="px-8 py-6 text-sm">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 flex items-center justify-center border transition-all",
                          msg.status === "unread" 
                            ? "bg-[#e10098]/10 text-[#e10098] border-[#e10098]/30 shadow-[0_0_15px_rgba(225,0,152,0.2)]" 
                            : "bg-gray-50 dark:bg-[#242424] text-gray-400 border-gray-200 dark:border-gray-700 group-hover/row:border-gray-400 group-hover/row:text-[#e10098]"
                        )}>
                          <User size={20} />
                        </div>
                        <div>
                          <p className={cn(
                            "text-[13px] font-bold uppercase tracking-tight transition-colors",
                            msg.status === "unread" ? "text-[#e10098] drop-shadow-[0_0_5px_rgba(225,0,152,0.5)]" : "text-[#242424] dark:text-white group-hover/row:text-[#e10098]"
                          )}>
                            {msg.name}
                          </p>
                          <a href={`mailto:${msg.email}`} className="text-[11px] text-[#00d4ff] hover:text-white transition-colors flex items-center gap-1.5 font-bold mt-1">
                             <Mail size={10} /> {msg.email}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-2">
                        <p className={cn(
                          "text-[11px] font-black uppercase tracking-widest",
                          msg.status === "unread" ? "text-[#e10098]" : "text-gray-400"
                        )}>{msg.subject}</p>
                        <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5 uppercase">
                          <Clock size={10} /> {new Date(msg.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium line-clamp-2 max-w-sm leading-relaxed italic border-l-2 border-transparent group-hover/row:border-[#e10098]/50 pl-3 transition-all">
                        {msg.message}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3 items-center opacity-70 group-hover/row:opacity-100 transition-opacity">
                        {msg.status === "unread" && (
                          <button 
                            className="bg-[#e10098]/10 border border-[#e10098]/30 text-[#e10098] text-[9px] font-black uppercase tracking-widest px-4 py-2 hover:bg-[#e10098] hover:text-white hover:shadow-[0_0_15px_rgba(225,0,152,0.5)] transition-all"
                            onClick={() => markAsRead(msg._id)}
                          >
                            Acknowledge
                          </button>
                        )}
                        <button 
                          className="text-gray-500 hover:text-red-500 p-2 border border-transparent hover:border-red-500/50 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all ml-2"
                          onClick={() => deleteMessage(msg._id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredMessages.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-[#e10098]/10 rounded-full flex items-center justify-center text-[#e10098]">
                        <MessageSquare size={32} />
                      </div>
                      <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Communication terminal is clear. No active signals.</p>
                    </div>
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
