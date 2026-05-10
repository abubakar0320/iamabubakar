import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import Service from "@/models/Service";
import Message from "@/models/Message";
import Order from "@/models/Order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const [
      projectsCount, 
      servicesCount, 
      messagesCount, 
      unreadMessagesCount,
      totalOrders,
      pendingOrders
    ] = await Promise.all([
      Project.countDocuments(),
      Service.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ status: "unread" }),
      Order.countDocuments(),
      Order.countDocuments({ status: "pending" }),
    ]);

    return NextResponse.json({
      projectsCount,
      servicesCount,
      messagesCount,
      unreadMessagesCount,
      totalOrders,
      pendingOrders,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
