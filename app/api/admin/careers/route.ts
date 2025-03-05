import { NextRequest, NextResponse } from "next/server";
import Careers from "@/models/Careers";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET() {
  await connectDB();
  const careers = await Careers.find();
  return NextResponse.json({ data: careers, success: true }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdmin(request);

  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { title, department, location, applyLink, datePosted,type } = await request.json();
    const career = await Careers.create({ title, department, location, applyLink, datePosted,type });
    return NextResponse.json({ data: career, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
  }
}
