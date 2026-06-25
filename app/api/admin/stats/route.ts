import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import Service from "@/models/Service";
import Message from "@/models/Message";
import Order from "@/models/Order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const now = new Date();
    const twelveMonthsAgo = new Date(now);
    twelveMonthsAgo.setMonth(now.getMonth() - 11);
    twelveMonthsAgo.setDate(1);
    twelveMonthsAgo.setHours(0, 0, 0, 0);

    const [
      projectsCount,
      servicesCount,
      messagesCount,
      unreadMessagesCount,
      totalOrders,
      pendingOrders,
      verifiedOrders,
      cancelledOrders,
      allOrders,
      recentMessages,
    ] = await Promise.all([
      Project.countDocuments(),
      Service.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ status: "unread" }),
      Order.countDocuments(),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "verified" }),
      Order.countDocuments({ status: "cancelled" }),
      Order.find({ createdAt: { $gte: twelveMonthsAgo } }).select("createdAt status planPrice").lean(),
      Message.find({ createdAt: { $gte: twelveMonthsAgo } }).select("createdAt status").lean(),
    ]);

    // Build last 12 months labels
    const months = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now);
      d.setMonth(now.getMonth() - i);
      months.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        label: d.toLocaleString("en-US", { month: "short", year: "2-digit" }),
      });
    }

    // Monthly orders chart data
    const monthlyOrders = months.map(({ key, label }) => {
      const monthOrders = allOrders.filter((o: any) => {
        const d = new Date(o.createdAt);
        const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        return k === key;
      });
      const revenue = monthOrders
        .filter((o: any) => o.status === "verified")
        .reduce((acc: number, o: any) => {
          const price = parseFloat(String(o.planPrice).replace(/[^0-9.]/g, ""));
          return acc + (isNaN(price) ? 0 : price);
        }, 0);
      return {
        month: label,
        orders: monthOrders.length,
        revenue: Math.round(revenue),
        verified: monthOrders.filter((o: any) => o.status === "verified").length,
        pending: monthOrders.filter((o: any) => o.status === "pending").length,
      };
    });

    // Monthly messages chart data
    const monthlyMessages = months.map(({ key, label }) => {
      const monthMsgs = recentMessages.filter((m: any) => {
        const d = new Date(m.createdAt);
        const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        return k === key;
      });
      return {
        month: label,
        total: monthMsgs.length,
        unread: monthMsgs.filter((m: any) => m.status === "unread").length,
        read: monthMsgs.filter((m: any) => m.status === "read").length,
      };
    });

    // Order status breakdown (pie/donut data)
    const orderStatusBreakdown = [
      { name: "Verified", value: verifiedOrders, color: "#0067b8" },
      { name: "Pending", value: pendingOrders, color: "#f59e0b" },
      { name: "Cancelled", value: cancelledOrders, color: "#ef4444" },
    ];

    // Total revenue
    const allVerifiedOrders = await Order.find({ status: "verified" }).select("planPrice").lean();
    const totalRevenue = allVerifiedOrders.reduce((acc: number, o: any) => {
      const price = parseFloat(String(o.planPrice).replace(/[^0-9.]/g, ""));
      return acc + (isNaN(price) ? 0 : price);
    }, 0);

    return NextResponse.json({
      projectsCount,
      servicesCount,
      messagesCount,
      unreadMessagesCount,
      totalOrders,
      pendingOrders,
      verifiedOrders,
      cancelledOrders,
      totalRevenue: Math.round(totalRevenue),
      monthlyOrders,
      monthlyMessages,
      orderStatusBreakdown,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

