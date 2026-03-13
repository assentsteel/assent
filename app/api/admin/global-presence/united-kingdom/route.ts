import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GlobalPresenceUnitedKingdom from "@/app/models/GlobalPresenceUnitedKingdom";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const hse = await GlobalPresenceUnitedKingdom.findOne({});
        if (!hse) {
            return NextResponse.json({ message: "GlobalPresenceUnitedKingdom not found" }, { status: 404 });
        }
        return NextResponse.json({data:hse,message:"GlobalPresenceUnitedKingdom fetched successfully"}, { status: 200 });
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
        const hse = await GlobalPresenceUnitedKingdom.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!hse) {
            return NextResponse.json({ message: "GlobalPresenceUnitedKingdom not found" }, { status: 404 });
        }
        return NextResponse.json({data:hse,message:"GlobalPresenceUnitedKingdom updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}