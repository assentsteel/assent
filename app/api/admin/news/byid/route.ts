import { NextRequest, NextResponse } from "next/server";
import News from "@/models/News";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  await connectDB();
  const news = await News.findById(id);
  return NextResponse.json({ data: news, success: true }, { status: 200 });
}

export async function PATCH(request: NextRequest) {
  const isAdmin = await verifyAdmin(request);

  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const { title, description, images, tags, date, type } = await request.json();
  const news = await News.findByIdAndUpdate(id, { title, description, images, tags, date, type });
  return NextResponse.json({ data: news, success: true }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const isAdmin = await verifyAdmin(request);

  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const news = await News.findByIdAndDelete(id);
  return NextResponse.json({ data: news, success: true }, { status: 200 });
}
