"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, FileSearch, Code2, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Discovery Call",
    description:
      "We start with a detailed consultation to understand your requirements, goals, and timeline. Clear communication from day one.",
  },
  {
    step: "02",
    icon: FileSearch,
    title: "Planning & Design",
    description:
      "I create a detailed project blueprint, wireframes, and architecture plan. You get full visibility before a single line of code is written.",
  },
  {
    step: "03",
    icon: Code2,
    title: "Development",
    description:
      "Clean, scalable code with regular updates and milestone deliveries. You stay informed at every stage of the build process.",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Launch & Support",
    description:
      "After rigorous testing, your project goes live. I provide post-launch support and maintenance to ensure everything runs perfectly.",
  },
];

export function HowIWork() {
  return (
    <section className="py-24 bg-[#f2f2f2] dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">
              How I <span className="text-[#0067b8]">Work</span>
            </h2>
            <p className="text-sm md:text-lg text-[#505050] dark:text-gray-400 max-w-2xl font-medium">
              A transparent, structured process designed to deliver results on time, every time.
            </p>
          </div>
          <div className="hidden md:block h-[2px] flex-grow mx-12 bg-gray-200 dark:bg-gray-800 mb-4"></div>
          <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest mb-4">Process</div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-8 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-colors group"
            >
              {/* Step number */}
              <div className="text-6xl font-black text-gray-100 dark:text-gray-800 absolute top-4 right-5 select-none leading-none">
                {s.step}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 mb-6 bg-[#f2f2f2] dark:bg-[#252525] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#0067b8] group-hover:bg-[#0067b8] group-hover:text-white transition-colors">
                <s.icon size={22} />
              </div>

              <h3 className="text-lg font-bold uppercase tracking-tight text-[#242424] dark:text-white mb-3 group-hover:text-[#0067b8] transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-[#505050] dark:text-gray-400 leading-relaxed font-medium">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
