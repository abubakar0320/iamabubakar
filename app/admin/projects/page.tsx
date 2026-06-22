"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Loader2, 
  Search, 
  FileCode, 
  Filter, 
  Briefcase, 
  Zap, 
  ArrowUpRight,
  ChevronRight,
  Monitor,
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this architectural masterpiece?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-[#0067b8]"></div>
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
            <LayoutGrid size={12} /> Asset Vault
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Projects Registry
          </h1>
          <p className="text-sm text-blue-100 font-medium max-w-xl">
            Manage and monitor your technical portfolio assets across all production sectors.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 bg-white text-[#0067b8] font-bold px-6 py-3 hover:bg-gray-100 transition-colors text-xs uppercase tracking-widest shadow-lg"
          >
            <Plus size={15} /> New Architecture
          </Link>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Deployed Assets", value: projects.length, icon: Monitor, color: "#0067b8" },
          { label: "Active Tech Nodes", value: [...new Set(projects.flatMap(p => p.tech || []))].length, icon: Zap, color: "#107c10" },
          { label: "Sector Coverage", value: [...new Set(projects.map(p => p.category))].length, icon: Briefcase, color: "#d83b01" },
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

      {/* ── Asset Ledger Grid ── */}
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-sm mt-10">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50 dark:bg-[#242424]">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter size={16} className="text-[#0067b8]" />
            <h2 className="text-sm font-bold text-[#242424] dark:text-white uppercase tracking-wider">Asset Ledger</h2>
          </div>
          <div className="relative flex-grow sm:w-96 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search assets by title or classification..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-[11px] font-bold uppercase tracking-wider"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-8 py-4">Asset Identity</th>
                <th className="px-8 py-4">Classification</th>
                <th className="px-8 py-4">Technology Stack</th>
                <th className="px-8 py-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:border-gray-800 dark:divide-gray-800">
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.tr 
                    key={project._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-gray-50 dark:hover:bg-[#242424]/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-12 bg-gray-100 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                          {project.image ? (
                            <img src={project.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              <FileCode size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-[#242424] dark:text-white uppercase tracking-tight">{project.title}</p>
                          <p className="text-[10px] text-[#0067b8] font-bold uppercase tracking-widest mt-1">Ref: {project._id.slice(-6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/10 text-[#0067b8] dark:text-[#4da3ff] text-[9px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-900/30">
                        {project.category || "General"}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech?.slice(0, 3).map((t: string) => (
                          <span key={t} className="px-2 py-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[9px] font-black uppercase tracking-tighter">
                            {t}
                          </span>
                        ))}
                        {project.tech?.length > 3 && (
                          <span className="px-2 py-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-[#0067b8] text-[9px] font-black uppercase tracking-tighter">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2 items-center">
                        <Link href={`/admin/projects/${project._id}`}>
                          <button className="border border-[#0067b8] text-[#0067b8] dark:border-[#4da3ff] dark:text-[#4da3ff] hover:bg-[#0067b8] hover:text-white dark:hover:bg-[#4da3ff] dark:hover:text-[#1a1a1a] font-black text-[9px] uppercase tracking-widest px-3 py-1.5 flex items-center gap-1 transition-all">
                             <Edit size={10} /> Optimize
                          </button>
                        </Link>
                        <button 
                          className="text-gray-300 hover:text-red-600 p-1.5 transition-colors ml-2"
                          onClick={() => deleteProject(project._id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-300">
                        <FileCode size={32} />
                      </div>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">The project vault is currently empty.</p>
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
