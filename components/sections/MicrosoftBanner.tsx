import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function MicrosoftBanner({ title, description, image, cta, link }: any) {
  return (
    <div className="relative w-full min-h-[350px] md:h-[500px] overflow-hidden flex items-center bg-[#1a1a1a] py-16 md:py-0">
      <div className="absolute inset-0 z-0">
        <img src={image} alt={title} className="w-full h-full object-cover opacity-60 md:opacity-100" />
      </div>
      <div className="absolute inset-0 bg-black/40 md:bg-black/50 z-0"></div>
      
      <div className="relative z-10 px-6 md:px-16 max-w-[1600px] mx-auto w-full">
        <div className="max-w-xl text-white text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-semibold mb-4 leading-tight">{title}</h2>
          <p className="text-sm md:text-lg mb-8 text-gray-200 leading-relaxed">{description}</p>
          <Link href={link} className="inline-flex items-center justify-center bg-[#0067b8] text-white font-semibold py-2.5 px-8 hover:bg-[#005da6] transition-colors shadow-lg">
            {cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
