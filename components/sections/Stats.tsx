"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatsProps {
  stats: Array<{
    label: string;
    value: string;
  }>;
}

export function Stats({ stats }: StatsProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-20 bg-[#f2f2f2] dark:bg-[#1a1a1a] border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center md:items-start space-y-2"
            >
              <div className="text-4xl md:text-6xl font-black tracking-tighter text-[#0067b8] dark:text-[#4da3ff]">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs font-black uppercase text-gray-500 dark:text-gray-400 tracking-[0.2em] text-center md:text-left">
                {stat.label}
              </div>
              <div className="w-12 h-1 bg-[#0067b8] mt-2 opacity-20"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
