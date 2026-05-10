"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-4 border-blue-100 dark:border-blue-900/30 rounded-full"
        />
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-24 h-24 border-t-4 border-blue-600 rounded-full"
        />
        {/* Logo/Initial */}
        <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-blue-600">
          A
        </div>
      </div>
    </div>
  );
}
