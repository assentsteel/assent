import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import FileDownload from "@/app/models/FileDownload";
import { verifyAdmin } from "@/lib/verifyAdmin";

// Public: a visitor submits name/email before downloading a file.
export async function POST(request: NextRequest) {
    try {
        const { name, email, fileName, fileUrl } = await request.json();

        if (!name || !email || !fileName || !fileUrl) {
            return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
        }

        await connectDB();
        const record = await FileDownload.create({ name, email, fileName, fileUrl });
        if (!record) {
            return NextResponse.json({ message: "Failed to save details" }, { status: 500 });
        }

        return NextResponse.json({ message: "Success" }, { status: 201 });
    } catch (error) {
        console.log("Error saving file download", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// Admin only: list submissions.
export async function GET(request: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const downloads = await FileDownload.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ data: downloads, message: "Fetched successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error fetching file downloads", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// Admin only: remove a submission.
export async function DELETE(request: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: "Id is required" }, { status: 400 });
        }

        await connectDB();
        const deleted = await FileDownload.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ message: "Record not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error deleting file download", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
