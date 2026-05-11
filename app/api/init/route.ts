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
