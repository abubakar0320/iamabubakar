import React from "react";
import Link from "next/link";
import { Monitor, Briefcase, Mail, FileText } from "lucide-react";

export function MicrosoftQuickLinks() {
  const links = [
    { name: "My Projects", icon: Monitor, href: "/projects" },
    { name: "Services", icon: Briefcase, href: "/services" },
    { name: "About Me", icon: FileText, href: "/about" },
    { name: "Contact Me", icon: Mail, href: "/contact" },
  ];

  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-y-10 gap-x-6 md:gap-20 mt-12 py-8">
      {links.map((link, idx) => (
        <Link key={idx} href={link.href} className="flex flex-col items-center group text-[#242424] dark:text-white">
          <div className="w-8 h-8 md:w-10 md:h-10 mb-3 text-[#0067b8] dark:text-[#4da3ff] transition-transform duration-300 group-hover:-translate-y-1">
            <link.icon className="w-full h-full" strokeWidth={1.5} />
          </div>
          <span className="text-sm md:text-base font-semibold group-hover:underline underline-offset-4 decoration-2 text-center">{link.name}</span>
        </Link>
      ))}
    </div>
  );
}
