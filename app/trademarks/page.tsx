"use client";

import { ShieldCheck, Copyright, ChevronRight, Globe, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AbubakarLogo } from "@/components/Icons";

export default function TrademarksPage() {
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
            <h1 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight uppercase">Brand <span className="text-[#00d4ff] dark:text-[#4da3ff]">& Trademarks</span></h1>
            <p className="text-base md:text-lg text-[#505050] dark:text-gray-300 mb-10 leading-relaxed italic border-l-4 border-[#00d4ff] pl-6">
              The Abubakar Digital Architecture brand represents a legacy of technical excellence. 
              Our trademarks are critical nodes of our professional identity and intellectual framework.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-3 text-[#242424] dark:text-white">
                <BadgeCheck className="text-[#00d4ff]" size={24} /> 1. Registered Assets
              </h2>
              <p className="text-[#505050] dark:text-gray-400 leading-relaxed">
                The following are protected trademarks and service marks of Abubakar Digital Architecture. Unauthorized use of these technical markers is strictly monitored:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                 <div className="p-4 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] rounded-full"></div>
                    <span className="font-bold text-sm uppercase tracking-widest text-[#242424] dark:text-white">Abubakar&trade;</span>
                 </div>
                 <div className="p-4 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] rounded-full"></div>
                    <span className="font-bold text-sm uppercase tracking-widest text-[#242424] dark:text-white">Digital Architecture&trade;</span>
                 </div>
                 <div className="p-4 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 flex items-center gap-3 md:col-span-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] rounded-full"></div>
                    <span className="font-bold text-sm uppercase tracking-widest text-[#242424] dark:text-white">Engineering High-Fidelity Digital Assets&trade;</span>
                 </div>
              </div>
            </section>

            <section className="space-y-6 pt-10 border-t border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-semibold flex items-center gap-3 text-[#242424] dark:text-white">
                <ShieldCheck className="text-[#00d4ff]" size={24} /> 2. Visual Identity Node (Logo)
              </h2>
              <div className="flex flex-col md:flex-row gap-10 items-center">
                 <div className="p-8 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-center">
                    <AbubakarLogo size={80} />
                 </div>
                 <div className="flex-grow space-y-4">
                    <p className="text-[#505050] dark:text-gray-400 leading-relaxed italic">
                      The geometric &apos;A&apos; node is the primary visual identifier of our technical ecosystem. 
                      It symbolizes structural integrity, upward trajectory, and algorithmic precision.
                    </p>
                    <ul className="text-xs font-black text-slate-400 uppercase tracking-widest space-y-2">
                       <li>&bull; DO NOT modify the logo&apos;s internal architecture.</li>
                       <li>&bull; MAINTAIN the signature #0067b8 blue protocol.</li>
                       <li>&bull; PROVIDE adequate clear space around the identity node.</li>
                    </ul>
                 </div>
              </div>
            </section>

            <section className="space-y-6 pt-10 border-t border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-semibold flex items-center gap-3 text-[#242424] dark:text-white">
                <Copyright className="text-[#00d4ff]" size={24} /> 3. Attribution Protocols
              </h2>
              <p className="text-[#505050] dark:text-gray-400 leading-relaxed">
                Proper attribution is required when referencing the Abubakar Digital Architecture technical stack or portfolio assets. 
                Use of our trademarks should be accompanied by a statement of ownership.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] p-8 text-white">
               <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Identity Sync</h3>
               <p className="text-pink-100 text-sm mb-8">Trademarks are protected under global intellectual property protocols.</p>
               <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
                  <Globe size={16} /> GLOBAL PROTECTION
               </div>
            </div>

            <div className="p-8 border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] group">
               <h3 className="font-semibold text-[#242424] dark:text-white mb-4 uppercase tracking-tighter">Legal Hub</h3>
               <p className="text-sm text-gray-500 mb-6 leading-relaxed italic">Review our full operational framework to understand our service deployment rules.</p>
               <Link href="/terms" className="text-[#00d4ff] dark:text-[#4da3ff] font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
                  Terms of Use <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
