"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, AlertCircle, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid credentials. Please check your email and password.");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0d0d0d]">

      {/* ── Left Panel (Branding) ── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] px-16 py-14 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-2.5 h-2.5 bg-white" />
              <div className="w-2.5 h-2.5 bg-white/60" />
              <div className="w-2.5 h-2.5 bg-white/60" />
              <div className="w-2.5 h-2.5 bg-white" />
            </div>
            <span className="text-white font-black uppercase tracking-[0.3em] text-sm">Admin Center</span>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 space-y-6">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">Secure Access Portal</div>
          <h1 className="text-5xl font-semibold text-white leading-tight tracking-tight">
            Manage Your<br />
            <span className="text-white/60">Portfolio</span> with<br />
            Full Control.
          </h1>
          <p className="text-pink-100 text-sm leading-relaxed max-w-sm font-medium">
            Admin panel for iamabubakar.site — manage projects, services, messages, and site content from one place.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-pink-100">System Operational</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-blue-200/60 text-[10px] font-medium uppercase tracking-widest">
            © 2025 iamabubakar.site — All Rights Reserved
          </p>
        </div>
      </div>

      {/* ── Right Panel (Form) ── */}
      <div className="flex-1 flex items-center justify-center px-8 py-16 bg-white dark:bg-[#111]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-12 lg:hidden">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-2 h-2 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff]" />
              <div className="w-2 h-2 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff]/50" />
              <div className="w-2 h-2 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff]/50" />
              <div className="w-2 h-2 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff]" />
            </div>
            <span className="text-[#00d4ff] font-black uppercase tracking-[0.3em] text-sm">Admin Center</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="text-[10px] font-black uppercase text-[#00d4ff] tracking-widest mb-3">Sign In</div>
            <h2 className="text-4xl font-semibold text-[#242424] dark:text-white tracking-tight leading-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
              Enter your credentials to access the admin dashboard.
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 flex items-start gap-3 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-4"
            >
              <AlertCircle className="shrink-0 text-red-500 mt-0.5" size={16} />
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Mail size={11} className="text-[#00d4ff]" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@iamabubakar.site"
                className="w-full px-4 py-3.5 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 focus:border-[#00d4ff] dark:focus:border-[#00d4ff] outline-none transition-colors text-sm font-medium text-[#242424] dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Lock size={11} className="text-[#00d4ff]" />
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full px-4 py-3.5 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 focus:border-[#00d4ff] dark:focus:border-[#00d4ff] outline-none transition-colors text-sm font-medium text-[#242424] dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] text-white font-bold py-4 px-8 hover:bg-gradient-to-r from-[#c00082] via-[#4a2474] to-[#00b8cc] transition-colors text-sm uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-center leading-relaxed">
              Unauthorized access is strictly prohibited. <br />
              All sessions are monitored and logged.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
