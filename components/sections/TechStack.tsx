"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#0067b8",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML5 / CSS3", level: 97 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#107c10",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "PHP", level: 80 },
      { name: "Python", level: 75 },
      { name: "REST APIs", level: 92 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    id: "database",
    label: "Database",
    color: "#d83b01",
    skills: [
      { name: "MongoDB", level: 88 },
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 78 },
      { name: "Firebase", level: 82 },
      { name: "Redis", level: 65 },
      { name: "Supabase", level: 72 },
    ],
  },
  {
    id: "networking",
    label: "Networking & DevOps",
    color: "#5c2d91",
    skills: [
      { name: "Cisco Packet Tracer", level: 90 },
      { name: "Wireshark", level: 85 },
      { name: "Docker", level: 72 },
      { name: "Linux / Bash", level: 80 },
      { name: "AWS Basics", level: 65 },
      { name: "Git / GitHub", level: 93 },
    ],
  },
];

export function TechStack() {
  const [active, setActive] = useState("frontend");
  const current = categories.find((c) => c.id === active)!;

  return (
    <section className="py-24 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">Expertise</div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">
              Tech <span className="text-[#0067b8]">Arsenal</span>
            </h2>
            <p className="text-sm md:text-base text-[#505050] dark:text-gray-400 max-w-xl font-medium">
              A modern, battle-tested toolkit spanning full-stack development, networking, databases, and cloud infrastructure.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Tab Selector */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:min-w-[200px] pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`relative flex items-center gap-3 px-5 py-3.5 text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap text-left group
                  ${active === cat.id
                    ? "bg-[#f2f2f2] dark:bg-[#1a1a1a] text-[#242424] dark:text-white border-l-2 border-[#0067b8]"
                    : "text-[#505050] dark:text-gray-500 hover:text-[#242424] dark:hover:text-white hover:bg-[#f9f9f9] dark:hover:bg-[#1a1a1a] border-l-2 border-transparent"
                  }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-125"
                  style={{ backgroundColor: active === cat.id ? cat.color : "#ccc" }}
                />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skills Panel */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {current.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="group bg-[#f7f7f7] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-5 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-all"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-[#242424] dark:text-white">{skill.name}</span>
                      <span
                        className="text-xs font-black tabular-nums"
                        style={{ color: current.color }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-none overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: i * 0.06, ease: "easeOut" }}
                        className="h-full rounded-none"
                        style={{ backgroundColor: current.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Badge Row */}
        <div className="mt-16 flex flex-wrap gap-3">
          {["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "MySQL", "PHP", "Python", "Docker", "AWS", "Git", "Cisco", "Linux", "Figma", "Vercel", "Firebase"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest border border-gray-200 dark:border-gray-700 text-[#505050] dark:text-gray-400 hover:border-[#0067b8] hover:text-[#0067b8] dark:hover:border-[#0067b8] dark:hover:text-[#4da3ff] transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
