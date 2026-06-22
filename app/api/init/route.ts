import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import SiteSettings from "@/models/SiteSettings";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectToDatabase();

    // Check if user already exists
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return NextResponse.json({ message: "System already initialized" }, { status: 400 });
    }

    // Create default admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await User.create({
      email: "admin@iamabubakar.com",
      password: hashedPassword,
    });

    // Create default SiteSettings
    const defaultSettings = await SiteSettings.create({
      home: {
        title: "Building Digital Masterpieces with Code.",
        tagline: "Professional Full-Stack Developer",
        heroDescription: "Hi, I'm Abubakar, a Professional Full-Stack Developer specializing in crafting high-performance, premium web experiences for global clients.",
        stats: [
          { label: "Projects Completed", value: "50+" },
          { label: "Happy Clients", value: "30+" },
          { label: "Years Experience", value: "5+" },
          { label: "Technologies Mastered", value: "15+" },
        ]
      },
      about: {
        bio: "I am Abubakar, a passionate Full-Stack Developer with over 5 years of experience in creating digital products that make an impact...",
        skills: [],
        experience: [],
        education: [],
        certifications: [
          {
            title: "Introduction to Cybersecurity",
            issuer: "Cisco Networking Academy",
            date: "31 Oct 2025",
            badge: "CISCO",
            skills: ["Network Security", "Cyber Threats", "Data Privacy", "Security Practices"],
          },
          {
            title: "Digital Competence Framework 2.1 — Advanced",
            issuer: "Self-Assessment Certification",
            date: "07 Aug 2024",
            badge: "DCF",
            skills: ["Data Literacy", "Digital Collaboration", "Content Creation", "Problem Solving"],
          },
        ],
        languages: [
          { lang: "Punjabi", level: "Native", cefr: "", pct: 100 },
          { lang: "Urdu", level: "Proficient", cefr: "C2", pct: 98 },
          { lang: "English", level: "Independent", cefr: "B2–C1", pct: 72 },
        ],
        recommendations: [
          { name: "Prof. Shehzad Nazir", role: "Assistant Professor", phone: "(+92) 313-4152107", initials: "SN" },
          { name: "Prof. Dr. Muhammad Usman Younas", role: "Head of Dept. CS", phone: "(+92) 305-4646932", initials: "MY" },
          { name: "Prof. Hassan Iftikhar", role: "Assistant Professor", phone: "(+92) 308-0637587", initials: "HI" },
          { name: "Ms. Noor Fatima", role: "Lecturer", phone: "(+92) 305-4141975", initials: "NF" },
        ],
        profileImage: "/profile.jpeg"
      },
      contact: {
        email: "hello@iamabubakar.com",
        phone: "+92 3XX XXXXXXX",
        location: "Lahore, Pakistan",
        socialLinks: {
          github: "https://github.com/abubakar0320",
          linkedin: "#",
          twitter: "#",
          whatsapp: "#"
        },
        cvUrl: "#"
      },
      servicesPage: {
        whyCards: [
          { icon: "Clock", title: "On-Time Delivery", desc: "Every project delivered before deadline, always." },
          { icon: "ShieldCheck", title: "Quality Guaranteed", desc: "Clean, scalable code with thorough QA testing." },
          { icon: "MessageSquare", title: "24/7 Communication", desc: "Quick responses and transparent progress updates." },
          { icon: "Zap", title: "Fast Performance", desc: "Optimized builds with sub-second load times." },
          { icon: "Globe", title: "Global Reach", desc: "Serving clients in Pakistan and internationally." },
          { icon: "Star", title: "5-Star Rated", desc: "Consistent top ratings on freelance platforms." },
        ],
        processSteps: [
          { step: "01", title: "Discovery", desc: "Understand your requirements, goals, and timeline in a free consultation call." },
          { step: "02", title: "Proposal", desc: "Receive a detailed project plan, timeline, and transparent pricing within 24 hours." },
          { step: "03", title: "Development", desc: "Regular milestone updates as your project is built with clean, scalable code." },
          { step: "04", title: "Delivery", desc: "Final delivery with full documentation, testing, and post-launch support." },
        ],
        pricingPlans: [
          {
            name: "Basic",
            price: "$100",
            description: "Perfect for personal sites or small landing pages.",
            features: ["5 Pages", "Responsive Design", "Basic SEO", "1 Month Support"],
            cta: "Get Started",
            recommended: false,
          },
          {
            name: "Standard",
            price: "$250",
            description: "Ideal for growing businesses and professional portfolios.",
            features: ["10 Pages", "Advanced SEO", "Content Management", "3 Months Support", "API Integration"],
            cta: "Choose Plan",
            recommended: true,
          },
          {
            name: "Premium",
            price: "$450+",
            description: "Full-scale custom applications and e-commerce.",
            features: ["Unlimited Pages", "Full Custom Features", "Premium Support", "Priority Updates", "Custom Integration"],
            cta: "Contact Me",
            recommended: false,
          },
        ],
        faqs: [
          {
            question: "What is your typical project timeline?",
            answer: "For a standard website, it usually takes 2-4 weeks. Larger applications can take 2-3 months depending on complexity.",
          },
          {
            question: "Do you offer post-launch support?",
            answer: "Yes, I provide ongoing maintenance and support packages to ensure your site stays updated and secure.",
          },
          {
            question: "Which technologies do you prefer?",
            answer: "I specialize in React/Next.js for the frontend and PHP/Laravel or Node.js for the backend.",
          },
        ]
      },
      fypSection: {
        title: "AI-Powered Smart Recruitment & HR System",
        description: "An enterprise-grade AI-powered HR platform for smart recruitment and employee management — built as the Final Year Project at Baba Guru Nanak University, Nankana Sahib.",
        techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "AI/ML", "REST API", "JWT Auth", "Tailwind CSS"],
        university: {
          name: "Baba Guru Nanak University",
          location: "Nankana Sahib, Pakistan"
        },
        highlights: [
          { icon: "Brain", label: "AI/ML Integration", desc: "Smart recruitment powered by machine learning algorithms for candidate screening and ranking." },
          { icon: "Users", label: "Team Lead", desc: "Leading a cross-functional team of 3 developers with structured Agile workflow and sprint planning." },
          { icon: "Layers", label: "Full-Stack MERN", desc: "End-to-end architecture: React.js frontend, Node.js/Express.js backend, MongoDB database." },
          { icon: "Calendar", label: "Jun – Dec 2026", desc: "6-month intensive project at Baba Guru Nanak University under faculty supervision." }
        ]
      }
    });

    return NextResponse.json({
      message: "Initialization successful",
      admin: admin.email,
      defaultPassword: "admin123 (Please change this immediately)"
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
