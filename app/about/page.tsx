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
  Code2, 
  Layers, 
  Terminal, 
  Settings2,
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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <Loader2 className="animate-spin h-12 w-12 text-[#0067b8]" />
      </div>
    );
  }

  const skillCategories = [
    { name: "Frontend", icon: Layers, color: "text-blue-500" },
    { name: "Backend", icon: Code2, color: "text-emerald-500" },
    { name: "Other", icon: Settings2, color: "text-amber-500" }
  ];

  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen text-[#242424] dark:text-white font-sans pb-20 relative overflow-hidden">
      {/* Background Subtle Patterns */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      {/* Modern Hero Section - Immersive Design */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-12 xl:px-20 border-b border-gray-100 dark:border-gray-900 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1600px] pointer-events-none">
           <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#ffb900]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0067b8]/10 text-[#0067b8] dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#0067b8]/20">
                <Workflow size={12} /> System Architect Identity
              </div>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
                Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0067b8] to-blue-400">Excellence.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed font-medium">
                Designing high-density digital ecosystems that synthesize complex algorithms into seamless user experiences. 
                Based in Lahore, deploying mission-critical systems globally.
              </p>
              <div className="flex flex-wrap gap-8 pt-4">
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Base Node</span>
                    <span className="flex items-center gap-2 font-bold text-sm uppercase"><MapPin size={14} className="text-blue-600" /> Lahore, PK</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Availability</span>
                    <span className="flex items-center gap-2 font-bold text-sm uppercase"><Globe size={14} className="text-emerald-500" /> Remote / Global</span>
                 </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-square w-full max-w-md mx-auto group">
                <div className="absolute inset-0 border-2 border-[#0067b8]/30 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
                <div className="absolute inset-0 border-2 border-emerald-500/20 -translate-x-4 -translate-y-4 transition-transform group-hover:-translate-x-6 group-hover:-translate-y-6"></div>
                <div className="relative w-full h-full overflow-hidden shadow-2xl saturate-[1.1] contrast-[1.05]">
                  <Image
                    src={settings.about.profileImage}
                    alt="Abubakar - Architect"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-white/90 dark:bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800">
                    <p className="text-xl font-black uppercase tracking-tighter italic">ABUBAKAR <span className="text-blue-600">_SYSTEM_NODE</span></p>
                    <p className="text-[0.6rem] font-black uppercase text-gray-500 tracking-[0.3em] mt-1">Lead Software Engineer & Networking Specialist</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 mt-20">
        {/* Executive Bio - Technical Style */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-3">
             <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#0067b8] sticky top-32 flex items-center gap-4">
                <div className="w-8 h-[2px] bg-[#0067b8]"></div> Strategic Bio
             </h2>
          </div>
          <div className="lg:col-span-9 space-y-10">
             <div className="text-xl md:text-3xl font-bold leading-tight text-[#242424] dark:text-gray-100 italic">
                &ldquo;Architecture is not just about building systems; it&apos;s about designing the future of digital interaction.&rdquo;
             </div>
             <div className="text-base md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-medium space-y-8">
               <p className="whitespace-pre-wrap">{settings.about.bio}</p>
             </div>
             <Link href="/contact">
               <button className="group relative px-8 py-4 bg-[#0067b8] text-white font-black uppercase text-xs tracking-widest overflow-hidden transition-all hover:bg-[#005da6] flex items-center gap-3">
                  <span className="relative z-10">Establish Protocol Connection</span>
                  <ChevronRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                  <div className="absolute top-0 left-0 w-full h-full bg-white/10 -translate-x-full transition-transform group-hover:translate-x-0"></div>
               </button>
             </Link>
          </div>
        </section>

        {/* Bento Grid Skills - The Modern Part */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
             <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Stack <br /><span className="text-[#0067b8]">Architecture</span></h2>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-3">
                  <Terminal size={14} className="text-blue-600" /> STATUS: DEPLOYED_V2.0
                </p>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {skillCategories.map((cat) => (
              <div key={cat.name} className="space-y-8 p-8 bg-gray-50 dark:bg-[#1a1a1a]/50 border border-gray-100 dark:border-gray-800 rounded-3xl group transition-all hover:bg-white dark:hover:bg-[#1a1a1a]">
                <div className="flex items-center justify-between">
                   <div className={`p-4 rounded-2xl bg-white dark:bg-[#121212] shadow-xl border border-gray-100 dark:border-gray-800 transition-transform group-hover:-rotate-6 ${cat.color}`}>
                      <cat.icon size={28} />
                   </div>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">{cat.name} Sector</span>
                </div>
                
                <div className="space-y-8">
                   {settings.about.skills.filter(s => s.category === cat.name).map((skill, i) => (
                     <div key={skill.name} className="space-y-3">
                        <div className="flex justify-between items-center">
                           <span className="text-sm font-black uppercase tracking-tighter">{skill.name}</span>
                           <span className="text-[10px] font-black tabular-nums opacity-40">{skill.level}%</span>
                        </div>
                        <div className="relative h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: `${skill.level}%` }}
                             viewport={{ once: true }}
                             transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                             className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#0067b8] to-blue-400`}
                           />
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career Ledger - Vertical Timeline Style */}
        <section className="mb-32">
           <div className="max-w-4xl mx-auto space-y-20 relative">
              <div className="absolute top-0 left-0 md:left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-[#0067b8] via-gray-200 dark:via-gray-800 to-transparent"></div>
              
              <div className="text-center space-y-4 mb-20">
                 <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">Career Ledger</h2>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Temporal Deployment History</p>
              </div>

              {settings.about.experience.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute top-0 left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-[#0a0a0a] border-4 border-[#0067b8] rounded-full z-10 hidden md:block"></div>
                  
                  <div className="w-full md:w-1/2">
                    <div className="p-8 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-2xl hover:shadow-2xl transition-all group">
                       <span className="text-xs font-black text-[#0067b8] uppercase tracking-widest">{item.year}</span>
                       <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mt-4 group-hover:text-[#0067b8] transition-colors">{item.title}</h3>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 italic">{item.company}</p>
                       <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 leading-relaxed font-medium">
                         {item.description}
                       </p>
                    </div>
                  </div>
                  <div className="hidden md:block w-1/2"></div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Education & Values - Final Tier */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <section className="p-10 md:p-16 bg-[#f2f2f2] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-[3rem]">
              <div className="space-y-12">
                 <div className="space-y-2">
                    <GraduationCap className="text-[#0067b8]" size={40} />
                    <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic">Foundations</h2>
                 </div>
                 <div className="space-y-12">
                    {settings.about.education.map((edu, i) => (
                      <div key={i} className="space-y-4 group">
                        <div className="flex items-center gap-4">
                           <div className="w-2 h-2 bg-[#0067b8] rounded-full group-hover:scale-150 transition-transform"></div>
                           <h3 className="text-lg font-black uppercase tracking-tight">{edu.degree}</h3>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-6">{edu.institution} | {edu.year}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium pl-6 italic">{edu.description}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </section>

           <section className="p-10 md:p-16 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-full h-full opacity-5">
                 <Target size={600} className="-translate-y-20 translate-x-20" />
              </div>
              <div className="relative z-10 space-y-10">
                 <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">Future <br /><span className="text-blue-400">Trajectory</span></h2>
                 <p className="text-lg text-blue-100/70 font-medium leading-relaxed italic">
                   &ldquo;Mastering the intersection of Cloud-Native Architecture and High-Density SaaS Assets to lead global technical transformations.&rdquo;
                 </p>
                 <div className="grid grid-cols-1 gap-6">
                    {[
                      { text: "Cloud-Native Mastery", icon: ShieldCheck },
                      { text: "Global Technical Leadership", icon: Globe },
                      { text: "High-Density SaaS Architecture", icon: Zap }
                    ].map((g, i) => (
                      <div key={i} className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                         <g.icon className="text-blue-400" size={20} />
                         <span className="text-xs font-black uppercase tracking-widest">{g.text}</span>
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
