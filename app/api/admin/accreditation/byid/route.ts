import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Accreditation from "@/models/Accreditation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
  
    await connectDB();
    const accreditation = await Accreditation.findById(id);
    return NextResponse.json({ data: accreditation, success: true }, { status: 200 });
  }


  export async function PATCH(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log(id)
    const { title, description, files } = await request.json();
    const accreditation = await Accreditation.findByIdAndUpdate(id, { title, description, files });
    return NextResponse.json({ data: accreditation, success: true }, { status: 200 });
  }


  export async function DELETE(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const accreditation = await Accreditation.findByIdAndDelete(id);
    return NextResponse.json({ data: accreditation, success: true }, { status: 200 });
  }