"use client";

import React, { useEffect, useState, useRef } from "react";
import { 
  Save, 
  Loader2, 
  User, 
  Info, 
  CheckCircle, 
  Plus, 
  Trash2, 
  Camera, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Sparkles, 
  Zap, 
  FileText, 
  Download, 
  ExternalLink,
  Cpu,
  History,
  BookOpen,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        const sanitized = {
          ...data,
          about: {
            ...data.about,
            skills: data.about?.skills || [],
            experience: data.about?.experience || [],
            education: data.about?.education || []
          }
        };
        setSettings(sanitized);
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
        return true;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveSettings(settings);
    if (success) {
      alert("Profile synchronized successfully.");
    }
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
          body: JSON.stringify({ image: reader.result, folder: "profile" }),
        });
        const data = await res.json();
        const updated = { ...settings, about: { ...settings.about, profileImage: data.url } };
        setSettings(updated);
        await saveSettings(updated);
      } catch (err) {
        console.error(err);
      } finally {
        setUploading(false);
      }
    };
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCvUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: reader.result, folder: "cv", resourceType: "auto" }),
        });
        const data = await res.json();
        const updated = { ...settings, contact: { ...settings.contact, cvUrl: data.url } };
        setSettings(updated);
        await saveSettings(updated);
        alert("CV Uploaded successfully.");
      } catch (err) {
        console.error(err);
      } finally {
        setCvUploading(false);
      }
    };
  };

  const addSkill = () => {
    setSettings({ ...settings, about: { ...settings.about, skills: [...settings.about.skills, { name: "New Skill", level: 80, category: "Frontend" }] } });
  };

  const updateSkill = (index: number, field: string, value: any) => {
    const newSkills = [...settings.about.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setSettings({ ...settings, about: { ...settings.about, skills: newSkills } });
  };

  const addExperience = () => {
    setSettings({ ...settings, about: { ...settings.about, experience: [...settings.about.experience, { year: "2024", title: "Role", company: "Company", description: "Details" }] } });
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const newList = [...settings.about.experience];
    newList[index] = { ...newList[index], [field]: value };
    setSettings({ ...settings, about: { ...settings.about, experience: newList } });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-[50vh]"><Loader2 className="animate-spin h-10 w-10 text-[#0067b8]" /></div>;
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-[#242424] dark:text-white tracking-tight uppercase">Profile Synthesis</h1>
        <p className="text-sm text-gray-500 mt-2">Configure identity protocols and professional history.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Identity Hub */}
          <div className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-semibold text-[#242424] dark:text-white mb-8 flex items-center gap-3">
              <Camera className="text-[#0067b8]" size={20} /> Visual & Narrative
            </h3>
            
            <div className="flex flex-col md:flex-row items-center gap-10 mb-10 pb-10 border-b border-gray-100 dark:border-gray-800">
              <div className="relative">
                <div className="w-32 h-32 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                  {settings.about.profileImage ? <img src={settings.about.profileImage} className="w-full h-full object-cover" /> : <User size={48} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300" />}
                  {uploading && <div className="absolute inset-0 bg-white/60 dark:bg-black/60 flex items-center justify-center"><Loader2 className="animate-spin text-[#0067b8]" /></div>}
                </div>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute bottom-[-10px] right-[-10px] bg-[#0067b8] text-white p-2 rounded-sm shadow-xl hover:bg-[#005da6] transition-all">
                  <Plus size={16} />
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
              <div className="space-y-2">
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Official Portrait Node</p>
                 <code className="text-[10px] text-blue-600 bg-blue-50 dark:bg-blue-900/10 px-2 py-1 block">IMAGE_PROTOCOL: SECURE</code>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-[#242424] dark:text-gray-200">Professional Bio</label>
              <textarea
                rows={6}
                value={settings.about.bio}
                onChange={(e) => setSettings({...settings, about: {...settings.about, bio: e.target.value}})}
                className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-600 focus:border-[#0067b8] outline-none transition-all text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* Stack Architecture */}
          <div className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-semibold text-[#242424] dark:text-white flex items-center gap-3">
                <Cpu className="text-[#0067b8]" size={20} /> Stack Architecture
              </h3>
              <button type="button" onClick={addSkill} className="text-[#0067b8] font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-1">
                 <Plus size={14} /> Add Unit
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {settings.about.skills.map((skill: any, index: number) => (
                 <div key={index} className="p-4 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 space-y-4 group relative">
                    <div className="grid grid-cols-2 gap-2">
                       <input 
                         type="text" value={skill.name} placeholder="Skill"
                         onChange={(e) => updateSkill(index, "name", e.target.value)}
                         className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 px-3 py-1.5 text-[11px] font-bold uppercase outline-none"
                       />
                       <select 
                         value={skill.category}
                         onChange={(e) => updateSkill(index, "category", e.target.value)}
                         className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 px-3 py-1.5 text-[10px] font-black uppercase outline-none"
                       >
                         <option value="Frontend">Frontend</option>
                         <option value="Backend">Backend</option>
                         <option value="Other">Tools/Cloud</option>
                       </select>
                    </div>
                    <div className="flex items-center gap-3">
                       <input type="range" min="0" max="100" value={skill.level} onChange={(e) => updateSkill(index, "level", parseInt(e.target.value))} className="flex-grow accent-[#0067b8] h-1" />
                       <span className="text-[10px] font-black text-[#0067b8] w-8">{skill.level}%</span>
                    </div>
                    <button type="button" onClick={() => {
                      const updated = settings.about.skills.filter((_: any, i: number) => i !== index);
                      setSettings({...settings, about: {...settings.about, skills: updated}});
                    }} className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14} /></button>
                 </div>
               ))}
            </div>
          </div>

          {/* Career Ledger */}
          <div className="bg-white dark:bg-[#1a1a1a] p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-semibold text-[#242424] dark:text-white flex items-center gap-3">
                <History className="text-[#0067b8]" size={20} /> Career Ledger
              </h3>
              <button type="button" onClick={addExperience} className="text-[#0067b8] font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-1">
                 <Plus size={14} /> Add Entry
              </button>
            </div>
            
            <div className="space-y-4">
               {settings.about.experience.map((exp: any, index: number) => (
                 <div key={index} className="p-6 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 space-y-4 group relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <input type="text" value={exp.year} placeholder="Year" onChange={(e) => updateExperience(index, "year", e.target.value)} className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 px-4 py-2 text-xs font-black uppercase text-[#0067b8]" />
                       <input type="text" value={exp.title} placeholder="Title" onChange={(e) => updateExperience(index, "title", e.target.value)} className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 px-4 py-2 text-xs font-bold md:col-span-2 uppercase" />
                    </div>
                    <input type="text" value={exp.company} placeholder="Company" onChange={(e) => updateExperience(index, "company", e.target.value)} className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 px-4 py-2 text-xs font-medium" />
                    <textarea value={exp.description} placeholder="Description" onChange={(e) => updateExperience(index, "description", e.target.value)} className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 px-4 py-2 text-[11px] leading-relaxed resize-none h-20" />
                    <button type="button" onClick={() => {
                       const updated = settings.about.experience.filter((_: any, i: number) => i !== index);
                       setSettings({...settings, about: {...settings.about, experience: updated}});
                    }} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Control Console Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <Zap size={16} className="text-[#0067b8]" /> Deploy Identity
            </h3>
            
            <div className="space-y-6">
              <button 
                type="submit" 
                disabled={saving}
                className="w-full bg-[#0067b8] text-white font-semibold py-4 px-8 hover:bg-[#005da6] transition-all flex items-center justify-center gap-3 disabled:bg-gray-300 shadow-lg shadow-blue-500/10 uppercase text-xs tracking-widest"
              >
                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {saving ? "Authorizing..." : "Push Profile"}
              </button>
            </div>
          </div>

          {/* CV Node Module */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <FileText size={14} className="text-[#0067b8]" /> Credentials Node
             </h3>
             <div className="p-6 bg-gray-50 dark:bg-[#242424] border-l-4 border-[#0067b8] text-center space-y-4">
                <Download className="text-gray-300 mx-auto" size={32} />
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter">TECHNICAL CV (PDF)</p>
                <div className="pt-2 space-y-3">
                   <input type="file" ref={cvInputRef} className="hidden" accept="application/pdf" onChange={handleCvUpload} />
                   <button type="button" onClick={() => cvInputRef.current?.click()} disabled={cvUploading} className="w-full bg-[#0067b8] text-white py-2 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#005da6] transition-all">
                      {cvUploading ? "UPLOADING..." : "UPLOAD NEW"}
                   </button>
                   {settings.contact.cvUrl && (
                     <a href={settings.contact.cvUrl} target="_blank" rel="noopener noreferrer" className="block text-[9px] font-black text-[#0067b8] uppercase hover:underline">
                        VIEW CURRENT ASSET <ChevronRight size={10} className="inline ml-1" />
                     </a>
                   )}
                </div>
             </div>
          </div>
        </div>
      </form>
    </div>
  );
}
