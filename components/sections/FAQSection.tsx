"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What types of projects do you take on?",
    a: "I work on a wide range of projects including full-stack web applications, FYP (Final Year Projects) for university students, e-commerce platforms, portfolio websites, admin dashboards, REST APIs, and computer network setups using Cisco and Wireshark.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timeline depends on the project scope. A basic portfolio website takes 3–5 days. A full-featured web application or FYP typically takes 2–6 weeks. I always provide a detailed timeline before starting so you know exactly what to expect.",
  },
  {
    q: "Do you provide support after project delivery?",
    a: "Yes! I offer post-launch support and maintenance. For most projects, I provide a free support window of 1–2 weeks after delivery. Long-term maintenance packages are also available on request.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "My primary stack includes React.js, Next.js, Node.js, TypeScript, MongoDB, MySQL, and PHP for full-stack development. For networking, I'm proficient in Cisco Packet Tracer, network topology design, and security configurations.",
  },
  {
    q: "Can you work with an existing codebase?",
    a: "Absolutely. I'm experienced in diving into existing projects, debugging complex issues, adding new features, and refactoring legacy code. I conduct a thorough code review before starting any modification work.",
  },
  {
    q: "How do I get started?",
    a: "Simply head to the Contact page and send me your project details. I'll respond within 24 hours with a consultation call to discuss your requirements, timeline, and pricing. No commitment required for the initial consultation.",
  },
  {
    q: "Do you offer discounts for students?",
    a: "Yes! I offer special pricing for university students working on their FYPs or academic projects. Reach out directly and mention your student status to get the best possible rate.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left — Sticky Header */}
          <div className="lg:w-[380px] shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest">FAQ</div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">
                Frequently <span className="text-[#00d4ff]">Asked</span>
              </h2>
              <p className="text-sm md:text-base text-[#505050] dark:text-gray-400 font-medium leading-relaxed">
                Everything you need to know before working together. Can't find your answer? Contact me directly.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#00d4ff] hover:underline underline-offset-4"
              >
                Ask a question →
              </a>
            </div>
          </div>

          {/* Right — Accordion */}
          <div className="flex-1 space-y-1">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border-b border-gray-100 dark:border-gray-800 transition-colors ${
                  open === i ? "border-[#00d4ff] dark:border-[#00d4ff]" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  aria-expanded={open === i}
                  id={`faq-btn-${i}`}
                >
                  <span
                    className={`text-sm md:text-base font-semibold transition-colors ${
                      open === i
                        ? "text-[#00d4ff]"
                        : "text-[#242424] dark:text-white group-hover:text-[#00d4ff]"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span className="shrink-0 w-7 h-7 flex items-center justify-center border border-gray-200 dark:border-gray-700 text-[#505050] dark:text-gray-400 group-hover:border-[#00d4ff] group-hover:text-[#00d4ff] transition-colors">
                    {open === i ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-[#505050] dark:text-gray-400 leading-relaxed font-medium pb-5 pr-10">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
