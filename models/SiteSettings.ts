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
  }
}, { timestamps: true });

const SiteSettings = models.SiteSettings || model('SiteSettings', SiteSettingsSchema);

export default SiteSettings;
