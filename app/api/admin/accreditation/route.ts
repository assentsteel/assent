import { NextRequest, NextResponse } from "next/server";
import Accreditation from "@/models/Accreditation";
import { verifyAdmin } from "@/lib/verifyAdmin";
import connectDB from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  const accreditation = await Accreditation.find();
  return NextResponse.json({ data: accreditation, success: true }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdmin(request);

  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();

    const { title, description, files } = await request.json();

    const accreditation = await Accreditation.create({ title, description, files });

    return NextResponse.json({ data: accreditation, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error creating accreditation:", error);
    return NextResponse.json({ error: "Failed to create accreditation" }, { status: 500 });
  }
}
