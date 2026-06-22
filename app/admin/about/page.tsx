"use client";

import React, { useEffect, useState, useRef } from "react";
import { 
  Save, 
  Loader2, 
  User, 
  Info, 
  Plus, 
  Trash2, 
  Camera, 
  FileText, 
  Download, 
  Eye,
  UserCircle,
  Zap,
  Sparkles
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

  const addEducation = () => {
    setSettings({ ...settings, about: { ...settings.about, education: [...(settings.about.education || []), { year: "2024", degree: "Degree", institution: "Institution", description: "Details" }] } });
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const newList = [...settings.about.education];
    newList[index] = { ...newList[index], [field]: value };
    setSettings({ ...settings, about: { ...settings.about, education: newList } });
  };

  const addCertification = () => {
    setSettings({ ...settings, about: { ...settings.about, certifications: [...(settings.about.certifications || []), { title: "Title", issuer: "Issuer", date: "Date", badge: "Badge", skills: [] }] } });
  };

  const updateCertification = (index: number, field: string, value: any) => {
    const newList = [...(settings.about.certifications || [])];
    newList[index] = { ...newList[index], [field]: value };
    setSettings({ ...settings, about: { ...settings.about, certifications: newList } });
  };

  const addLanguage = () => {
    setSettings({ ...settings, about: { ...settings.about, languages: [...(settings.about.languages || []), { lang: "Language", level: "Level", cefr: "CEFR", pct: 50 }] } });
  };

  const updateLanguage = (index: number, field: string, value: any) => {
    const newList = [...(settings.about.languages || [])];
    newList[index] = { ...newList[index], [field]: value };
    setSettings({ ...settings, about: { ...settings.about, languages: newList } });
  };

  const addRecommendation = () => {
    setSettings({ ...settings, about: { ...settings.about, recommendations: [...(settings.about.recommendations || []), { name: "Name", role: "Role", phone: "Phone", initials: "NA" }] } });
  };

  const updateRecommendation = (index: number, field: string, value: any) => {
    const newList = [...(settings.about.recommendations || [])];
    newList[index] = { ...newList[index], [field]: value };
    setSettings({ ...settings, about: { ...settings.about, recommendations: newList } });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-[50vh]"><Loader2 className="animate-spin h-10 w-10 text-[#e10098]" /></div>;
  }

  return (
    <div className="space-y-10 font-sans pb-10 max-w-7xl mx-auto">
      
      {/* ── Page Header (Vibrant Gradient) ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-gradient-to-r from-[#5c2d91] via-[#e10098] to-[#ff4d4d] text-white p-8 relative overflow-hidden shadow-[0_0_40px_rgba(225,0,152,0.2)]">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-pink-200 mb-2 flex items-center gap-2">
            <UserCircle size={12} /> Profile Matrix
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Identity Management
          </h1>
          <p className="text-sm text-pink-100 font-medium max-w-xl">
            Configure your professional biography, skills architecture, and career ledger.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Link
            href="/about"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white text-[#e10098] font-bold px-6 py-3 hover:bg-gray-100 transition-colors text-xs uppercase tracking-widest shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_5px_25px_rgba(255,255,255,0.3)]"
          >
            <Eye size={15} /> View Live Profile
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Identity & Narrative */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#e10098]/30 transition-colors duration-300">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#e10098] mb-1">Module 1</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Visual & Narrative
                </h2>
              </div>
              <Camera size={16} className="text-gray-400 group-hover:text-[#e10098] transition-colors" />
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-8 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
                <div className="relative group/img">
                  <div className="w-32 h-32 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 overflow-hidden relative group-hover/img:border-[#e10098] transition-colors shadow-[0_0_15px_rgba(225,0,152,0)] group-hover/img:shadow-[0_0_15px_rgba(225,0,152,0.3)]">
                    {settings.about.profileImage ? (
                      <img src={settings.about.profileImage} className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-500" alt="Profile" />
                    ) : (
                      <User size={48} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300" />
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex items-center justify-center">
                        <Loader2 className="animate-spin text-[#e10098]" />
                      </div>
                    )}
                  </div>
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()} 
                    className="absolute bottom-[-10px] right-[-10px] bg-[#e10098] text-white p-2.5 shadow-[0_0_15px_rgba(225,0,152,0.5)] hover:bg-[#c00082] transition-all group-hover/img:scale-110"
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
                   <code className="text-[10px] text-[#e10098] bg-[#e10098]/10 px-2.5 py-1.5 font-bold tracking-widest inline-block uppercase border border-[#e10098]/20">IMAGE_PROTOCOL: SECURE</code>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-[#242424] dark:text-white uppercase tracking-widest">Professional Bio</label>
                <textarea
                  rows={6}
                  value={settings.about.bio}
                  onChange={(e) => setSettings({...settings, about: {...settings.about, bio: e.target.value}})}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:border-[#e10098] focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all text-sm leading-relaxed"
                  placeholder="Enter your comprehensive biography here..."
                />
              </div>
            </div>
          </div>

          {/* Stack Architecture */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#00d4ff]/30 transition-colors duration-300">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#00d4ff] mb-1">Module 2</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Stack Architecture
                </h2>
              </div>
              <button type="button" onClick={addSkill} className="bg-transparent border border-[#00d4ff] text-[#00d4ff] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest hover:bg-[#00d4ff] hover:text-black hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all flex items-center gap-1.5">
                 <Plus size={12} /> Add Unit
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 <AnimatePresence>
                   {settings.about.skills.map((skill: any, index: number) => (
                     <motion.div key={index} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 p-5 relative group/skill hover:border-[#00d4ff] transition-colors shadow-[0_0_15px_rgba(0,212,255,0)] hover:shadow-[0_0_15px_rgba(0,212,255,0.1)]">
                        <div className="grid grid-cols-2 gap-4 mb-5">
                           <div className="space-y-1.5">
                             <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Skill Name</label>
                             <input 
                               type="text" value={skill.name} placeholder="Skill"
                               onChange={(e) => updateSkill(index, "name", e.target.value)}
                               className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs font-bold uppercase outline-none focus:border-[#00d4ff]"
                             />
                           </div>
                           <div className="space-y-1.5">
                             <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Category</label>
                             <select 
                               value={skill.category}
                               onChange={(e) => updateSkill(index, "category", e.target.value)}
                               className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-[10px] font-black uppercase outline-none focus:border-[#00d4ff]"
                             >
                               <option value="Frontend">Frontend</option>
                               <option value="Backend">Backend</option>
                               <option value="Other">Tools/Cloud</option>
                             </select>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="flex-grow">
                             <div className="flex justify-between mb-2">
                               <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Proficiency</span>
                               <span className="text-[10px] font-black text-[#00d4ff]">{skill.level}%</span>
                             </div>
                             <input type="range" min="0" max="100" value={skill.level} onChange={(e) => updateSkill(index, "level", parseInt(e.target.value))} className="w-full accent-[#00d4ff] h-1.5 bg-gray-200 dark:bg-gray-700 appearance-none outline-none" />
                           </div>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => {
                            const updated = settings.about.skills.filter((_: any, i: number) => i !== index);
                            setSettings({...settings, about: {...settings.about, skills: updated}});
                          }} 
                          className="absolute -top-3 -right-3 bg-red-500/20 text-red-500 border border-red-500/50 p-1.5 opacity-0 group-hover/skill:opacity-100 transition-all hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                        >
                          <Trash2 size={12} />
                        </button>
                     </motion.div>
                   ))}
                 </AnimatePresence>
                 {settings.about.skills.length === 0 && (
                   <div className="col-span-2 py-8 text-center border-2 border-dashed border-gray-200 dark:border-gray-800">
                     <p className="text-xs text-gray-400 font-black uppercase tracking-widest">No skills configured</p>
                   </div>
                 )}
              </div>
            </div>
          </div>

          {/* Career Ledger */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#ff4d4d]/30 transition-colors duration-300">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#ff4d4d] mb-1">Module 3</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Career Ledger
                </h2>
              </div>
              <button type="button" onClick={addExperience} className="bg-transparent border border-[#ff4d4d] text-[#ff4d4d] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest hover:bg-[#ff4d4d] hover:text-black hover:shadow-[0_0_15px_rgba(255,77,77,0.4)] transition-all flex items-center gap-1.5">
                 <Plus size={12} /> Add Entry
              </button>
            </div>
            
            <div className="p-6 space-y-5">
               <AnimatePresence>
                 {settings.about.experience.map((exp: any, index: number) => (
                   <motion.div key={index} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 p-6 relative group/exp hover:border-[#ff4d4d] transition-colors shadow-[0_0_15px_rgba(255,77,77,0)] hover:shadow-[0_0_15px_rgba(255,77,77,0.1)]">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                         <div className="space-y-1.5 md:col-span-1">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Timeline</label>
                           <input type="text" value={exp.year} placeholder="e.g. 2020 - 2024" onChange={(e) => updateExperience(index, "year", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-xs font-black uppercase text-[#ff4d4d] focus:border-[#ff4d4d] outline-none" />
                         </div>
                         <div className="space-y-1.5 md:col-span-3">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Role Title</label>
                           <input type="text" value={exp.title} placeholder="Senior Developer" onChange={(e) => updateExperience(index, "title", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-xs font-bold uppercase focus:border-[#ff4d4d] outline-none" />
                         </div>
                      </div>
                      <div className="space-y-5">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Organization</label>
                          <input type="text" value={exp.company} placeholder="Company Name" onChange={(e) => updateExperience(index, "company", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-xs font-medium focus:border-[#ff4d4d] outline-none" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Responsibilities / Description</label>
                          <textarea value={exp.description} placeholder="Describe your achievements..." onChange={(e) => updateExperience(index, "description", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-4 py-3 text-[12px] leading-relaxed resize-none h-24 focus:border-[#ff4d4d] outline-none" />
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => {
                           const updated = settings.about.experience.filter((_: any, i: number) => i !== index);
                           setSettings({...settings, about: {...settings.about, experience: updated}});
                        }} 
                        className="absolute -top-3 -right-3 bg-red-500/20 text-red-500 border border-red-500/50 p-1.5 opacity-0 group-hover/exp:opacity-100 transition-all hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                      >
                        <Trash2 size={12} />
                      </button>
                   </motion.div>
                 ))}
               </AnimatePresence>
               {settings.about.experience.length === 0 && (
                 <div className="py-8 text-center border-2 border-dashed border-gray-200 dark:border-gray-800">
                   <p className="text-xs text-gray-400 font-black uppercase tracking-widest">No experience entries</p>
                 </div>
               )}
            </div>
          </div>

          {/* Education Ledger */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#00d15e]/30 transition-colors duration-300">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#00d15e] mb-1">Module 4</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Academic Ledger (Education)
                </h2>
              </div>
              <button type="button" onClick={addEducation} className="bg-transparent border border-[#00d15e] text-[#00d15e] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest hover:bg-[#00d15e] hover:text-black hover:shadow-[0_0_15px_rgba(0,209,94,0.4)] transition-all flex items-center gap-1.5">
                 <Plus size={12} /> Add Entry
              </button>
            </div>
            
            <div className="p-6 space-y-5">
               <AnimatePresence>
                 {settings.about.education.map((edu: any, index: number) => (
                   <motion.div key={index} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 p-6 relative group/edu hover:border-[#00d15e] transition-colors shadow-[0_0_15px_rgba(0,209,94,0)] hover:shadow-[0_0_15px_rgba(0,209,94,0.1)]">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                         <div className="space-y-1.5 md:col-span-1">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Timeline</label>
                           <input type="text" value={edu.year} placeholder="e.g. 2018 - 2022" onChange={(e) => updateEducation(index, "year", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-xs font-black uppercase text-[#00d15e] focus:border-[#00d15e] outline-none" />
                         </div>
                         <div className="space-y-1.5 md:col-span-3">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Degree/Program</label>
                           <input type="text" value={edu.degree} placeholder="BS Computer Science" onChange={(e) => updateEducation(index, "degree", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-xs font-bold uppercase focus:border-[#00d15e] outline-none" />
                         </div>
                      </div>
                      <div className="space-y-5">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Institution</label>
                          <input type="text" value={edu.institution} placeholder="University Name" onChange={(e) => updateEducation(index, "institution", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-xs font-medium focus:border-[#00d15e] outline-none" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Description</label>
                          <textarea value={edu.description} placeholder="Academic achievements..." onChange={(e) => updateEducation(index, "description", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-4 py-3 text-[12px] leading-relaxed resize-none h-24 focus:border-[#00d15e] outline-none" />
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => {
                           const updated = settings.about.education.filter((_: any, i: number) => i !== index);
                           setSettings({...settings, about: {...settings.about, education: updated}});
                        }} 
                        className="absolute -top-3 -right-3 bg-red-500/20 text-red-500 border border-red-500/50 p-1.5 opacity-0 group-hover/edu:opacity-100 transition-all hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                      >
                        <Trash2 size={12} />
                      </button>
                   </motion.div>
                 ))}
               </AnimatePresence>
               {settings.about.education.length === 0 && (
                 <div className="py-8 text-center border-2 border-dashed border-gray-200 dark:border-gray-800">
                   <p className="text-xs text-gray-400 font-black uppercase tracking-widest">No education entries</p>
                 </div>
               )}
            </div>
          </div>

          {/* Certifications Ledger */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#00d4ff]/30 transition-colors duration-300">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#00d4ff] mb-1">Module 5</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Certifications
                </h2>
              </div>
              <button type="button" onClick={addCertification} className="bg-transparent border border-[#00d4ff] text-[#00d4ff] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest hover:bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff] hover:text-white transition-all flex items-center gap-1.5">
                 <Plus size={12} /> Add Entry
              </button>
            </div>
            
            <div className="p-6 space-y-5">
               <AnimatePresence>
                 {(settings.about.certifications || []).map((cert: any, index: number) => (
                   <motion.div key={index} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 p-6 relative group/cert hover:border-[#00d4ff] transition-colors">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                         <div className="space-y-1.5">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Title</label>
                           <input type="text" value={cert.title} onChange={(e) => updateCertification(index, "title", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-xs font-bold uppercase focus:border-[#00d4ff] outline-none" />
                         </div>
                         <div className="space-y-1.5">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Issuer</label>
                           <input type="text" value={cert.issuer} onChange={(e) => updateCertification(index, "issuer", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-xs font-bold uppercase focus:border-[#00d4ff] outline-none" />
                         </div>
                         <div className="space-y-1.5">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Date</label>
                           <input type="text" value={cert.date} onChange={(e) => updateCertification(index, "date", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-xs font-bold uppercase focus:border-[#00d4ff] outline-none" />
                         </div>
                         <div className="space-y-1.5">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Badge</label>
                           <input type="text" value={cert.badge} onChange={(e) => updateCertification(index, "badge", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-xs font-bold uppercase focus:border-[#00d4ff] outline-none" />
                         </div>
                         <div className="space-y-1.5 md:col-span-2">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Skills (Comma separated)</label>
                           <input type="text" value={(cert.skills || []).join(", ")} onChange={(e) => updateCertification(index, "skills", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-xs focus:border-[#00d4ff] outline-none" />
                         </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => {
                           const updated = settings.about.certifications.filter((_: any, i: number) => i !== index);
                           setSettings({...settings, about: {...settings.about, certifications: updated}});
                        }} 
                        className="absolute -top-3 -right-3 bg-red-500/20 text-red-500 border border-red-500/50 p-1.5 opacity-0 group-hover/cert:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={12} />
                      </button>
                   </motion.div>
                 ))}
               </AnimatePresence>
            </div>
          </div>

          {/* Languages & Recommendations Ledger */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 group hover:border-[#5c2d91]/30 transition-colors duration-300">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#5c2d91] mb-1">Module 6</div>
                <h2 className="text-base font-bold text-[#242424] dark:text-white flex items-center gap-2">
                  Languages & Recommendations
                </h2>
              </div>
            </div>
            
            <div className="p-6 space-y-8">
               {/* Languages */}
               <div>
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="text-sm font-bold text-[#242424] dark:text-white">Languages</h3>
                     <button type="button" onClick={addLanguage} className="text-[10px] font-black text-[#5c2d91] uppercase tracking-widest flex items-center gap-1"><Plus size={12}/> Add</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {(settings.about.languages || []).map((lang: any, index: number) => (
                       <div key={index} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 p-4 relative group/lang">
                          <div className="grid grid-cols-2 gap-3">
                             <input type="text" placeholder="Language" value={lang.lang} onChange={(e) => updateLanguage(index, "lang", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs outline-none" />
                             <input type="text" placeholder="Level" value={lang.level} onChange={(e) => updateLanguage(index, "level", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs outline-none" />
                             <input type="text" placeholder="CEFR" value={lang.cefr} onChange={(e) => updateLanguage(index, "cefr", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs outline-none" />
                             <input type="number" placeholder="%" value={lang.pct} onChange={(e) => updateLanguage(index, "pct", parseInt(e.target.value))} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs outline-none" />
                          </div>
                          <button type="button" onClick={() => setSettings({...settings, about: {...settings.about, languages: settings.about.languages.filter((_: any, i: number) => i !== index)}})} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 opacity-0 group-hover/lang:opacity-100"><Trash2 size={10} /></button>
                       </div>
                     ))}
                  </div>
               </div>

               {/* Recommendations */}
               <div>
                  <div className="flex justify-between items-center mb-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                     <h3 className="text-sm font-bold text-[#242424] dark:text-white">Recommendations</h3>
                     <button type="button" onClick={addRecommendation} className="text-[10px] font-black text-[#5c2d91] uppercase tracking-widest flex items-center gap-1"><Plus size={12}/> Add</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {(settings.about.recommendations || []).map((rec: any, index: number) => (
                       <div key={index} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 p-4 relative group/rec">
                          <div className="grid grid-cols-2 gap-3">
                             <input type="text" placeholder="Name" value={rec.name} onChange={(e) => updateRecommendation(index, "name", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs outline-none" />
                             <input type="text" placeholder="Role" value={rec.role} onChange={(e) => updateRecommendation(index, "role", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs outline-none" />
                             <input type="text" placeholder="Phone" value={rec.phone} onChange={(e) => updateRecommendation(index, "phone", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs outline-none" />
                             <input type="text" placeholder="Initials" value={rec.initials} onChange={(e) => updateRecommendation(index, "initials", e.target.value)} className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 px-3 py-2 text-xs outline-none" />
                          </div>
                          <button type="button" onClick={() => setSettings({...settings, about: {...settings.about, recommendations: settings.about.recommendations.filter((_: any, i: number) => i !== index)}})} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 opacity-0 group-hover/rec:opacity-100"><Trash2 size={10} /></button>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column (Control Console Sidebar) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Action Module */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800">
            <div className="p-6 bg-[#f8fafc] dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Zap size={14} className="text-[#00d15e]" /> Deployment Control
              </h3>
            </div>
            <div className="p-6">
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                Review all modifications before pushing them to the live profile. Changes are synchronized globally.
              </p>
              <button 
                type="submit" 
                disabled={saving}
                className="w-full bg-[#00d15e] text-black font-black py-4 px-8 hover:bg-[#00b350] hover:shadow-[0_0_20px_rgba(0,209,94,0.4)] transition-all flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:shadow-none uppercase text-[11px] tracking-[0.2em]"
              >
                {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                {saving ? "Authorizing..." : "Push Changes"}
              </button>
            </div>
          </div>

          {/* CV Node Module */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800">
             <div className="p-6 bg-[#f8fafc] dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800">
               <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 flex items-center gap-2">
                 <FileText size={14} className="text-[#00d4ff]" /> Credentials Node
               </h3>
             </div>
             <div className="p-6 text-center space-y-5">
                <div className="w-16 h-16 mx-auto bg-cyan-500/10 flex items-center justify-center rounded-none border border-cyan-500/30">
                  <Download className="text-[#00d4ff]" size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-800 dark:text-white uppercase tracking-widest">Technical CV</p>
                  <p className="text-[10px] text-gray-500 mt-1">PDF format highly recommended.</p>
                </div>
                <div className="pt-2 space-y-3">
                   <input type="file" ref={cvInputRef} className="hidden" accept="application/pdf" onChange={handleCvUpload} />
                   <button type="button" onClick={() => cvInputRef.current?.click()} disabled={cvUploading} className="w-full border-2 border-[#00d4ff] text-[#00d4ff] bg-transparent py-2.5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#00d4ff] hover:text-black hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all disabled:opacity-50">
                      {cvUploading ? "UPLOADING..." : "UPLOAD DOCUMENT"}
                   </button>
                   {settings.contact.cvUrl && (
                     <a href={settings.contact.cvUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-[9px] font-black text-[#00d4ff] uppercase hover:text-white transition-colors tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-4 py-2">
                        <Eye size={10} className="inline mr-1" /> View Current Asset
                     </a>
                   )}
                </div>
             </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 mb-4 border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-[#e10098]" /> Profile Diagnostics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 uppercase tracking-wider font-bold text-[9px]">Skills Logged</span>
                <span className="font-black text-[#00d4ff]">{settings.about.skills.length}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 uppercase tracking-wider font-bold text-[9px]">Career Entries</span>
                <span className="font-black text-[#ff4d4d]">{settings.about.experience.length}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 uppercase tracking-wider font-bold text-[9px]">Portrait</span>
                <span className={cn("font-black uppercase text-[9px]", settings.about.profileImage ? "text-[#00d15e]" : "text-amber-500")}>
                  {settings.about.profileImage ? "Active" : "Missing"}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 uppercase tracking-wider font-bold text-[9px]">CV Document</span>
                <span className={cn("font-black uppercase text-[9px]", settings.contact.cvUrl ? "text-[#00d15e]" : "text-amber-500")}>
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
