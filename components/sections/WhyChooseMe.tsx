"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, Cpu, Award, Users } from "lucide-react";

const principles = [
  {
    title: "Architectural Precision",
    description: "Every line of code and every network node is designed with structural integrity and long-term scalability in mind.",
    icon: ShieldCheck,
  },
  {
    title: "High-Fidelity Delivery",
    description: "I prioritize speed and performance, ensuring your digital assets load instantly and operate without technical lag.",
    icon: Zap,
  },
  {
    title: "Global Compatibility",
    description: "Systems engineered to perform across all devices, browsers, and geographic regions with 99.9% uptime.",
    icon: Globe,
  },
  {
    title: "AI-Driven Automation",
    description: "Integrating intelligent support and automated workflows to reduce operational costs and enhance user engagement.",
    icon: Cpu,
  },
  {
    title: "Authority & Trust",
    description: "Trusted by students and businesses globally for delivering complex FYPs and enterprise-grade web solutions.",
    icon: Award,
  },
  {
    title: "Client-Centric Nodes",
    description: "Constant synchronization with client requirements ensuring the final deployment matches the strategic vision.",
    icon: Users,
  },
];

export function WhyChooseMe() {
  return (
    <section className="py-24 bg-white dark:bg-[#121212] border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">Why <span className="text-[#00d4ff]">Abubakar?</span></h2>
            <p className="text-sm md:text-lg text-[#505050] dark:text-gray-400 max-w-2xl font-medium">
              A comprehensive technical approach combining software engineering, networking, and AI intelligence.
            </p>
          </div>
          <div className="hidden md:block h-[2px] flex-grow mx-12 bg-gray-100 dark:bg-gray-800 mb-4"></div>
          <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest mb-4">Core Principles</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {principles.map((p, index) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 shrink-0 bg-[#f2f2f2] dark:bg-[#1a1a1a] rounded-sm flex items-center justify-center text-[#00d4ff] border border-gray-200 dark:border-gray-800 transition-transform group-hover:scale-110">
                  <p.icon size={24} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-[#242424] dark:text-white group-hover:text-[#00d4ff] transition-colors">{p.title}</h3>
                  <p className="text-sm text-[#505050] dark:text-gray-400 leading-relaxed font-medium">
                    {p.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
