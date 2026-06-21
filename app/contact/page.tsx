"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Mail, Phone, MapPin, Send, Loader2, CheckCircle,
  ChevronRight, Globe, MessageSquare, Clock,
  Zap, ShieldCheck, Users, ExternalLink, Download,
  GraduationCap, Code2, Briefcase
} from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/Icons";

// ─── Static Data ─────────────────────────────────────────────────────────────
const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "abubakr.bgnu@gmail.com",
    href: "mailto:abubakr.bgnu@gmail.com",
    desc: "Best for project inquiries",
    color: "#0067b8",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "(+92) 309-7354874",
    href: "tel:+923097354874",
    desc: "Available 9am – 9pm PKT",
    color: "#107c10",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mananwala, Sheikhupura, Pakistan",
    href: "https://maps.google.com/?q=Mananwala+Sheikhupura+Pakistan",
    desc: "Available globally (remote)",
    color: "#d83b01",
  },
  {
    icon: Globe,
    label: "Website",
    value: "iamabubakar.site",
    href: "https://iamabubakar.site",
    desc: "Portfolio & live projects",
    color: "#5c2d91",
  },
];

const quickServices = [
  { icon: Code2,         title: "MERN Web Development",   desc: "Full-stack web apps built with React, Node.js, Express & MongoDB." },
  { icon: GraduationCap, title: "FYP Assistance",          desc: "Complete FYP development, documentation, and presentation support." },
  { icon: Briefcase,     title: "Freelance Projects",       desc: "Business websites, e-commerce, landing pages, and dashboards." },
  { icon: ShieldCheck,   title: "Cisco Networking",         desc: "Network setup, configuration, and cybersecurity consulting." },
];

