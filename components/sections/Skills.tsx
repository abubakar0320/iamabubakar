"use client";

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Leveraging a modern tech stack to build scalable, high-performance applications with clean code and robust architecture.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => {
            const IconComponent = (LucideIcons as any)[skill.icon || "Code2"] || LucideIcons.Code2;
            
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-blue-500/50 transition-all group"
              >
                <div className="mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <IconComponent size={32} />
                </div>
                <h3 className="font-semibold text-lg mb-1">{skill.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-500 mb-3">{skill.category}</p>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-blue-600 h-full"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
