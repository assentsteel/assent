import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Fabrication from "@/app/models/Fabrication";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const fabrication = await Fabrication.findOne({});
        if (!fabrication) {
            return NextResponse.json({ message: "Fabrication not found" }, { status: 404 });
        }
        return NextResponse.json({data:fabrication,message:"Fabrication fetched successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const fabrication = await Fabrication.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!fabrication) {
            return NextResponse.json({ message: "Fabrication not found" }, { status: 404 });
        }
        return NextResponse.json({data:fabrication,message:"Fabrication updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}