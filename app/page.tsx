"use client";

import React, { useEffect, useState } from "react";
import { MicrosoftHero } from "@/components/sections/MicrosoftHero";
import { MicrosoftQuickLinks } from "@/components/sections/MicrosoftQuickLinks";
import { MicrosoftCardGrid } from "@/components/sections/MicrosoftCardGrid";
import { TechStack } from "@/components/sections/TechStack";
import { Timeline } from "@/components/sections/Timeline";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { FYPSection } from "@/components/sections/FYPSection";
import { LanguagesSection } from "@/components/sections/LanguagesSection";
import { RecommendationsSection } from "@/components/sections/RecommendationsSection";
import { Loader2, ShieldCheck, Globe, Award } from "lucide-react";

export default function Home() {
  const [settings, setSettings] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, projectsRes, servicesRes] = await Promise.all([
          fetch("/api/settings"),
          fetch("/api/projects"),
          fetch("/api/services")
        ]);
        const settingsData = await settingsRes.json();
        const projectsData = await projectsRes.json();
        const servicesData = await servicesRes.json();
        setSettings(settingsData);
        setProjects(Array.isArray(projectsData) ? projectsData.slice(0, 4) : []);
        setServices(Array.isArray(servicesData) ? servicesData.slice(0, 4) : []);
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

  return (
    <div className="bg-white dark:bg-[#111] min-h-screen text-[#242424] dark:text-white font-sans">

      {/* 1. HERO */}
      <MicrosoftHero data={settings?.home} cvUrl={settings?.contact?.cvUrl} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        {/* 2. QUICK LINKS */}
        <MicrosoftQuickLinks />
      </div>

      {/* 3. SKILLS & ARSENAL */}
      <TechStack />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        {/* 4. FEATURED PROJECTS */}
        {projects.length > 0 && (
          <div className="mt-16 md:mt-24">
            <MicrosoftCardGrid
              title="Featured Projects"
              items={projects.map(p => ({
                title: p.title,
                description: p.description.substring(0, 100) + "...",
                image: p.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop",
                link: `/projects`,
                cta: "View details"
              }))}
            />
          </div>
        )}
      </div>

      {/* 5. FYP SHOWCASE */}
      <FYPSection />

      {/* 6. EDUCATION & EXPERIENCE TIMELINE */}
      <Timeline />

      {/* 7. CERTIFICATIONS */}
      <CertificationsSection />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        {/* 8. SERVICES */}
        {services.length > 0 && (
          <div className="mt-16 md:mt-24">
            <MicrosoftCardGrid
              title="Services I Offer"
              items={services.map(s => ({
                title: s.title,
                description: s.description.substring(0, 100) + "...",
                image: s.image || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1740&auto=format&fit=crop",
                link: `/services`,
                cta: "Explore service"
              }))}
            />
          </div>
        )}
      </div>

      {/* 11. LANGUAGE SKILLS */}
      <LanguagesSection />

      {/* 12. RECOMMENDATIONS */}
      <RecommendationsSection />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 pb-24">
        {/* 13. GLOBAL TRUST */}
        <section className="mt-24 py-16 bg-[#f2f2f2] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter uppercase">
              Global <span className="text-[#0067b8]">Trust Network</span>
            </h2>
            <p className="text-sm md:text-lg text-[#505050] dark:text-gray-400 font-medium max-w-2xl mx-auto">
              From Mananwala, Sheikhupura to the world — delivering mission-critical web solutions and high-performance
              digital architecture for students, businesses, and institutions across Pakistan and beyond.
            </p>
            <div className="flex flex-wrap justify-center gap-12 pt-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                <ShieldCheck className="text-[#0067b8]" size={20} /> Cisco Certified
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                <Globe className="text-[#0067b8]" size={20} /> International Reach
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                <Award className="text-[#0067b8]" size={20} /> CGPA 3.42 / 4.00
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
