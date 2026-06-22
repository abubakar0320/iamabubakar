"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, User } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-white dark:bg-[#121212]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="w-10 h-10 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff]/10 text-[#00d4ff] rounded-full flex items-center justify-center">
            <Quote size={20} />
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">Client <span className="text-[#00d4ff]">Synthesis</span></h2>
          <p className="text-sm md:text-base text-[#505050] dark:text-gray-400 max-w-2xl font-medium italic">
            &ldquo;Engineering trust through consistent technical excellence and reliable deployment modules.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#f2f2f2] dark:bg-[#1a1a1a] p-8 md:p-10 border border-gray-200 dark:border-gray-800 flex flex-col h-full hover:border-[#00d4ff]/50 transition-all"
            >
              <p className="text-base md:text-lg text-[#242424] dark:text-gray-200 leading-relaxed font-medium mb-10 flex-grow">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 rounded-sm bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] flex items-center justify-center text-white shrink-0">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-tight text-[#242424] dark:text-white">{testimonial.name}</h4>
                  <p className="text-[10px] font-black uppercase text-[#00d4ff] tracking-widest mt-0.5">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
