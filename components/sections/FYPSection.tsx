"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import * as LucideIcons from "lucide-react";

// Variables moved into component.

export function FYPSection() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  if (!settings) return null;

  const fyp = settings.fypSection || {
    title: "AI-Powered Smart Recruitment & HR System",
    description: "An enterprise-grade AI-powered HR platform for smart recruitment and employee management — built as the Final Year Project at Baba Guru Nanak University, Nankana Sahib.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "AI/ML", "REST API", "JWT Auth", "Tailwind CSS"],
    university: { name: "Baba Guru Nanak University", location: "Nankana Sahib, Pakistan" },
    highlights: [
      { icon: "Brain", label: "AI/ML Integration", desc: "Smart recruitment powered by machine learning algorithms for candidate screening and ranking." },
      { icon: "Users", label: "Team Lead", desc: "Leading a cross-functional team of 3 developers with structured Agile workflow and sprint planning." },
      { icon: "Layers", label: "Full-Stack MERN", desc: "End-to-end architecture: React.js frontend, Node.js/Express.js backend, MongoDB database." },
      { icon: "Calendar", label: "Jun – Dec 2026", desc: "6-month intensive project at Baba Guru Nanak University under faculty supervision." }
    ]
  };

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
            <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest">Final Year Project</div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase leading-tight">
              {fyp.title.split(" ").map((word: string, i: number) => {
                if (word.toLowerCase() === "recruitment" || word.toLowerCase() === "hr") {
                  return <span key={i} className="text-[#00d4ff]"> {word} </span>;
                }
                return word + " ";
              })}
            </h2>
            <p className="text-sm md:text-base text-[#505050] dark:text-gray-400 font-medium leading-relaxed max-w-xl">
              {fyp.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {fyp.techStack.map((t: string) => (
                <span
                  key={t}
                  className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] text-white"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* University Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 border border-gray-200 dark:border-gray-700 bg-[#f2f2f2] dark:bg-[#1a1a1a] mt-2">
              <div className="text-xs font-black uppercase tracking-widest text-[#00d4ff]">BGNU</div>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <div>
                <div className="text-xs font-bold text-[#242424] dark:text-white">{fyp.university.name}</div>
                <div className="text-[10px] text-[#505050] dark:text-gray-400 uppercase tracking-widest">{fyp.university.location}</div>
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
            {fyp.highlights.map((h: any, i: number) => {
              const IconComp = (LucideIcons as any)[h.icon || "Star"] || LucideIcons.Star;
              return (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#f7f7f7] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 hover:border-[#00d4ff] dark:hover:border-[#00d4ff] transition-colors group"
              >
                <div className="w-10 h-10 mb-4 flex items-center justify-center bg-white dark:bg-[#252525] border border-gray-200 dark:border-gray-700 text-[#00d4ff] group-hover:bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] group-hover:text-white transition-colors">
                  <IconComp size={20} />
                </div>
                <div className="text-sm font-black uppercase tracking-tight text-[#242424] dark:text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                  {h.label}
                </div>
                <p className="text-xs text-[#505050] dark:text-gray-400 leading-relaxed font-medium">{h.desc}</p>
              </motion.div>
            )})}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
