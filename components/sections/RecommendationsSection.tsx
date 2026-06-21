"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, UserCheck } from "lucide-react";

const recommendations = [
  {
    name: "Prof. Shehzad Nazir",
    role: "Assistant Professor",
    org: "Baba Guru Nanak University",
    phone: "(+92) 313-4152107",
    initials: "SN",
    color: "#0067b8",
  },
  {
    name: "Prof. Dr. Muhammad Usman Younas",
    role: "Head of Department, CS",
    org: "Baba Guru Nanak University",
    phone: "(+92) 305-4646932",
    initials: "MY",
    color: "#107c10",
  },
  {
    name: "Prof. Hassan Iftikhar",
    role: "Assistant Professor",
    org: "Baba Guru Nanak University",
    phone: "(+92) 308-0637587",
    initials: "HI",
    color: "#d83b01",
  },
  {
    name: "Ms. Noor Fatima",
    role: "Lecturer",
    org: "Baba Guru Nanak University",
    phone: "(+92) 305-4141975",
    initials: "NF",
    color: "#5c2d91",
  },
];

export function RecommendationsSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">Academic References</div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">
              Recom<span className="text-[#0067b8]">mendations</span>
            </h2>
            <p className="text-sm md:text-base text-[#505050] dark:text-gray-400 max-w-xl font-medium">
              Faculty members from Baba Guru Nanak University who can vouch for my academic performance and technical capabilities.
            </p>
          </div>
          <div className="hidden md:block h-[2px] flex-grow mx-12 bg-gray-100 dark:bg-gray-800 mb-4" />
          <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest mb-4">BGNU Faculty</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#f7f7f7] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-colors group flex flex-col gap-4"
            >
              {/* Avatar */}
              <div
                className="w-14 h-14 flex items-center justify-center text-white text-lg font-black shrink-0"
                style={{ backgroundColor: rec.color }}
              >
                {rec.initials}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-base font-bold text-[#242424] dark:text-white group-hover:text-[#0067b8] transition-colors leading-snug mb-1">
                  {rec.name}
                </h3>
                <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: rec.color }}>
                  {rec.role}
                </div>
                <div className="text-xs text-[#505050] dark:text-gray-400 font-medium flex items-center gap-1">
                  <UserCheck size={11} />
                  {rec.org}
                </div>
              </div>

              {/* Phone */}
              <a
                href={`tel:${rec.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-xs font-bold text-[#505050] dark:text-gray-400 hover:text-[#0067b8] dark:hover:text-[#4da3ff] transition-colors border-t border-gray-200 dark:border-gray-700 pt-4"
              >
                <Phone size={13} />
                {rec.phone}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
