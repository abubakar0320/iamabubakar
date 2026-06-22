"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, ChevronRight, Loader2, ShieldCheck,
  Globe, Code2, Zap, Clock, MessageSquare,
  Monitor, Server, Search, Mail, Brain,
  Network, Palette, GraduationCap, Star, Plus, Minus
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Static "Why Me" cards ──────────────────────────────────────────────────
const whyCards = [
  { icon: Clock,         title: "On-Time Delivery",     desc: "Every project delivered before deadline, always." },
  { icon: ShieldCheck,   title: "Quality Guaranteed",   desc: "Clean, scalable code with thorough QA testing." },
  { icon: MessageSquare, title: "24/7 Communication",   desc: "Quick responses and transparent progress updates." },
  { icon: Zap,           title: "Fast Performance",     desc: "Optimized builds with sub-second load times." },
  { icon: Globe,         title: "Global Reach",         desc: "Serving clients in Pakistan and internationally." },
  { icon: Star,          title: "5-Star Rated",         desc: "Consistent top ratings on freelance platforms." },
];

// ─── Service category icon map ───────────────────────────────────────────────
const categoryMeta: Record<string, { icon: React.ElementType; color: string }> = {
  "WEB DEVELOPMENT SERVICES":   { icon: Code2,         color: "#0067b8" },
  "DEPLOYMENT & HOSTING SERVICES": { icon: Server,     color: "#107c10" },
  "SEO & ANALYTICS SERVICES":   { icon: Search,        color: "#d83b01" },
  "EMAIL & CONTACT SERVICES":   { icon: Mail,          color: "#5c2d91" },
  "AI SERVICES":                { icon: Brain,         color: "#0078d4" },
  "NETWORKING SERVICES":        { icon: Network,       color: "#004b50" },
  "GRAPHICS & VIDEO SERVICES":  { icon: Palette,       color: "#881798" },
  "STUDENT/FYP SERVICES":       { icon: GraduationCap, color: "#c19c00" },
};

const allCategories = [
  "WEB DEVELOPMENT SERVICES",
  "DEPLOYMENT & HOSTING SERVICES",
  "SEO & ANALYTICS SERVICES",
  "EMAIL & CONTACT SERVICES",
  "AI SERVICES",
  "NETWORKING SERVICES",
  "GRAPHICS & VIDEO SERVICES",
  "STUDENT/FYP SERVICES",
];

