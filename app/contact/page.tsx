"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2, CheckCircle, ChevronRight, Globe, Zap, ExternalLink } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function ContactForm({ settings }: { settings: any }) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: searchParams.get("subject") || "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a1a1a] p-6 md:p-12 border border-gray-200 dark:border-gray-800 shadow-sm h-full">
      {success ? (
        <div className="h-full flex flex-col items-center justify-center text-center py-10 md:py-20">
          <div className="w-12 md:w-16 h-12 md:h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 mb-6">
            <CheckCircle size={32} />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[#242424] dark:text-white uppercase tracking-tight">Transmission Success</h3>
          <p className="text-gray-500 text-xs md:text-sm font-medium px-4">Your inquiry has been logged into the Abubakar Digital Node.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="mt-8 text-[#0067b8] dark:text-[#4da3ff] font-bold uppercase text-[10px] md:text-xs hover:underline tracking-widest"
          >
            Send Another Signal
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <h3 className="text-lg md:text-xl font-semibold text-[#242424] dark:text-white uppercase tracking-tighter flex items-center gap-3">
             <div className="w-1 h-5 md:w-1.5 md:h-6 bg-[#0067b8]"></div> Send a Message
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label htmlFor="name" className="text-[11px] md:text-[13px] font-semibold text-[#242424] dark:text-gray-200 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-[11px] md:text-[13px] font-semibold text-[#242424] dark:text-gray-200 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@domain.com"
                className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="text-[11px] md:text-[13px] font-semibold text-[#242424] dark:text-gray-200 uppercase tracking-wider">Subject / Intent</label>
            <input
              type="text"
              id="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Project Collaboration"
              className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm font-bold"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-[11px] md:text-[13px] font-semibold text-[#242424] dark:text-gray-200 uppercase tracking-wider">Message Content</label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your architectural requirements..."
              className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm resize-none leading-relaxed"
            />
          </div>
          
          <div className="flex justify-center md:justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto bg-[#0067b8] text-white font-semibold py-4 md:py-3 px-12 hover:bg-[#005da6] transition-all flex items-center justify-center gap-3 disabled:bg-gray-300 shadow-lg shadow-blue-500/10 uppercase text-[10px] md:text-xs tracking-widest"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              {loading ? "Transmitting..." : "Send Message"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setSettings(data));
  }, []);

  if (!settings) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#121212]">
      <Loader2 className="animate-spin h-12 w-12 text-[#0067b8]" />
    </div>
  );

  return (
    <div className="bg-white dark:bg-[#121212] min-h-screen text-[#242424] dark:text-white font-sans pb-20">
      {/* Microsoft Style Banner - Optimized for Mobile */}
      <section className="bg-[#f2f2f2] dark:bg-[#1a1a1a] py-10 md:py-20 px-4 md:px-12 xl:px-20 border-b border-gray-200 dark:border-gray-800 text-center md:text-left">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-3xl md:text-5xl font-semibold mb-4 md:mb-6 tracking-tight uppercase tracking-tighter text-nowrap">Establish <span className="text-[#0067b8] dark:text-[#4da3ff]">Contact</span></h1>
            <p className="text-sm md:text-lg text-[#505050] dark:text-gray-300 mb-0 md:mb-10 leading-relaxed italic border-l-0 md:border-l-4 border-[#0067b8] md:pl-6 max-w-2xl mx-auto md:mx-0">
              Initiate a direct communication link with Abubakar. Available for high-impact technical consultations and project deployments worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 mt-8 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Contact Information - Microsoft Style Cards Optimized for Mobile */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6 md:p-8 shadow-sm">
               <h4 className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 md:mb-8 flex items-center justify-center md:justify-start gap-2">
                 <Globe size={14} className="text-[#0067b8]" /> Global Nodes
               </h4>
               
               <div className="space-y-8 md:space-y-10">
                 <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-4">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-[#0067b8] rounded-lg flex items-center justify-center shrink-0">
                       <Mail size={18} />
                    </div>
                    <div>
                       <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Node</p>
                       <p className="text-xs md:text-sm font-bold mt-0.5">{settings.contact.email}</p>
                    </div>
                 </div>
                 
                 <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-4">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-[#0067b8] rounded-lg flex items-center justify-center shrink-0">
                       <Phone size={18} />
                    </div>
                    <div>
                       <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Voice Line</p>
                       <p className="text-xs md:text-sm font-bold mt-0.5">{settings.contact.phone}</p>
                    </div>
                 </div>
                 
                 <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-4">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-[#0067b8] rounded-lg flex items-center justify-center shrink-0">
                       <MapPin size={18} />
                    </div>
                    <div>
                       <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">HQ Location</p>
                       <p className="text-xs md:text-sm font-bold mt-0.5 leading-snug">{settings.contact.location}</p>
                    </div>
                 </div>
               </div>
            </div>

            <div className="bg-[#0067b8] p-6 md:p-8 text-white relative overflow-hidden text-center md:text-left">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <MessageSquare size={120} className="hidden md:block" />
               </div>
               <h4 className="text-lg md:text-xl font-black uppercase tracking-tighter mb-2 md:mb-4 relative z-10">Instant Sync</h4>
               <p className="text-blue-100 text-[11px] md:text-sm font-medium mb-6 md:mb-8 relative z-10 italic">Average response latency: &lt; 60 minutes.</p>
               <a href={settings.contact.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full py-3.5 bg-white text-[#0067b8] font-black uppercase text-[0.65rem] md:text-[0.7rem] tracking-[0.2em] hover:bg-gray-100 transition-all relative z-10 shadow-lg">
                  WhatsApp Me <ChevronRight size={14} className="ml-1" />
               </a>
            </div>
            
            <div className="flex justify-between items-center px-4 py-3 border border-gray-100 dark:border-gray-800">
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Social Architecture</span>
               <div className="flex gap-4">
                  <a href={settings.contact.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0067b8] transition-colors"><Github size={16} /></a>
                  <a href={settings.contact.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0067b8] transition-colors"><Linkedin size={16} /></a>
                  <a href={settings.contact.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0067b8] transition-colors"><Twitter size={16} /></a>
               </div>
            </div>
          </div>

          {/* Contact Form Wrapper */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <Suspense fallback={
              <div className="bg-white dark:bg-[#1a1a1a] p-12 border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin h-10 w-10 text-[#0067b8]" />
              </div>
            }>
              <ContactForm settings={settings} />
            </Suspense>
          </div>
        </div>

        {/* Microsoft Style Map Section Optimized for Mobile */}
        <section className="mt-12 md:mt-20 relative h-[300px] md:h-[400px] bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-[#242424] rounded-2xl shadow-xl flex items-center justify-center text-[#0067b8] mb-6 animate-bounce">
               <MapPin size={24} className="md:size-32" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-[#242424] dark:text-white uppercase tracking-tighter mb-2">Location Identity</h3>
            <p className="text-xs md:text-sm font-bold text-[#0067b8] uppercase tracking-[0.2em] md:tracking-[0.3em]">{settings.contact.location}</p>
            <div className="mt-6 md:mt-8 flex gap-4">
               <button className="px-6 py-2.5 bg-[#0067b8] text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-[#005da6] transition-colors flex items-center gap-2">
                  Get Directions <ExternalLink size={12} />
               </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
