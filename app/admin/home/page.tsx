"use client";

import React, { useEffect, useState } from "react";
import { Save, Loader2, Home, Layout, Zap, TrendingUp, CheckCircle, Info, Sparkles, Plus, Trash2, ChevronRight, Eye } from "lucide-react";
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
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-[#5c2d91]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 font-sans pb-10 max-w-7xl mx-auto">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0067b8] text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-2 flex items-center gap-2">
            <Layout size={12} /> Landing Interface
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Home Configuration
          </h1>
          <p className="text-sm text-blue-100 font-medium max-w-xl">
            Manage global landing identity, hero architecture, and primary narrative statements.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white text-[#0067b8] font-bold px-6 py-3 hover:bg-gray-100 transition-colors text-xs uppercase tracking-widest shadow-lg"
          >
            <Eye size={15} /> Live Preview
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Narrative Hub */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#0067b8] mb-1">Module 1</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Narrative Hub
                </h2>
              </div>
              <Sparkles size={16} className="text-[#0067b8]" />
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Main Headline</label>
                <input
                  type="text"
                  value={settings.home.title}
                  onChange={(e) => setSettings({...settings, home: {...settings.home, title: e.target.value}})}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 focus:border-[#0067b8] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all font-black text-xl tracking-tight"
                  placeholder="e.g. Architecting Digital Experiences"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Sub-headline Tagline</label>
                <input
                  type="text"
                  value={settings.home.tagline}
                  onChange={(e) => setSettings({...settings, home: {...settings.home, tagline: e.target.value}})}
                  className="w-full px-5 py-3 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 focus:border-[#0067b8] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-sm font-bold uppercase tracking-wider text-[#0067b8]"
                  placeholder="e.g. FULL STACK ENGINEER"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Executive Brief (Description)</label>
                <textarea
                  rows={5}
                  value={settings.home.heroDescription}
                  onChange={(e) => setSettings({...settings, home: {...settings.home, heroDescription: e.target.value}})}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 focus:border-[#0067b8] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-[13px] font-medium leading-relaxed resize-none"
                  placeholder="Detailed description for the hero section..."
                />
              </div>
            </div>
          </div>

          {/* Metrics Tile */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#107c10] mb-1">Module 2</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Impact Metrics
                </h2>
              </div>
              <TrendingUp size={16} className="text-[#107c10]" />
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {settings.home.stats.map((stat: any, index: number) => (
                  <div key={index} className="p-5 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 space-y-4 hover:border-[#107c10] transition-colors group">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Data Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleStatChange(index, "label", e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 outline-none focus:border-[#107c10] text-xs font-black uppercase"
                        placeholder="e.g. PROJECTS COMPLETED"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Node Value</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleStatChange(index, "value", e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 outline-none focus:border-[#107c10] text-2xl font-black text-[#107c10]"
                        placeholder="e.g. 50+"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Control Tile */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="p-6 bg-[#f8fafc] dark:bg-[#242424] border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Zap size={14} className="text-[#0067b8]" /> Deployment Control
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              <p className="text-xs text-gray-500 leading-relaxed">
                Review your changes to the landing page narrative before deploying.
              </p>
              <button 
                type="submit" 
                disabled={saving}
                className="w-full bg-[#0067b8] text-white font-bold py-4 px-8 hover:bg-[#005da6] transition-all flex items-center justify-center gap-3 disabled:bg-gray-400 uppercase text-[11px] tracking-[0.2em] shadow-lg"
              >
                {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                {saving ? "Deploying..." : "Push Updates"}
              </button>

              <div className="p-5 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 space-y-3">
                 <div className="flex items-center gap-2 text-[#0067b8]">
                    <Info size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Sync Information</span>
                 </div>
                 <p className="text-[11px] text-[#0067b8]/80 font-medium leading-relaxed">
                    Changes made here instantly synchronize with the global landing interface.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
