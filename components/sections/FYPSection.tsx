"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Users, Layers, Calendar } from "lucide-react";

const highlights = [
  {
    icon: Brain,
    label: "AI/ML Integration",
    desc: "Smart recruitment powered by machine learning algorithms for candidate screening and ranking.",
  },
  {
    icon: Users,
    label: "Team Lead",
    desc: "Leading a cross-functional team of 3 developers with structured Agile workflow and sprint planning.",
  },
  {
    icon: Layers,
    label: "Full-Stack MERN",
    desc: "End-to-end architecture: React.js frontend, Node.js/Express.js backend, MongoDB database.",
  },
  {
    icon: Calendar,
    label: "Jun – Dec 2026",
    desc: "6-month intensive project at Baba Guru Nanak University under faculty supervision.",
  },
];

const techStack = ["React.js", "Node.js", "Express.js", "MongoDB", "AI/ML", "REST API", "JWT Auth", "Tailwind CSS"];

export function FYPSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6"
          >
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">Final Year Project</div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase leading-tight">
              AI-Powered Smart <span className="text-[#0067b8]">Recruitment</span> &amp; HR System
            </h2>
            <p className="text-sm md:text-base text-[#505050] dark:text-gray-400 font-medium leading-relaxed max-w-xl">
              An enterprise-grade AI-powered HR platform for smart recruitment and employee management — built as the Final Year Project at{" "}
              <span className="text-[#242424] dark:text-white font-bold">Baba Guru Nanak University, Nankana Sahib</span>.
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-[#0067b8] text-white"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* University Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 border border-gray-200 dark:border-gray-700 bg-[#f2f2f2] dark:bg-[#1a1a1a] mt-2">
              <div className="text-xs font-black uppercase tracking-widest text-[#0067b8]">BGNU</div>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <div>
                <div className="text-xs font-bold text-[#242424] dark:text-white">Baba Guru Nanak University</div>
                <div className="text-[10px] text-[#505050] dark:text-gray-400 uppercase tracking-widest">Nankana Sahib, Pakistan</div>
              </div>
            </div>
          </motion.div>

          {/* Right — Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#f7f7f7] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-colors group"
              >
                <div className="w-10 h-10 mb-4 flex items-center justify-center bg-white dark:bg-[#252525] border border-gray-200 dark:border-gray-700 text-[#0067b8] group-hover:bg-[#0067b8] group-hover:text-white transition-colors">
                  <h.icon size={20} />
                </div>
                <div className="text-sm font-black uppercase tracking-tight text-[#242424] dark:text-white mb-2 group-hover:text-[#0067b8] transition-colors">
                  {h.label}
                </div>
                <p className="text-xs text-[#505050] dark:text-gray-400 leading-relaxed font-medium">{h.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
