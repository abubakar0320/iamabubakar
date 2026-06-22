"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Loader2, Search, Briefcase, Globe, Shield, Layout, Database, Smartphone, Server, Zap, ArrowUpRight, ChevronRight, Layers } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ServicesListPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to retire this service module?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices(services.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (iconName: string) => {
    const IconComp = (LucideIcons as any)[iconName || "Globe"] || Globe;
    return <IconComp size={18} />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#5c2d91]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 font-sans pb-10 max-w-7xl mx-auto">
      
      {/* ── Page Header (Vibrant Gradient) ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-gradient-to-r from-[#5c2d91] via-[#00d4ff] to-[#00d15e] text-white p-8 relative overflow-hidden shadow-[0_0_40px_rgba(92,45,145,0.3)]">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#d8b4fe] mb-2 flex items-center gap-2">
            <Layers size={12} /> Capabilities Engine
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Service Modules
          </h1>
          <p className="text-sm text-purple-100 font-medium max-w-xl">
            Manage professional capability modules, technical offerings, and engineering solutions.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Link href="/admin/services/settings">
            <button className="bg-transparent border border-white text-white font-bold py-3 px-6 hover:bg-white hover:text-[#5c2d91] transition-all flex items-center gap-2 uppercase text-xs tracking-widest text-nowrap">
               Settings
            </button>
          </Link>
          <Link href="/admin/services/new">
            <button className="bg-white text-[#5c2d91] font-bold py-3 px-6 hover:bg-gray-100 transition-all flex items-center gap-2 shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_5px_25px_rgba(255,255,255,0.3)] uppercase text-xs tracking-widest text-nowrap">
              <Plus size={16} /> New Node
            </button>
          </Link>
        </div>
      </div>

      {/* ── Stat Cards (Neon Multi-color) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Modules", value: services.length, icon: Briefcase, color: "#5c2d91", bg: "from-[#5c2d91]/10 to-transparent" },
          { label: "Technical Nodes", value: services.reduce((acc, s) => acc + (s.features?.length || 0), 0), icon: Zap, color: "#00d4ff", bg: "from-[#00d4ff]/10 to-transparent" },
          { label: "Core Competencies", value: [...new Set(services.map(s => s.icon))].length, icon: Globe, color: "#00d15e", bg: "from-[#00d15e]/10 to-transparent" },
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
              <p className="relative z-10 text-3xl font-bold text-[#242424] dark:text-white tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Services Grid/Table ── */}
      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 shadow-sm mt-10 group hover:border-[#5c2d91]/30 transition-colors">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 bg-gray-50 dark:bg-[#1a1a1a]">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Filter modules by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-700 focus:border-[#5c2d91] outline-none transition-all text-xs font-bold uppercase tracking-wider"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-8 py-5">Capability Module</th>
                <th className="px-8 py-5">Identity Code</th>
                <th className="px-8 py-5">Production Features</th>
                <th className="px-8 py-5 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <AnimatePresence>
                {filteredServices.map((service) => (
                  <motion.tr 
                    key={service._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group/row hover:bg-gray-50 dark:hover:bg-[#1a1a1a]/50 transition-colors relative"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-5">
                        <div className="w-12 h-12 bg-[#5c2d91]/10 text-[#5c2d91] dark:text-[#d8b4fe] flex items-center justify-center shrink-0 border border-[#5c2d91]/20 group-hover/row:shadow-[0_0_15px_rgba(92,45,145,0.3)] transition-all">
                          {getIcon(service.icon)}
                        </div>
                        <div className="max-w-xs">
                          <p className="text-[13px] font-bold text-[#242424] dark:text-white uppercase tracking-tight group-hover/row:text-[#5c2d91] dark:group-hover/row:text-[#d8b4fe] transition-colors">{service.title}</p>
                          <p className="text-[11px] text-gray-500 line-clamp-2 mt-1.5 leading-relaxed">{service.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <code className="text-[10px] font-black text-[#00d4ff] bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 uppercase tracking-widest">
                        MOD-{service.icon?.toUpperCase() || "CORE"}
                      </code>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-2">
                        {service.features?.slice(0, 3).map((f: string) => (
                          <span key={f} className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase border border-emerald-500/20 tracking-wider">
                            {f}
                          </span>
                        ))}
                        {service.features?.length > 3 && (
                          <span className="text-[9px] font-black text-gray-400 px-2.5 py-1 border border-gray-700 bg-[#121212]">+{service.features.length - 3} MORE</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3 items-center opacity-70 group-hover/row:opacity-100 transition-opacity">
                        <Link href={`/admin/services/${service._id}`}>
                          <button className="border border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-black hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] font-black text-[9px] uppercase tracking-widest px-4 py-2 flex items-center gap-1.5 transition-all">
                             <Edit size={12} /> Configure
                          </button>
                        </Link>
                        <button 
                          className="text-gray-500 hover:text-red-500 p-2 border border-transparent hover:border-red-500/50 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all ml-2"
                          onClick={() => deleteService(service._id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredServices.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-[#5c2d91]/10 rounded-full flex items-center justify-center text-[#5c2d91]">
                        <Briefcase size={32} />
                      </div>
                      <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">No service modules detected in the engine.</p>
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
