import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/cloudinary";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { image, file, folder, resourceType } = await req.json();
    const dataToUpload = image || file;
    
    if (!dataToUpload) {
      return NextResponse.json({ error: "File data is required" }, { status: 400 });
    }

    const fileUrl = await uploadFile(dataToUpload, folder || "general", resourceType || "auto");
    return NextResponse.json({ url: fileUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

