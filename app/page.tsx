"use client";

import React, { useEffect, useState } from "react";
import { MicrosoftHero } from "@/components/sections/MicrosoftHero";
import { MicrosoftQuickLinks } from "@/components/sections/MicrosoftQuickLinks";
import { MicrosoftCardGrid } from "@/components/sections/MicrosoftCardGrid";
import { MicrosoftBanner } from "@/components/sections/MicrosoftBanner";
import { WhyChooseMe } from "@/components/sections/WhyChooseMe";
import { TechStack } from "@/components/sections/TechStack";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { HowIWork } from "@/components/sections/HowIWork";
import { Loader2, ShieldCheck, Globe, Zap } from "lucide-react";

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
    <div className="bg-white dark:bg-[#111] min-h-screen text-[#242424] dark:text-white pb-20 font-sans">
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
        
        <div className="mt-16 md:mt-32">
          <MicrosoftBanner 
            title="Unlock Your Business Potential"
            description="Empowering your digital transformation with scalable architecture and premium design. Get in touch to discuss your next big idea."
            image="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
            cta="Hire Me Today"
            link="/contact"
          />
        </div>

        <div className="mt-16">
          <WhyChooseMe />
        </div>
        
        {services.length > 0 && (
          <div className="mt-16 md:mt-24">
            <MicrosoftCardGrid 
              title="For Business" 
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

        {/* Global Trust Section */}
        <section className="mt-32 py-16 bg-[#f2f2f2] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-sm">
           <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Global <span className="text-[#0067b8]">Trust Network</span></h2>
              <p className="text-sm md:text-lg text-[#505050] dark:text-gray-400 font-medium">
                From Lahore to the world, I provide mission-critical technical support and high-performance digital architecture. 
                Join a network of successful clients and academic achievers.
              </p>
              <div className="flex flex-wrap justify-center gap-12 pt-8">
                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                    <ShieldCheck className="text-[#0067b8]" size={20} /> Verified Expert
                 </div>
                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                    <Globe className="text-[#0067b8]" size={20} /> International Reach
                 </div>
                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                    <Zap className="text-[#0067b8]" size={20} /> Instant Sync
                 </div>
              </div>
           </div>
        </section>
      </div>

      {/* Stats Section - full width */}
      <div className="mt-16">
        <StatsSection />
      </div>

      {/* Tech Stack */}
      <div className="mt-0">
        <TechStack />
      </div>

      {/* How I Work */}
      <div className="mt-0">
        <HowIWork />
      </div>

      {/* Testimonials */}
      <div className="mt-0">
        <TestimonialsSection />
      </div>

      {/* Final CTA Banner */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 mt-0 pb-20">
        <div className="mt-16">
          <MicrosoftBanner
            title="Ready to Build Something Great?"
            description="Whether it's an FYP, a business website, a network setup, or an AI-powered platform — let's collaborate and turn your vision into reality."
            image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
            cta="Start a Project"
            link="/contact"
          />
        </div>
      </div>
    </div>
  );
}
