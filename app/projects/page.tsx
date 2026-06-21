"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode, Loader2, ChevronRight, Zap, Search,
  Github, ExternalLink, Star, GitFork, Globe, Code2,
  Cpu, Layout, Database, Terminal
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── GitHub Live Repos (abubakar0320) ──────────────────────────────────────
const githubProjects = [
  {
    id: "gh-1",
    name: "iamabubakar",
    displayTitle: "Personal Portfolio Website",
    description:
      "A full-featured personal portfolio website built with Next.js, TypeScript, Node.js, and MongoDB. Includes admin panel, project showcase, services, contact form, and SEO optimization.",
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    category: "Full Stack",
    github: "https://github.com/abubakar0320/iamabubakar",
    live: "https://iamabubakar.site",
    stars: 0,
    language: "TypeScript",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1469&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "gh-2",
    name: "jamia_shar_e_rabbani",
    displayTitle: "Jamia Share Rabbani — Institutional Website",
    description:
      "Modern institutional website for Jamia Share Rabbani, built with React.js and TypeScript. Responsive UI with accessible navigation, mobile-first design, and fast performance.",
    tech: ["React.js", "TypeScript", "CSS3", "Vercel"],
    category: "Frontend",
    github: "https://github.com/abubakar0320/jamia_shar_e_rabbani",
    live: "https://jamia-shar-e-rabbani.vercel.app",
    stars: 0,
    language: "TypeScript",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1470&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "gh-3",
    name: "Estatehub-mern",
    displayTitle: "EstateHub — MERN Real Estate Platform",
    description:
      "Full-stack real estate listing platform built with the MERN stack. Features property search, listings, user authentication, and a clean dashboard for property management.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    category: "Full Stack",
    github: "https://github.com/abubakar0320/Estatehub-mern",
    live: "https://estatehub-mern.vercel.app",
    stars: 0,
    language: "JavaScript",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1473&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "gh-4",
    name: "Jamia-shere-rabbani",
    displayTitle: "Jamia Shere Rabbani — PHP Website",
    description:
      "Original institutional website for Jamia Shere Rabbani Mananwala, developed in PHP. Achieved 8 GitHub stars and 1 fork. Includes course info, news, and contact pages.",
    tech: ["PHP", "HTML5", "CSS3", "MySQL"],
    category: "PHP",
    github: "https://github.com/abubakar0320/Jamia-shere-rabbani",
    live: null,
    stars: 8,
    language: "PHP",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1374&auto=format&fit=crop",
    featured: false,
  },
  {
    id: "gh-5",
    name: "Clothes",
    displayTitle: "Clothes Store — PHP E-Commerce",
    description:
      "PHP-based e-commerce web application for a clothing store. Includes product listings, cart system, and basic admin panel for inventory management.",
    tech: ["PHP", "MySQL", "HTML5", "CSS3"],
    category: "PHP",
    github: "https://github.com/abubakar0320/Clothes",
    live: null,
    stars: 0,
    language: "PHP",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop",
    featured: false,
  },
];

const categoryIcons: Record<string, React.ElementType> = {
  "Full Stack": Cpu,
  "Frontend": Layout,
  "PHP": Terminal,
  "React": Code2,
};

const allCategories = ["All", "Full Stack", "Frontend", "PHP"];

const techColors: Record<string, string> = {
  "Next.js": "#000000",
  "React.js": "#61dafb",
  "TypeScript": "#3178c6",
  "JavaScript": "#f7df1e",
  "Node.js": "#68a063",
  "MongoDB": "#47a248",
  "Express.js": "#000000",
  "PHP": "#777bb4",
  "MySQL": "#4479a1",
  "HTML5": "#e34f26",
  "CSS3": "#1572b6",
};

