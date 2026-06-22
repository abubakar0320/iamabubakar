"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Plus, Trash2, Briefcase, Zap, Info, Sparkles, TrendingUp, Save, Layers } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="max-w-7xl mx-auto space-y-10 font-sans pb-10">
      
      {/* ── Page Header (Vibrant Gradient) ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-gradient-to-r from-[#5c2d91] via-[#00d4ff] to-[#00d15e] text-white p-8 relative overflow-hidden shadow-[0_0_40px_rgba(92,45,145,0.3)]">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#d8b4fe] mb-2 flex items-center gap-2">
            <Layers size={12} /> Service Architecture
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
             {isEdit ? "Configure Module" : "Initialize Service"}
          </h1>
          <p className="text-sm text-purple-100 font-medium max-w-xl">
            Management node for technical capabilities and deployment modules.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-2 border border-purple-300 text-white font-bold px-6 py-3 hover:bg-white/10 transition-colors text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={15} /> Engine Dashboard
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          
          {/* Identity Tile */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#5c2d91]/30 transition-colors duration-300">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#5c2d91] dark:text-[#d8b4fe] mb-1">Module 1</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Module Identity
                </h2>
              </div>
              <Briefcase size={16} className="text-[#5c2d91] dark:text-[#d8b4fe]" />
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Service Label</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Cloud Infrastructure"
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#5c2d91] dark:focus:border-[#d8b4fe] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-sm font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Interface Icon</label>
                  <div className="relative">
                    <select
                      name="icon"
                      value={formData.icon}
                      onChange={handleChange}
                      className="w-full px-5 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#5c2d91] dark:focus:border-[#d8b4fe] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all appearance-none text-sm font-bold cursor-pointer"
                    >
                      <option value="Globe">Globe (Network)</option>
                      <option value="Layout">Layout (Frontend)</option>
                      <option value="Server">Server (Backend)</option>
                      <option value="Database">Database (Data)</option>
                      <option value="Shield">Shield (Security)</option>
                      <option value="Smartphone">Smartphone (Mobile)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#5c2d91] dark:text-[#d8b4fe]">
                       <Zap size={14} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Capability Description</label>
                <textarea
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detail the scope and impact of this service module..."
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#5c2d91] dark:focus:border-[#d8b4fe] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-[13px] font-medium leading-relaxed resize-none"
                />
              </div>
            </div>
          </div>

          {/* Arrays Hub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Features Array */}
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#00d4ff]/30 transition-colors duration-300">
              <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#00d4ff] flex items-center gap-2">
                     <Sparkles size={14} /> Feature Nodes
                  </h3>
                </div>
                <button type="button" onClick={() => addArrayItem("features")} className="text-[#00d4ff] border border-[#00d4ff]/30 px-3 py-1.5 font-black text-[9px] uppercase tracking-widest hover:bg-[#00d4ff] hover:text-black hover:shadow-[0_0_10px_rgba(0,212,255,0.4)] transition-all">
                  Add Node
                </button>
              </div>
              <div className="p-6 space-y-4">
                <AnimatePresence>
                  {formData.features.map((feature, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="relative group/input">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleArrayChange(index, e.target.value, "features")}
                        className="w-full pl-5 pr-12 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#00d4ff] outline-none text-xs font-bold transition-all"
                        placeholder={`Feature node ${index + 1}`}
                      />
                      {formData.features.length > 1 && (
                        <button type="button" onClick={() => removeArrayItem(index, "features")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 opacity-0 group-hover/input:opacity-100 transition-all hover:drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Benefits Array */}
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#00d15e]/30 transition-colors duration-300">
              <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#00d15e] flex items-center gap-2">
                     <TrendingUp size={14} /> Value Output
                  </h3>
                </div>
                <button type="button" onClick={() => addArrayItem("benefits")} className="text-[#00d15e] border border-[#00d15e]/30 px-3 py-1.5 font-black text-[9px] uppercase tracking-widest hover:bg-[#00d15e] hover:text-black hover:shadow-[0_0_10px_rgba(0,209,94,0.4)] transition-all">
                  Add Value
                </button>
              </div>
              <div className="p-6 space-y-4">
                <AnimatePresence>
                  {formData.benefits.map((benefit, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="relative group/input">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleArrayChange(index, e.target.value, "benefits")}
                        className="w-full pl-5 pr-12 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#00d15e] outline-none text-xs font-bold transition-all"
                        placeholder={`Value output ${index + 1}`}
                      />
                      {formData.benefits.length > 1 && (
                        <button type="button" onClick={() => removeArrayItem(index, "benefits")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 opacity-0 group-hover/input:opacity-100 transition-all hover:drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]">
                          <Trash2 size={16} />
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
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800">
            <div className="p-6 bg-[#f8fafc] dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Zap size={14} className="text-[#5c2d91] dark:text-[#d8b4fe]" /> Control Console
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#5c2d91] text-white font-black py-4 px-8 hover:bg-[#462270] transition-all flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:shadow-none shadow-[0_0_15px_rgba(92,45,145,0.4)] hover:shadow-[0_0_25px_rgba(92,45,145,0.6)] uppercase text-[11px] tracking-[0.2em]"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                {loading ? "Initializing..." : isEdit ? "Update Module" : "Deploy Module"}
              </button>

              <div className="p-5 bg-purple-500/10 border border-purple-500/20 space-y-3">
                 <div className="flex items-center gap-2 text-[#d8b4fe]">
                    <Info size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Protocol Node</span>
                 </div>
                 <p className="text-[11px] text-purple-200/80 font-medium leading-relaxed">
                    Deployment of this module will propagate to the public solutions hub instantly. Verify all technical nodes.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
