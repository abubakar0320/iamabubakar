"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center text-white"
            >
              <div className="text-4xl md:text-6xl font-black tracking-tighter mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-pink-100">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