// ─── Stat items ─────────────────────────────────────────────────────────────
const pageStats = [
  { label: "Total Projects", value: "5+", icon: FileCode },
  { label: "Live Deployments", value: "3", icon: Globe },
  { label: "GitHub Stars", value: "9", icon: Star },
  { label: "Technologies Used", value: "12+", icon: Code2 },
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

  // Merge GitHub projects + DB projects (DB takes priority if same title)
  const allProjects = [...githubProjects];

  const filtered = allProjects.filter((p) => {
    const matchCat = filter === "All" || p.category === filter;
    const matchSearch =
      search === "" ||
      p.displayTitle.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = githubProjects.filter((p) => p.featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111]">
        <Loader2 className="animate-spin h-12 w-12 text-[#0067b8]" />
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
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest mb-4">Portfolio</div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6 leading-tight">
              Project <span className="text-[#0067b8]">Showcase</span>
            </h1>
            <p className="text-sm md:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              Real-world projects built with modern technology — from institutional websites
              and real estate platforms to AI-powered HR systems.
            </p>
            <a
              href="https://github.com/abubakar0320"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0067b8] text-white font-bold px-6 py-3 hover:bg-[#005da6] transition-colors text-sm uppercase tracking-widest"
            >
              <Github size={16} /> View GitHub Profile
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
          ══════════════════════════════════════════ */}
      <section className="bg-[#0067b8] py-8 px-4 md:px-12 xl:px-20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-white">
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
                <div className="text-[10px] font-bold uppercase tracking-widest text-blue-100">{s.label}</div>
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
              <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">Highlighted Work</div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
                Featured <span className="text-[#0067b8]">Projects</span>
              </h2>
            </div>
            <a
              href="https://github.com/abubakar0320"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0067b8] hover:underline"
            >
              <Github size={14} /> All Repos
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-all flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.displayTitle}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0067b8] text-white text-[10px] font-black uppercase tracking-widest">
                    {p.category}
                  </div>
                  {p.live && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#107c10] text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-[#242424] dark:text-white mb-2 group-hover:text-[#0067b8] transition-colors leading-snug">
                    {p.displayTitle}
                  </h3>
                  <p className="text-sm text-[#505050] dark:text-gray-400 leading-relaxed mb-4 flex-1 line-clamp-3">
                    {p.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border border-gray-200 dark:border-gray-700 text-[#505050] dark:text-gray-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#0067b8] hover:underline"
                      >
                        <ExternalLink size={12} /> Live Site
                      </a>
                    )}
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#505050] dark:text-gray-400 hover:text-[#0067b8] dark:hover:text-[#4da3ff]"
                    >
                      <Github size={12} /> Source Code
                    </a>
                    {p.stars > 0 && (
                      <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-yellow-500">
                        <Star size={11} fill="currentColor" /> {p.stars}
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
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">All Work</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
              Complete <span className="text-[#0067b8]">Portfolio</span>
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
                        ? "bg-[#0067b8] text-white border-[#0067b8]"
                        : "bg-transparent text-[#505050] dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-[#0067b8] hover:text-[#0067b8]"
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
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#f2f2f2] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-[#242424] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0067b8] transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-gray-400 shrink-0">
              <Zap size={13} className="text-[#0067b8]" />
              {filtered.length} Projects Found
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className="group flex flex-col bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-all overflow-hidden"
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
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest text-[#0067b8]">
                      {p.category}
                    </div>
                    {p.live && (
                      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-[#107c10] ring-2 ring-white animate-pulse" title="Live" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-[#242424] dark:text-white mb-2 group-hover:text-[#0067b8] transition-colors leading-snug line-clamp-2">
                      {p.displayTitle}
                    </h3>
                    <p className="text-xs text-[#505050] dark:text-gray-400 leading-relaxed mb-4 flex-1 line-clamp-3">
                      {p.description}
                    </p>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {p.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-[#f2f2f2] dark:bg-[#252525] text-[#505050] dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-800 mt-auto">
                      {p.live ? (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-[#0067b8] hover:underline"
                        >
                          <ExternalLink size={11} /> Live
                        </a>
                      ) : (
                        <span className="text-[11px] font-black uppercase tracking-widest text-gray-300 dark:text-gray-600">No Live</span>
                      )}
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-[#505050] dark:text-gray-400 hover:text-[#0067b8] ml-auto"
                      >
                        <Github size={11} /> Code
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
                className="text-[#0067b8] font-black uppercase text-xs hover:underline tracking-widest"
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
              <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">Open Source</div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">
                See More on <span className="text-[#0067b8]">GitHub</span>
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
              className="inline-flex items-center gap-3 bg-[#242424] dark:bg-white text-white dark:text-[#242424] font-black px-8 py-4 hover:bg-[#0067b8] dark:hover:bg-[#0067b8] dark:hover:text-white transition-colors uppercase tracking-widest text-sm shrink-0"
            >
              <Github size={18} /> github.com/abubakar0320
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT CTA
          ══════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-12 xl:px-20 bg-[#0067b8]">
        <div className="max-w-[1600px] mx-auto text-center text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-tight">
            Have a Project in Mind?
          </h2>
          <p className="text-sm md:text-base text-blue-100 max-w-xl mx-auto font-medium">
            Whether it's a new website, an FYP, or a full-stack web application —
            let's collaborate and build something great together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#0067b8] font-black px-8 py-3.5 hover:bg-[#f2f2f2] transition-colors uppercase tracking-widest text-sm"
          >
            Start a Conversation <ChevronRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
