"use client";

import React from "react";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";

const langs = [
  {
    language: "Punjabi",
    native: true,
    label: "Mother Tongue",
    skills: null,
  },
  {
    language: "Urdu",
    native: false,
    label: "Proficient User",
    skills: [
      { skill: "Listening", level: "C2" },
      { skill: "Reading", level: "C2" },
      { skill: "Writing", level: "C2" },
      { skill: "Spoken Production", level: "C2" },
      { skill: "Spoken Interaction", level: "C2" },
    ],
  },
  {
    language: "English",
    native: false,
    label: "Independent User",
    skills: [
      { skill: "Listening", level: "B2" },
      { skill: "Reading", level: "C1" },
      { skill: "Writing", level: "B2" },
      { skill: "Spoken Production", level: "A2" },
      { skill: "Spoken Interaction", level: "B1" },
    ],
  },
];

const levelColor: Record<string, string> = {
  A1: "#9e9e9e",
  A2: "#9e9e9e",
  B1: "#e10098",
  B2: "#e10098",
  C1: "#00d4ff",
  C2: "#00d4ff",
};

const levelLabel: Record<string, string> = {
  A1: "Basic",
  A2: "Basic",
  B1: "Independent",
  B2: "Independent",
  C1: "Proficient",
  C2: "Proficient",
};

export function LanguagesSection() {
  return (
    <section className="py-24 bg-[#f2f2f2] dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest">Communication</div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">
              Language <span className="text-[#00d4ff]">Skills</span>
            </h2>
            <p className="text-sm md:text-base text-[#505050] dark:text-gray-400 max-w-xl font-medium">
              Proficiency levels based on the Common European Framework of Reference (CEFR).
            </p>
          </div>
          <div className="hidden md:block h-[2px] flex-grow mx-12 bg-gray-200 dark:bg-gray-800 mb-4" />
          <div className="flex items-center gap-4 mb-4 text-[10px] font-black uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#9e9e9e]"/>A1–A2 Basic</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff]"/>B1–B2 Independent</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#107c10]"/>C1–C2 Proficient</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {langs.map((lang, i) => (
            <motion.div
              key={lang.language}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#00d4ff] dark:hover:border-[#00d4ff] transition-colors p-3 sm:p-7 group"
            >
              {/* Lang name */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] flex items-center justify-center text-white">
                  <Languages size={18} />
                </div>
                <div>
                  <div className="text-sm sm:text-lg font-black text-[#242424] dark:text-white group-hover:text-[#00d4ff] transition-colors">
                    {lang.language}
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-[#00d4ff]">{lang.label}</div>
                </div>
              </div>

              {lang.native ? (
                <div className="flex items-center gap-2 py-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#107c10]" />
                  <span className="text-[10px] sm:text-sm font-semibold text-[#242424] dark:text-white">Native Speaker</span>
                </div>
              ) : (
                <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-4">
                  {lang.skills!.map((s) => (
                    <div key={s.skill} className="flex items-center justify-between">
                      <span className="text-[9px] sm:text-xs font-semibold text-[#505050] dark:text-gray-400">{s.skill}</span>
                      <span
                        className="text-[8px] sm:text-xs font-black px-1.5 sm:px-2.5 py-0.5"
                        style={{
                          backgroundColor: levelColor[s.level] + "18",
                          color: levelColor[s.level],
                        }}
                      >
                        <span className="hidden sm:inline">{s.level} · {levelLabel[s.level]}</span>
                        <span className="sm:hidden">{s.level}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
