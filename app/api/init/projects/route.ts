import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import { projects as initialProjects } from "@/lib/data";

export async function GET() {
  try {
    await connectToDatabase();

    // Clear existing projects to avoid duplicates during initialization
    await Project.deleteMany({});

    // Insert projects from lib/data.ts
    const formattedProjects = initialProjects.map(p => ({
      title: p.title,
      description: p.description,
      tech: p.tech,
      category: p.category,
      image: p.image,
      live: p.live,
      github: p.github
    }));

    await Project.insertMany(formattedProjects);

    return NextResponse.json({
      message: "Projects synchronized successfully",
      count: formattedProjects.length
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
