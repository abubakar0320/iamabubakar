"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, Loader2, AlertCircle, ShieldCheck, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
        setError("AUTHENTICATION_FAILED: Invalid credentials supplied.");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("SYSTEM_ERROR: An unexpected interrupt occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-slate-800 relative overflow-hidden">
          {/* Top Decorative Bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-950 dark:bg-white rounded-3xl shadow-2xl mb-8 group transition-transform hover:rotate-6">
               <ShieldCheck size={40} className="text-white dark:text-slate-950" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Control <span className="text-blue-600">Gate</span>
            </h1>
            <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.3em] mt-3 flex items-center justify-center gap-2">
               <Activity size={12} className="text-emerald-500" /> Secure Protocol • v1.0.4
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-500"
              >
                <AlertCircle className="shrink-0" size={20} />
                <p className="text-[0.7rem] font-black uppercase tracking-tight leading-tight">{error}</p>
              </motion.div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                   <Mail size={12} className="text-blue-600" /> Access Identity
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@iamabubakar.com"
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                   <Lock size={12} className="text-blue-600" /> Security Token
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-blue-600 dark:hover:bg-blue-50 py-8 h-auto font-black uppercase text-[0.8rem] tracking-[0.3em] shadow-2xl transition-all active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  Authorizing...
                </>
              ) : (
                <>
                  Establish Connection <Zap size={18} className="ml-3" fill="currentColor" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-12 text-center">
             <p className="text-[0.55rem] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                Unauthorized access is strictly monitored. <br /> All interaction nodes are logged for security.
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
