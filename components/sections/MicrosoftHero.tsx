import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function MicrosoftHero({ data, cvUrl }: any) {
  return (
    <section className="relative w-full min-h-[450px] md:h-[600px] bg-[#f2f2f2] dark:bg-[#1a1a1a] overflow-hidden flex items-center py-12 md:py-0">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop")' }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5 dark:bg-black/40 z-0"></div>
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 w-full relative z-10 flex justify-center md:justify-start">
        <div className="bg-white/95 dark:bg-[#242424]/95 p-6 md:p-12 shadow-sm max-w-lg w-full md:w-auto">
          <span className="inline-block py-1 px-3 bg-[#ffb900] text-black text-[10px] md:text-xs font-bold mb-4 uppercase tracking-widest">
            {data?.tagline || "Available Now"}
          </span>
          <h1 className="text-2xl md:text-4xl font-semibold mb-4 leading-tight text-[#242424] dark:text-white">
            {data?.title || "Building Digital Masterpieces"}
          </h1>
          <p className="text-sm md:text-base text-[#505050] dark:text-gray-300 mb-6 leading-relaxed">
            {data?.heroDescription || "Professional Full-Stack Developer specializing in enterprise solutions."}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <Link href="/contact" className="inline-flex items-center justify-center bg-[#0067b8] text-white font-semibold py-2.5 px-6 hover:bg-[#005da6] transition-colors w-full sm:w-auto">
              Hire Me
            </Link>
            {/* CV Download hidden temporarily */}
          </div>
        </div>
      </div>
    </section>
  );
}
