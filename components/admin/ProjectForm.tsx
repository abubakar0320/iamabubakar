"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Loader2, 
  Upload, 
  Trash2,
  FileCode, 
  Zap, 
  Info, 
  Sparkles, 
  Globe, 
  Save,
  Monitor,
  LayoutGrid
} from "lucide-react";
import Link from "next/link";
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
  initialData?: any;
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
    <div className="max-w-7xl mx-auto space-y-10 font-sans pb-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0067b8] text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-2 flex items-center gap-2">
            <LayoutGrid size={12} /> Asset Configuration
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {isEdit ? "Refine Asset" : "Forge New Project"}
          </h1>
          <p className="text-sm text-blue-100 font-medium max-w-xl">
            Management console for production-grade technical portfolio assets.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 border border-blue-300 text-white font-bold px-6 py-3 hover:bg-white/10 transition-colors text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={15} /> Back to Vault
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Main Form) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Identity Tile */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#0067b8] mb-1">Module 1</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Identity & Context
                </h2>
              </div>
              <FileCode size={16} className="text-[#0067b8]" />
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Asset Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Quantum E-Commerce"
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 focus:border-[#0067b8] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all font-bold text-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Classification Sector</label>
                  <div className="relative">
                     <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-5 py-3 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 focus:border-[#0067b8] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all font-bold text-sm appearance-none cursor-pointer"
                    >
                      <option value="React">React Intelligence</option>
                      <option value="PHP">PHP Architecture</option>
                      <option value="Full Stack">End-to-End Solutions</option>
                      <option value="Frontend">Interface Engineering</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                       <Monitor size={14} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Technical Abstract</label>
                <textarea
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the architectural complexity and production results..."
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 focus:border-[#0067b8] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-[13px] font-medium leading-relaxed resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Stack Components (Comma Separated)</label>
                <input
                  type="text"
                  name="tech"
                  value={formData.tech}
                  onChange={handleChange}
                  placeholder="Next.js, TypeScript, Tailwind, MongoDB"
                  className="w-full px-5 py-3 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 focus:border-[#0067b8] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-sm font-mono tracking-tight"
                />
              </div>
            </div>
          </div>

          {/* Nodes Tile */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#107c10] mb-1">Module 2</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Deployment Nodes
                </h2>
              </div>
              <Globe size={16} className="text-[#107c10]" />
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Production URI</label>
                <input
                  type="url"
                  name="live"
                  value={formData.live}
                  onChange={handleChange}
                  placeholder="https://app.live.com"
                  className="w-full px-5 py-3 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 focus:border-[#107c10] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-sm font-mono"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Source Repository</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/repo"
                  className="w-full px-5 py-3 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 focus:border-[#107c10] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-sm font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="p-6 bg-[#f8fafc] dark:bg-[#242424] border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Zap size={14} className="text-[#0067b8]" /> Control Console
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              <p className="text-xs text-gray-500 leading-relaxed">
                Commit changes to the vault. It will immediately reflect on the global landing presentation.
              </p>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0067b8] text-white font-bold py-4 px-8 hover:bg-[#005da6] transition-all flex items-center justify-center gap-3 disabled:bg-gray-400 uppercase text-[11px] tracking-[0.2em] shadow-lg"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                {loading ? "Authorizing..." : isEdit ? "Update Asset" : "Commit Asset"}
              </button>

              <div className="p-5 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 space-y-3">
                 <div className="flex items-center gap-2 text-[#0067b8]">
                    <Info size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Protocol Node</span>
                 </div>
                 <p className="text-[11px] text-[#0067b8]/80 font-medium leading-relaxed">
                    Changes made here synchronize with the global vault identity hubs instantly. Authorization is logged.
                 </p>
              </div>
            </div>
          </div>

          {/* Visual Signature Module */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
             <div className="p-6 bg-[#f8fafc] dark:bg-[#242424] border-b border-gray-200 dark:border-gray-800">
               <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 flex items-center gap-2">
                 <Sparkles size={14} className="text-[#d83b01]" /> Visual Signature
               </h3>
             </div>
             <div className="p-6">
               <div className="w-full aspect-video bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center relative overflow-hidden group mb-4">
                  {formData.image ? (
                    <>
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      <button 
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, image: "" }))}
                        className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white p-2 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  ) : (
                    <div className="text-center space-y-3">
                       <div className="w-12 h-12 mx-auto bg-gray-100 dark:bg-[#1a1a1a] flex items-center justify-center border border-gray-200 dark:border-gray-600">
                         <Upload className="text-gray-400" size={20} />
                       </div>
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Awaiting Link</p>
                    </div>
                  )}
                  {uploading && <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex items-center justify-center"><Loader2 className="animate-spin text-[#0067b8]" /></div>}
               </div>
               
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
                 className="w-full border-2 border-[#0067b8] text-[#0067b8] py-2.5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#0067b8] hover:text-white transition-all disabled:opacity-50"
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
