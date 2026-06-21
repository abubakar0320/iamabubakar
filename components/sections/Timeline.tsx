"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award } from "lucide-react";

const timeline = [
  {
    year: "2024 – Present",
    type: "education",
    icon: GraduationCap,
    title: "BS Computer Science",
    org: "University of Engineering & Technology (UET), Lahore",
    description:
      "Pursuing a degree with a focus on software engineering, computer networks, and artificial intelligence. Active in final year project development.",
    badge: "Current",
    badgeColor: "#107c10",
  },
  {
    year: "2023 – Present",
    type: "work",
    icon: Briefcase,
    title: "Freelance Full-Stack Developer",
    org: "Self-Employed · Remote",
    description:
      "Building enterprise-grade web applications, FYP systems, and network solutions for clients across Pakistan and internationally. 50+ successful deliveries.",
    badge: "Active",
    badgeColor: "#0067b8",
  },
  {
    year: "2023",
    type: "award",
    icon: Award,
    title: "Top-Rated Freelancer",
    org: "Fiverr & Upwork",
    description:
      "Achieved top-rated status with consistent 5-star reviews for delivering complex web and networking projects on time.",
    badge: "Achievement",
    badgeColor: "#d83b01",
  },
  {
    year: "2022 – 2023",
    type: "work",
    icon: Briefcase,
    title: "Junior Web Developer",
    org: "Local IT Agency, Lahore",
    description:
      "Developed and maintained PHP-based web portals, MySQL databases, and client-facing dashboards for small businesses.",
    badge: "Experience",
    badgeColor: "#5c2d91",
  },
  {
    year: "2020 – 2022",
    type: "education",
    icon: GraduationCap,
    title: "FSC Pre-Engineering",
    org: "Lahore Board",
    description:
      "Completed intermediate studies with distinction, laying a strong foundation in mathematics, physics, and computing.",
    badge: "Completed",
    badgeColor: "#505050",
  },
];

const typeColor: Record<string, string> = {
  education: "#0067b8",
  work: "#107c10",
  award: "#d83b01",
};

export function Timeline() {
  return (
    <section className="py-24 bg-[#f2f2f2] dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">Background</div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">
              Education &amp; <span className="text-[#0067b8]">Experience</span>
            </h2>
            <p className="text-sm md:text-base text-[#505050] dark:text-gray-400 max-w-xl font-medium">
              A journey built on academic excellence, hands-on development, and a passion for solving real-world problems.
            </p>
          </div>
          <div className="hidden md:block h-[2px] flex-grow mx-12 bg-gray-200 dark:bg-gray-800 mb-4" />
          <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest mb-4">Timeline</div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex flex-col sm:flex-row items-start gap-6 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`flex-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-colors group ${
                      isLeft ? "sm:text-right sm:items-end" : ""
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 mb-3 ${isLeft ? "sm:flex-row-reverse" : ""}`}
                    >
                      <span
                        className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1"
                        style={{ backgroundColor: item.badgeColor + "18", color: item.badgeColor }}
                      >
                        {item.badge}
                      </span>
                      <span className="text-xs font-bold text-[#505050] dark:text-gray-400 uppercase tracking-widest">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#242424] dark:text-white mb-1 group-hover:text-[#0067b8] transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0067b8] mb-3">{item.org}</div>
                    <p className="text-sm text-[#505050] dark:text-gray-400 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Center Icon */}
                  <div
                    className="hidden sm:flex w-11 h-11 rounded-full border-2 items-center justify-center shrink-0 z-10 bg-white dark:bg-[#1a1a1a]"
                    style={{ borderColor: typeColor[item.type] }}
                  >
                    <item.icon size={18} style={{ color: typeColor[item.type] }} />
                  </div>

                  {/* Empty spacer on other side */}
                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
