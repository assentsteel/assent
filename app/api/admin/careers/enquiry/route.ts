import { NextRequest, NextResponse } from "next/server";
import CareerRequest from "@/app/models/CareerRequest";
import connectDB from "@/lib/mongodb";

export async function GET() {
    try {
        await connectDB();
        const jobRequests = await CareerRequest.find({});
        if (!jobRequests) {
            return NextResponse.json({ message: "Job requests not found" }, { status: 404 });
        }
        return NextResponse.json({data:jobRequests});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectDB();
        const id = request.nextUrl.searchParams.get("id");
        const jobRequest = await CareerRequest.findByIdAndDelete(id);
        if (!jobRequest) {
            return NextResponse.json({ message: "Job request not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Job request deleted successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
