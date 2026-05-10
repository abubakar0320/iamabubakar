"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, ShieldCheck, Clock } from "lucide-react";

const reasons = [
  {
    title: "Fast Delivery",
    description: "I value your time. My streamlined workflow ensures quick turnaround without compromising quality.",
    icon: Zap,
  },
  {
    title: "Clean Code",
    description: "Maintainability is key. I write production-ready, well-documented, and scalable code.",
    icon: CheckCircle2,
  },
  {
    title: "Global Standards",
    description: "My designs and technical implementations follow international quality standards and best practices.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description: "Communication is vital. I am always available to provide support and updates on your project.",
    icon: Clock,
  },
];

export function WhyChooseMe() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Work With Me?</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Combining technical excellence with a business-driven approach to deliver results that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 transition-all hover:bg-slate-50 dark:hover:bg-slate-900/50"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <reason.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
