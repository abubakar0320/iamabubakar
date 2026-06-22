"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Mail, Phone, MapPin, MessageSquare, FileText, Globe, Share2, Link2, Zap, Info, ChevronRight, Save, Settings as SettingsIcon } from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import { cn } from "@/lib/utils";

export default function GlobalSettingsPage() {
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
        alert("Global configuration synchronized successfully.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00d4ff]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 font-sans pb-10 max-w-7xl mx-auto">
      
      {/* ── Page Header (Vibrant Gradient) ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-gradient-to-r from-[#0067b8] via-[#00d4ff] to-[#e10098] text-white p-8 relative overflow-hidden shadow-[0_0_40px_rgba(0,212,255,0.2)]">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-cyan-200 mb-2 flex items-center gap-2">
            <SettingsIcon size={12} /> Global Configuration
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            System Settings
          </h1>
          <p className="text-sm text-cyan-100 font-medium max-w-xl">
            Configure global metadata, contact endpoints, and external integration links.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          
          {/* Communication Nodes Tile */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#00d4ff]/30 transition-colors duration-300">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#00d4ff] mb-1">Module 1</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Communication Nodes
                </h2>
              </div>
              <Globe size={16} className="text-gray-400 group-hover:text-[#00d4ff] transition-colors" />
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                     <Mail size={12} className="text-[#00d4ff]" /> Primary Email
                  </label>
                  <input
                    type="email"
                    value={settings.contact.email}
                    onChange={(e) => setSettings({...settings, contact: {...settings.contact, email: e.target.value}})}
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#00d4ff] outline-none transition-all text-sm font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                     <Phone size={12} className="text-[#00d15e]" /> Direct Line
                  </label>
                  <input
                    type="text"
                    value={settings.contact.phone}
                    onChange={(e) => setSettings({...settings, contact: {...settings.contact, phone: e.target.value}})}
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#00d15e] outline-none transition-all text-sm font-bold"
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                     <MapPin size={12} className="text-[#ff4d4d]" /> Geographical HQ
                  </label>
                  <input
                    type="text"
                    value={settings.contact.location}
                    onChange={(e) => setSettings({...settings, contact: {...settings.contact, location: e.target.value}})}
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#ff4d4d] outline-none transition-all text-sm font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Architecture Tile */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#e10098]/30 transition-colors duration-300">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#e10098] mb-1">Module 2</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Social Architecture
                </h2>
              </div>
              <Share2 size={16} className="text-gray-400 group-hover:text-[#e10098] transition-colors" />
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                     <Github size={12} className="text-gray-400 dark:text-white" /> GitHub Node
                  </label>
                  <input
                    type="text"
                    value={settings.contact.socialLinks.github}
                    onChange={(e) => setSettings({...settings, contact: {...settings.contact, socialLinks: {...settings.contact.socialLinks, github: e.target.value}}})}
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#e10098] outline-none transition-all text-xs font-mono"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                     <Linkedin size={12} className="text-pink-500" /> LinkedIn Node
                  </label>
                  <input
                    type="text"
                    value={settings.contact.socialLinks.linkedin}
                    onChange={(e) => setSettings({...settings, contact: {...settings.contact, socialLinks: {...settings.contact.socialLinks, linkedin: e.target.value}}})}
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#e10098] outline-none transition-all text-xs font-mono"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                     <MessageSquare size={12} className="text-emerald-500" /> WhatsApp Link
                  </label>
                  <input
                    type="text"
                    value={settings.contact.socialLinks.whatsapp}
                    onChange={(e) => setSettings({...settings, contact: {...settings.contact, socialLinks: {...settings.contact.socialLinks, whatsapp: e.target.value}}})}
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#e10098] outline-none transition-all text-xs font-mono"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                     <FileText size={12} className="text-amber-500" /> Profile CV URI
                  </label>
                  <input
                    type="text"
                    value={settings.contact.cvUrl}
                    onChange={(e) => setSettings({...settings, contact: {...settings.contact, cvUrl: e.target.value}})}
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#e10098] outline-none transition-all text-xs font-mono text-[#00d4ff]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Control Tile */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800">
            <div className="p-6 bg-[#f8fafc] dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Zap size={14} className="text-[#00d4ff]" /> Control Center
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              <button 
                type="submit" 
                disabled={saving}
                className="w-full bg-[#00d4ff] text-black font-black py-4 px-8 hover:bg-[#00bfe6] transition-all flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:shadow-none shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.6)] uppercase text-[11px] tracking-[0.2em]"
              >
                {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                {saving ? "Deploying..." : "Sync Config"}
              </button>

              <div className="p-5 bg-cyan-500/10 border border-cyan-500/20 space-y-3">
                 <div className="flex items-center gap-2 text-[#00d4ff]">
                    <Info size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Protocol Node</span>
                 </div>
                 <p className="text-[11px] text-cyan-200/80 font-medium leading-relaxed">
                    Synchronizing global constants affects all communication entry points. Ensure URIs use production-grade secure protocols.
                 </p>
              </div>
            </div>
          </div>

          {/* Quick Nav Node */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800">
             <div className="p-6 bg-[#f8fafc] dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800">
               <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Link2 size={14} className="text-[#e10098]" /> Quick Links
               </h4>
             </div>
             <div className="p-4 space-y-2">
                {[
                  { name: "Projects Registry", href: "/admin/projects", color: "hover:text-[#00d4ff]" },
                  { name: "Service Modules", href: "/admin/services", color: "hover:text-[#00d15e]" },
                  { name: "Inbox Hub", href: "/admin/messages", color: "hover:text-[#e10098]" }
                ].map(link => (
                  <Link key={link.name} href={link.href} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1a] hover:bg-white dark:hover:bg-[#242424] border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all group">
                     <span className={cn("text-[11px] font-black uppercase tracking-widest text-gray-500 transition-colors", link.color)}>{link.name}</span>
                     <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500" />
                  </Link>
                ))}
             </div>
          </div>
        </div>
      </form>
    </div>
  );
}
