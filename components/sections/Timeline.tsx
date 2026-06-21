"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code2 } from "lucide-react";

const timeline = [
  {
    year: "Jun 2026 – Dec 2026",
    type: "work",
    icon: Code2,
    title: "Team Lead — AI-Powered Smart Recruitment & Employee Management System",
    org: "Final Year Project · Baba Guru Nanak University",
    description:
      "Leading a team of 3 to build an AI-powered HR platform for smart recruitment and employee management. Responsible for project architecture, task delegation, and full-stack MERN development.",
    badge: "FYP",
    badgeColor: "#d83b01",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "AI/ML"],
  },
  {
    year: "Mar 2026 – May 2026",
    type: "work",
    icon: Briefcase,
    title: "Front-End Web Developer",
    org: "Jamia Share Rabbani · jamiashererabbani.com",
    description:
      "Developed and deployed an institutional website using React.js. Created responsive and user-friendly interfaces. Improved website accessibility and navigation.",
    badge: "Contract",
    badgeColor: "#5c2d91",
    tech: ["React.js", "JavaScript", "HTML5", "CSS3"],
  },
  {
    year: "2025 – Present",
    type: "work",
    icon: Briefcase,
    title: "Full-Stack Web Developer",
    org: "Personal Portfolio · iamabubakar.site",
    description:
      "Developed and deployed a personal portfolio website using the MERN stack. Showcased projects, skills, certifications, and contact information. Implemented responsive design and SEO optimization.",
    badge: "Active",
    badgeColor: "#0067b8",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    year: "Jan 2024 – Present",
    type: "education",
    icon: GraduationCap,
    title: "Bachelor of Science in Information Technology (BSIT)",
    org: "Baba Guru Nanak University, Nankana Sahib",
    description:
      "CGPA: 3.42 / 4.00 — Pursuing BSIT with a focus on full-stack web development, software engineering, and AI-driven systems. Active team lead in Final Year Project.",
    badge: "Current",
    badgeColor: "#107c10",
    tech: [],
  },
  {
    year: "Oct 2021 – Dec 2023",
    type: "education",
    icon: GraduationCap,
    title: "Intermediate — FSc Pre-Medical",
    org: "Superior Group of Colleges, Shahkot",
    description:
      "Completed intermediate with Natural Sciences, Mathematics & Statistics. Built a strong analytical foundation that transitioned into software development.",
    badge: "Completed",
    badgeColor: "#505050",
    tech: [],
  },
  {
    year: "May 2018 – Oct 2020",
    type: "education",
    icon: GraduationCap,
    title: "Matriculation (SSC)",
    org: "Govt. Abu-Ul-Khair Boys High School, Shahkot, Nankana Sahib",
    description:
      "Completed secondary school education with a strong academic record, laying the groundwork for future technical studies.",
    badge: "Completed",
    badgeColor: "#505050",
    tech: [],
  },
];

const typeColor: Record<string, string> = {
  education: "#0067b8",
  work: "#107c10",
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
              A journey built on academic excellence at Baba Guru Nanak University and real-world full-stack development experience.
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
                  key={item.title + i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className={`relative flex flex-col sm:flex-row items-start gap-6 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`flex-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-colors group`}
                  >
                    <div className={`flex items-center gap-3 mb-3 flex-wrap ${isLeft ? "sm:flex-row-reverse sm:justify-end" : ""}`}>
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
                    <h3 className={`text-base font-bold text-[#242424] dark:text-white mb-1 group-hover:text-[#0067b8] transition-colors ${isLeft ? "sm:text-right" : ""}`}>
                      {item.title}
                    </h3>
                    <div className={`text-xs font-bold uppercase tracking-wider text-[#0067b8] mb-3 ${isLeft ? "sm:text-right" : ""}`}>
                      {item.org}
                    </div>
                    <p className={`text-sm text-[#505050] dark:text-gray-400 leading-relaxed font-medium ${isLeft ? "sm:text-right" : ""}`}>
                      {item.description}
                    </p>
                    {item.tech.length > 0 && (
                      <div className={`flex flex-wrap gap-2 mt-4 ${isLeft ? "sm:justify-end" : ""}`}>
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-gray-200 dark:border-gray-700 text-[#505050] dark:text-gray-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Center Icon */}
                  <div
                    className="hidden sm:flex w-11 h-11 rounded-full border-2 items-center justify-center shrink-0 z-10 bg-white dark:bg-[#1a1a1a]"
                    style={{ borderColor: typeColor[item.type] }}
                  >
                    <item.icon size={18} style={{ color: typeColor[item.type] }} />
                  </div>

                  {/* Spacer */}
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
