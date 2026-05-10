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
import { Button } from "@/components/ui/Button";
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
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0067b8]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-[#242424] dark:text-white tracking-tight uppercase">Communications Hub</h1>
        <p className="text-sm text-gray-500 mt-2">Monitor and acknowledge global inquiry transmissions.</p>
      </div>

      {/* Microsoft Style Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Inquiries", value: messages.length, icon: MessageSquare, color: "text-[#0067b8]" },
          { label: "New Signals", value: messages.filter(m => m.status === 'unread').length, icon: Bell, color: "text-[#0067b8]" },
          { label: "Hub Status", value: "Operational", icon: Activity, color: "text-emerald-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a1a] p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{stat.label}</span>
               <stat.icon size={18} className={stat.color} />
            </div>
            <p className="text-3xl font-semibold text-[#242424] dark:text-white uppercase">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-sm mt-10 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search origin, subject or content nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#242424] text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <th className="px-8 py-4">Origin Hub</th>
                <th className="px-8 py-4">Transmission Info</th>
                <th className="px-8 py-4">Signal Content</th>
                <th className="px-8 py-4 text-right">Command</th>
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
                      "group transition-all hover:bg-gray-50 dark:hover:bg-gray-800",
                      msg.status === "unread" ? "bg-blue-50/20 dark:bg-blue-900/5 font-bold" : ""
                    )}
                  >
                    <td className="px-8 py-6 text-sm">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-sm flex items-center justify-center border",
                          msg.status === "unread" ? "bg-[#0067b8] text-white border-[#0067b8]" : "bg-gray-100 dark:bg-[#242424] text-gray-400 border-gray-200 dark:border-gray-700"
                        )}>
                          <User size={18} />
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-[#242424] dark:text-white uppercase tracking-tight">{msg.name}</p>
                          <a href={`mailto:${msg.email}`} className="text-[11px] text-[#0067b8] hover:underline flex items-center gap-1.5 font-semibold">
                             <Mail size={10} /> {msg.email}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1.5">
                        <p className={cn(
                          "text-[11px] font-black uppercase tracking-widest",
                          msg.status === "unread" ? "text-[#0067b8]" : "text-gray-400"
                        )}>{msg.subject}</p>
                        <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5 uppercase">
                          <Clock size={10} /> {new Date(msg.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium line-clamp-2 max-w-sm leading-relaxed italic">
                        {msg.message}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        {msg.status === "unread" && (
                          <button 
                            className="bg-[#0067b8] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 hover:bg-[#005da6] transition-all"
                            onClick={() => markAsRead(msg._id)}
                          >
                            Acknowledge
                          </button>
                        )}
                        <button 
                          className="text-gray-400 hover:text-red-600 p-1.5 transition-colors"
                          onClick={() => deleteMessage(msg._id)}
                        >
                          <Trash2 size={16} />
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
                      <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-300">
                        <MessageSquare size={32} />
                      </div>
                      <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Communication terminal is clear. No active signals.</p>
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
