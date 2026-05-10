"use client";

import React, { useEffect, useState } from "react";
import { MicrosoftHero } from "@/components/sections/MicrosoftHero";
import { MicrosoftQuickLinks } from "@/components/sections/MicrosoftQuickLinks";
import { MicrosoftCardGrid } from "@/components/sections/MicrosoftCardGrid";
import { MicrosoftBanner } from "@/components/sections/MicrosoftBanner";
import { Loader2 } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-[#0067b8]" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#121212] min-h-screen text-[#242424] dark:text-white pb-20 font-sans">
      <MicrosoftHero data={settings?.home} cvUrl={settings?.contact?.cvUrl} />
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">
        <MicrosoftQuickLinks />
        
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
        
        <div className="mt-16 md:mt-24">
          <MicrosoftBanner 
            title="Unlock Your Business Potential"
            description="Empowering your digital transformation with scalable architecture and premium design. Get in touch to discuss your next big idea."
            image="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
            cta="Hire Me Today"
            link="/contact"
          />
        </div>
        
        {services.length > 0 && (
          <div className="mt-16 md:mt-24">
            <MicrosoftCardGrid 
              title="For Business" 
              items={services.map(s => ({
                title: s.title,
                description: s.description.substring(0, 100) + "...",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1740&auto=format&fit=crop", // placeholder for service
                link: `/services`,
                cta: "Explore service"
              }))} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
