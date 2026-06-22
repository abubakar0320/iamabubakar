import { Code2, Server, Globe, Shield, Layout, Database, Smartphone, Rocket } from "lucide-react";

export const skills = [
  { name: "React", icon: Layout, level: 95, category: "Frontend" },
  { name: "Next.js", icon: Rocket, level: 90, category: "Frontend" },
  { name: "TypeScript", icon: Code2, level: 85, category: "Frontend" },
  { name: "Tailwind CSS", icon: Globe, level: 95, category: "Frontend" },
  { name: "PHP", icon: Server, level: 85, category: "Backend" },
  { name: "Laravel", icon: Shield, level: 80, category: "Backend" },
  { name: "Node.js", icon: Database, level: 75, category: "Backend" },
  { name: "MySQL", icon: Database, level: 90, category: "Backend" },
  { name: "Networking", icon: Globe, level: 70, category: "Other" },
  { name: "Mobile First", icon: Smartphone, level: 95, category: "Other" },
];

export const projects = [
  {
    id: 1,
    title: "Clothes E-Commerce",
    description: "A robust e-commerce platform for clothing stores with product management, shopping cart, and user authentication.",
    tech: ["PHP", "MySQL", "jQuery", "Bootstrap"],
    category: "PHP",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop",
    live: "#",
    github: "https://github.com/abubakar0320/Clothes",
  },
  {
    id: 2,
    title: "FileHub Client",
    description: "A fully responsive React + Tailwind frontend for FileHub — a collaborative platform where authenticated users can share solutions.",
    tech: ["React", "Tailwind CSS", "JavaScript", "Context API"],
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop",
    live: "https://filehub-client.vercel.app/",
    github: "https://github.com/abubakar0320/Filehub-Client",
  },
  {
    id: 4,
    title: "Personal Portfolio",
    description: "Modern, high-performance portfolio website built with Next.js and Tailwind CSS, featuring a Microsoft-inspired design.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop",
    live: "https://iamabubakar.com",
    github: "https://github.com/abubakar0320/iamabubakar",
  },
];

export const services = [
  {
    title: "Web Development",
    description: "Building fast, secure, and SEO-friendly websites using the latest technologies like Next.js and Laravel.",
    icon: Globe,
    features: ["Custom Web Apps", "E-commerce Solutions", "CMS Integration"],
    benefits: ["SEO Optimized", "High Performance", "Secure Code"],
  },
  {
    title: "Frontend Development",
    description: "Creating stunning, responsive, and interactive user interfaces with React and Tailwind CSS.",
    icon: Layout,
    features: ["SPA Development", "Animation with Framer", "Pixel Perfect Design"],
    benefits: ["Modern UI", "Great UX", "Fully Responsive"],
  },
  {
    title: "Backend Development",
    description: "Developing robust server-side logic and database management systems for scalable applications.",
    icon: Server,
    features: ["RESTful APIs", "Database Design", "Authentication Systems"],
    benefits: ["Scalability", "Data Integrity", "Secure APIs"],
  },
];

export const pricingPlans = [
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
];

export const testimonials = [
  {
    name: "John Doe",
    role: "CEO at TechCorp",
    content: "Abubakar is an exceptional developer. His attention to detail and ability to deliver on time is unmatched.",
    image: "/clients/c1.jpg",
  },
  {
    name: "Sarah Smith",
    role: "Founder at StartupX",
    content: "Working with Abubakar was a breeze. He understood our requirements perfectly and exceeded our expectations.",
    image: "/clients/c2.jpg",
  },
  {
    name: "Michael Chen",
    role: "Project Manager",
    content: "The premium feel of the website Abubakar built for us has significantly improved our brand image.",
    image: "/clients/c3.jpg",
  },
];

export const faqs = [
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
];

export const experience = [
  {
    year: "2023 - Present",
    title: "Senior Full Stack Developer",
    company: "Freelance / International Clients",
    description: "Delivering high-quality web solutions for global clients, specializing in premium portfolios and e-commerce.",
  },
  {
    year: "2021 - 2023",
    title: "Full Stack Developer",
    company: "Software House, Pakistan",
    description: "Worked on various local and international projects, focusing on React and PHP development.",
  },
  {
    year: "2019 - 2021",
    title: "Junior Web Developer",
    company: "Tech Solutions",
    description: "Started my journey in web development, learning the fundamentals of HTML, CSS, and PHP.",
  },
];
