"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Loader2, Check, Plus, Trash2, Briefcase, Zap, Info, Sparkles, Layout, Globe, Server, Database, Shield, Smartphone, TrendingUp, CheckCircle, ChevronRight, Save } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceFormData {
  title: string;
  description: string;
  icon: string;
  features: string[];
  benefits: string[];
}

interface ServiceFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export function ServiceForm({ initialData, isEdit }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>(() => ({
    title: initialData?.title || "",
    description: initialData?.description || "",
    icon: initialData?.icon || "Globe",
    features: initialData?.features || [""],
    benefits: initialData?.benefits || [""],
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index: number, value: string, type: "features" | "benefits") => {
    const newArray = [...formData[type]];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [type]: newArray }));
  };

  const addArrayItem = (type: "features" | "benefits") => {
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], ""] }));
  };

  const removeArrayItem = (index: number, type: "features" | "benefits") => {
    const newArray = formData[type].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [type]: newArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit ? `/api/services/${initialData._id}` : "/api/services";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/services");
        router.refresh();
      } else {
        alert("Failed to save service module.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during module integration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-6">
          <Link href="/admin/services">
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft size={18} className="text-gray-600 dark:text-gray-400" />
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-semibold text-[#242424] dark:text-white tracking-tight uppercase">
               {isEdit ? "Configure Module" : "Initialize Service"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Management nodes for technical capability deployment.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Identity Tile */}
          <div className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-semibold text-[#242424] dark:text-white mb-8 flex items-center gap-3">
              <Briefcase className="text-[#0067b8]" size={20} /> Module Identity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Service Label</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Cloud Infrastructure"
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Interface Icon</label>
                <div className="relative">
                  <select
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all appearance-none text-sm font-bold cursor-pointer"
                  >
                    <option value="Globe">Globe (Network)</option>
                    <option value="Layout">Layout (Frontend)</option>
                    <option value="Server">Server (Backend)</option>
                    <option value="Database">Database (Data)</option>
                    <option value="Shield">Shield (Security)</option>
                    <option value="Smartphone">Smartphone (Mobile)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                     <Zap size={16} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Capability Description</label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Detail the scope and impact of this service module..."
                className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm font-medium resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Arrays Hub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Features Array */}
            <div className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                   <Sparkles className="text-[#0067b8]" size={14} /> Features
                </h3>
                <button type="button" onClick={() => addArrayItem("features")} className="text-[#0067b8] font-bold text-[10px] uppercase tracking-widest hover:underline">
                  Add node
                </button>
              </div>
              <div className="space-y-3">
                <AnimatePresence>
                  {formData.features.map((feature, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="relative group">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleArrayChange(index, e.target.value, "features")}
                        className="w-full pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-[#242424] border border-transparent focus:border-[#0067b8] outline-none text-xs font-bold transition-all"
                      />
                      {formData.features.length > 1 && (
                        <button type="button" onClick={() => removeArrayItem(index, "features")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Benefits Array */}
            <div className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                   <TrendingUp className="text-emerald-500" size={14} /> Benefits
                </h3>
                <button type="button" onClick={() => addArrayItem("benefits")} className="text-[#0067b8] font-bold text-[10px] uppercase tracking-widest hover:underline">
                  Add value
                </button>
              </div>
              <div className="space-y-3">
                <AnimatePresence>
                  {formData.benefits.map((benefit, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="relative group">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleArrayChange(index, e.target.value, "benefits")}
                        className="w-full pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-[#242424] border border-transparent focus:border-[#0067b8] outline-none text-xs font-bold transition-all"
                      />
                      {formData.benefits.length > 1 && (
                        <button type="button" onClick={() => removeArrayItem(index, "benefits")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <Zap size={16} className="text-[#0067b8]" /> Control Console
            </h3>
            
            <div className="space-y-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0067b8] text-white font-semibold py-4 px-8 hover:bg-[#005da6] transition-all flex items-center justify-center gap-3 disabled:bg-gray-300 shadow-lg shadow-blue-500/10 uppercase text-xs tracking-widest"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {loading ? "Initializing..." : isEdit ? "Update Module" : "Deploy Module"}
              </button>

              <div className="p-6 bg-gray-50 dark:bg-[#242424] border-l-4 border-[#0067b8] space-y-3">
                 <div className="flex items-center gap-2 text-[#0067b8]">
                    <Info size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Protocol Node</span>
                 </div>
                 <p className="text-[11px] text-gray-500 font-medium italic leading-relaxed">
                    Deployment of this module will propagate to the public solutions hub instantly. Verify all technical nodes.
                 </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0067b8] p-8 text-white relative overflow-hidden shadow-xl">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Briefcase size={100} /></div>
             <h3 className="text-lg font-black uppercase tracking-tighter mb-4 relative z-10 italic">Module Hub</h3>
             <p className="text-blue-100 text-xs font-medium mb-8 relative z-10">Define the architectural scope and commercial benefits of your professional service.</p>
             <Link href="/services" target="_blank" className="inline-flex items-center justify-center w-full py-3 bg-white text-[#0067b8] font-black uppercase text-[0.7rem] tracking-[0.2em] hover:bg-gray-100 transition-all relative z-10">
                View Live Hub <ChevronRight size={14} className="ml-1" />
             </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
