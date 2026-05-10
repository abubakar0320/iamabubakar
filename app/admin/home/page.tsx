"use client";

import React, { useEffect, useState } from "react";
import { Save, Loader2, Home, Layout, Zap, TrendingUp, CheckCircle, Info, Sparkles, Plus, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AdminHomePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        alert("Hero configuration synchronized successfully.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...settings.home.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setSettings({ ...settings, home: { ...settings.home, stats: newStats } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0067b8]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Microsoft Style Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-[#242424] dark:text-white tracking-tight text-uppercase uppercase">Home Configuration</h1>
        <p className="text-sm text-gray-500 mt-2">Manage global landing identity and narrative architecture.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Main Configuration Tile */}
          <div className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-semibold text-[#242424] dark:text-white mb-8 flex items-center gap-3">
              <Sparkles className="text-[#0067b8]" size={20} /> Narrative Hub
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Main Headline</label>
                <input
                  type="text"
                  value={settings.home.title}
                  onChange={(e) => setSettings({...settings, home: {...settings.home, title: e.target.value}})}
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all font-bold text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Sub-headline Tagline</label>
                <input
                  type="text"
                  value={settings.home.tagline}
                  onChange={(e) => setSettings({...settings, home: {...settings.home, tagline: e.target.value}})}
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Executive Brief (Description)</label>
                <textarea
                  rows={6}
                  value={settings.home.heroDescription}
                  onChange={(e) => setSettings({...settings, home: {...settings.home, heroDescription: e.target.value}})}
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm font-medium resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Metrics Tile */}
          <div className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-semibold text-[#242424] dark:text-white mb-8 flex items-center gap-3">
              <TrendingUp className="text-[#0067b8]" size={20} /> Impact Metrics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {settings.home.stats.map((stat: any, index: number) => (
                <div key={index} className="p-6 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleStatChange(index, "label", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 outline-none focus:border-[#0067b8] text-[11px] font-black uppercase"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Node Value</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleStatChange(index, "value", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 outline-none focus:border-[#0067b8] text-lg font-black text-[#0067b8]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Control Tile */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <Zap size={16} className="text-[#0067b8]" /> Control Center
            </h3>
            
            <div className="space-y-6">
              <button 
                type="submit" 
                disabled={saving}
                className="w-full bg-[#0067b8] text-white font-semibold py-4 px-8 hover:bg-[#005da6] transition-all flex items-center justify-center gap-3 disabled:bg-gray-300 shadow-lg shadow-blue-500/10 uppercase text-xs tracking-widest"
              >
                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {saving ? "Deploying..." : "Push Updates"}
              </button>

              <div className="p-6 bg-gray-50 dark:bg-[#242424] border-l-4 border-[#0067b8] space-y-3">
                 <div className="flex items-center gap-2 text-[#0067b8]">
                    <Info size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Deployment Node</span>
                 </div>
                 <p className="text-[11px] text-gray-500 font-medium italic leading-relaxed">
                    Changes made here synchronize with the global landing interface nodes. Authorization is recorded.
                 </p>
              </div>
            </div>
          </div>

          {/* Quick Nav Node */}
          <div className="bg-[#0067b8] p-8 text-white relative overflow-hidden shadow-xl">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Home size={100} /></div>
             <h3 className="text-lg font-black uppercase tracking-tighter mb-4 relative z-10 italic">Frontend Studio</h3>
             <p className="text-blue-100 text-xs font-medium mb-8 relative z-10">You are currently configuring the main presentation layer of your portfolio.</p>
             <Link href="/" target="_blank" className="inline-flex items-center justify-center w-full py-3 bg-white text-[#0067b8] font-black uppercase text-[0.7rem] tracking-[0.2em] hover:bg-gray-100 transition-all relative z-10">
                Live Preview <ChevronRight size={14} className="ml-1" />
             </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
