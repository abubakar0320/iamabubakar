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
  Monitor
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
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0067b8]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-[#242424] dark:text-white tracking-tight uppercase">Project Asset Vault</h1>
          <p className="text-sm text-gray-500 mt-2">Manage and monitor technical portfolio assets across production sectors.</p>
        </div>
        <Link href="/admin/projects/new">
          <button className="bg-[#0067b8] text-white font-semibold py-3 px-8 hover:bg-[#005da6] transition-all flex items-center gap-2 shadow-lg shadow-blue-500/10 uppercase text-xs tracking-widest">
            <Plus size={18} /> New Architecture
          </button>
        </Link>
      </div>

      {/* Microsoft Style Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Deployed Assets", value: projects.length, icon: Monitor, color: "text-[#0067b8]" },
          { label: "Active Tech Nodes", value: [...new Set(projects.flatMap(p => p.tech || []))].length, icon: Zap, color: "text-[#0067b8]" },
          { label: "Sector Coverage", value: [...new Set(projects.map(p => p.category))].length, icon: Briefcase, color: "text-[#0067b8]" },
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
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 text-sm font-semibold text-gray-400">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search assets by title or classification..."
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
                <th className="px-8 py-4">Asset identity</th>
                <th className="px-8 py-4">Classification</th>
                <th className="px-8 py-4">Technology stack</th>
                <th className="px-8 py-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.tr 
                    key={project._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-10 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                          {project.image ? (
                            <img src={project.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-300">
                              <FileCode size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-[#242424] dark:text-white uppercase tracking-tight">{project.title}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Ref: {project._id.slice(-6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-[#0067b8] dark:text-[#4da3ff] rounded-sm text-[10px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800/50">
                        {project.category || "General"}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech?.slice(0, 3).map((t: string) => (
                          <span key={t} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-sm text-[9px] font-black uppercase tracking-tighter">
                            {t}
                          </span>
                        ))}
                        {project.tech?.length > 3 && (
                          <span className="text-[9px] font-black text-gray-300">+{project.tech.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        <Link href={`/admin/projects/${project._id}`}>
                          <button className="text-[#0067b8] dark:text-[#4da3ff] hover:underline font-bold text-[11px] uppercase tracking-widest flex items-center gap-1">
                             Optimize <Edit size={12} />
                          </button>
                        </Link>
                        <button 
                          className="text-gray-400 hover:text-red-600 p-1.5 transition-colors"
                          onClick={() => deleteProject(project._id)}
                        >
                          <Trash2 size={16} />
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
                      <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-300">
                        <FileCode size={32} />
                      </div>
                      <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">The project vault is currently empty.</p>
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
