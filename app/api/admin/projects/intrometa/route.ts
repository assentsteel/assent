import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/app/models/Project";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { seo } = await req.json();
        const project = await Project.findOneAndUpdate({}, { seo }, { upsert: true, new: true });
        if (project) {
            revalidateTag("all-project")
            return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Error saving details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error saving intro meta details", error);
        return NextResponse.json({ message: "Error saving intro meta details" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const project = await Project.findOne({});
        if (project) {
            return NextResponse.json({ success: true, data: project }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: "Error fetching details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ success: false, message: "Error fetching details" }, { status: 500 });
    }
}
