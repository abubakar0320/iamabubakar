"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode, Loader2, ChevronRight, Zap, Search,
  ExternalLink, Star, GitFork, Globe, Code2,
  Cpu, LayoutGrid, Terminal, GitBranch
} from "lucide-react";

// GitHub brand SVG icon (not in lucide-react)
const GithubIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Stat items ─────────────────────────────────────────────────────────────
const pageStats = [
  { label: "Total Projects", value: "3+", icon: FileCode },
  { label: "Live Deployments", value: "2", icon: Globe },
  { label: "GitHub Stars", value: "0", icon: Star },
  { label: "Technologies Used", value: "10+", icon: Code2 },
];

export default function ProjectsPage() {
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setDbProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Map DB Projects to match the expected format
  const formattedDbProjects = dbProjects.map((p: any) => ({
    id: p._id,
    name: p.title,
    displayTitle: p.title,
    description: p.description,
    tech: p.tech || [],
    category: p.category,
    github: p.github || "",
    live: p.live || null,
    stars: 0,
    language: p.tech?.[0] || "Unknown",
    image: p.image || "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1469&auto=format&fit=crop",
    featured: true // DB projects are featured by default
  }));

  const allProjects = formattedDbProjects;

  const categoriesSet = new Set(allProjects.map(p => p.category));
  const allCategories = ["All", ...Array.from(categoriesSet)];

  const categoryIcons: Record<string, React.ElementType> = {
    "Full Stack": Cpu,
    "Frontend": LayoutGrid,
    "PHP": Terminal,
    "React": Code2,
    "All": FileCode
  };

  const filtered = allProjects.filter((p) => {
    const matchCat = filter === "All" || p.category === filter;
    const matchSearch =
      search === "" ||
      p.displayTitle.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = allProjects.filter((p) => p.featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111]">
        <Loader2 className="animate-spin h-12 w-12 text-[#e10098]" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#111] min-h-screen text-[#242424] dark:text-white font-sans">

      {/* ══════════════════════════════════════════
          HERO BANNER
          ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0d0d0d] py-20 md:py-32 px-4 md:px-12 xl:px-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Projects Background"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent z-10" />
        <div className="relative z-20 max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest mb-4">Portfolio</div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6 leading-tight">
              Project <span className="bg-gradient-to-r from-[#e10098] to-[#00d4ff] bg-clip-text text-transparent">Showcase</span>
            </h1>
            <p className="text-sm md:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              Real-world projects built with modern technology — from institutional websites
              and real estate platforms to AI-powered HR systems.
            </p>
            <a
              href="https://github.com/abubakar0320"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#e10098] to-[#00d4ff] text-white font-bold px-6 py-3 hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all text-sm uppercase tracking-widest"
            >
              <GithubIcon size={16} /> View GitHub Profile
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
          ══════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] py-8 px-4 md:px-12 xl:px-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-white relative z-10">
          {pageStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4"
            >
              <s.icon size={28} className="opacity-70 shrink-0" />
              <div>
                <div className="text-2xl md:text-3xl font-black tracking-tighter">{s.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-pink-100">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED PROJECTS — Top 3
          ══════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-12 xl:px-20 bg-[#f2f2f2] dark:bg-[#0d0d0d] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <div className="text-xs font-black uppercase text-[#e10098] tracking-widest">Highlighted Work</div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
                Featured <span className="bg-gradient-to-r from-[#e10098] to-[#00d4ff] bg-clip-text text-transparent">Projects</span>
              </h2>
            </div>
            <a
              href="https://github.com/abubakar0320"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00d4ff] hover:text-[#e10098] transition-colors"
            >
              <GithubIcon size={14} /> All Repos
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#e10098] dark:hover:border-[#e10098] transition-all flex flex-col overflow-hidden shadow-sm hover:shadow-[0_0_15px_rgba(225,0,152,0.15)]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] sm:h-48 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.displayTitle}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-[#e10098] to-[#00d4ff] text-white text-[10px] font-black uppercase tracking-widest">
                    {p.category}
                  </div>
                  {p.live && (
                    <div className="absolute top-3 right-3 px-1.5 sm:px-2.5 py-1 bg-[#107c10] text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> <span className="hidden sm:inline">Live</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-xs sm:text-lg font-bold text-[#242424] dark:text-white mb-2 group-hover:text-[#e10098] transition-colors leading-snug line-clamp-2">
                    {p.displayTitle}
                  </h3>
                  <p className="text-[9px] sm:text-sm text-[#505050] dark:text-gray-400 leading-relaxed mb-4 flex-1 line-clamp-3">
                    {p.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-5">
                    {p.tech.slice(0, 3).map((t: string) => (
                      <span
                        key={t}
                        className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest px-1.5 sm:px-2 py-0.5 border border-gray-200 dark:border-gray-700 text-[#505050] dark:text-gray-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-5 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-xs font-black uppercase tracking-widest text-[#00d4ff] hover:text-[#e10098] transition-colors"
                      >
                        <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> <span className="hidden sm:inline">Live Site</span>
                      </a>
                    )}
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-xs font-black uppercase tracking-widest text-[#505050] dark:text-gray-400 hover:text-[#00d4ff]"
                    >
                      <GithubIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Code
                    </a>
                    {p.stars > 0 && (
                      <span className="ml-auto inline-flex items-center gap-1 text-[9px] sm:text-xs font-bold text-yellow-500">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" /> {p.stars}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ALL PROJECTS — With Filter + Search
          ══════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-12 xl:px-20">
        <div className="max-w-[1600px] mx-auto">

          {/* Section header */}
          <div className="mb-12 space-y-2">
            <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest">All Work</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
              Complete <span className="bg-gradient-to-r from-[#e10098] to-[#00d4ff] bg-clip-text text-transparent">Portfolio</span>
            </h2>
          </div>

          {/* Filter + Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            {/* Category Filters */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {allCategories.map((cat) => {
                const Icon = categoryIcons[cat] || FileCode;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                      filter === cat
                        ? "bg-gradient-to-r from-[#e10098] to-[#00d4ff] text-white border-transparent"
                        : "bg-transparent text-[#505050] dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-[#00d4ff] hover:text-[#00d4ff]"
                    )}
                  >
                    {cat !== "All" && <Icon size={12} />}
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative max-w-xs w-full">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects or tech..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#f2f2f2] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-[#242424] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#00d4ff] transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-gray-400 shrink-0">
              <Zap size={13} className="text-[#e10098]" />
              {filtered.length} Projects Found
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className="group flex flex-col bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#00d4ff] dark:hover:border-[#00d4ff] transition-all overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.displayTitle}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute top-2 left-2 px-1.5 sm:px-2 py-0.5 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-sm text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-[#e10098]">
                      {p.category}
                    </div>
                    {p.live && (
                      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-[#107c10] ring-2 ring-white animate-pulse" title="Live" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-5 flex flex-col flex-1">
                    <h3 className="text-[11px] sm:text-base font-bold text-[#242424] dark:text-white mb-1.5 sm:mb-2 group-hover:text-[#00d4ff] transition-colors leading-snug line-clamp-2">
                      {p.displayTitle}
                    </h3>
                    <p className="text-[9px] sm:text-xs text-[#505050] dark:text-gray-400 leading-relaxed mb-3 sm:mb-4 flex-1 line-clamp-3">
                      {p.description}
                    </p>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {p.tech.slice(0, 3).map((t: string) => (
                        <span
                          key={t}
                          className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-[#f2f2f2] dark:bg-[#252525] text-[#505050] dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-2 sm:gap-4 pt-3 border-t border-gray-100 dark:border-gray-800 mt-auto">
                      {p.live ? (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[11px] font-black uppercase tracking-widest text-[#00d4ff] hover:text-[#e10098] transition-colors"
                        >
                          <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Live
                        </a>
                      ) : (
                        <span className="text-[8px] sm:text-[11px] font-black uppercase tracking-widest text-gray-300 dark:text-gray-600">No Live</span>
                      )}
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[11px] font-black uppercase tracking-widest text-[#505050] dark:text-gray-400 hover:text-[#00d4ff] ml-auto"
                      >
                        <GithubIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 border-2 border-dashed border-gray-200 dark:border-gray-800">
              <Search className="mx-auto mb-4 text-gray-300" size={36} />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">
                No projects found
              </p>
              <button
                onClick={() => { setFilter("All"); setSearch(""); }}
                className="text-transparent bg-gradient-to-r from-[#e10098] to-[#00d4ff] bg-clip-text font-black uppercase text-xs hover:opacity-80 tracking-widest"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GITHUB CTA SECTION
          ══════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-12 xl:px-20 bg-[#f2f2f2] dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-10 md:p-14">
            <div className="space-y-3 max-w-xl">
              <div className="text-xs font-black uppercase text-[#e10098] tracking-widest">Open Source</div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">
                See More on <span className="text-transparent bg-gradient-to-r from-[#e10098] to-[#00d4ff] bg-clip-text">GitHub</span>
              </h2>
              <p className="text-sm text-[#505050] dark:text-gray-400 leading-relaxed font-medium">
                All projects are open source and available on GitHub. Explore the source code,
                raise issues, or fork and contribute to any repository.
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs font-bold text-[#505050] dark:text-gray-400">
                <span className="flex items-center gap-1"><Star size={13} className="text-yellow-500" fill="currentColor" /> 9 Total Stars</span>
                <span>·</span>
                <span className="flex items-center gap-1"><GitFork size={13} /> 1 Fork</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Globe size={13} className="text-[#107c10]" /> 3 Live Sites</span>
              </div>
            </div>
            <a
              href="https://github.com/abubakar0320"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#e10098] to-[#00d4ff] text-white font-black px-8 py-4 hover:shadow-[0_0_15px_rgba(225,0,152,0.4)] transition-all uppercase tracking-widest text-sm shrink-0"
            >
              <GithubIcon size={18} /> github.com/abubakar0320
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT CTA
          ══════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-12 xl:px-20 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="max-w-[1600px] mx-auto text-center text-white space-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-tight">
            Have a Project in Mind?
          </h2>
          <p className="text-sm md:text-base text-pink-100 max-w-xl mx-auto font-medium">
            Whether it's a new website, an FYP, or a full-stack web application —
            let's collaborate and build something great together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#5c2d91] font-black px-8 py-3.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all uppercase tracking-widest text-sm"
          >
            Start a Conversation <ChevronRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
