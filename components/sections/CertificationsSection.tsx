"use client";

import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";

const certs = [
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "31 Oct 2025",
    skills: ["Network Security", "Cyber Threats", "Data Privacy", "Security Best Practices"],
    color: "#e10098",
    logo: "CISCO",
  },
  {
    title: "Digital Competence Framework 2.1 — Advanced Level",
    issuer: "Self-Assessment Certification",
    date: "07 Aug 2024",
    skills: [
      "Information & Data Literacy",
      "Communication & Collaboration",
      "Digital Content Creation",
      "Safety",
      "Problem Solving",
    ],
    note: "All 5 Dimensions · Level 6/6 · Project-Based Learning",
    color: "#00d4ff",
    logo: "DCF",
  },
  {
    title: "ChatGPT Advanced Data Analysis",
    issuer: "Vanderbilt University (Coursera)",
    date: "22 Jun 2026",
    skills: [
      "AI Workflows",
      "Data Processing",
      "Data Visualization",
      "Prompt Engineering",
      "Generative AI",
    ],
    note: "Automating tasks with ChatGPT Code Interpreter",
    color: "#5c2d91",
    logo: "COURSERA",
    fileUrl: "/Coursera Chatgpt certificate.pdf",
    verifyUrl: "https://coursera.org/share/57a8c740343764e182074d6ab3b1b078",
    linkedinUrl: "https://www.linkedin.com/in/abubakar0320/"
  },
  {
    title: "Foundations of Project Management",
    issuer: "Google (Coursera)",
    date: "24 Jun 2026",
    skills: [
      "Project Planning",
      "Change Management",
      "Strategic Thinking",
      "Organizational Change",
      "Project Management Life Cycle",
    ],
    note: "Google Project Management Certificate",
    color: "#e10098",
    logo: "GOOGLE",
    fileUrl: "/Coursera google project manager certificate.pdf",
    verifyUrl: "https://coursera.org/share/0c662097634e3d3ca3d88a0d5388d3e3",
    linkedinUrl: "https://www.linkedin.com/in/abubakar0320/"
  },
];

export function CertificationsSection() {
  return (
    <section className="py-24 bg-[#f2f2f2] dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest">Verified</div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#242424] dark:text-white uppercase">
              Certifi<span className="text-[#00d4ff]">cations</span>
            </h2>
            <p className="text-sm md:text-base text-[#505050] dark:text-gray-400 max-w-xl font-medium">
              Industry-recognized credentials validating expertise in cybersecurity, digital literacy, and technical competence.
            </p>
          </div>
          <div className="hidden md:block h-[2px] flex-grow mx-12 bg-gray-200 dark:bg-gray-800 mb-4" />
          <div className="text-xs font-black uppercase text-[#00d4ff] tracking-widest mb-4">Credentials</div>
        </div>

        {/* Cert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#00d4ff] dark:hover:border-[#00d4ff] transition-colors group overflow-hidden"
            >
              {/* Top bar */}
              <div className="h-1.5 w-full" style={{ backgroundColor: cert.color }} />

              <div className="p-8">
                {/* Issuer Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="px-4 py-2 text-xs font-black uppercase tracking-widest text-white"
                    style={{ backgroundColor: cert.color }}
                  >
                    {cert.logo}
                  </div>
                  <span className="text-xs font-bold text-[#505050] dark:text-gray-400 uppercase tracking-widest">
                    {cert.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#242424] dark:text-white mb-1 group-hover:text-[#00d4ff] transition-colors leading-snug">
                  {cert.title}
                </h3>
                <div className="text-xs font-bold uppercase tracking-widest text-[#00d4ff] mb-4">
                  {cert.issuer}
                </div>

                {cert.note && (
                  <div
                    className="text-xs font-semibold mb-4 px-3 py-2 border-l-2"
                    style={{ borderColor: cert.color, color: cert.color, backgroundColor: cert.color + "10" }}
                  >
                    {cert.note}
                  </div>
                )}

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {cert.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border border-gray-200 dark:border-gray-700 text-[#505050] dark:text-gray-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Verified badge / PDF Link */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 gap-4">
                  <div className="flex items-center gap-2 shrink-0">
                    <BadgeCheck size={16} style={{ color: cert.color }} />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: cert.color }}>
                      Verified Certification
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    {(cert as any).verifyUrl && (
                      <a 
                        href={(cert as any).verifyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-bold flex items-center gap-1 hover:underline uppercase tracking-widest"
                        style={{ color: cert.color }}
                      >
                        Verify <ExternalLink size={14} />
                      </a>
                    )}
                    {(cert as any).linkedinUrl && (
                      <a 
                        href={(cert as any).linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-bold flex items-center gap-1 hover:underline uppercase tracking-widest text-[#0077B5]"
                      >
                        LinkedIn <ExternalLink size={14} />
                      </a>
                    )}
                    {(cert as any).fileUrl && (
                      <a 
                        href={(cert as any).fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-bold flex items-center gap-1 hover:underline uppercase tracking-widest"
                        style={{ color: cert.color }}
                      >
                        View PDF <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
