"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, GraduationCap, History, Globe, Zap, MapPin, ShieldCheck, Cpu, Loader2, Target } from "lucide-react";
import Link from "next/link";

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface Experience {
  year: string;
  company: string;
  title: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

interface AboutSettings {
  about: {
    bio: string;
    profileImage: string;
    skills: Skill[];
    experience: Experience[];
    education: Education[];
  };
  contact: {
    cvUrl: string;
  };
}

export default function AboutPage() {
  const [settings, setSettings] = useState<AboutSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  if (loading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-[#0067b8]" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#121212] min-h-screen text-[#242424] dark:text-white font-sans pb-20">
      {/* Microsoft Style Banner - Mobile Optimized */}
      <section className="bg-[#f2f2f2] dark:bg-[#1a1a1a] py-10 md:py-20 px-4 md:px-12 xl:px-20 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl text-center md:text-left"
          >
            <h1 className="text-3xl md:text-5xl font-semibold mb-4 md:mb-6 tracking-tight uppercase">Identity <span className="text-[#0067b8] dark:text-[#4da3ff]">Synthesis</span></h1>
            <p className="text-sm md:text-lg text-[#505050] dark:text-gray-300 mb-8 md:mb-10 leading-relaxed italic border-l-0 md:border-l-4 border-[#0067b8] md:pl-6 max-w-2xl mx-auto md:mx-0">
              Empowering digital transformation through high-fidelity architecture and comprehensive technical leadership. 
               Lahore, Pakistan based Engineering Hub.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
               <div className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400">
                  <MapPin size={14} className="text-blue-600" /> Available Locally
               </div>
               <div className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400">
                  <Globe size={14} className="text-blue-600" /> Deploying Globally
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 mt-12 md:mt-20">
        {/* Profile & Bio Section - Microsoft Grid Style Optimized for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start mb-20 md:mb-32">
          <div className="lg:col-span-8 space-y-8 md:space-y-10 order-2 lg:order-1">
             <div className="flex items-center gap-3 text-[0.6rem] md:text-[0.7rem] font-black uppercase text-gray-400 tracking-widest border-b md:border-none pb-2 md:pb-0">
               <Cpu size={14} className="text-blue-600" /> Strategic Executive Summary
             </div>
             <div className="text-base md:text-xl text-[#242424] dark:text-gray-200 leading-relaxed font-medium space-y-6 md:space-y-8">
               <p className="whitespace-pre-wrap text-justify md:text-left">{settings.about.bio}</p>
             </div>
             
             <div className="pt-8 border-t border-gray-100 dark:border-gray-800 text-center md:text-left">
               <h3 className="text-[11px] md:text-sm font-black uppercase tracking-[0.2em] mb-6 md:mb-8 text-gray-400">Digital Credentials</h3>
               <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-4">
                  {/* CV Download hidden temporarily */}
                  <Link href="/contact" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto text-[#0067b8] font-bold uppercase text-[11px] md:text-sm py-4 md:py-3 px-8 hover:underline flex items-center justify-center gap-2 group border border-[#0067b8]">
                      Establish Connection <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
               </div>
             </div>
          </div>
          
          <div className="lg:col-span-4 space-y-8 md:space-y-12 order-1 lg:order-2">
             <div className="relative aspect-[4/5] overflow-hidden shadow-xl md:shadow-2xl dark:shadow-none border-b-4 md:border-b-8 border-r-4 md:border-r-8 border-[#0067b8] max-w-sm mx-auto lg:max-w-none">
                <img
                  src={settings.about.profileImage}
                  alt="Abubakar Portfolio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800">
                   <p className="text-lg md:text-xl font-black uppercase tracking-tighter">Abubakar <span className="text-blue-600">.</span></p>
                   <p className="text-[0.55rem] md:text-[0.6rem] font-black uppercase text-gray-400 tracking-widest mt-1">Lead System Architect</p>
                </div>
             </div>
             
             <div className="bg-[#f2f2f2] dark:bg-[#1a1a1a] p-6 md:p-8 space-y-6">
                <h4 className="text-[0.55rem] md:text-[0.6rem] font-black uppercase tracking-widest text-[#0067b8] text-center md:text-left">Core Directives</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 text-[11px] md:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-tight">
                   <li className="flex items-center gap-3"><Zap size={14} className="text-blue-600" /> Scalable Cloud</li>
                   <li className="flex items-center gap-3"><Zap size={14} className="text-blue-600" /> Performance Eng</li>
                   <li className="flex items-center gap-3"><Zap size={14} className="text-blue-600" /> Enterprise Arch</li>
                </ul>
             </div>
          </div>
        </div>

        {/* Stack Architecture (Skills) - Modular Grid Style Optimized for Mobile */}
        <section className="mb-20 md:mb-32">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 border-b border-gray-100 dark:border-gray-800 pb-6 gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center md:text-left">Stack <span className="text-[#0067b8]">Architecture</span></h2>
            <p className="text-[0.6rem] md:text-[0.7rem] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
               <History size={14} className="text-blue-600" /> STATUS: LATEST_STABLE
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {["Frontend", "Backend", "Other"].map((category) => (
              <div key={category} className="space-y-6 md:space-y-8">
                <h3 className="text-[11px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#0067b8] flex items-center gap-3">
                  <div className="w-4 md:w-6 h-0.5 bg-[#0067b8]"></div> {category} Units
                </h3>
                <div className="space-y-5 md:space-y-6">
                  {settings.about.skills.filter((s: any) => s.category === category).map((skill: any) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#242424] dark:text-white group-hover:text-[#0067b8] transition-colors">{skill.name}</span>
                        <span className="text-[10px] md:text-[0.65rem] font-black tabular-nums">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 h-1 md:h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="bg-[#0067b8] h-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career Ledger (Experience) - Modular Table Style Optimized for Mobile */}
        <section className="mb-20 md:mb-32">
          <div className="flex items-center justify-center md:justify-start gap-3 text-[0.65rem] md:text-[0.7rem] font-black uppercase text-gray-400 tracking-widest mb-8 md:mb-12 border-b md:border-none pb-4 md:pb-0">
            <History size={14} className="text-blue-600" /> Career Deployment Ledger
          </div>
          <div className="space-y-4 md:space-y-6">
            {settings.about.experience.map((item: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 p-6 md:p-12 bg-white dark:bg-[#1a1a1a] shadow-sm border border-gray-100 dark:border-gray-800 group hover:shadow-md transition-all"
              >
                <div className="md:col-span-3 border-b md:border-none pb-4 md:pb-0">
                   <p className="text-xs md:text-sm font-black text-[#0067b8] uppercase tracking-widest">{item.year}</p>
                   <div className="mt-2 md:mt-6 flex flex-col gap-0.5">
                      <p className="text-[0.55rem] md:text-[0.6rem] font-black uppercase text-gray-400 tracking-[0.2em]">Protocol Node</p>
                      <p className="text-[11px] md:text-xs font-bold truncate uppercase">{item.company}</p>
                   </div>
                </div>
                <div className="md:col-span-9 space-y-3 md:space-y-4 pt-2 md:pt-0">
                  <h3 className="text-lg md:text-2xl font-semibold text-[#242424] dark:text-white uppercase tracking-tight group-hover:text-[#0067b8] transition-colors">{item.title}</h3>
                  <p className="text-xs md:text-sm text-[#505050] dark:text-gray-400 leading-relaxed font-medium text-justify md:text-left">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education & Vision - Microsoft Footer Card Style Optimized for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <section className="p-6 md:p-10 bg-[#f2f2f2] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 text-[0.65rem] md:text-[0.7rem] font-black uppercase text-gray-400 tracking-widest mb-8 md:mb-10">
              <GraduationCap size={16} className="text-blue-600" /> Academic Foundation
            </div>
            <div className="space-y-10 md:space-y-12">
              {settings.about.education.map((edu: any, i: number) => (
                <div key={i} className="relative pl-4 md:pl-6 border-l-2 border-[#0067b8]">
                  <h3 className="text-sm md:text-lg font-bold uppercase tracking-tight">{edu.degree}</h3>
                  <p className="text-[0.6rem] md:text-[0.7rem] font-black text-gray-400 mt-1 uppercase tracking-widest">{edu.institution} | {edu.year}</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-3 md:mt-4 leading-relaxed italic">{edu.description}</p>
                </div>
              ))}
              {settings.about.education.length === 0 && (
                <p className="text-gray-500 italic text-[11px] md:text-sm text-center md:text-left">No educational nodes detected.</p>
              )}
            </div>
          </section>

          <section className="p-6 md:p-10 bg-slate-900 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 opacity-5">
               <ShieldCheck size={400} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-[0.65rem] md:text-[0.7rem] font-black uppercase text-blue-400 tracking-widest mb-8 md:mb-10 text-center md:text-left">
                <Target size={16} className="text-blue-400" /> Trajectory & Vision
              </div>
              <div className="space-y-5 md:space-y-6 text-sm md:text-lg leading-relaxed font-medium">
                <p className="text-center md:text-left text-blue-50/80">
                  Engineering high-impact systems that bridge technical complexity and human intuition. 
                  Building a future-proof technical legacy through modular architecture.
                </p>
                <div className="grid grid-cols-1 gap-3 md:gap-4 pt-4 md:pt-8">
                  {[
                    "Mastery of Cloud-Native Architecture",
                    "Lead Global Technical Transformations",
                    "Engineering High-Density SaaS Assets"
                  ].map(g => (
                    <div key={g} className="flex items-center gap-4 bg-white/5 p-3 md:p-4 rounded-xl border border-white/10">
                       <Zap size={14} className="text-yellow-400 shrink-0" fill="currentColor" />
                       <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{g}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
