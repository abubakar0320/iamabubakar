"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Loader2, Check, Mail, Phone, MapPin, MessageSquare, FileText, Settings, Globe, Shield, Zap, Info, Share2, Link2, Sparkles, CheckCircle, ChevronRight, Save } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/Icons";
import { motion } from "framer-motion";
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
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0067b8]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Microsoft Style Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-[#242424] dark:text-white tracking-tight uppercase">System Settings</h1>
        <p className="text-sm text-gray-500 mt-2">Configure global metadata and communication infrastructure.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Communication Nodes Tile */}
          <div className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-semibold text-[#242424] dark:text-white mb-8 flex items-center gap-3">
              <Globe className="text-[#0067b8]" size={20} /> Communication Nodes
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200 flex items-center gap-2">
                   <Mail size={12} className="text-[#0067b8]" /> Primary Email
                </label>
                <input
                  type="email"
                  value={settings.contact.email}
                  onChange={(e) => setSettings({...settings, contact: {...settings.contact, email: e.target.value}})}
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200 flex items-center gap-2">
                   <Phone size={12} className="text-[#0067b8]" /> Direct Line
                </label>
                <input
                  type="text"
                  value={settings.contact.phone}
                  onChange={(e) => setSettings({...settings, contact: {...settings.contact, phone: e.target.value}})}
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm font-bold"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200 flex items-center gap-2">
                   <MapPin size={12} className="text-[#0067b8]" /> Geographical HQ
                </label>
                <input
                  type="text"
                  value={settings.contact.location}
                  onChange={(e) => setSettings({...settings, contact: {...settings.contact, location: e.target.value}})}
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm font-bold"
                />
              </div>
            </div>
          </div>

          {/* Social Architecture Tile */}
          <div className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-semibold text-[#242424] dark:text-white mb-8 flex items-center gap-3">
              <Share2 className="text-[#0067b8]" size={20} /> Social Architecture
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200 flex items-center gap-2">
                   <Github size={12} className="text-gray-400" /> GitHub Node
                </label>
                <input
                  type="text"
                  value={settings.contact.socialLinks.github}
                  onChange={(e) => setSettings({...settings, contact: {...settings.contact, socialLinks: {...settings.contact.socialLinks, github: e.target.value}}})}
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-xs font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200 flex items-center gap-2">
                   <Linkedin size={12} className="text-blue-500" /> LinkedIn Node
                </label>
                <input
                  type="text"
                  value={settings.contact.socialLinks.linkedin}
                  onChange={(e) => setSettings({...settings, contact: {...settings.contact, socialLinks: {...settings.contact.socialLinks, linkedin: e.target.value}}})}
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-xs font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200 flex items-center gap-2">
                   <MessageSquare size={12} className="text-emerald-500" /> WhatsApp Link
                </label>
                <input
                  type="text"
                  value={settings.contact.socialLinks.whatsapp}
                  onChange={(e) => setSettings({...settings, contact: {...settings.contact, socialLinks: {...settings.contact.socialLinks, whatsapp: e.target.value}}})}
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-xs font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200 flex items-center gap-2">
                   <FileText size={12} className="text-red-500" /> Profile CV URI
                </label>
                <input
                  type="text"
                  value={settings.contact.cvUrl}
                  onChange={(e) => setSettings({...settings, contact: {...settings.contact, cvUrl: e.target.value}})}
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-[11px] font-mono"
                />
              </div>
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
                {saving ? "Deploying..." : "Sync Config"}
              </button>

              <div className="p-6 bg-gray-50 dark:bg-[#242424] border-l-4 border-[#0067b8] space-y-3">
                 <div className="flex items-center gap-2 text-[#0067b8]">
                    <Info size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Protocol Node</span>
                 </div>
                 <p className="text-[11px] text-gray-500 font-medium italic leading-relaxed text-justify">
                    Synchronizing global constants affects all communication entry points. Ensure URIs use production-grade secure protocols.
                 </p>
              </div>
            </div>
          </div>

          {/* Quick Nav Node */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
             <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Link2 size={14} className="text-[#0067b8]" /> Quick Links
             </h4>
             <div className="space-y-4">
                {[
                  { name: "Projects", href: "/admin/projects" },
                  { name: "Services", href: "/admin/services" },
                  { name: "Inquiries", href: "/admin/messages" }
                ].map(link => (
                  <Link key={link.name} href={link.href} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#242424] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group">
                     <span className="text-[11px] font-bold uppercase tracking-widest text-[#242424] dark:text-gray-400 group-hover:text-[#0067b8]">{link.name}</span>
                     <ChevronRight size={14} className="text-gray-300 group-hover:text-[#0067b8]" />
                  </Link>
                ))}
             </div>
          </div>
        </div>
      </form>
    </div>
  );
}
