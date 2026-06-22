"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Minus, ChevronRight, Loader2, Briefcase, ShieldCheck } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { pricingPlans, faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    "WEB DEVELOPMENT SERVICES",
    "DEPLOYMENT & HOSTING SERVICES",
    "SEO & ANALYTICS SERVICES",
    "EMAIL & CONTACT SERVICES",
    "AI SERVICES",
    "NETWORKING SERVICES",
    "GRAPHICS & VIDEO SERVICES",
    "STUDENT/FYP SERVICES"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, settingsRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/settings")
        ]);
        const servicesData = await servicesRes.json();
        const settingsData = await settingsRes.json();
        setServices(servicesData);
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-[#0067b8]" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#121212] min-h-screen text-[#242424] dark:text-white font-sans pb-20 text-[13px] md:text-base">
      {/* Microsoft Style Banner - Optimized for Mobile */}
      <section className="bg-[#f2f2f2] dark:bg-[#1a1a1a] py-10 md:py-20 px-4 md:px-12 xl:px-20 border-b border-gray-200 dark:border-gray-800 text-center md:text-left">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl font-semibold mb-4 md:mb-6 tracking-tight">Service <span className="text-[#0067b8] dark:text-[#4da3ff]">Engine</span></h1>
            <p className="text-sm md:text-lg text-[#505050] dark:text-gray-300 mb-0 leading-relaxed max-w-2xl">
              Scale your business with architectural precision. My service modules are engineered to provide maximum impact, 
              reliability, and digital transformation.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 mt-12 md:mt-16">
        {categories.map((category) => {
          const categoryServices = services.filter(s => s.category === category);
          if (categoryServices.length === 0) return null;

          return (
            <div key={category} className="mb-20 md:mb-28">
              <div className="flex items-center gap-4 mb-10 md:mb-12 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div className="w-2 h-8 bg-[#0067b8]"></div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tighter uppercase text-[#242424] dark:text-white">{category}</h2>
                <div className="flex-grow"></div>
                <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest hidden md:block">{categoryServices.length} Modules Online</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {categoryServices.map((service, index) => {
                  const IconComponent = (LucideIcons as any)[service.icon || "Globe"] || LucideIcons.Globe;
                  
                  return (
                    <motion.div
                      key={service._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col group bg-white dark:bg-[#1a1a1a] shadow-[0_2px_4_rgba(0,0,0,0.06)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] dark:shadow-none dark:border dark:border-[#333] h-full transition-all overflow-hidden"
                    >
                      <div className="relative h-40 md:h-48 overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-6">
                           <div className="w-10 h-10 bg-[#0067b8] text-white flex items-center justify-center shadow-2xl">
                              <IconComponent size={20} />
                           </div>
                        </div>
                      </div>

                      <div className="p-6 md:p-8 flex flex-col flex-grow">
                        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-[#242424] dark:text-white leading-snug group-hover:text-[#0067b8] transition-colors uppercase tracking-tight">{service.title}</h3>
                        <p className="text-xs md:text-sm text-[#505050] dark:text-gray-300 mb-6 md:mb-8 leading-relaxed font-medium">
                          {service.description}
                        </p>
                        
                        <div className="space-y-3 mt-auto pt-6 border-t border-gray-50 dark:border-gray-800/50">
                          {service.features.map((feature: string) => (
                            <div key={feature} className="flex items-center text-[0.65rem] md:text-[0.7rem] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest gap-2.5">
                              <div className="w-1.5 h-1.5 bg-[#0067b8] rounded-full shrink-0"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Pricing/Investment Section - Microsoft Business Style Optimized for Mobile */}
        <section className="mt-20 md:mt-32">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12 text-center md:text-left">
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold text-[#242424] dark:text-white tracking-tight">Investment Plans</h2>
              <p className="text-xs md:text-base text-[#505050] dark:text-gray-400 mt-2">Transparent architecture deployment tiers for your organization.</p>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-[0.6rem] md:text-[0.7rem] font-black uppercase text-gray-400 tracking-widest bg-gray-50 dark:bg-gray-800/20 py-2 px-4 rounded-full md:bg-transparent md:p-0">
              <ShieldCheck size={14} className="text-emerald-500" /> SECURE TRANSFERS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "p-8 md:p-10 border flex flex-col relative overflow-hidden transition-all",
                  plan.recommended
                    ? "bg-[#0067b8] text-white border-[#0067b8] shadow-xl md:shadow-2xl shadow-blue-500/20"
                    : "bg-white dark:bg-[#1a1a1a] border-gray-100 dark:border-[#333]"
                )}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0">
                     <div className="bg-[#ffb900] text-black text-[9px] font-black uppercase tracking-widest px-8 py-1 rotate-45 translate-x-6 translate-y-3">
                        Popular
                     </div>
                  </div>
                )}
                <h3 className="text-lg md:text-xl font-bold mb-2 uppercase tracking-tighter">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6 md:mb-8 border-b pb-6 md:pb-8 border-white/10 dark:border-white/5">
                  <span className="text-4xl md:text-5xl font-black">{plan.price}</span>
                  <span className={cn("text-[0.55rem] md:text-[0.6rem] font-black uppercase tracking-widest", plan.recommended ? "text-blue-100" : "text-gray-400")}>/ Deployment</span>
                </div>
                
                <p className={cn("mb-8 md:mb-10 text-xs md:text-sm font-medium leading-relaxed", plan.recommended ? "text-blue-50" : "text-gray-500")}>
                  {plan.description}
                </p>

                <div className="space-y-4 mb-10 md:mb-12 flex-grow">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center text-[0.65rem] md:text-[0.7rem] font-bold uppercase tracking-tight">
                      <Check size={12} className={cn("mr-3 shrink-0", plan.recommended ? "text-white" : "text-[#0067b8]")} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <Link href={`/checkout?plan=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price)}`} className="w-full mt-auto">
                  <button className={cn(
                    "w-full h-12 md:h-14 font-black uppercase text-[0.65rem] md:text-[0.7rem] tracking-[0.15em] md:tracking-[0.2em] transition-all flex items-center justify-center gap-2",
                    plan.recommended 
                      ? "bg-white text-[#0067b8] hover:bg-gray-100" 
                      : "bg-[#0067b8] text-white hover:bg-[#005da6]"
                  )}>
                    {plan.cta} <ChevronRight size={14} />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ - Minimalist Microsoft Accordion Optimized for Mobile */}
        <section className="max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="mb-10 md:mb-16 border-b border-gray-100 dark:border-gray-800 pb-6 md:pb-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#242424] dark:text-white tracking-tight text-nowrap">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {faqs.map((faq, index) => (
              <div key={index} className="py-1 md:py-2">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full py-5 md:py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-[14px] md:text-lg font-semibold text-[#242424] dark:text-gray-200 group-hover:text-[#0067b8] transition-colors leading-snug pr-4">{faq.question}</span>
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#242424] dark:text-white transition-transform duration-300 shrink-0">
                    {openFaq === index ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 md:pb-8 text-[13px] md:text-base text-[#505050] dark:text-gray-400 leading-relaxed max-w-3xl pr-2 md:pr-0">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
