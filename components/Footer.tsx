"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Globe, MessageSquare, ShieldCheck, Phone, MapPin } from "lucide-react";
import { Github, Linkedin, Twitter, AbubakarLogo } from "@/components/Icons";

interface FooterSettings {
  contact: {
    email: string;
    phone: string;
    location: string;
    socialLinks: {
      github: string;
      linkedin: string;
      twitter: string;
      whatsapp: string;
    };
  };
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<FooterSettings | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error(err));
  }, []);

  if (!settings) return null;

  return (
    <footer className="bg-[#f2f2f2] dark:bg-[#1a1a1a] text-[#616161] dark:text-gray-400 text-xs py-12">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12 mb-16">
          {/* Personal Branding & Note */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6 group">
               <AbubakarLogo size={28} className="transition-transform duration-500 group-hover:rotate-[360deg]" />
               <span className="text-[#242424] dark:text-white font-black uppercase tracking-tighter text-sm italic">Abubakar</span>
            </div>
            <p className="text-[12px] md:text-[11px] leading-relaxed text-[#242424] dark:text-gray-300 font-medium mb-6 max-w-sm">
              Engineering high-fidelity digital assets with architectural precision. Based in Lahore, deploying globally.
            </p>
            <div className="flex gap-5">
               <a href={settings.contact.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0067b8] transition-colors"><Github size={20} /></a>
               <a href={settings.contact.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0067b8] transition-colors"><Linkedin size={20} /></a>
               <a href={settings.contact.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0067b8] transition-colors"><Twitter size={20} /></a>
               <a href={settings.contact.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-500 transition-colors"><MessageSquare size={20} /></a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-[#242424] dark:text-gray-200 text-[13px] mb-6">Solutions</h3>
            <ul className="space-y-4">
              <li><Link href="/projects" className="hover:underline text-[13px]">Technical Portfolio</Link></li>
              <li><Link href="/services" className="hover:underline text-[13px]">Full-Stack Systems</Link></li>
              <li><Link href="/services" className="hover:underline text-[13px]">Cloud Architecture</Link></li>
              <li><Link href="/services" className="hover:underline text-[13px]">UI/UX Engineering</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-[#242424] dark:text-gray-200 text-[13px] mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:underline text-[13px]">Technical Stack</Link></li>
              <li><Link href="/about" className="hover:underline text-[13px]">Career Ledger</Link></li>
              <li><Link href="/about" className="hover:underline text-[13px]">Certifications</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-[#242424] dark:text-gray-200 text-[13px] mb-6">Business</h3>
            <ul className="space-y-4">
              <li><Link href="/services" className="hover:underline text-[13px]">Investment Plans</Link></li>
              <li><Link href="/contact" className="hover:underline text-[13px]">Consultations</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-[#242424] dark:text-gray-200 text-[13px] mb-6">Support</h3>
            <ul className="space-y-4">
              <li><Link href="/contact" className="hover:underline text-[13px]">Contact Abubakar</Link></li>
              <li><Link href="/services" className="hover:underline text-[13px]">FAQs</Link></li>
              <li><a href={`mailto:${settings.contact.email}`} className="hover:underline text-[13px]">Email Node</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-[#242424] dark:text-gray-200 text-[13px] mb-6">Location</h3>
            <div className="space-y-4 text-[13px] leading-relaxed">
               <p className="flex items-start gap-3 italic"><MapPin size={16} className="text-[#0067b8] shrink-0 mt-0.5" /> {settings.contact.location}</p>
               <p className="flex items-center gap-3"><Phone size={16} className="text-[#0067b8]" /> {settings.contact.phone}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-gray-200 dark:border-gray-800 gap-8 md:gap-0">
          <div className="flex items-center gap-2">
            <Globe size={16} />
            <span className="hover:underline cursor-pointer text-[11px] md:text-[12px] font-bold">English (Pakistan)</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-[10px] md:text-[11px] font-medium">
            <Link href="/about" className="hover:underline">About Abubakar</Link>
            <Link href="/privacy" className="hover:underline">Privacy & Cookies</Link>
            <Link href="/terms" className="hover:underline">Terms of use</Link>
            <Link href="/trademarks" className="hover:underline">Trademarks</Link>
            <p className="flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-500" /> SECURE NODE</p>
            <span className="opacity-80">© Abubakar {currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
