"use client";

import React from "react";
import { Shield, Lock, Eye, Cookie, FileText, ChevronRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="bg-white dark:bg-[#121212] min-h-screen text-[#242424] dark:text-white font-sans pb-20">
      {/* Microsoft Style Banner */}
      <section className="bg-[#f2f2f2] dark:bg-[#1a1a1a] py-12 md:py-20 px-4 md:px-12 xl:px-20 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight">Privacy <span className="text-[#00d4ff] dark:text-[#4da3ff]">& Cookies</span></h1>
            <p className="text-base md:text-lg text-[#505050] dark:text-gray-300 mb-10 leading-relaxed italic border-l-4 border-[#00d4ff] pl-6">
              Your data security is paramount. This document outlines our commitment to transparency, technical integrity, and the protection of your digital identity.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <Lock className="text-[#00d4ff]" size={24} /> Data Collection Protocols
              </h2>
              <p className="text-[#505050] dark:text-gray-400 leading-relaxed">
                We collect only essential metadata required to establish a secure communication link between the client and our architectural nodes. This includes:
              </p>
              <ul className="space-y-4 text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-tight list-none ml-2">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] rounded-full" /> Identity nodes (Name, Email)</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] rounded-full" /> Communication streams (Inquiry messages)</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] rounded-full" /> Transaction hashes (Order IDs, Payment logs)</li>
              </ul>
            </section>

            <section className="space-y-6 pt-10 border-t border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <Cookie className="text-[#00d4ff]" size={24} /> Cookie Architecture
              </h2>
              <p className="text-[#505050] dark:text-gray-400 leading-relaxed">
                This platform utilizes minimalist cookie technology to optimize system performance and session persistence. We categorize our cookies into two functional tiers:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
                   <h4 className="font-bold text-sm uppercase tracking-widest mb-3">Essential Units</h4>
                   <p className="text-xs text-gray-500 leading-relaxed italic">Required for the core functionality of the checkout system and authentication nodes.</p>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
                   <h4 className="font-bold text-sm uppercase tracking-widest mb-3">Analytical Nodes</h4>
                   <p className="text-xs text-gray-500 leading-relaxed italic">Used to monitor system health and optimize the visual architecture based on user interaction patterns.</p>
                </div>
              </div>
            </section>

            <section className="space-y-6 pt-10 border-t border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <Shield className="text-[#00d4ff]" size={24} /> Security Commitment
              </h2>
              <p className="text-[#505050] dark:text-gray-400 leading-relaxed">
                Abubakar Digital Architecture employs enterprise-grade encryption for all incoming data transmissions. We do not engage in third-party data distribution. Your project specifications and financial metadata are stored within secure cloud nodes with restricted administrative access.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] p-8 text-white">
               <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Privacy Sync</h3>
               <p className="text-pink-100 text-sm mb-8">This policy was last synchronized on May 2026. Global updates propagate automatically.</p>
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
                     <CheckCircle size={16} /> GDPR COMPLIANT
                  </div>
                  <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
                     <CheckCircle size={16} /> SSL ENCRYPTED
                  </div>
               </div>
            </div>

            <div className="p-8 border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a]">
               <h3 className="font-semibold text-[#242424] dark:text-white mb-4 uppercase tracking-tighter">Support Node</h3>
               <p className="text-sm text-gray-500 mb-6 leading-relaxed italic">For any inquiries regarding data deletion or privacy requests, initiate a direct link:</p>
               <a href="mailto:hello@iamabubakar.com" className="text-[#00d4ff] dark:text-[#4da3ff] font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
                  Request Data Audit <ChevronRight size={14} />
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