// ─── Process steps ────────────────────────────────────────────────────────────
const processSteps = [
  { step: "01", title: "Discovery",   desc: "Understand your requirements, goals, and timeline in a free consultation call." },
  { step: "02", title: "Proposal",    desc: "Receive a detailed project plan, timeline, and transparent pricing within 24 hours." },
  { step: "03", title: "Development", desc: "Regular milestone updates as your project is built with clean, scalable code." },
  { step: "04", title: "Delivery",    desc: "Final delivery with full documentation, testing, and post-launch support." },
];

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string>("USD");
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  useEffect(() => {
    const fetchLocationAndCurrency = async () => {
      try {
        const ipRes = await fetch("https://freeipapi.com/api/json");
        const ipData = await ipRes.json();
        if (ipData && ipData.currencies && ipData.currencies.length > 0) {
          const userCurrency = ipData.currencies[0];
          setCurrency(userCurrency);
          
          const parts = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: userCurrency,
          }).formatToParts(1);
          const sym = parts.find(p => p.type === 'currency')?.value || userCurrency;
          setCurrencySymbol(sym);

          if (userCurrency !== "USD") {
            const rateRes = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
            const rateData = await rateRes.json();
            if (rateData && rateData.rates && rateData.rates[userCurrency]) {
              setExchangeRate(rateData.rates[userCurrency]);
            }
          }
        }
      } catch (err) {
        console.error("Currency fetch error:", err);
      }
    };
    fetchLocationAndCurrency();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, settingsRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/settings"),
        ]);
        const servicesData = await servicesRes.json();
        const settingsData = await settingsRes.json();
        setServices(Array.isArray(servicesData) ? servicesData : []);
        setSettings(settingsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111]">
        <Loader2 className="animate-spin h-12 w-12 text-[#0067b8]" />
      </div>
    );
  }

  // Categories logic simplified for unified grid

  const dbWhyCards = settings?.servicesPage?.whyCards || whyCards;
  const dbProcessSteps = settings?.servicesPage?.processSteps || processSteps;
  const dbPricingPlans = settings?.servicesPage?.pricingPlans || [];
  const dbFaqs = settings?.servicesPage?.faqs || [];

  const getDisplayPrice = (basePrice: string) => {
    const numMatch = basePrice.match(/[\d.]+/);
    if (!numMatch) return basePrice;
    
    const num = parseFloat(numMatch[0]);
    const converted = num * exchangeRate;
    
    const formattedNum = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(converted);
    const hasPlus = basePrice.includes('+');
    
    return `${currencySymbol}${formattedNum}${hasPlus ? '+' : ''}`;
  };

  return (
    <div className="bg-white dark:bg-[#111] min-h-screen text-[#242424] dark:text-white font-sans">

      {/* ══════════════════════════════════════════
          1. HERO BANNER
          ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0d0d0d] py-20 md:py-32 px-4 md:px-12 xl:px-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Services Background"
            fill
            className="object-cover opacity-25"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent z-10" />
        <div className="relative z-20 max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest mb-4">What I Offer</div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6 leading-tight">
              My <span className="text-[#0067b8]">Services</span>
            </h1>
            <p className="text-sm md:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              Providing professional web development, deployment, database solutions, SEO setup, and digital design services to help businesses grow online.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#0067b8] text-white font-bold px-6 py-3 hover:bg-[#005da6] transition-colors text-sm uppercase tracking-widest"
              >
                Get a Free Quote <ChevronRight size={16} />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-bold px-6 py-3 hover:border-[#0067b8] hover:text-[#0067b8] transition-colors text-sm uppercase tracking-widest"
              >
                Browse Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. STATS BAR
          ══════════════════════════════════════════ */}
      <section className="bg-[#0067b8] py-6 px-4 md:px-12 xl:px-20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-white">
          {[
            { label: "Active Services", value: `${services.length}+` },
            { label: "Technologies", value: "15+" },
            { label: "Clients Served", value: "30+" },
            { label: "Satisfaction Rate", value: "99%" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="text-center md:text-left"
            >
              <div className="text-2xl md:text-4xl font-black tracking-tighter">{s.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-blue-100">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. SERVICE CARDS (Grid view for all services)
          ══════════════════════════════════════════ */}
      <div id="services" className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const IconComponent = (LucideIcons as any)[service.icon || "Globe"] || LucideIcons.Globe;
            const accentColor = "#0067b8";
            
            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col group bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-all overflow-hidden h-full"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg"
                      style={{ backgroundColor: accentColor }}
                    >
                      <IconComponent size={20} />
                    </div>
                  </div>
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: accentColor }} />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-bold mb-2 text-[#242424] dark:text-white leading-snug group-hover:text-[#0067b8] transition-colors uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#505050] dark:text-gray-400 mb-5 leading-relaxed font-medium flex-1">
                    {service.description}
                  </p>
                  <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
                    {service.features?.slice(0, 3).map((feature: string) => (
                      <div key={feature} className="flex items-center gap-2 text-[10px] font-black text-[#505050] dark:text-gray-400 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          5. PROCESS — How It Works
          ══════════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-4 md:px-12 xl:px-20 bg-[#f2f2f2] dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-14 space-y-3">
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">Workflow</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
              How It <span className="text-[#0067b8]">Works</span>
            </h2>
            <p className="text-sm text-[#505050] dark:text-gray-400 max-w-xl font-medium">
              A structured, transparent process from first contact to final delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dbProcessSteps.map((step: any, i: number) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-8 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-colors group"
              >
                <div className="absolute top-4 right-5 text-6xl font-black text-gray-100 dark:text-gray-800 select-none leading-none">
                  {step.step}
                </div>
                <div className="w-10 h-10 mb-5 bg-[#0067b8] flex items-center justify-center text-white text-sm font-black">
                  {step.step}
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-[#242424] dark:text-white mb-2 group-hover:text-[#0067b8] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-[#505050] dark:text-gray-400 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. WHY CHOOSE ME
          ══════════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-4 md:px-12 xl:px-20 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-14 space-y-3">
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">Advantages</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
              Why Choose <span className="text-[#0067b8]">Me?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dbWhyCards.map((card: any, i: number) => {
              const IconComp = (LucideIcons as any)[card.icon || "Star"] || LucideIcons.Star;
              return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-5 p-6 bg-[#f7f7f7] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:border-[#0067b8] dark:hover:border-[#0067b8] transition-colors group"
              >
                <div className="w-11 h-11 shrink-0 bg-white dark:bg-[#252525] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#0067b8] group-hover:bg-[#0067b8] group-hover:text-white transition-colors">
                  <IconComp size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-[#242424] dark:text-white mb-1 group-hover:text-[#0067b8] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#505050] dark:text-gray-400 leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );})}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. PRICING PLANS
          ══════════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-4 md:px-12 xl:px-20 bg-[#f2f2f2] dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-14 space-y-3">
            <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">Transparent Pricing</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
              Investment <span className="text-[#0067b8]">Plans</span>
            </h2>
            <p className="text-sm text-[#505050] dark:text-gray-400 max-w-xl font-medium">
              Clear, upfront pricing with no hidden costs. All plans include free consultation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {dbPricingPlans.map((plan: any, index: number) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col border overflow-hidden transition-all",
                  plan.recommended
                    ? "bg-[#0067b8] text-white border-[#0067b8] shadow-2xl shadow-blue-500/20 scale-[1.02]"
                    : "bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-800 hover:border-[#0067b8] dark:hover:border-[#0067b8]"
                )}
              >
                {plan.recommended && (
                  <div className="bg-[#ffb900] text-black text-[9px] font-black uppercase tracking-widest text-center py-1.5">
                    ★ Most Popular
                  </div>
                )}
                <div className="p-8 md:p-10 flex flex-col flex-1">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-4 mb-6 pb-6 border-b border-current/10">
                    <span className="text-5xl font-black">{getDisplayPrice(plan.price)}</span>
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", plan.recommended ? "text-blue-100" : "text-gray-400")}>
                      / project
                    </span>
                  </div>
                  <p className={cn("text-sm font-medium leading-relaxed mb-8", plan.recommended ? "text-blue-50" : "text-[#505050] dark:text-gray-400")}>
                    {plan.description}
                  </p>
                  <div className="space-y-3 mb-10 flex-1">
                    {plan.features?.map((f: string) => (
                      <div key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight">
                        <Check size={13} className={plan.recommended ? "text-white shrink-0" : "text-[#0067b8] shrink-0"} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/checkout?plan=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price)}`}
                    className={cn(
                      "w-full mt-auto flex items-center justify-center gap-2 py-3.5 font-black uppercase tracking-widest text-xs transition-colors",
                      plan.recommended
                        ? "bg-white text-[#0067b8] hover:bg-gray-100"
                        : "bg-[#0067b8] text-white hover:bg-[#005da6]"
                    )}
                  >
                    {plan.cta} <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. FAQ ACCORDION
          ══════════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-4 md:px-12 xl:px-20 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left sticky */}
            <div className="lg:w-[360px] shrink-0">
              <div className="lg:sticky lg:top-28 space-y-5">
                <div className="text-xs font-black uppercase text-[#0067b8] tracking-widest">FAQ</div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-[#242424] dark:text-white">
                  Common <span className="text-[#0067b8]">Questions</span>
                </h2>
                <p className="text-sm text-[#505050] dark:text-gray-400 leading-relaxed font-medium">
                  Everything you need to know before getting started. Still have questions?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0067b8] hover:underline underline-offset-4"
                >
                  Ask directly →
                </Link>
              </div>
            </div>
            {/* Accordion */}
            <div className="flex-1 divide-y divide-gray-100 dark:divide-gray-800">
              {dbFaqs.map((faq: any, index: number) => (
                <div key={index}>
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  >
                    <span className={cn(
                      "text-sm font-semibold transition-colors",
                      openFaq === index ? "text-[#0067b8]" : "text-[#242424] dark:text-white group-hover:text-[#0067b8]"
                    )}>
                      {faq.question}
                    </span>
                    <span className="shrink-0 w-7 h-7 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#505050] dark:text-gray-400 group-hover:border-[#0067b8] group-hover:text-[#0067b8] transition-colors">
                      {openFaq === index ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === index && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-[#505050] dark:text-gray-400 leading-relaxed font-medium pb-5 pr-10">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. CONTACT CTA BANNER
          ══════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-12 xl:px-20 bg-[#0067b8]">
        <div className="max-w-[1600px] mx-auto text-center text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-sm md:text-base text-blue-100 max-w-xl mx-auto font-medium">
            Tell me about your project and get a free, no-obligation quote within 24 hours.
            Student discounts available for FYP projects.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#0067b8] font-black px-8 py-3.5 hover:bg-[#f2f2f2] transition-colors uppercase tracking-widest text-sm"
            >
              Contact Me Now <ChevronRight size={16} />
            </Link>
            <a
              href="mailto:abubakr.bgnu@gmail.com"
              className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-6 py-3.5 hover:border-white transition-colors text-sm uppercase tracking-widest"
            >
              abubakr.bgnu@gmail.com
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
