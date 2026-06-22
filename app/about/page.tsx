"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight, GraduationCap, Globe, Zap,
  MapPin, ShieldCheck, Cpu, Loader2, Target,
  Briefcase, Code2, Brain, Users, Award,
  Phone, Mail, ExternalLink, Download,
  BookOpen, Languages, BadgeCheck, Check
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ─── Static CV Data ──────────────────────────────────────────────────────────
const personalInfo = [
  { icon: MapPin,     label: "Location",    value: "Sheikhupura, Punjab, Pakistan" },
  { icon: Phone,      label: "Phone",       value: "+92 309 7354874", href: "tel:+923097354874" },
  { icon: Mail,       label: "Email",       value: "abubakr.bgnu@gmail.com", href: "mailto:abubakr.bgnu@gmail.com" },
  { icon: Globe,      label: "Website",     value: "iamabubakar.site", href: "https://iamabubakar.site" },
  { icon: BookOpen,   label: "University",  value: "Baba Guru Nanak University (BGNU)" },
  { icon: Award,      label: "CGPA",        value: "3.42 / 4.00" },
];

const coreFacts = [
  { label: "Degree",       value: "BSIT (In Progress)" },
  { label: "Nationality",  value: "Pakistani" },
  { label: "Experience",   value: "2+ Years" },
  { label: "Projects",     value: "5+ Delivered" },
  { label: "Availability", value: "Open to Work" },
  { label: "Languages",    value: "Punjabi, Urdu, English" },
];

const defaultEducation = [
  {
    degree: "Bachelor of Science in Information Technology (BSIT)",
    institution: "Baba Guru Nanak University, Nankana Sahib",
    year: "Jan 2024 – Present",
    cgpa: "3.42 / 4.00",
    description: "Focused on full-stack development, software engineering, AI systems, and computer networks. Currently leading an AI-powered FYP project.",
    color: "#e10098",
  },
  {
    degree: "Intermediate — FSc Pre-Medical",
    institution: "Superior Group of Colleges, Shahkot",
    year: "Oct 2021 – Dec 2023",
    cgpa: null,
    description: "Natural Sciences, Mathematics & Statistics. Built a strong analytical foundation that transitioned into software development.",
    color: "#00d4ff",
  },
  {
    degree: "Matriculation (SSC)",
    institution: "Govt. Abu-Ul-Khair Boys High School, Shahkot",
    year: "May 2018 – Oct 2020",
    cgpa: null,
    description: "Completed secondary education with strong academic performance.",
    color: "#5c2d91",
  },
];

const defaultExperience = [
  {
    period: "Jun 2026 – Dec 2026",
    role: "Team Lead — FYP",
    company: "Baba Guru Nanak University",
    type: "Academic",
    color: "#5c2d91",
    description: "Leading a team of 3 to build an AI-powered Smart Recruitment & Employee Management System using the MERN stack with AI/ML integration.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "AI/ML"],
  },
  {
    period: "Mar 2026 – May 2026",
    role: "Front-End Web Developer",
    company: "Jamia Share Rabbani · jamiashererabbani.com",
    type: "Contract",
    color: "#5c2d91",
    description: "Developed and deployed a full institutional website using React.js. Created responsive, accessible interfaces with improved navigation and UX.",
    tech: ["React.js", "JavaScript", "HTML5", "CSS3"],
  },
  {
    period: "2025 – Present",
    role: "Full-Stack Web Developer",
    company: "Freelance · iamabubakar.site",
    type: "Self-Employed",
    color: "#e10098",
    description: "Developing and maintaining a personal portfolio built on the MERN stack. Includes admin panel, project/services management, SEO, and responsive design.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB"],
  },
];

const certifications = [
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "31 Oct 2025",
    color: "#e10098",
    badge: "CISCO",
    skills: ["Network Security", "Cyber Threats", "Data Privacy", "Security Practices"],
  },
  {
    title: "Digital Competence Framework 2.1 — Advanced",
    issuer: "Self-Assessment Certification",
    date: "07 Aug 2024",
    color: "#00d4ff",
    badge: "DCF",
    skills: ["Data Literacy", "Digital Collaboration", "Content Creation", "Problem Solving"],
  },
];

const languages = [
  { lang: "Punjabi", level: "Native",      cefr: null,  pct: 100, color: "#e10098" },
  { lang: "Urdu",    level: "Proficient",  cefr: "C2",  pct: 98,  color: "#00d4ff" },
  { lang: "English", level: "Independent", cefr: "B2–C1", pct: 72, color: "#5c2d91" },
];

