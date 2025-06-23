import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blasting from "@/app/models/Blasting";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const blasting = await Blasting.findOne({});
        if (!blasting) {
            return NextResponse.json({ message: "Blasting not found" }, { status: 404 });
        }
        return NextResponse.json({data:blasting,message:"Blasting fetched successfully"}, { status: 200 });
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
        const blasting = await Blasting.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!blasting) {
            return NextResponse.json({ message: "Blasting not found" }, { status: 404 });
        }
        return NextResponse.json({data:blasting,message:"Blasting updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}