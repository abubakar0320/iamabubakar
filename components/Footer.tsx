"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Globe, MessageSquare, ShieldCheck, Phone, MapPin, Mail, ExternalLink, ArrowRight } from "lucide-react";
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
    <footer className="bg-[#0d0d0d] text-gray-400 font-sans border-t border-[#1a1a1a]">
      {/* ── Top Newsletter / CTA Bar ──────────────── */}
      <div className="bg-[#111] border-b border-[#1a1a1a]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0067b8]/10 flex items-center justify-center text-[#0067b8]">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="text-white text-sm font-black uppercase tracking-widest mb-1">Available for Projects</h3>
                <p className="text-xs text-gray-500 font-medium">Currently accepting freelance & full-time roles.</p>
              </div>
            </div>
            <Link href="/contact" className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#0067b8] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 hover:bg-[#005da6] transition-colors">
              Start a Conversation <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-12 mb-16">
          
          {/* ── Brand Column ────────────────────────── */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group shrink-0 mb-6 w-fit">
              <div className="w-10 h-10 bg-[#0067b8] flex items-center justify-center">
                <AbubakarLogo size={24} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-black tracking-tight text-xl uppercase leading-none">Abu Bakar</span>
                <span className="text-[#0067b8] text-[9px] font-black uppercase tracking-[0.2em] leading-none mt-1">MERN Developer</span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-gray-400 font-medium mb-8 max-w-sm">
              Detail-oriented Information Technology student and Full-Stack Web Developer. Engineering high-fidelity digital assets with architectural precision. Based in Lahore, deploying globally.
            </p>
            <div className="flex gap-4">
               <a href={settings.contact.socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-[#333] flex items-center justify-center text-gray-400 hover:border-[#0067b8] hover:text-[#0067b8] hover:bg-[#0067b8]/5 transition-all"><Github size={16} /></a>
               <a href={settings.contact.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-[#333] flex items-center justify-center text-gray-400 hover:border-[#0067b8] hover:text-[#0067b8] hover:bg-[#0067b8]/5 transition-all"><Linkedin size={16} /></a>
               <a href={settings.contact.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-[#333] flex items-center justify-center text-gray-400 hover:border-[#0067b8] hover:text-[#0067b8] hover:bg-[#0067b8]/5 transition-all"><Twitter size={16} /></a>
            </div>
          </div>

          {/* ── Links Columns ───────────────────────── */}
          <div className="space-y-4">
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0067b8]" /> Explore
            </h3>
            <ul className="space-y-3.5">
              <li><Link href="/" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/projects" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/services" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/about" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0067b8]" /> Services
            </h3>
            <ul className="space-y-3.5">
              <li><Link href="/services" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">MERN Stack Apps</Link></li>
              <li><Link href="/services" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">FYP Assistance</Link></li>
              <li><Link href="/services" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">UI/UX Design</Link></li>
              <li><Link href="/services" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">Networking Setup</Link></li>
            </ul>
          </div>

          {/* ── Contact Column ──────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0067b8]" /> Contact
            </h3>
            <ul className="space-y-4">
               <li>
                 <a href={`mailto:${settings.contact.email}`} className="flex items-start gap-3 group">
                   <Mail size={16} className="text-gray-500 group-hover:text-[#0067b8] shrink-0 mt-0.5 transition-colors" />
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Email</p>
                     <p className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">{settings.contact.email}</p>
                   </div>
                 </a>
               </li>
               <li>
                 <a href={`tel:${settings.contact.phone.replace(/\s/g, "")}`} className="flex items-start gap-3 group">
                   <Phone size={16} className="text-gray-500 group-hover:text-[#0067b8] shrink-0 mt-0.5 transition-colors" />
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Phone / WhatsApp</p>
                     <p className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">{settings.contact.phone}</p>
                   </div>
                 </a>
               </li>
               <li>
                 <div className="flex items-start gap-3 group">
                   <MapPin size={16} className="text-gray-500 group-hover:text-[#0067b8] shrink-0 mt-0.5 transition-colors" />
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Location</p>
                     <p className="text-xs font-medium text-gray-300">{settings.contact.location}</p>
                   </div>
                 </div>
               </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ──────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#222] gap-6">
          <div className="flex items-center gap-2 text-gray-500">
            <Globe size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Global / Remote</span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <p className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#107c10]" /> Secure Site</p>
            <span className="opacity-50">|</span>
            <span>© Abubakar {currentYear}</span>
            <span className="opacity-50">|</span>
            <span className="text-[#0067b8]">Built with Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
