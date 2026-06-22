"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  FileCode, 
  Filter, 
  Briefcase, 
  Zap, 
  Monitor,
  LayoutGrid
} from "lucide-react";
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

  // Array of vibrant colors for tech badges to make it beautiful
  const badgeColors = [
    "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    "bg-purple-500/10 text-purple-500 border-purple-500/20",
    "bg-pink-500/10 text-pink-500 border-pink-500/20",
    "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "bg-blue-500/10 text-pink-500 border-blue-500/20"
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 font-sans pb-10 max-w-7xl mx-auto">
      
      {/* ── Page Header (Vibrant Gradient) ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-gradient-to-r from-[#0067b8] via-[#5c2d91] to-[#e10098] text-white p-8 relative overflow-hidden shadow-[0_0_40px_rgba(92,45,145,0.2)]">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-pink-200 mb-2 flex items-center gap-2">
            <LayoutGrid size={12} /> Asset Vault
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Projects Registry
          </h1>
          <p className="text-sm text-purple-100 font-medium max-w-xl">
            Manage and monitor your technical portfolio assets across all production sectors.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 bg-white text-[#5c2d91] font-bold px-6 py-3 hover:bg-gray-100 transition-colors text-xs uppercase tracking-widest shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_5px_25px_rgba(255,255,255,0.3)]"
          >
            <Plus size={15} /> New Architecture
          </Link>
        </div>
      </div>

      {/* ── Stat Cards (Multi-color Accents) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Deployed Assets", value: projects.length, icon: Monitor, color: "#00d4ff", bg: "from-[#00d4ff]/10 to-transparent" },
          { label: "Active Tech Nodes", value: [...new Set(projects.flatMap(p => p.tech || []))].length, icon: Zap, color: "#e10098", bg: "from-[#e10098]/10 to-transparent" },
          { label: "Sector Coverage", value: [...new Set(projects.map(p => p.category))].length, icon: Briefcase, color: "#00d15e", bg: "from-[#00d15e]/10 to-transparent" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div 
              className={cn(
                "relative bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-6 overflow-hidden group cursor-pointer transition-all duration-300",
                "hover:border-transparent hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]"
              )}
            >
              {/* Animated Glowing Left Border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-2" style={{ backgroundColor: stat.color, boxShadow: `0 0 15px ${stat.color}` }}></div>
              
              {/* Subtle Gradient Background on Hover */}
              <div className={cn("absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500", stat.bg)}></div>

              <div className="relative z-10 flex items-start justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
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

      {/* ── Asset Ledger Grid ── */}
      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 shadow-sm mt-10">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50 dark:bg-[#1a1a1a]">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="p-1.5 bg-[#5c2d91]/10 border border-[#5c2d91]/20">
               <Filter size={14} className="text-[#5c2d91] dark:text-[#d8b4fe]" />
            </div>
            <h2 className="text-sm font-bold text-[#242424] dark:text-white uppercase tracking-wider">Asset Ledger</h2>
          </div>
          <div className="relative flex-grow sm:w-96 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search assets by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-700 focus:border-[#5c2d91] outline-none transition-all text-[11px] font-bold uppercase tracking-wider"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-8 py-5">Asset Identity</th>
                <th className="px-8 py-5">Classification</th>
                <th className="px-8 py-5">Technology Stack</th>
                <th className="px-8 py-5 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:border-gray-800 dark:divide-gray-800">
              <AnimatePresence>
                {filteredProjects.map((project, idx) => (
                  <motion.tr 
                    key={project._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-gray-50 dark:hover:bg-[#1a1a1a]/50 transition-colors relative"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-12 bg-gray-100 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 overflow-hidden relative group-hover:border-[#00d4ff] transition-colors">
                          {project.image ? (
                            <img src={project.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              <FileCode size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-[#242424] dark:text-white uppercase tracking-tight group-hover:text-[#00d4ff] transition-colors">{project.title}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Ref: {project._id.slice(-6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1.5 bg-[#5c2d91]/10 text-[#5c2d91] dark:text-[#d8b4fe] text-[9px] font-black uppercase tracking-widest border border-[#5c2d91]/20">
                        {project.category || "General"}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tech?.slice(0, 4).map((t: string, i: number) => {
                          const colorClass = badgeColors[i % badgeColors.length];
                          return (
                            <span key={t} className={cn("px-2.5 py-1 text-[9px] font-black uppercase tracking-tighter border", colorClass)}>
                              {t}
                            </span>
                          );
                        })}
                        {project.tech?.length > 4 && (
                          <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-[9px] font-black uppercase tracking-tighter">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3 items-center opacity-70 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/projects/${project._id}`}>
                          <button className="border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] font-black text-[9px] uppercase tracking-widest px-4 py-2 flex items-center gap-1.5 transition-all">
                             <Edit size={10} /> Optimize
                          </button>
                        </Link>
                        <button 
                          className="border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] p-2 transition-all"
                          onClick={() => deleteProject(project._id)}
                        >
                          <Trash2 size={12} />
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
                      <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-400">
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
