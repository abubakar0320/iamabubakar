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
  ChevronRight,
  Globe,
  Eye,
  Settings as SettingsIcon,
  LayoutTemplate
} from "lucide-react";
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
    <div className="space-y-10 font-sans pb-10 max-w-7xl mx-auto">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#5c2d91] text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#d8b4fe] mb-2 flex items-center gap-2">
            <UserCircle size={12} /> Profile Matrix
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Identity Management
          </h1>
          <p className="text-sm text-[#e9d5ff] font-medium max-w-xl">
            Configure your professional biography, skills architecture, and career ledger.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Link
            href="/about"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white text-[#5c2d91] font-bold px-6 py-3 hover:bg-gray-100 transition-colors text-xs uppercase tracking-widest"
          >
            <Eye size={15} /> View Live Profile
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Identity & Narrative */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#0067b8] mb-1">Module 1</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Visual & Narrative
                </h2>
              </div>
              <Camera size={16} className="text-gray-400" />
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-8 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
                <div className="relative group">
                  <div className="w-32 h-32 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                    {settings.about.profileImage ? (
                      <img src={settings.about.profileImage} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                      <User size={48} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300" />
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex items-center justify-center">
                        <Loader2 className="animate-spin text-[#0067b8]" />
                      </div>
                    )}
                  </div>
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()} 
                    className="absolute bottom-[-10px] right-[-10px] bg-[#0067b8] text-white p-2.5 shadow-xl hover:bg-[#005da6] transition-all group-hover:scale-110"
                  >
                    <Plus size={16} />
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
                <div className="flex-1 space-y-3">
                   <p className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest">Official Portrait</p>
                   <p className="text-xs text-gray-500 leading-relaxed">
                     Upload a professional headshot to represent your identity across the platform. Square dimensions recommended.
                   </p>
                   <code className="text-[10px] text-[#0067b8] bg-[#0067b8]/10 px-2.5 py-1.5 font-bold tracking-widest inline-block uppercase">IMAGE_PROTOCOL: SECURE</code>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Professional Bio</label>
                <textarea
                  rows={6}
                  value={settings.about.bio}
                  onChange={(e) => setSettings({...settings, about: {...settings.about, bio: e.target.value}})}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 focus:border-[#0067b8] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-sm leading-relaxed"
                  placeholder="Enter your comprehensive biography here..."
                />
              </div>
            </div>
          </div>

          {/* Stack Architecture */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#107c10] mb-1">Module 2</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Stack Architecture
                </h2>
              </div>
              <button type="button" onClick={addSkill} className="bg-[#107c10] text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:bg-green-800 transition-colors flex items-center gap-1.5">
                 <Plus size={12} /> Add Unit
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {settings.about.skills.map((skill: any, index: number) => (
                   <div key={index} className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 p-4 relative group hover:border-[#107c10] transition-colors">
                      <div className="grid grid-cols-2 gap-3 mb-4">
                         <div className="space-y-1">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Skill Name</label>
                           <input 
                             type="text" value={skill.name} placeholder="Skill"
                             onChange={(e) => updateSkill(index, "name", e.target.value)}
                             className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs font-bold uppercase outline-none focus:border-[#107c10]"
                           />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Category</label>
                           <select 
                             value={skill.category}
                             onChange={(e) => updateSkill(index, "category", e.target.value)}
                             className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 px-3 py-2 text-[10px] font-black uppercase outline-none focus:border-[#107c10]"
                           >
                             <option value="Frontend">Frontend</option>
                             <option value="Backend">Backend</option>
                             <option value="Other">Tools/Cloud</option>
                           </select>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="flex-grow">
                           <div className="flex justify-between mb-1">
                             <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Proficiency</span>
                             <span className="text-[10px] font-black text-[#107c10]">{skill.level}%</span>
                           </div>
                           <input type="range" min="0" max="100" value={skill.level} onChange={(e) => updateSkill(index, "level", parseInt(e.target.value))} className="w-full accent-[#107c10] h-1.5 bg-gray-200 appearance-none" />
                         </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => {
                          const updated = settings.about.skills.filter((_: any, i: number) => i !== index);
                          setSettings({...settings, about: {...settings.about, skills: updated}});
                        }} 
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-md"
                      >
                        <Trash2 size={12} />
                      </button>
                   </div>
                 ))}
                 {settings.about.skills.length === 0 && (
                   <div className="col-span-2 py-8 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
                     <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">No skills configured</p>
                   </div>
                 )}
              </div>
            </div>
          </div>

          {/* Career Ledger */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#d83b01] mb-1">Module 3</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Career Ledger
                </h2>
              </div>
              <button type="button" onClick={addExperience} className="bg-[#d83b01] text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#b02e00] transition-colors flex items-center gap-1.5">
                 <Plus size={12} /> Add Entry
              </button>
            </div>
            
            <div className="p-6 space-y-4">
               {settings.about.experience.map((exp: any, index: number) => (
                 <div key={index} className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-gray-700 p-5 relative group hover:border-[#d83b01] transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                       <div className="space-y-1 md:col-span-1">
                         <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Timeline</label>
                         <input type="text" value={exp.year} placeholder="e.g. 2020 - 2024" onChange={(e) => updateExperience(index, "year", e.target.value)} className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs font-black uppercase text-[#d83b01] focus:border-[#d83b01] outline-none" />
                       </div>
                       <div className="space-y-1 md:col-span-3">
                         <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Role Title</label>
                         <input type="text" value={exp.title} placeholder="Senior Developer" onChange={(e) => updateExperience(index, "title", e.target.value)} className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs font-bold uppercase focus:border-[#d83b01] outline-none" />
                       </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Organization</label>
                        <input type="text" value={exp.company} placeholder="Company Name" onChange={(e) => updateExperience(index, "company", e.target.value)} className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs font-medium focus:border-[#d83b01] outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Responsibilities / Description</label>
                        <textarea value={exp.description} placeholder="Describe your achievements..." onChange={(e) => updateExperience(index, "description", e.target.value)} className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 px-4 py-3 text-[12px] leading-relaxed resize-none h-24 focus:border-[#d83b01] outline-none" />
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => {
                         const updated = settings.about.experience.filter((_: any, i: number) => i !== index);
                         setSettings({...settings, about: {...settings.about, experience: updated}});
                      }} 
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-md"
                    >
                      <Trash2 size={12} />
                    </button>
                 </div>
               ))}
               {settings.about.experience.length === 0 && (
                 <div className="py-8 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
                   <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">No experience entries</p>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Right Column (Control Console Sidebar) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Action Module */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
            <div className="p-6 bg-[#f8fafc] dark:bg-[#242424] border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Zap size={14} className="text-[#0067b8]" /> Deployment Control
              </h3>
            </div>
            <div className="p-6">
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                Review all modifications before pushing them to the live profile. Changes are synchronized globally.
              </p>
              <button 
                type="submit" 
                disabled={saving}
                className="w-full bg-[#0067b8] text-white font-bold py-4 px-8 hover:bg-[#005da6] transition-all flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed uppercase text-[11px] tracking-[0.2em]"
              >
                {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                {saving ? "Authorizing..." : "Push Changes"}
              </button>
            </div>
          </div>

          {/* CV Node Module */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
             <div className="p-6 bg-[#f8fafc] dark:bg-[#242424] border-b border-gray-200 dark:border-gray-800">
               <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 flex items-center gap-2">
                 <FileText size={14} className="text-[#107c10]" /> Credentials Node
               </h3>
             </div>
             <div className="p-6 text-center space-y-5">
                <div className="w-16 h-16 mx-auto bg-green-50 dark:bg-green-900/10 flex items-center justify-center rounded-none border border-green-200 dark:border-green-900">
                  <Download className="text-[#107c10]" size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-800 dark:text-white uppercase tracking-widest">Technical CV</p>
                  <p className="text-[10px] text-gray-500 mt-1">PDF format highly recommended.</p>
                </div>
                <div className="pt-2 space-y-3">
                   <input type="file" ref={cvInputRef} className="hidden" accept="application/pdf" onChange={handleCvUpload} />
                   <button type="button" onClick={() => cvInputRef.current?.click()} disabled={cvUploading} className="w-full border-2 border-[#107c10] text-[#107c10] bg-transparent py-2.5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#107c10] hover:text-white transition-all disabled:opacity-50">
                      {cvUploading ? "UPLOADING..." : "UPLOAD DOCUMENT"}
                   </button>
                   {settings.contact.cvUrl && (
                     <a href={settings.contact.cvUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-[9px] font-black text-[#0067b8] uppercase hover:underline tracking-widest bg-blue-50 dark:bg-blue-900/10 px-3 py-1.5">
                        <Eye size={10} className="inline mr-1" /> View Current Asset
                     </a>
                   )}
                </div>
             </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
              Profile Diagnostics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 uppercase tracking-wider font-bold text-[9px]">Skills Logged</span>
                <span className="font-black text-[#242424] dark:text-white">{settings.about.skills.length}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 uppercase tracking-wider font-bold text-[9px]">Career Entries</span>
                <span className="font-black text-[#242424] dark:text-white">{settings.about.experience.length}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 uppercase tracking-wider font-bold text-[9px]">Portrait</span>
                <span className={cn("font-black uppercase text-[9px]", settings.about.profileImage ? "text-emerald-600" : "text-amber-600")}>
                  {settings.about.profileImage ? "Active" : "Missing"}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 uppercase tracking-wider font-bold text-[9px]">CV Document</span>
                <span className={cn("font-black uppercase text-[9px]", settings.contact.cvUrl ? "text-emerald-600" : "text-amber-600")}>
                  {settings.contact.cvUrl ? "Linked" : "Missing"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
