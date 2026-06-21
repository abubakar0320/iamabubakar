"use client";

import React, { useEffect, useState } from "react";
import { MicrosoftHero } from "@/components/sections/MicrosoftHero";
import { MicrosoftQuickLinks } from "@/components/sections/MicrosoftQuickLinks";
import { MicrosoftCardGrid } from "@/components/sections/MicrosoftCardGrid";
import { MicrosoftBanner } from "@/components/sections/MicrosoftBanner";
import { WhyChooseMe } from "@/components/sections/WhyChooseMe";
import { TechStack } from "@/components/sections/TechStack";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { HowIWork } from "@/components/sections/HowIWork";
import { Timeline } from "@/components/sections/Timeline";
import { FAQSection } from "@/components/sections/FAQSection";
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

      {/* ════════════════════════════════════════════════
          1. HERO — Pehli nazar: Kaun hoon, kya karta hoon
          ════════════════════════════════════════════════ */}
      <MicrosoftHero data={settings?.home} cvUrl={settings?.contact?.cvUrl} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">

        {/* ════════════════════════════════════════════════
            2. QUICK LINKS — Navigation helper right after hero
            ════════════════════════════════════════════════ */}
        <MicrosoftQuickLinks />

      </div>

      {/* ════════════════════════════════════════════════
          3. SKILLS & ARSENAL — Kya kar sakta hoon
          Visitor ko foran pata chale capabilities kya hain
          ════════════════════════════════════════════════ */}
      <TechStack />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">

        {/* ════════════════════════════════════════════════
            4. FEATURED PROJECTS — Kya banaya hai
            Skills ke baad portfolio dikhao
            ════════════════════════════════════════════════ */}
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

      {/* ════════════════════════════════════════════════
          5. FYP SHOWCASE — Biggest current achievement
          University ka sabse bada project highlight karo
          ════════════════════════════════════════════════ */}
      <FYPSection />

      {/* ════════════════════════════════════════════════
          6. EDUCATION & EXPERIENCE TIMELINE — Credibility
          Kaahan parha, kya kiya — visitors ka trust banta hai
          ════════════════════════════════════════════════ */}
      <Timeline />

      {/* ════════════════════════════════════════════════
          7. CERTIFICATIONS — Official credentials
          Timeline ke baad certifications naturally aate hain
          ════════════════════════════════════════════════ */}
      <CertificationsSection />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">

        {/* ════════════════════════════════════════════════
            8. SERVICES — Business offerings
            Background establish hone ke baad services dikhao
            ════════════════════════════════════════════════ */}
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

        {/* ════════════════════════════════════════════════
            9. MID-PAGE HIRE ME BANNER — Strong CTA
            Services ke baad direct call to action
            ════════════════════════════════════════════════ */}
        <div className="mt-16 md:mt-24">
          <MicrosoftBanner
            title="Unlock Your Business Potential"
            description="MERN Stack Developer available for FYP projects, business websites, and enterprise-grade web applications. Based in Pakistan, serving globally."
            image="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
            cta="Hire Me Today"
            link="/contact"
          />
        </div>

      </div>

      {/* ════════════════════════════════════════════════
          10. WHY CHOOSE ME — Value proposition
          Ab visitor convince ho raha hai, explain karo kyun
          ════════════════════════════════════════════════ */}
      <WhyChooseMe />

      {/* ════════════════════════════════════════════════
          11. HOW I WORK — Process & transparency
          Value prop ke baad workflow dikhao
          ════════════════════════════════════════════════ */}
      <HowIWork />

      {/* ════════════════════════════════════════════════
          12. TESTIMONIALS — Social proof
          Process samajhne ke baad clients ki feedback
          ════════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ════════════════════════════════════════════════
          13. LANGUAGE SKILLS — Extra credential
          Testimonials ke baad supporting details
          ════════════════════════════════════════════════ */}
      <LanguagesSection />

      {/* ════════════════════════════════════════════════
          14. RECOMMENDATIONS — Academic references
          Faculty ka endorsement — high credibility signal
          ════════════════════════════════════════════════ */}
      <RecommendationsSection />

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20">

        {/* ════════════════════════════════════════════════
            15. GLOBAL TRUST SECTION — Final trust signals
            All credentials dikhane ke baad brief trust block
            ════════════════════════════════════════════════ */}
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

      {/* ════════════════════════════════════════════════
          16. FAQ — Answer final doubts
          Visitor ab almost ready hai, last objections clear karo
          ════════════════════════════════════════════════ */}
      <FAQSection />

      {/* ════════════════════════════════════════════════
          17. FINAL CTA BANNER — Last push to contact
          Page ka last cheez — yahan se contact page jao
          ════════════════════════════════════════════════ */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 xl:px-20 pb-24">
        <MicrosoftBanner
          title="Ready to Build Something Great?"
          description="Whether it's an FYP, a business website, a network setup, or an AI-powered platform — let's collaborate and turn your vision into a reality."
          image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
          cta="Start a Project"
          link="/contact"
        />
      </div>

    </div>
  );
}
