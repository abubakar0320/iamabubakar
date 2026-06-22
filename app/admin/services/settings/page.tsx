"use client";

import React, { useEffect, useState } from "react";
import { Save, Loader2, Plus, Trash2, Layers, Check, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ServicesSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings({
          ...data,
          servicesPage: {
            whyCards: data.servicesPage?.whyCards || [],
            processSteps: data.servicesPage?.processSteps || [],
            pricingPlans: data.servicesPage?.pricingPlans || [],
            faqs: data.servicesPage?.faqs || []
          }
        });
        setLoading(false);
      });
  }, []);

  const saveSettings = async (updatedSettings: any) => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSettings),
      });
      if (res.ok) {
        alert("Services page configured successfully.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSettings(settings);
  };

  const updateArray = (arrayName: string, index: number, field: string, value: any) => {
    const newList = [...settings.servicesPage[arrayName]];
    newList[index] = { ...newList[index], [field]: value };
    setSettings({ ...settings, servicesPage: { ...settings.servicesPage, [arrayName]: newList } });
  };

  const addItem = (arrayName: string, defaultItem: any) => {
    setSettings({
      ...settings,
      servicesPage: {
        ...settings.servicesPage,
        [arrayName]: [...settings.servicesPage[arrayName], defaultItem]
      }
    });
  };

  const removeItem = (arrayName: string, index: number) => {
    setSettings({
      ...settings,
      servicesPage: {
        ...settings.servicesPage,
        [arrayName]: settings.servicesPage[arrayName].filter((_: any, i: number) => i !== index)
      }
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-[50vh]"><Loader2 className="animate-spin h-10 w-10 text-[#5c2d91]" /></div>;
  }

  return (
    <div className="space-y-10 font-sans pb-10 max-w-7xl mx-auto">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-gradient-to-r from-[#5c2d91] via-[#00d4ff] to-[#00d15e] text-white p-8 relative overflow-hidden shadow-[0_0_40px_rgba(92,45,145,0.3)]">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#d8b4fe] mb-2 flex items-center gap-2">
            <Layers size={12} /> Page Engine
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Services Page Data</h1>
          <p className="text-sm text-purple-100 font-medium max-w-xl">
            Configure the static modules on the services page (Why Me, Process, Pricing, FAQ).
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Why Cards */}
        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#00d4ff]/30 transition-colors">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-base font-bold text-[#242424] dark:text-white uppercase tracking-tight">Why Choose Me (Cards)</h2>
            <button type="button" onClick={() => addItem("whyCards", { icon: "Star", title: "New Card", desc: "Description" })} className="text-[10px] text-[#00d4ff] font-black uppercase tracking-widest flex items-center gap-1 border border-[#00d4ff] px-3 py-1.5 hover:bg-[#00d4ff] hover:text-black">
              <Plus size={12} /> Add
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {settings.servicesPage.whyCards.map((card: any, idx: number) => (
              <div key={idx} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 p-4 relative group/card">
                <div className="space-y-3">
                  <input type="text" value={card.icon} onChange={(e) => updateArray("whyCards", idx, "icon", e.target.value)} placeholder="Icon (Lucide)" className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs" />
                  <input type="text" value={card.title} onChange={(e) => updateArray("whyCards", idx, "title", e.target.value)} placeholder="Title" className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs font-bold" />
                  <textarea value={card.desc} onChange={(e) => updateArray("whyCards", idx, "desc", e.target.value)} placeholder="Description" className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs" rows={3} />
                </div>
                <button type="button" onClick={() => removeItem("whyCards", idx)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 opacity-0 group-hover/card:opacity-100"><Trash2 size={12} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#00d15e]/30 transition-colors">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-base font-bold text-[#242424] dark:text-white uppercase tracking-tight">Process Steps</h2>
            <button type="button" onClick={() => addItem("processSteps", { step: "05", title: "New Step", desc: "Description" })} className="text-[10px] text-[#00d15e] font-black uppercase tracking-widest flex items-center gap-1 border border-[#00d15e] px-3 py-1.5 hover:bg-[#00d15e] hover:text-black">
              <Plus size={12} /> Add
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {settings.servicesPage.processSteps.map((step: any, idx: number) => (
              <div key={idx} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 p-4 relative group/step">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input type="text" value={step.step} onChange={(e) => updateArray("processSteps", idx, "step", e.target.value)} placeholder="01" className="w-16 bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs font-black" />
                    <input type="text" value={step.title} onChange={(e) => updateArray("processSteps", idx, "title", e.target.value)} placeholder="Title" className="flex-1 bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs font-bold" />
                  </div>
                  <textarea value={step.desc} onChange={(e) => updateArray("processSteps", idx, "desc", e.target.value)} placeholder="Description" className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs" rows={2} />
                </div>
                <button type="button" onClick={() => removeItem("processSteps", idx)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 opacity-0 group-hover/step:opacity-100"><Trash2 size={12} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#5c2d91]/30 transition-colors">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-base font-bold text-[#242424] dark:text-white uppercase tracking-tight">Pricing Plans</h2>
            <button type="button" onClick={() => addItem("pricingPlans", { name: "Plan", price: "$0", description: "Desc", features: [], cta: "Select", recommended: false })} className="text-[10px] text-[#5c2d91] dark:text-[#d8b4fe] font-black uppercase tracking-widest flex items-center gap-1 border border-[#5c2d91] dark:border-[#d8b4fe] px-3 py-1.5 hover:bg-[#5c2d91] dark:hover:bg-[#d8b4fe] hover:text-white dark:hover:text-black">
              <Plus size={12} /> Add
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {settings.servicesPage.pricingPlans.map((plan: any, idx: number) => (
              <div key={idx} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 p-4 relative group/plan">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input type="text" value={plan.name} onChange={(e) => updateArray("pricingPlans", idx, "name", e.target.value)} placeholder="Name" className="flex-1 bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs font-bold" />
                    <input type="text" value={plan.price} onChange={(e) => updateArray("pricingPlans", idx, "price", e.target.value)} placeholder="Price" className="w-20 bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs font-black" />
                  </div>
                  <textarea value={plan.description} onChange={(e) => updateArray("pricingPlans", idx, "description", e.target.value)} placeholder="Description" className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs" rows={2} />
                  <input type="text" value={(plan.features || []).join(", ")} onChange={(e) => updateArray("pricingPlans", idx, "features", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} placeholder="Features (comma separated)" className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs" />
                  <div className="flex gap-3 items-center">
                    <input type="text" value={plan.cta} onChange={(e) => updateArray("pricingPlans", idx, "cta", e.target.value)} placeholder="CTA Text" className="flex-1 bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs" />
                    <label className="flex items-center gap-1 text-[10px] font-black uppercase text-gray-500 cursor-pointer">
                      <input type="checkbox" checked={plan.recommended} onChange={(e) => updateArray("pricingPlans", idx, "recommended", e.target.checked)} className="accent-[#5c2d91]" /> Recommended
                    </label>
                  </div>
                </div>
                <button type="button" onClick={() => removeItem("pricingPlans", idx)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 opacity-0 group-hover/plan:opacity-100"><Trash2 size={12} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#ff4d4d]/30 transition-colors">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-base font-bold text-[#242424] dark:text-white uppercase tracking-tight">FAQs</h2>
            <button type="button" onClick={() => addItem("faqs", { question: "Q?", answer: "A" })} className="text-[10px] text-[#ff4d4d] font-black uppercase tracking-widest flex items-center gap-1 border border-[#ff4d4d] px-3 py-1.5 hover:bg-[#ff4d4d] hover:text-white">
              <Plus size={12} /> Add
            </button>
          </div>
          <div className="p-6 space-y-4">
            {settings.servicesPage.faqs.map((faq: any, idx: number) => (
              <div key={idx} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 p-4 relative group/faq flex flex-col gap-3">
                <input type="text" value={faq.question} onChange={(e) => updateArray("faqs", idx, "question", e.target.value)} placeholder="Question" className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs font-bold" />
                <textarea value={faq.answer} onChange={(e) => updateArray("faqs", idx, "answer", e.target.value)} placeholder="Answer" className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs" rows={2} />
                <button type="button" onClick={() => removeItem("faqs", idx)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 opacity-0 group-hover/faq:opacity-100"><Trash2 size={12} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-6 z-40 bg-white dark:bg-[#1a1a1a] p-4 border border-gray-200 dark:border-gray-800 flex justify-end shadow-xl">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-[#5c2d91] text-white font-black py-3 px-8 hover:bg-[#4a2475] hover:shadow-[0_0_20px_rgba(92,45,145,0.4)] transition-all flex items-center justify-center gap-3 disabled:bg-gray-400 uppercase text-[11px] tracking-[0.2em]"
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>

      </form>
    </div>
  );
}
