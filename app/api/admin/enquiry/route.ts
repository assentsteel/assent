import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Enquiry from "@/app/models/Enquiry";

export async function GET() {
    try {
        await connectDB();
        const enquiry = await Enquiry.findOne({});
        if(enquiry){
            return NextResponse.json({ success: true, data: enquiry }, { status: 200 });
        }else{
            return NextResponse.json({ success: false, message: "Error fetching details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ success: false, message: "Error fetching details" }, { status: 500 });
    }
}

export async function DELETE(req:NextRequest) {
    try {
        await connectDB();
    
        const id = req.nextUrl.searchParams.get("id");
        const type = req.nextUrl.searchParams.get("type"); // "generalEnquiry" | "registrationForm" | "downloadForm"
    
        if (!id || !type) {
          return NextResponse.json({ success: false, message: "ID and type are required" }, { status: 400 });
        }
    
        const enquiry = await Enquiry.findOne();
        if (!enquiry) {
          return NextResponse.json({ success: false, message: "No enquiry data found" }, { status: 404 });
        }
    
        if (!["generalEnquiry", "registrationForm", "downloadForm"].includes(type)) {
          return NextResponse.json({ success: false, message: "Invalid enquiry type" }, { status: 400 });
        }
    
        // Filter out the item from the corresponding array
        enquiry[type] = enquiry[type].filter((item: { _id: string; }) => item._id.toString() != id);
        console.log(enquiry[type])
    
        await enquiry.save();
    
        return NextResponse.json({ success: true, message: "Enquiry deleted successfully" }, { status: 200 });
    
      } catch (error) {
        console.error("Error deleting enquiry", error);
        return NextResponse.json({ success: false, message: "Error deleting enquiry" }, { status: 500 });
      }
    }
