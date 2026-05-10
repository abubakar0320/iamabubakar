"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Filter, FileCode, Loader2, ChevronRight, Globe, Zap, Search } from "lucide-react";
import { Github } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = ["All", "Full Stack", "React", "Frontend", "PHP"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-[#0067b8]" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#121212] min-h-screen text-[#242424] dark:text-white font-sans pb-20">
      {/* Microsoft Style Banner - Optimized for Mobile */}
      <section className="bg-[#f2f2f2] dark:bg-[#1a1a1a] py-10 md:py-20 px-4 md:px-12 xl:px-20 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl font-semibold mb-4 md:mb-6 tracking-tight">Project <span className="text-[#0067b8] dark:text-[#4da3ff]">Portfolio</span></h1>
            <p className="text-sm md:text-lg text-[#505050] dark:text-gray-300 mb-0 leading-relaxed">
              Explore my digital architecture vault. From enterprise-grade full-stack systems to high-performance frontend interfaces, 
              each asset is engineered for scalability and impact.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 mt-8 md:mt-12">
        {/* Microsoft Style Filters - Responsive Scrollable on Mobile */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12">
           <div className="flex flex-col gap-4 overflow-hidden">
              <span className="text-[10px] md:text-sm font-black uppercase tracking-widest text-gray-400">Technical Sector</span>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={cn(
                      "px-4 py-1.5 text-xs md:text-sm font-semibold transition-all border-b-2 whitespace-nowrap",
                      filter === cat
                        ? "border-[#0067b8] text-[#0067b8] dark:text-[#4da3ff] dark:border-[#4da3ff]"
                        : "border-transparent text-[#242424] dark:text-gray-400 hover:text-[#0067b8]"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
           </div>
           
           <div className="flex items-center gap-2 text-[0.6rem] md:text-[0.7rem] font-black uppercase text-gray-400 tracking-widest border-t md:border-none pt-4 md:pt-0">
              <Zap size={14} className="text-blue-600" /> {filteredProjects.length} Assets Found
           </div>
        </div>

        {/* Projects Grid - Microsoft Card Style Optimized for Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 md:gap-y-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col group bg-white dark:bg-[#1a1a1a] shadow-[0_2px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] dark:shadow-none dark:border dark:border-[#333] h-full transition-all"
              >
                <div className="w-full aspect-video overflow-hidden relative">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-300">
                       <FileCode size={40} />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 px-2 py-0.5 bg-white/90 dark:bg-[#242424]/90 backdrop-blur-md rounded-[2px] text-[0.55rem] font-black uppercase tracking-widest text-[#0067b8] dark:text-[#4da3ff] shadow-sm border border-gray-100/50">
                    {project.category}
                  </div>
                </div>
                
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-[#242424] dark:text-white leading-snug group-hover:text-[#0067b8] transition-colors">{project.title}</h3>
                  <p className="text-xs md:text-sm text-[#505050] dark:text-gray-300 mb-6 flex-grow leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.slice(0, 4).map((t: string) => (
                      <span key={t} className="text-[8px] md:text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 bg-gray-50 dark:bg-gray-800 text-gray-400 border border-gray-100 dark:border-gray-700 rounded-sm">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 mt-auto">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#0067b8] dark:text-[#4da3ff] font-bold text-[11px] md:text-sm hover:underline group/link uppercase tracking-wider">
                        Live site <ChevronRight size={14} className="ml-0.5 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#0067b8] dark:text-[#4da3ff] font-bold text-[11px] md:text-sm hover:underline group/link uppercase tracking-wider">
                        GitHub <ChevronRight size={14} className="ml-0.5 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 md:py-32 bg-gray-50 dark:bg-gray-800/20 rounded-[2rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
            <Search className="mx-auto mb-4 text-gray-300" size={40} />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-sm px-6">No assets found in this technical sector.</p>
            <button onClick={() => setFilter("All")} className="mt-6 text-[#0067b8] font-black uppercase text-xs hover:underline tracking-widest">Reset Discovery</button>
          </div>
        )}
      </div>
    </div>
  );
}