const recommendations = [
  { name: "Prof. Shehzad Nazir",           role: "Assistant Professor",  phone: "(+92) 313-4152107", initials: "SN", color: "#e10098" },
  { name: "Prof. Dr. Muhammad Usman Younas", role: "Head of Dept. CS",   phone: "(+92) 305-4646932", initials: "MY", color: "#00d4ff" },
  { name: "Prof. Hassan Iftikhar",          role: "Assistant Professor",  phone: "(+92) 308-0637587", initials: "HI", color: "#5c2d91" },
  { name: "Ms. Noor Fatima",                role: "Lecturer",             phone: "(+92) 305-4141975", initials: "NF", color: "#5c2d91" },
];

const values = [
  { icon: Code2,      title: "Clean Code",         desc: "Every line is intentional, readable, and built for longevity." },
  { icon: Zap,        title: "Speed & Performance", desc: "Optimized builds with fast load times and smooth interactions." },
  { icon: ShieldCheck, title: "Security First",     desc: "Secure-by-design architecture in every project I deliver." },
  { icon: Users,      title: "Client-Centric",      desc: "Constant sync with client goals to ensure vision is realized." },
  { icon: Brain,      title: "AI Integration",       desc: "Smart, AI-powered solutions for modern business problems." },
  { icon: Globe,      title: "Global Mindset",       desc: "Serving students and businesses across Pakistan and beyond." },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => { setSettings(data); setLoading(false); });
  }, []);

  if (loading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111]">
        <Loader2 className="animate-spin h-12 w-12 text-[#00d4ff]" />
      </div>
    );
  }

  const dbEducation = settings?.about?.education?.map((e: any, i: number) => ({
    degree: e.degree,
    institution: e.institution,
    year: e.year,
    cgpa: null,
    description: e.description,
    color: ["#e10098", "#00d4ff", "#5c2d91", "#5c2d91"][i % 4]
  })) || [];
  const finalEducation = dbEducation.length > 0 ? dbEducation : defaultEducation;

  const dbExperience = settings?.about?.experience?.map((e: any, i: number) => ({
    period: e.year,
    role: e.title,
    company: e.company,
    type: "Professional",
    color: ["#5c2d91", "#5c2d91", "#e10098", "#00d4ff"][i % 4],
    description: e.description,
    tech: []
  })) || [];
  const finalExperience = dbExperience.length > 0 ? dbExperience : defaultExperience;

  const dbCertifications = settings?.about?.certifications?.map((c: any, i: number) => ({
    title: c.title,
    issuer: c.issuer,
    date: c.date,
    color: ["#e10098", "#00d4ff", "#5c2d91", "#5c2d91"][i % 4],
    badge: c.badge,
    skills: c.skills || [],
  })) || [];
  const finalCertifications = dbCertifications.length > 0 ? dbCertifications : certifications;

  const dbLanguages = settings?.about?.languages?.map((l: any, i: number) => ({
    lang: l.lang,
    level: l.level,
    cefr: l.cefr,
    pct: l.pct,
    color: ["#e10098", "#00d4ff", "#5c2d91", "#5c2d91"][i % 4]
  })) || [];
  const finalLanguages = dbLanguages.length > 0 ? dbLanguages : languages;

  const dbRecommendations = settings?.about?.recommendations?.map((r: any, i: number) => ({
    name: r.name,
    role: r.role,
    phone: r.phone,
    initials: r.initials,
    color: ["#e10098", "#00d4ff", "#5c2d91", "#5c2d91"][i % 4]
  })) || [];
  const finalRecommendations = dbRecommendations.length > 0 ? dbRecommendations : recommendations;

  return (
    <div className="bg-white dark:bg-[#111] min-h-screen text-[#242424] dark:text-white font-sans">

      {/* ══════════════════════════════════════════
          1. HERO BANNER
          ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0d0d0d] py-20 md:py-32 px-4 md:px-12 xl:px-20">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-bg.jpg" alt="About Background" fill className="object-cover opacity-25" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent z-10" />
        <div className="relative z-20 max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex-1 max-w-2xl">
              <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest mb-4">About Me</div>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-4 leading-tight">
                Abu Bakar <span className="text-[#00d4ff]">Siddique</span>
              </h1>
              <div className="text-base md:text-lg text-[#00d4ff] font-black uppercase tracking-widest mb-6">
                FULL STACK DEVELOPER
              </div>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-8 max-w-xl">
                Detail-oriented Information Technology student at Baba Guru Nanak University with hands-on experience
                in full-stack MERN development. Skilled in building responsive web applications, RESTful APIs,
                and database-driven solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] text-white font-bold px-6 py-3 hover:bg-gradient-to-r from-[#c00082] via-[#4a2474] to-[#00b8cc] transition-colors text-sm uppercase tracking-widest">
                  LET'S WORK TOGETHER <ChevronRight size={16} />
                </Link>
                {settings?.contact?.cvUrl && (
                  <a href={settings.contact.cvUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/30 text-white font-bold px-6 py-3 hover:border-[#00d4ff] hover:text-[#00d4ff] transition-colors text-sm uppercase tracking-widest">
                    <Download size={15} /> Download CV
                  </a>
                )}
              </div>
            </motion.div>

            {/* Profile Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="shrink-0 w-full max-w-sm">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 space-y-4">
                <div className="space-y-3 pt-2">
                  {coreFacts.map((f) => (
                    <div key={f.label} className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                      <span className="font-bold uppercase tracking-widest text-gray-400">{f.label}</span>
                      <span className="font-black text-white">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. PERSONAL INFO BAR
          ══════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] py-6 px-4 md:px-12 xl:px-20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-white">
          {personalInfo.map((info, i) => (
            <motion.div key={info.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
              className="flex items-center gap-2">
              <info.icon size={16} className="opacity-70 shrink-0" />
              <div className="min-w-0">
                <div className="text-[9px] font-bold uppercase tracking-widest text-blue-200">{info.label}</div>
                {info.href ? (
                  <a href={info.href} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] font-black truncate hover:underline block">{info.value}</a>
                ) : (
                  <div className="text-[10px] font-black truncate">{info.value}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. BIO + SKILLS
          ══════════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-4 md:px-12 xl:px-20 bg-white dark:bg-[#111]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          {/* Bio */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest">Professional Overview</div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
                Who I <span className="text-[#00d4ff]">Am</span>
              </h2>
            </div>
            <div className="text-base text-[#505050] dark:text-gray-300 leading-relaxed font-medium whitespace-pre-wrap">
              I am Abu Bakar Siddique, a BS Information Technology student and Full-Stack Web Developer with hands-on experience in designing and developing modern web applications. My expertise includes React.js, Next.js, Node.js, MongoDB, MySQL, PHP, and REST API development. I have built projects ranging from business websites and portfolio platforms to real estate management systems and custom dashboards. I am passionate about creating responsive, user-friendly, scalable, and performance-driven digital solutions that help businesses establish a strong online presence and achieve their goals.
            </div>

            <div className="pt-2 pb-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Full Stack Web Development",
                  "MERN Stack Development",
                  "React & Next.js Applications",
                  "MongoDB & MySQL Databases",
                  "REST API Development",
                  "Website Deployment & Hosting",
                  "Technical SEO & Google Setup",
                  "Graphic Design & Motion Graphics"
                ].map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3 text-sm font-bold text-[#242424] dark:text-gray-200">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#e10098] to-[#00d4ff] flex items-center justify-center shrink-0">
                      <Check size={12} className="text-white" />
                    </div>
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            <Link href="/contact">
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] text-white font-semibold py-3 px-8 hover:bg-gradient-to-r from-[#c00082] via-[#4a2474] to-[#00b8cc] transition-colors text-sm uppercase tracking-widest">
                LET'S CONNECT <ChevronRight size={16} />
              </button>
            </Link>
          </div>

          {/* Skill bars */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-2">
              <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest">Technical Stack</div>
              <h3 className="text-xl font-semibold text-[#242424] dark:text-white uppercase tracking-tight">Core Skills</h3>
            </div>
            {[
              {
                category: "Frontend",
                skills: [
                  { name: "React.js", level: 95 },
                  { name: "Next.js", level: 90 },
                  { name: "JavaScript", level: 95 },
                  { name: "HTML5 & CSS3", level: 98 },
                  { name: "Tailwind CSS", level: 92 },
                ]
              },
              {
                category: "Backend",
                skills: [
                  { name: "Node.js", level: 90 },
                  { name: "Express.js", level: 88 },
                  { name: "PHP", level: 80 },
                  { name: "REST APIs", level: 92 },
                ]
              },
              {
                category: "Database & Tools",
                skills: [
                  { name: "MongoDB", level: 88 },
                  { name: "MySQL", level: 85 },
                  { name: "Git & GitHub", level: 95 },
                  { name: "Vercel & VS Code", level: 92 },
                ]
              },
              {
                category: "SEO & Design",
                skills: [
                  { name: "Technical SEO", level: 88 },
                  { name: "Google Analytics / Console", level: 85 },
                  { name: "Canva & Photoshop", level: 85 },
                ]
              }
            ].map((catData) => {
              const cat = catData.category;
              const catSkills = catData.skills;
              return (
                <div key={cat} className="space-y-5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#00d4ff] flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff]" /> {cat}
                  </div>
                  {catSkills.map((skill: any) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold uppercase tracking-wide text-[#242424] dark:text-white">{skill.name}</span>
                        <span className="text-[10px] font-black text-[#00d4ff] tabular-nums">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                          className="bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] h-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. VALUES / WHAT I BELIEVE IN
          ══════════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-4 md:px-12 xl:px-20 bg-[#f2f2f2] dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-14 space-y-3">
            <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest">Principles</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
              What I <span className="text-[#00d4ff]">Believe In</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-5 p-6 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#00d4ff] dark:hover:border-[#00d4ff] transition-colors group">
                <div className="w-11 h-11 shrink-0 bg-[#f2f2f2] dark:bg-[#252525] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#00d4ff] group-hover:bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] group-hover:text-white transition-colors">
                  <v.icon size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-[#242424] dark:text-white mb-1 group-hover:text-[#00d4ff] transition-colors">{v.title}</h3>
                  <p className="text-xs text-[#505050] dark:text-gray-400 leading-relaxed font-medium">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. EXPERIENCE TIMELINE
          ══════════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-4 md:px-12 xl:px-20 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-14 space-y-3">
            <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest">Work History</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
              Experience <span className="text-[#00d4ff]">Timeline</span>
            </h2>
          </div>
          <div className="space-y-5">
            {finalExperience.map((item: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 p-8 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#00d4ff] dark:hover:border-[#00d4ff] transition-colors group">
                <div className="md:col-span-3 space-y-2">
                  <div className="text-xs font-black uppercase tracking-widest" style={{ color: item.color }}>{item.period}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.company}</div>
                  <span className="inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5"
                    style={{ backgroundColor: item.color + "18", color: item.color }}>{item.type}</span>
                </div>
                <div className="md:col-span-9">
                  <div className="w-1 h-full absolute left-0 top-0" style={{ backgroundColor: item.color }} />
                  <h3 className="text-xl font-bold text-[#242424] dark:text-white tracking-tight mb-2 group-hover:text-[#00d4ff] transition-colors">{item.role}</h3>
                  <p className="text-sm text-[#505050] dark:text-gray-400 leading-relaxed font-medium mb-4 max-w-3xl">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech?.map((t: string) => (
                      <span key={t} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border border-gray-200 dark:border-gray-700 text-[#505050] dark:text-gray-400">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. EDUCATION
          ══════════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-4 md:px-12 xl:px-20 bg-[#f2f2f2] dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-14 space-y-3">
            <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest">Academic Background</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
              <GraduationCap className="inline mr-2 text-[#00d4ff]" size={30} />
              Education
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {finalEducation.map((edu: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#00d4ff] dark:hover:border-[#00d4ff] transition-colors overflow-hidden group">
                <div className="h-1.5 w-full" style={{ backgroundColor: edu.color }} />
                <div className="p-7 space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: edu.color }}>{edu.year}</div>
                  <h3 className="text-base font-bold text-[#242424] dark:text-white group-hover:text-[#00d4ff] transition-colors leading-snug">{edu.degree}</h3>
                  <div className="text-xs font-bold uppercase tracking-wide text-[#00d4ff]">{edu.institution}</div>
                  {edu.cgpa && (
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1"
                      style={{ backgroundColor: edu.color + "15", color: edu.color }}>
                      <Award size={10} /> CGPA: {edu.cgpa}
                    </div>
                  )}
                  <p className="text-xs text-[#505050] dark:text-gray-400 leading-relaxed font-medium">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. CERTIFICATIONS
          ══════════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-4 md:px-12 xl:px-20 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-14 space-y-3">
            <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest">Credentials</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
              Certifi<span className="text-[#00d4ff]">cations</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {finalCertifications.map((cert: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#f7f7f7] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#00d4ff] dark:hover:border-[#00d4ff] transition-colors overflow-hidden group">
                <div className="h-1.5 w-full" style={{ backgroundColor: cert.color }} />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-5">
                    <div className="px-3.5 py-1.5 text-xs font-black uppercase tracking-widest text-white" style={{ backgroundColor: cert.color }}>{cert.badge}</div>
                    <span className="text-xs font-bold text-[#505050] dark:text-gray-400 uppercase tracking-widest">{cert.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#242424] dark:text-white mb-1 group-hover:text-[#00d4ff] transition-colors leading-snug">{cert.title}</h3>
                  <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: cert.color }}>{cert.issuer}</div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {cert.skills?.map((s: string) => (
                      <span key={s} className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border border-gray-200 dark:border-gray-700 text-[#505050] dark:text-gray-400">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <BadgeCheck size={15} style={{ color: cert.color }} />
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: cert.color }}>Verified Certification</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. LANGUAGES
          ══════════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-4 md:px-12 xl:px-20 bg-[#f2f2f2] dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-14 space-y-3">
            <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest">Communication</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
              <Languages className="inline mr-2 text-[#00d4ff]" size={28} />
              Language <span className="text-[#00d4ff]">Skills</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {finalLanguages.map((l: any, i: number) => (
              <motion.div key={l.lang} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#00d4ff] dark:hover:border-[#00d4ff] transition-colors p-7 group">
                <div className="flex items-center justify-between mb-5">
                  <div className="text-xl font-black text-[#242424] dark:text-white group-hover:text-[#00d4ff] transition-colors">{l.lang}</div>
                  {l.cefr ? (
                    <span className="text-xs font-black px-2 py-0.5" style={{ backgroundColor: l.color + "18", color: l.color }}>{l.cefr}</span>
                  ) : (
                    <span className="text-xs font-black px-2 py-0.5" style={{ backgroundColor: l.color + "18", color: l.color }}>Native</span>
                  )}
                </div>
                <div className="mb-3 h-2 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${l.pct}%` }} viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: "easeOut" }} className="h-full" style={{ backgroundColor: l.color }} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: l.color }}>{l.level}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. RECOMMENDATIONS
          ══════════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-4 md:px-12 xl:px-20 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-14 space-y-3">
            <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest">Academic References</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
              Recom<span className="text-[#00d4ff]">mendations</span>
            </h2>
            <p className="text-sm text-[#505050] dark:text-gray-400 font-medium">Faculty from Baba Guru Nanak University available as professional references.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalRecommendations.map((rec: any, i: number) => (
              <motion.div key={rec.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-[#f7f7f7] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#00d4ff] dark:hover:border-[#00d4ff] transition-colors p-6 flex flex-col gap-4 group">
                <div className="w-14 h-14 flex items-center justify-center text-white text-lg font-black" style={{ backgroundColor: rec.color }}>
                  {rec.initials}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-[#242424] dark:text-white group-hover:text-[#00d4ff] transition-colors leading-snug mb-1">{rec.name}</h3>
                  <div className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: rec.color }}>{rec.role}</div>
                  <div className="text-[10px] text-[#505050] dark:text-gray-400 font-medium">Baba Guru Nanak University</div>
                </div>
                <a href={`tel:${rec.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-xs font-bold text-[#505050] dark:text-gray-400 hover:text-[#00d4ff] transition-colors border-t border-gray-200 dark:border-gray-700 pt-4">
                  <Phone size={12} /> {rec.phone}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          10. CONTACT CTA
          ══════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-12 xl:px-20 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff]">
        <div className="max-w-[1600px] mx-auto text-center text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-tight">
            Let's Work Together
          </h2>
          <p className="text-sm md:text-base text-pink-100 max-w-xl mx-auto font-medium">
            Looking for a dedicated MERN developer for your next project?
            Reach out for FYP assistance, web development, or a full-time opportunity.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#00d4ff] font-black px-8 py-3.5 hover:bg-[#f2f2f2] transition-colors uppercase tracking-widest text-sm">
              Contact Me <ChevronRight size={16} />
            </Link>
            <a href="mailto:abubakr.bgnu@gmail.com"
              className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-6 py-3.5 hover:border-white transition-colors text-sm uppercase tracking-widest">
              <Mail size={14} /> abubakr.bgnu@gmail.com
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
