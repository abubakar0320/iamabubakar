"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Loader2, Search, Briefcase, Globe, Shield, Layout, Database, Smartphone, Server, Zap, ArrowUpRight, ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/Button";
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
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0067b8]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-[#242424] dark:text-white tracking-tight uppercase">Service Control Engine</h1>
          <p className="text-sm text-gray-500 mt-2">Manage professional capability modules and engineering solutions.</p>
        </div>
        <Link href="/admin/services/new">
          <button className="bg-[#0067b8] text-white font-semibold py-3 px-8 hover:bg-[#005da6] transition-all flex items-center gap-2 shadow-lg shadow-blue-500/10 uppercase text-xs tracking-widest text-nowrap">
            <Plus size={18} /> New Service Node
          </button>
        </Link>
      </div>

      {/* Microsoft Style Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Active Modules", value: services.length, icon: Briefcase, color: "text-[#0067b8]" },
          { label: "Technical Nodes", value: services.reduce((acc, s) => acc + (s.features?.length || 0), 0), icon: Zap, color: "text-[#0067b8]" },
          { label: "Core Competencies", value: [...new Set(services.map(s => s.icon))].length, icon: Globe, color: "text-[#0067b8]" },
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
              placeholder="Filter modules by title or description..."
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
                <th className="px-8 py-4">Capability Module</th>
                <th className="px-8 py-4">Identity Code</th>
                <th className="px-8 py-4">Production Features</th>
                <th className="px-8 py-4 text-right">Operations</th>
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
                    className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-5">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-[#0067b8] rounded-sm flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800">
                          {getIcon(service.icon)}
                        </div>
                        <div className="max-w-xs">
                          <p className="text-[13px] font-bold text-[#242424] dark:text-white uppercase tracking-tight">{service.title}</p>
                          <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 italic">{service.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <code className="text-[10px] font-black text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-sm">
                        MOD-{service.icon?.toUpperCase() || "CORE"}
                      </code>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-1.5">
                        {service.features?.slice(0, 3).map((f: string) => (
                          <span key={f} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-sm text-[9px] font-black uppercase border border-emerald-100 dark:border-emerald-800/50">
                            {f}
                          </span>
                        ))}
                        {service.features?.length > 3 && (
                          <span className="text-[9px] font-black text-gray-300">+{service.features.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        <Link href={`/admin/services/${service._id}`}>
                          <button className="text-[#0067b8] dark:text-[#4da3ff] hover:underline font-bold text-[11px] uppercase tracking-widest flex items-center gap-1">
                             Configure <Edit size={12} />
                          </button>
                        </Link>
                        <button 
                          className="text-gray-400 hover:text-red-600 p-1.5 transition-colors"
                          onClick={() => deleteService(service._id)}
                        >
                          <Trash2 size={16} />
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
                      <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-300">
                        <Briefcase size={32} />
                      </div>
                      <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">No service modules detected in the engine.</p>
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
