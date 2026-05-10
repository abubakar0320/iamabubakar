import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CardItem {
  title: string;
  description: string;
  image: string;
  link: string;
  cta: string;
}

export function MicrosoftCardGrid({ title, items }: { title?: string, items: CardItem[] }) {
  return (
    <div className="w-full">
      {title && <h2 className="text-xl md:text-3xl font-semibold mb-6 text-[#242424] dark:text-white px-2 md:px-0">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col group bg-white dark:bg-[#1a1a1a] shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] dark:shadow-none dark:border dark:border-[#333] h-full transition-all">
            <div className="w-full aspect-video md:h-48 overflow-hidden relative">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-5 md:p-6 flex flex-col flex-grow">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#242424] dark:text-white leading-snug">{item.title}</h3>
              <p className="text-xs md:text-sm text-[#505050] dark:text-gray-300 mb-6 flex-grow leading-relaxed line-clamp-3">{item.description}</p>
              <Link href={item.link} className="inline-flex items-center text-[#0067b8] dark:text-[#4da3ff] font-semibold text-sm hover:underline w-fit mt-auto group/btn">
                {item.cta} <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