const responseInfo = [
  { label: "Average Response",   value: "< 1 Hour",   icon: Clock },
  { label: "Availability",       value: "9am–9pm PKT", icon: Globe },
  { label: "Project Start",      value: "Within 48h",  icon: Zap },
  { label: "Client Satisfaction",value: "99%",         icon: Users },
];

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm({ settings }: { settings: any }) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: searchParams.get("subject") || "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSuccess(false), 6000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-8">
        <div className="w-20 h-20 bg-[#107c10]/10 flex items-center justify-center text-[#107c10] mb-6">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tight text-[#242424] dark:text-white mb-3">
          Message Sent!
        </h3>
        <p className="text-sm text-[#505050] dark:text-gray-400 font-medium mb-8 max-w-sm">
          Your message has been received. I'll get back to you within 1 hour during working hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-[#0067b8] font-black uppercase text-xs hover:underline tracking-widest"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1a1a1a] p-8 md:p-12 border border-gray-200 dark:border-gray-800 h-full">
      <div className="mb-8 space-y-2">
        <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">Get In Touch</div>
        <h3 className="text-2xl font-semibold uppercase tracking-tight text-[#242424] dark:text-white">
          Send a Message
        </h3>
        <p className="text-sm text-[#505050] dark:text-gray-400 font-medium">
          Fill in the form and I'll respond within 1 hour.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-[11px] font-black text-[#242424] dark:text-gray-300 uppercase tracking-widest">
              Full Name *
            </label>
            <input
              type="text" id="name" required value={formData.name} onChange={handleChange}
              placeholder="Abu Bakar Siddique"
              className="w-full px-4 py-3 bg-[#f7f7f7] dark:bg-[#111] border border-gray-200 dark:border-gray-700 focus:border-[#0067b8] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-[11px] font-black text-[#242424] dark:text-gray-300 uppercase tracking-widest">
              Email Address *
            </label>
            <input
              type="email" id="email" required value={formData.email} onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-[#f7f7f7] dark:bg-[#111] border border-gray-200 dark:border-gray-700 focus:border-[#0067b8] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="subject" className="text-[11px] font-black text-[#242424] dark:text-gray-300 uppercase tracking-widest">
            What can I help with? *
          </label>
          <select
            id="subject" required value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#f7f7f7] dark:bg-[#111] border border-gray-200 dark:border-gray-700 focus:border-[#0067b8] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-sm font-medium appearance-none"
          >
            <option value="">Select a topic...</option>
            <option value="MERN Web Development">MERN Web Development</option>
            <option value="FYP Assistance">FYP Assistance</option>
            <option value="Freelance Project">Freelance Project</option>
            <option value="Networking / Cisco">Networking / Cisco</option>
            <option value="Job / Internship Offer">Job / Internship Offer</option>
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-[11px] font-black text-[#242424] dark:text-gray-300 uppercase tracking-widest">
            Your Message *
          </label>
          <textarea
            id="message" required rows={6} value={formData.message} onChange={handleChange}
            placeholder="Tell me about your project, requirements, or timeline..."
            className="w-full px-4 py-3 bg-[#f7f7f7] dark:bg-[#111] border border-gray-200 dark:border-gray-700 focus:border-[#0067b8] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-sm font-medium resize-none leading-relaxed"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-[11px] text-[#505050] dark:text-gray-500 font-medium">
            🔒 Your data is private and never shared.
          </p>
          <button
            type="submit" disabled={loading}
            className="w-full sm:w-auto bg-[#0067b8] text-white font-black py-3.5 px-10 hover:bg-[#005da6] transition-all flex items-center justify-center gap-3 disabled:opacity-60 uppercase text-xs tracking-widest"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111]">
        <Loader2 className="animate-spin h-12 w-12 text-[#0067b8]" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#111] min-h-screen text-[#242424] dark:text-white font-sans">

      {/* ══════════════════════════════════════════
          1. HERO BANNER
          ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0d0d0d] py-20 md:py-28 px-4 md:px-12 xl:px-20">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-bg.jpg" alt="Contact Background" fill className="object-cover opacity-20" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent z-10" />
        <div className="relative z-20 max-w-[1600px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest mb-4">Let's Talk</div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-5 leading-tight">
              Contact <span className="text-[#0067b8]">Me</span>
            </h1>
            <p className="text-sm md:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              Have a project in mind? Need FYP help? Or just want to say hello?
              I respond to every message — usually within an hour.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:abubakr.bgnu@gmail.com"
                className="inline-flex items-center gap-2 bg-[#0067b8] text-white font-bold px-6 py-3 hover:bg-[#005da6] transition-colors text-sm uppercase tracking-widest">
                <Mail size={15} /> Email Me
              </a>
              <a href={settings?.contact?.socialLinks?.whatsapp || "#"} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-bold px-6 py-3 hover:border-[#0067b8] hover:text-[#0067b8] transition-colors text-sm uppercase tracking-widest">
                <MessageSquare size={15} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. RESPONSE STATS BAR
          ══════════════════════════════════════════ */}
      <section className="bg-[#0067b8] py-5 px-4 md:px-12 xl:px-20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-white">
          {responseInfo.map((r, i) => (
            <motion.div key={r.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3">
              <r.icon size={20} className="opacity-70 shrink-0" />
              <div>
                <div className="text-lg md:text-xl font-black tracking-tighter">{r.value}</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-blue-100">{r.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. CONTACT METHODS
          ══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 md:px-12 xl:px-20 bg-[#f2f2f2] dark:bg-[#0d0d0d] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-12 space-y-2">
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">Reach Out</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
              Contact <span className="text-[#0067b8]">Methods</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactMethods.map((m, i) => (
              <motion.a key={m.label} href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-all p-7 flex flex-col gap-4 overflow-hidden">
                <div className="w-12 h-12 flex items-center justify-center text-white transition-transform group-hover:scale-110"
                  style={{ backgroundColor: m.color }}>
                  <m.icon size={22} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{m.label}</div>
                  <div className="text-sm font-bold text-[#242424] dark:text-white group-hover:text-[#0067b8] transition-colors leading-snug break-all">{m.value}</div>
                  <div className="text-xs text-[#505050] dark:text-gray-400 font-medium mt-1">{m.desc}</div>
                </div>
                <div className="mt-auto flex items-center gap-1 text-[10px] font-black uppercase tracking-widest" style={{ color: m.color }}>
                  Connect <ChevronRight size={11} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. MAIN FORM + SIDEBAR
          ══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-4 md:px-12 xl:px-20 bg-white dark:bg-[#111]">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">

              {/* Availability card */}
              <div className="bg-[#f7f7f7] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-7 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#107c10] animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-[#107c10]">Currently Available</span>
                </div>
                <h3 className="text-xl font-black uppercase text-[#242424] dark:text-white tracking-tight">
                  Open to Work
                </h3>
                <p className="text-sm text-[#505050] dark:text-gray-400 font-medium leading-relaxed">
                  Looking for internships, freelance projects, and full-time opportunities in
                  Full-Stack / MERN development.
                </p>
                <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                  {["Internship", "Freelance", "Part-time", "Full-time"].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-xs font-bold text-[#505050] dark:text-gray-400 uppercase tracking-widest">
                      <CheckCircle size={13} className="text-[#0067b8]" /> {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick info */}
              <div className="bg-[#0067b8] p-7 text-white space-y-5">
                <h4 className="text-base font-black uppercase tracking-tight">Quick Facts</h4>
                <div className="space-y-3">
                  {[
                    { label: "Location", val: "Mananwala, Sheikhupura" },
                    { label: "University", val: "BGNU — BSIT" },
                    { label: "CGPA", val: "3.42 / 4.00" },
                    { label: "Response Time", val: "< 1 hour" },
                  ].map((f) => (
                    <div key={f.label} className="flex items-center justify-between text-xs border-b border-white/15 pb-2">
                      <span className="font-bold text-blue-100 uppercase tracking-widest">{f.label}</span>
                      <span className="font-black">{f.val}</span>
                    </div>
                  ))}
                </div>
                <a href={settings?.contact?.socialLinks?.whatsapp || "#"} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#0067b8] font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors">
                  <MessageSquare size={14} /> WhatsApp Me
                </a>
              </div>

              {/* Social links */}
              <div className="bg-[#f7f7f7] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-5">
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Social Profiles</div>
                <div className="flex gap-4">
                  {[
                    { href: settings?.contact?.socialLinks?.github, Icon: Github, label: "GitHub" },
                    { href: settings?.contact?.socialLinks?.linkedin, Icon: Linkedin, label: "LinkedIn" },
                    { href: settings?.contact?.socialLinks?.twitter, Icon: Twitter, label: "Twitter" },
                  ].map(({ href, Icon, label }) => (
                    <a key={label} href={href || "#"} target="_blank" rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[#0067b8] transition-colors group">
                      <div className="w-10 h-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:border-[#0067b8] transition-colors">
                        <Icon size={16} />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* CV Download */}
              {settings?.contact?.cvUrl && (
                <a href={settings.contact.cvUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#242424] dark:bg-white text-white dark:text-[#242424] font-black text-xs uppercase tracking-widest hover:bg-[#0067b8] dark:hover:bg-[#0067b8] dark:hover:text-white transition-colors border border-transparent">
                  <Download size={15} /> Download My CV
                </a>
              )}
            </div>

            {/* Contact Form */}
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
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. WHAT I CAN HELP WITH
          ══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 md:px-12 xl:px-20 bg-[#f2f2f2] dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-12 space-y-2">
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">Services</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
              What I Can <span className="text-[#0067b8]">Help With</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickServices.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-colors p-7 group">
                <div className="w-11 h-11 mb-5 bg-[#0067b8] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <s.icon size={20} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-tight text-[#242424] dark:text-white mb-2 group-hover:text-[#0067b8] transition-colors">{s.title}</h3>
                <p className="text-xs text-[#505050] dark:text-gray-400 leading-relaxed font-medium">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/services"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#0067b8] hover:underline underline-offset-4">
              View All Services <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. MAP / LOCATION
          ══════════════════════════════════════════ */}
      <section className="py-16 px-4 md:px-12 xl:px-20 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-10 space-y-2">
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">Location</div>
            <h2 className="text-3xl font-semibold uppercase tracking-tight text-[#242424] dark:text-white">
              Where I'm <span className="text-[#0067b8]">Based</span>
            </h2>
          </div>
          <div className="relative h-[300px] md:h-[380px] bg-[#f2f2f2] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 overflow-hidden flex items-center justify-center group">
            {/* Dot grid pattern */}
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle, #0067b8 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className="relative z-10 flex flex-col items-center text-center gap-5 px-6">
              <div className="w-16 h-16 bg-[#0067b8] flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-[#242424] dark:text-white mb-1">
                  Mananwala, Sheikhupura
                </h3>
                <p className="text-sm font-bold text-[#0067b8] uppercase tracking-widest">Punjab, Pakistan 🇵🇰</p>
                <p className="text-xs text-[#505050] dark:text-gray-400 font-medium mt-2">Available for remote work globally</p>
              </div>
              <a href="https://maps.google.com/?q=Mananwala+Sheikhupura+Pakistan" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0067b8] text-white font-black text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-[#005da6] transition-colors">
                <ExternalLink size={12} /> Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. FINAL CTA SECTION
          ══════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-12 xl:px-20 bg-[#0067b8]">
        <div className="max-w-[1600px] mx-auto text-center text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-tight">
            Don't Wait — Let's Build Together
          </h2>
          <p className="text-sm md:text-base text-blue-100 max-w-xl mx-auto font-medium">
            Every great project starts with a conversation. Reach out now and let's
            turn your idea into a live, working product.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:abubakr.bgnu@gmail.com"
              className="inline-flex items-center gap-2 bg-white text-[#0067b8] font-black px-8 py-3.5 hover:bg-[#f2f2f2] transition-colors uppercase tracking-widest text-sm">
              <Mail size={15} /> abubakr.bgnu@gmail.com
            </a>
            <a href="tel:+923097354874"
              className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-6 py-3.5 hover:border-white transition-colors text-sm uppercase tracking-widest">
              <Phone size={15} /> (+92) 309-7354874
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
