"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

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
    <section className="py-24 bg-blue-600 dark:bg-blue-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-0 opacity-10">
          <Quote size={200} />
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 italic">Client Success Stories</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Trusted by founders and companies worldwide to deliver high-quality digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all"
            >
              <Quote className="text-blue-300 mb-6" size={32} />
              <p className="text-lg mb-8 leading-relaxed italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center font-bold text-lg">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-blue-200">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
