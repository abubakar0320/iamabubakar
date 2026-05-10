"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  Loader2, 
  Upload, 
  X, 
  Check, 
  FileCode, 
  Zap, 
  Info, 
  Sparkles, 
  Globe, 
  ChevronRight,
  Monitor,
  Save,
  Trash2
} from "lucide-react";
import { Github } from "@/components/Icons";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectFormData {
  title: string;
  description: string;
  tech: string;
  category: string;
  image: string;
  live: string;
  github: string;
}

interface ProjectFormProps {
  initialData?: any; // Keeping any for the raw data from DB for now to avoid extensive interface matching
  isEdit?: boolean;
}

export function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>(() => ({
    title: initialData?.title || "",
    description: initialData?.description || "",
    tech: initialData?.tech ? (Array.isArray(initialData.tech) ? initialData.tech.join(", ") : initialData.tech) : "",
    category: initialData?.category || "React",
    image: initialData?.image || "",
    live: initialData?.live || "",
    github: initialData?.github || "",
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: reader.result, folder: "projects" }),
        });
        const data = await res.json();
        if (data.url) {
          setFormData((prev) => ({ ...prev, image: data.url }));
        }
      } catch (err) {
        console.error(err);
        alert("Visual asset synchronization failed.");
      } finally {
        setUploading(false);
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      tech: formData.tech.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      const url = isEdit ? `/api/projects/${initialData._id}` : "/api/projects";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        alert("Failed to commit architectural asset to the vault.");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected interrupt occurred during deployment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-6">
          <Link href="/admin/projects">
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft size={18} className="text-gray-600 dark:text-gray-400" />
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-semibold text-[#242424] dark:text-white tracking-tight uppercase">
               {isEdit ? "Refine Asset" : "Forge New Project"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Management console for production-grade technical portfolio assets.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Identity Tile */}
          <div className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-semibold text-[#242424] dark:text-white mb-8 flex items-center gap-3">
              <FileCode className="text-[#0067b8]" size={20} /> Identity & Context
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Asset Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Quantum E-Commerce"
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Classification Sector</label>
                <div className="relative">
                   <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all appearance-none text-sm font-bold cursor-pointer"
                  >
                    <option value="React">React Intelligence</option>
                    <option value="PHP">PHP Architecture</option>
                    <option value="Full Stack">End-to-End Solutions</option>
                    <option value="Frontend">Interface Engineering</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                     <Monitor size={16} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Technical Abstract</label>
              <textarea
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the architectural complexity and production results..."
                className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm font-medium resize-none leading-relaxed"
              />
            </div>

            <div className="mt-8 space-y-2">
              <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Stack Components (Comma Separated)</label>
              <input
                type="text"
                name="tech"
                value={formData.tech}
                onChange={handleChange}
                placeholder="Next.js, TypeScript, Tailwind, MongoDB"
                className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm font-mono"
              />
            </div>
          </div>

          {/* Nodes Tile */}
          <div className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-semibold text-[#242424] dark:text-white mb-8 flex items-center gap-3">
              <Globe className="text-[#0067b8]" size={20} /> Deployment Nodes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Production URI</label>
                <input
                  type="url"
                  name="live"
                  value={formData.live}
                  onChange={handleChange}
                  placeholder="https://app.live.com"
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Source Repository</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/repo"
                  className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm"
                />
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
                {loading ? "Authorizing..." : isEdit ? "Update Asset" : "Commit Asset"}
              </button>

              <div className="p-6 bg-gray-50 dark:bg-[#242424] border-l-4 border-[#0067b8] space-y-3">
                 <div className="flex items-center gap-2 text-[#0067b8]">
                    <Info size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Protocol Node</span>
                 </div>
                 <p className="text-[11px] text-gray-500 font-medium italic leading-relaxed">
                    Changes made here synchronize with the global vault identity hubs instantly. Authorization is logged.
                 </p>
              </div>
            </div>
          </div>

          {/* Visual Signature Module */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Sparkles size={14} className="text-[#0067b8]" /> Visual Signature
             </h3>
             <div className="w-full aspect-video bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center relative overflow-hidden group">
                {formData.image ? (
                  <>
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <button 
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, image: "" }))}
                      className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                ) : (
                  <div className="text-center space-y-2">
                     <Upload className="text-gray-300 mx-auto" size={32} />
                     <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Awaiting Link</p>
                  </div>
                )}
                {uploading && <div className="absolute inset-0 bg-white/60 dark:bg-black/60 flex items-center justify-center"><Loader2 className="animate-spin text-[#0067b8]" /></div>}
             </div>
             
             <div className="mt-6">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full bg-[#0067b8] text-white py-2 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#005da6] transition-all"
                >
                   {uploading ? "SYNCING..." : formData.image ? "REPLACE IMAGE" : "UPLOAD THUMBNAIL"}
                </button>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-4 text-center">Standard Architecture: 1200x800</p>
             </div>
          </div>
        </div>
      </form>
    </div>
  );
}
