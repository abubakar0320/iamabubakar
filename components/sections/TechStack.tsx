"use client";

import React from "react";
import { motion } from "framer-motion";

const techCategories = [
  {
    category: "Frontend",
    techs: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    category: "Backend",
    techs: ["Node.js", "Express.js", "PHP", "Python", "REST APIs", "GraphQL"],
  },
  {
    category: "Database",
    techs: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Redis", "Supabase"],
  },
  {
    category: "Networking & Tools",
    techs: ["Cisco Packet Tracer", "Wireshark", "Docker", "Git", "Linux", "AWS"],
  },
];

export function TechStack() {
  return (
    <section className="py-24 bg-[#f2f2f2] dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">
              Tech <span className="text-[#0067b8]">Stack</span>
            </h2>
            <p className="text-sm md:text-lg text-[#505050] dark:text-gray-400 max-w-2xl font-medium">
              A modern, battle-tested toolkit spanning full-stack development, networking, and cloud infrastructure.
            </p>
          </div>
          <div className="hidden md:block h-[2px] flex-grow mx-12 bg-gray-200 dark:bg-gray-800 mb-4"></div>
          <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest mb-4">Technologies</div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-colors group"
            >
              <div className="text-xs font-black uppercase tracking-widest text-[#0067b8] mb-4">{cat.category}</div>
              <ul className="space-y-3">
                {cat.techs.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-2 text-sm font-semibold text-[#242424] dark:text-gray-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0067b8] shrink-0" />
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
