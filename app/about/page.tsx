"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  GraduationCap, 
  History, 
  Globe, 
  Zap, 
  MapPin, 
  ShieldCheck, 
  Cpu, 
  Loader2, 
  Target,
  Workflow
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111]">
        <Loader2 className="animate-spin h-12 w-12 text-[#0067b8]" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#111] min-h-screen text-[#242424] dark:text-white font-sans pb-20">
      {/* Microsoft Corporate Hero - Clean & Balanced */}
      <section className="bg-[#f2f2f2] dark:bg-[#1a1a1a] py-12 md:py-20 px-4 md:px-12 xl:px-20 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <h1 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight text-[#242424] dark:text-white">
                About <span className="text-[#0067b8] dark:text-[#4da3ff]">Abubakar</span>
              </h1>
              <p className="text-base md:text-lg text-[#505050] dark:text-gray-300 mb-8 leading-relaxed">
                Lead System Architect specializing in digital transformation and high-performance engineering. 
                Committed to building scalable solutions that empower organizations globally.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <MapPin size={16} className="text-[#0067b8]" /> Lahore, Pakistan
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <Globe size={16} className="text-[#0067b8]" /> Available Globally
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative aspect-video w-full rounded-sm overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
                <Image
                  src={settings.about.profileImage}
                  alt="Abubakar Portfolio"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 mt-16 md:mt-24">
        {/* Core Bio - Microsoft Content Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 mb-24 md:mb-32">
          <div className="lg:col-span-8 space-y-8">
             <div className="flex items-center gap-3 text-xs font-bold uppercase text-[#0067b8] tracking-[0.15em]">
               <Workflow size={14} /> Professional Overview
             </div>
             <div className="text-lg md:text-xl text-[#242424] dark:text-gray-200 leading-relaxed font-medium">
               <p className="whitespace-pre-wrap">{settings.about.bio}</p>
             </div>
             <div className="pt-6">
                <Link href="/contact">
                  <button className="inline-flex items-center justify-center bg-[#0067b8] text-white font-semibold py-2.5 px-8 hover:bg-[#005da6] transition-colors shadow-sm">
                    Establish Connection <ChevronRight size={16} className="ml-1" />
                  </button>
                </Link>
             </div>
          </div>
          
          <div className="lg:col-span-4">
             <div className="bg-[#f2f2f2] dark:bg-[#1a1a1a] p-8 space-y-8 border border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#242424] dark:text-white">Core Focus</h3>
                <ul className="space-y-4 text-sm font-semibold text-[#505050] dark:text-gray-400 uppercase tracking-tight">
                   <li className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-3"><Zap size={16} className="text-[#0067b8]" /> Scalable Systems</li>
                   <li className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-3"><Cpu size={16} className="text-[#0067b8]" /> Technical Leadership</li>
                   <li className="flex items-center gap-3"><ShieldCheck size={16} className="text-[#0067b8]" /> Secure Architecture</li>
                </ul>
             </div>
          </div>
        </div>

        {/* Stack Architecture (Skills) - Microsoft Fluent Grid */}
        <section className="mb-24 md:mb-32">
          <h2 className="text-2xl md:text-3xl font-semibold mb-12 text-[#242424] dark:text-white">Technical <span className="text-[#0067b8]">Stack</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {["Frontend", "Backend", "Other"].map((category) => (
              <div key={category} className="space-y-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#0067b8] flex items-center gap-3">
                  <div className="w-6 h-0.5 bg-[#0067b8]"></div> {category} Units
                </h3>
                <div className="space-y-6">
                  {settings.about.skills.filter(s => s.category === category).map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold uppercase tracking-wide text-[#242424] dark:text-white">{skill.name}</span>
                        <span className="text-[10px] font-bold opacity-50 tabular-nums">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 h-1 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1 }}
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

        {/* Career Timeline - Microsoft Corporate Roadmap Style */}
        <section className="mb-24 md:mb-32">
          <div className="flex items-center gap-3 text-xs font-bold uppercase text-[#0067b8] tracking-widest mb-12">
            <History size={18} /> Career Roadmap
          </div>
          <div className="space-y-6">
            {settings.about.experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 p-8 md:p-10 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 group hover:bg-[#f9f9f9] dark:hover:bg-[#222] transition-colors"
              >
                <div className="md:col-span-3">
                   <p className="text-xs font-black text-[#0067b8] uppercase tracking-widest">{item.year}</p>
                   <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">{item.company}</p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-xl font-semibold text-[#242424] dark:text-white tracking-tight">{item.title}</h3>
                  <p className="text-sm text-[#505050] dark:text-gray-400 mt-4 leading-relaxed font-medium max-w-3xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Foundations - Microsoft Card Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="p-10 md:p-16 bg-[#f2f2f2] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-sm">
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <GraduationCap className="text-[#0067b8]" size={28} />
                <h2 className="text-2xl font-semibold tracking-tight uppercase">Foundations</h2>
              </div>
              <div className="space-y-12">
                {settings.about.education.map((edu, i) => (
                  <div key={i} className="border-l-2 border-[#0067b8] pl-6 space-y-2">
                    <h3 className="text-lg font-bold tracking-tight">{edu.degree}</h3>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{edu.institution} | {edu.year}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium italic">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="p-10 md:p-16 bg-[#0067b8] text-white rounded-sm relative overflow-hidden flex flex-col justify-center">
            <div className="absolute -right-20 -bottom-20 opacity-10">
               <Target size={400} />
            </div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl font-semibold tracking-tight uppercase">Trajectory</h2>
              <p className="text-lg text-blue-50 font-medium leading-relaxed italic opacity-90">
                &ldquo;Engineering high-impact systems that bridge technical complexity and human intuition.&rdquo;
              </p>
              <div className="space-y-4">
                {[
                  "Cloud-Native Architecture Mastery",
                  "Global Technical Leadership",
                  "Enterprise Software Deployment"
                ].map(g => (
                  <div key={g} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                    <Zap size={16} className="text-[#ffb900]" fill="currentColor" /> {g}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
