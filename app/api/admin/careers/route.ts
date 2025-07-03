import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Career from "@/app/models/Career";
import { verifyAdmin } from "@/lib/verifyAdmin";
import CareerRequest from "@/app/models/CareerRequest";

export async function PATCH(req:NextRequest) {
    try {
        const body = await req.json();
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const career = await Career.findOneAndUpdate({}, body, { upsert: true });
        if(career){
            return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error saving  details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error saving career details", error);
        return NextResponse.json({ message: "Error saving career details" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const career = await Career.findOne({});
        if(career){
            return NextResponse.json({ success: true, data: career }, { status: 200 });
        }else{
            return NextResponse.json({ success: false, message: "Error fetching details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ success: false, message: "Error fetching details" }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        console.log(body)
        const career = await CareerRequest.create(body);
        if(!career){
            return NextResponse.json({ message: "Something went wrong" }, { status: 404 });
        }
        return NextResponse.json({message:"Thank you, we will get back to you soon"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
