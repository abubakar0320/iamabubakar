"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";

interface HeroProps {
  data: {
    title: string;
    tagline: string;
    heroDescription: string;
  };
  cvUrl?: string;
}

export function Hero({ data, cvUrl }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0d0d0d] relative">
                <Image 
                  src="/Abubakar Siddiue.jpg" 
                  alt="Abu Bakar Siddique" 
                  fill 
                  className="object-cover" 
                  priority 
                />
              </div>
            </div>
          </div>
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            {data?.tagline || "Available for New Projects"}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            {(data?.title || "Building Digital Masterpieces with Code.").split(" ").map((word, i) => (
              <React.Fragment key={i}>
                {i === 2 ? <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{word} </span> : word + " "}
              </React.Fragment>
            ))}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {data?.heroDescription || "Professional Full-Stack Developer"}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/projects">
              <Button size="lg" className="w-full sm:w-auto">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Hire Me
              </Button>
            </Link>
            {cvUrl && cvUrl !== "#" && (
              <a 
                href={cvUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                download="Abubakar_CV.pdf"
              >
                <Button variant="ghost" size="lg" className="w-full sm:w-auto text-blue-600">
                  <Download className="mr-2 h-5 w-5" />
                  Download CV (PDF)
                </Button>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
