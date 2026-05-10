"use client";

import React, { useState, useEffect } from "react";
import { Cookie, X, ShieldCheck, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function CookieConsent() {
  const [isVisible, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookie-consent-abk");
    if (!consent) {
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type: "accept" | "reject") => {
    localStorage.setItem("cookie-consent-abk", type);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 w-full z-[100] p-4 md:p-6"
        >
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-[0_-10px_50px_rgba(0,0,0,0.1)] p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
              {/* Microsoft Style Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#0067b8]"></div>
              
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left relative z-10">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-[#0067b8] rounded-full flex items-center justify-center shrink-0">
                  <Cookie size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black uppercase tracking-widest text-[#242424] dark:text-white flex items-center justify-center md:justify-start gap-2">
                    Privacy <span className="text-gray-400">&</span> Cookies
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl italic">
                    We use minimalist technical nodes (cookies) to optimize your architectural experience and ensure secure transaction streams. 
                    By continuing, you acknowledge our global <Link href="/privacy" className="text-[#0067b8] hover:underline font-bold">Privacy Protocols</Link>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full lg:w-auto relative z-10">
                <button 
                  onClick={() => handleConsent("reject")}
                  className="flex-grow lg:flex-none px-8 py-2.5 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-[#242424] dark:hover:text-white transition-colors"
                >
                  Reject
                </button>
                <button 
                  onClick={() => handleConsent("accept")}
                  className="flex-grow lg:flex-none px-10 py-2.5 bg-[#0067b8] text-white text-xs font-black uppercase tracking-widest hover:bg-[#005da6] transition-all flex items-center justify-center gap-2"
                >
                  Accept <ChevronRight size={14} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-[-20px] right-[-20px] md:static p-2 text-gray-300 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              {/* Subtle background decoration */}
              <div className="absolute right-[-20px] bottom-[-20px] opacity-5 pointer-events-none">
                 <ShieldCheck size={120} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
