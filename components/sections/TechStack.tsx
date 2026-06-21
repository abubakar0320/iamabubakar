"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "top",
    label: "Top Skills",
    color: "#0067b8",
    skills: [
      { name: "React.js", level: 92 },
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 87 },
      { name: "MongoDB", level: 85 },
      { name: "JavaScript", level: 93 },
      { name: "HTML5 / CSS3", level: 97 },
    ],
  },
  {
    id: "backend",
    label: "Backend & DB",
    color: "#107c10",
    skills: [
      { name: "REST API Design", level: 90 },
      { name: "MySQL", level: 82 },
      { name: "PHP", level: 78 },
      { name: "Laravel", level: 72 },
      { name: "Java", level: 70 },
      { name: "Python", level: 68 },
    ],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    color: "#d83b01",
    skills: [
      { name: "GitHub", level: 93 },
      { name: "C++", level: 75 },
      { name: "MS Word / Excel / PPT", level: 90 },
      { name: "Figma (UI/UX)", level: 72 },
      { name: "Cybersecurity Basics", level: 78 },
      { name: "Digital Content Creation", level: 80 },
    ],
  },
  {
    id: "soft",
    label: "Soft Skills",
    color: "#5c2d91",
    skills: [
      { name: "Problem Solving", level: 95 },
      { name: "Leadership", level: 90 },
      { name: "Critical Thinking", level: 92 },
      { name: "Teamwork", level: 93 },
      { name: "Time Management", level: 88 },
      { name: "Communication", level: 85 },
    ],
  },
];

const allTags = [
  "React.js", "Node.js", "Express.js", "MongoDB", "JavaScript",
  "HTML5", "CSS3", "REST API", "MySQL", "GitHub",
  "PHP", "Java", "Laravel", "C++", "Python",
  "Responsive Design", "UI/UX", "Cybersecurity", "MS Office", "Figma",
];

export function TechStack() {
  const [active, setActive] = useState("top");
  const current = categories.find((c) => c.id === active)!;

  return (
    <section className="py-24 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">Expertise</div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">
              Skills &amp; <span className="text-[#0067b8]">Arsenal</span>
            </h2>
            <p className="text-sm md:text-base text-[#505050] dark:text-gray-400 max-w-xl font-medium">
              Full-stack MERN developer with strong command over modern web technologies, tools, and soft skills.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Tab Selector */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:min-w-[220px] pb-2 lg:pb-0">
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
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: i * 0.06, ease: "easeOut" }}
                        className="h-full"
                        style={{ backgroundColor: current.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tag Cloud */}
        <div className="mt-16 flex flex-wrap gap-3">
          {allTags.map((tag) => (
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
