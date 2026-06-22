import mongoose, { Schema, model, models } from 'mongoose';

const SiteSettingsSchema = new Schema({
  home: {
    title: { type: String, default: 'Building Digital Masterpieces with Code.' },
    tagline: { type: String, default: 'Professional Full-Stack Developer' },
    heroDescription: { type: String, default: 'Hi, I\'m Abubakar, a Professional Full-Stack Developer specializing in crafting high-performance, premium web experiences for global clients.' },
    stats: [{
      label: String,
      value: String
    }]
  },
  about: {
    bio: { type: String, default: '' },
    skills: [{
      name: String,
      level: Number,
      category: String
    }],
    experience: [{
      year: String,
      title: String,
      company: String,
      description: String
    }],
    education: [{
      year: String,
      degree: String,
      institution: String,
      description: String
    }],
    certifications: [{
      title: String,
      issuer: String,
      date: String,
      skills: [String],
      badge: String
    }],
    languages: [{
      lang: String,
      level: String,
      cefr: String,
      pct: Number
    }],
    recommendations: [{
      name: String,
      role: String,
      phone: String,
      initials: String
    }],
    profileImage: { type: String, default: '/profile.jpeg' }
  },
  contact: {
    email: { type: String, default: 'hello@iamabubakar.com' },
    phone: { type: String, default: '+92 3XX XXXXXXX' },
    location: { type: String, default: 'Lahore, Pakistan' },
    socialLinks: {
      github: { type: String, default: '#' },
      linkedin: { type: String, default: '#' },
      twitter: { type: String, default: '#' },
      whatsapp: { type: String, default: '#' }
    },
    cvUrl: { type: String, default: '#' }
  },
  servicesPage: {
    whyCards: [{
      icon: String,
      title: String,
      desc: String
    }],
    processSteps: [{
      step: String,
      title: String,
      desc: String
    }],
    pricingPlans: [{
      name: String,
      price: String,
      description: String,
      features: [String],
      cta: String,
      recommended: Boolean
    }],
    faqs: [{
      question: String,
      answer: String
    }]
  },
  fypSection: {
    title: { type: String, default: 'AI-Powered Smart Recruitment & HR System' },
    description: { type: String, default: 'An enterprise-grade AI-powered HR platform for smart recruitment and employee management — built as the Final Year Project at Baba Guru Nanak University, Nankana Sahib.' },
    techStack: [String],
    university: {
      name: { type: String, default: 'Baba Guru Nanak University' },
      location: { type: String, default: 'Nankana Sahib, Pakistan' }
    },
    highlights: [{
      icon: String,
      label: String,
      desc: String
    }]
  }
}, { timestamps: true });

const SiteSettings = models.SiteSettings || model('SiteSettings', SiteSettingsSchema);

export default SiteSettings;
