"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Raza",
    role: "Final Year Student, FAST NUCES",
    review:
      "Abubakar delivered my FYP on time with exceptional quality. His networking knowledge and full-stack skills are truly remarkable. Highly recommended!",
    avatar: "AR",
  },
  {
    name: "Sara Malik",
    role: "Business Owner, Lahore",
    review:
      "My e-commerce website was built flawlessly. The design is modern, the speed is incredible, and the support after delivery was outstanding.",
    avatar: "SM",
  },
  {
    name: "Usman Tariq",
    role: "IT Manager, Karachi",
    review:
      "Professional, punctual, and highly skilled. Abubakar set up our entire office network and web portal. Zero downtime since launch.",
    avatar: "UT",
  },
  {
    name: "Fatima Khan",
    role: "Student, UET Lahore",
    review:
      "Got my computer networks project done perfectly. He explained every concept clearly and delivered well before the deadline.",
    avatar: "FK",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#121212] border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">
              Client <span className="text-[#0067b8]">Feedback</span>
            </h2>
            <p className="text-sm md:text-lg text-[#505050] dark:text-gray-400 max-w-2xl font-medium">
              Real results from real clients — students, businesses, and enterprises across Pakistan and beyond.
            </p>
          </div>
          <div className="hidden md:block h-[2px] flex-grow mx-12 bg-gray-100 dark:bg-gray-800 mb-4"></div>
          <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest mb-4">Testimonials</div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#f2f2f2] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-4 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-colors group"
            >
              <Quote className="text-[#0067b8] w-6 h-6 opacity-70" />
              <p className="text-sm text-[#505050] dark:text-gray-300 leading-relaxed font-medium flex-grow">
                "{t.review}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="w-10 h-10 rounded-full bg-[#0067b8] flex items-center justify-center text-white text-xs font-black shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#242424] dark:text-white">{t.name}</div>
                  <div className="text-xs text-[#505050] dark:text-gray-400">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
