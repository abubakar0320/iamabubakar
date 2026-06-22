"use client";

import React, { useEffect, useState } from "react";
import { Save, Loader2, Home, Layout, Zap, TrendingUp, Sparkles, Info, Eye, ChevronRight, Plus, Trash2, Brain } from "lucide-react";
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
  const updateFypHighlight = (index: number, field: string, value: string) => {
    const newList = [...settings.fypSection.highlights];
    newList[index] = { ...newList[index], [field]: value };
    setSettings({ ...settings, fypSection: { ...settings.fypSection, highlights: newList } });
  };

  const addFypHighlight = () => {
    setSettings({
      ...settings,
      fypSection: {
        ...settings.fypSection,
        highlights: [...settings.fypSection.highlights, { icon: "Star", label: "New Highlight", desc: "Description here" }]
      }
    });
  };

  const removeFypHighlight = (index: number) => {
    setSettings({
      ...settings,
      fypSection: {
        ...settings.fypSection,
        highlights: settings.fypSection.highlights.filter((_: any, i: number) => i !== index)
      }
    });
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-[#e10098]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 font-sans pb-10 max-w-7xl mx-auto">
      
      {/* ── Page Header (Vibrant Gradient) ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] text-white p-8 relative overflow-hidden shadow-[0_0_40px_rgba(225,0,152,0.2)]">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-pink-200 mb-2 flex items-center gap-2">
            <Layout size={12} /> Landing Interface
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Home Configuration
          </h1>
          <p className="text-sm text-pink-100 font-medium max-w-xl">
            Manage global landing identity, hero architecture, and primary narrative statements.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white text-[#e10098] font-bold px-6 py-3 hover:bg-gray-100 transition-colors text-xs uppercase tracking-widest shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_5px_25px_rgba(255,255,255,0.3)]"
          >
            <Eye size={15} /> Live Preview
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Narrative Hub */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#e10098]/30 transition-colors duration-300">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#e10098] mb-1">Module 1</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Narrative Hub
                </h2>
              </div>
              <Sparkles size={16} className="text-gray-400 group-hover:text-[#e10098] transition-colors" />
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Main Headline</label>
                <input
                  type="text"
                  value={settings.home.title}
                  onChange={(e) => setSettings({...settings, home: {...settings.home, title: e.target.value}})}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#e10098] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all font-black text-xl tracking-tight"
                  placeholder="e.g. Architecting Digital Experiences"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Sub-headline Tagline</label>
                <input
                  type="text"
                  value={settings.home.tagline}
                  onChange={(e) => setSettings({...settings, home: {...settings.home, tagline: e.target.value}})}
                  className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#00d4ff] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-sm font-bold uppercase tracking-wider text-[#00d4ff]"
                  placeholder="e.g. FULL STACK ENGINEER"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Executive Brief (Description)</label>
                <textarea
                  rows={5}
                  value={settings.home.heroDescription}
                  onChange={(e) => setSettings({...settings, home: {...settings.home, heroDescription: e.target.value}})}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#e10098] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-[13px] font-medium leading-relaxed resize-none"
                  placeholder="Detailed description for the hero section..."
                />
              </div>
            </div>
          </div>

          {/* FYP Hub */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#00d15e]/30 transition-colors duration-300">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#00d15e] mb-1">Module 2</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  FYP Section
                </h2>
              </div>
              <Brain size={16} className="text-gray-400 group-hover:text-[#00d15e] transition-colors" />
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Project Title</label>
                <input
                  type="text"
                  value={settings.fypSection?.title || ""}
                  onChange={(e) => setSettings({...settings, fypSection: {...settings.fypSection, title: e.target.value}})}
                  className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#00d15e] outline-none transition-all font-bold"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Project Description</label>
                <textarea
                  rows={3}
                  value={settings.fypSection?.description || ""}
                  onChange={(e) => setSettings({...settings, fypSection: {...settings.fypSection, description: e.target.value}})}
                  className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#00d15e] outline-none transition-all text-[13px] font-medium leading-relaxed resize-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Tech Stack (Comma Separated)</label>
                <input
                  type="text"
                  value={(settings.fypSection?.techStack || []).join(", ")}
                  onChange={(e) => setSettings({...settings, fypSection: {...settings.fypSection, techStack: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean)}})}
                  className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#00d15e] outline-none transition-all text-sm font-mono text-[#00d15e]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">University Name</label>
                  <input
                    type="text"
                    value={settings.fypSection?.university?.name || ""}
                    onChange={(e) => setSettings({...settings, fypSection: {...settings.fypSection, university: {...settings.fypSection.university, name: e.target.value}}})}
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#00d15e] outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Location</label>
                  <input
                    type="text"
                    value={settings.fypSection?.university?.location || ""}
                    onChange={(e) => setSettings({...settings, fypSection: {...settings.fypSection, university: {...settings.fypSection.university, location: e.target.value}}})}
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#00d15e] outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* Highlights array */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Highlights</label>
                  <button type="button" onClick={addFypHighlight} className="text-[10px] text-[#00d15e] font-black uppercase tracking-widest flex items-center gap-1 border border-[#00d15e] px-3 py-1.5 hover:bg-[#00d15e] hover:text-black transition-colors">
                    <Plus size={12} /> Add Highlight
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(settings.fypSection?.highlights || []).map((h: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 p-4 relative group/card">
                      <div className="space-y-3">
                        <input type="text" value={h.icon} onChange={(e) => updateFypHighlight(idx, "icon", e.target.value)} placeholder="Icon (e.g. Brain)" className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs" />
                        <input type="text" value={h.label} onChange={(e) => updateFypHighlight(idx, "label", e.target.value)} placeholder="Label" className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs font-bold" />
                        <textarea value={h.desc} onChange={(e) => updateFypHighlight(idx, "desc", e.target.value)} placeholder="Description" className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs" rows={2} />
                      </div>
                      <button type="button" onClick={() => removeFypHighlight(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 opacity-0 group-hover/card:opacity-100 transition-opacity"><Trash2 size={12} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800">
            <div className="p-6 bg-[#f8fafc] dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Zap size={14} className="text-[#00d4ff]" /> Control Console
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              <p className="text-xs text-gray-500 leading-relaxed">
                Review your changes to the landing page narrative before deploying.
              </p>
              <button 
                type="submit" 
                disabled={saving}
                className="w-full bg-[#00d4ff] text-black font-black py-4 px-8 hover:bg-[#00bfe6] transition-all flex items-center justify-center gap-3 disabled:bg-gray-400 uppercase text-[11px] tracking-[0.2em] shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.6)]"
              >
                {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                {saving ? "Deploying..." : "Push Updates"}
              </button>

              <div className="p-5 bg-cyan-500/10 border border-cyan-500/20 space-y-3">
                 <div className="flex items-center gap-2 text-[#00d4ff]">
                    <Info size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Sync Information</span>
                 </div>
                 <p className="text-[11px] text-[#00d4ff]/80 font-medium leading-relaxed">
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
