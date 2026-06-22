"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const defaultCategories = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#e10098",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "HTML5", level: 98 },
      { name: "CSS3", level: 95 },
      { name: "Bootstrap", level: 90 },
      { name: "Tailwind CSS", level: 92 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#00d4ff",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 88 },
      { name: "PHP", level: 80 },
      { name: "REST APIs", level: 92 },
    ],
  },
  {
    id: "database",
    label: "Database",
    color: "#5c2d91",
    skills: [
      { name: "MongoDB", level: 88 },
      { name: "MySQL", level: 85 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    color: "#e10098",
    skills: [
      { name: "Git", level: 92 },
      { name: "GitHub", level: 95 },
      { name: "Vercel", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 88 },
    ],
  },
  {
    id: "seo",
    label: "SEO & Analytics",
    color: "#00d4ff",
    skills: [
      { name: "Google Search Console", level: 85 },
      { name: "Google Analytics", level: 80 },
      { name: "Technical SEO", level: 88 },
    ],
  },
  {
    id: "design",
    label: "Design",
    color: "#5c2d91",
    skills: [
      { name: "Adobe Photoshop", level: 80 },
      { name: "Canva", level: 90 },
      { name: "Motion Graphics", level: 75 },
    ],
  },
];

const defaultAllTags = [
  "React.js", "Next.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS",
  "Node.js", "Express.js", "PHP", "REST APIs",
  "MongoDB", "MySQL",
  "Git", "GitHub", "Vercel", "VS Code", "Postman",
  "Google Search Console", "Google Analytics", "Technical SEO",
  "Adobe Photoshop", "Canva", "Motion Graphics",
];

export function TechStack({ skills: dbSkills }: { skills?: any[] }) {
  const [active, setActive] = useState("Frontend");

  // Format DB skills into categories
  let dynamicCategories: any[] = [];
  let dynamicTags: string[] = [];
  
  if (dbSkills && dbSkills.length > 0) {
    const cats: Record<string, any[]> = {};
    dbSkills.forEach(s => {
      const cat = s.category || "Other";
      if (!cats[cat]) cats[cat] = [];
      cats[cat].push({ name: s.name, level: s.level });
      dynamicTags.push(s.name);
    });

    const colors = ["#e10098", "#00d4ff", "#5c2d91", "#5c2d91", "#004b50"];
    let i = 0;
    for (const [catName, catSkills] of Object.entries(cats)) {
      dynamicCategories.push({
        id: catName,
        label: catName,
        color: colors[i % colors.length],
        skills: catSkills.sort((a, b) => b.level - a.level)
      });
      i++;
    }
  }

  const finalCategories = dynamicCategories.length > 0 ? dynamicCategories : defaultCategories;
  const finalTags = dynamicTags.length > 0 ? dynamicTags : defaultAllTags;

  // Make sure 'active' exists in the categories
  if (!finalCategories.find(c => c.id === active)) {
    setActive(finalCategories[0]?.id || "top");
  }

  const current = finalCategories.find((c) => c.id === active) || finalCategories[0];

  return (
    <section className="py-24 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest">Expertise</div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">
              Skills &amp; <span className="text-[#00d4ff]">Arsenal</span>
            </h2>
            <p className="text-sm md:text-base text-[#505050] dark:text-gray-400 max-w-xl font-medium">
              Full-stack MERN developer with strong command over modern web technologies, tools, and soft skills.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Tab Selector */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:min-w-[220px] pb-2 lg:pb-0">
            {finalCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`relative flex items-center gap-3 px-5 py-3.5 text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap text-left group
                  ${active === cat.id
                    ? "bg-[#f2f2f2] dark:bg-[#1a1a1a] text-[#242424] dark:text-white border-l-2 border-[#00d4ff]"
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
                {current.skills.map((skill: any, i: number) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="group bg-[#f7f7f7] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-5 hover:border-[#00d4ff] dark:hover:border-[#00d4ff] transition-all"
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
          {finalTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest border border-gray-200 dark:border-gray-700 text-[#505050] dark:text-gray-400 hover:border-[#00d4ff] hover:text-[#00d4ff] dark:hover:border-[#00d4ff] dark:hover:text-[#4da3ff] transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
