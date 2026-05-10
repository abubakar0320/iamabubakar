"use client";

import React from "react";
import { FileText, Shield, Scale, Zap, ChevronRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsPage() {
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
            <h1 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight uppercase">Terms <span className="text-[#0067b8] dark:text-[#4da3ff]">of Use</span></h1>
            <p className="text-base md:text-lg text-[#505050] dark:text-gray-300 mb-10 leading-relaxed italic border-l-4 border-[#0067b8] pl-6">
              Establishment of the legal framework governing your interaction with Abubakar Digital Architecture. 
              Review these protocols carefully before initiating system deployment.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 text-sm md:text-base">
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <Scale className="text-[#0067b8]" size={24} /> 1. Operational Framework
              </h2>
              <p className="text-[#505050] dark:text-gray-400 leading-relaxed">
                By accessing this portfolio and utilizing its service modules, you agree to be bound by these Global Terms of Use. These terms constitute a legally binding agreement between the &quot;User&quot; and &quot;Abubakar Digital Architecture.&quot;
              </p>
            </section>

            <section className="space-y-6 pt-10 border-t border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <Shield className="text-[#0067b8]" size={24} /> 2. Intellectual Property Node
              </h2>
              <p className="text-[#505050] dark:text-gray-400 leading-relaxed">
                All architectural assets, code snippets, visual designs, and technical documentation displayed on this platform are the exclusive intellectual property of Abubakar. 
              </p>
              <ul className="space-y-3 text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-tight list-none ml-2">
                <li className="flex items-start gap-3"><CheckCircle size={14} className="text-[#0067b8] mt-1 shrink-0" /> Unauthorized reproduction of source code is strictly prohibited.</li>
                <li className="flex items-start gap-3"><CheckCircle size={14} className="text-[#0067b8] mt-1 shrink-0" /> Commercial use of portfolio assets requires explicit authorization.</li>
              </ul>
            </section>

            <section className="space-y-6 pt-10 border-t border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <Zap className="text-[#0067b8]" size={24} /> 3. Service Deployment Protocols
              </h2>
              <p className="text-[#505050] dark:text-gray-400 leading-relaxed">
                Investment in specific service plans initiates a project queue. Project kick-off and execution timelines are subject to the verification of transaction hashes (TID) provided through the secure checkout engine.
              </p>
            </section>

            <section className="space-y-6 pt-10 border-t border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <FileText className="text-[#0067b8]" size={24} /> 4. Liability &amp; System Integrity
              </h2>
              <p className="text-[#505050] dark:text-gray-400 leading-relaxed">
                While we strive for 99.9% architectural accuracy, Abubakar Digital Architecture provides its services &quot;as is.&quot; We are not liable for external technical interrupts or third-party API dependencies beyond our direct control.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0067b8] p-8 text-white">
               <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Legal Sync</h3>
               <p className="text-blue-100 text-sm mb-8 italic">Version 2.4.0 • Authorized Deployment</p>
               <div className="p-4 bg-white/10 border border-white/20 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">Effective Date</p>
                  <p className="text-lg font-black tracking-tighter">MAY 01, 2026</p>
               </div>
            </div>

            <div className="p-8 border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] group">
               <h3 className="font-semibold text-[#242424] dark:text-white mb-4 uppercase tracking-tighter">Compliance Center</h3>
               <p className="text-sm text-gray-500 mb-6 leading-relaxed italic">Read our data collection protocols to understand how your identity nodes are protected.</p>
               <Link href="/privacy" className="text-[#0067b8] dark:text-[#4da3ff] font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
                  Privacy Protocols <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
