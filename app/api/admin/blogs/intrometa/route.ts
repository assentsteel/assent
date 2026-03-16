import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blogs from "@/app/models/Blogs";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { metaTitle, metaDescription, pageTitle, ogType, ogImage } = await req.json();
        const blogs = await Blogs.findOne({});
        if (blogs) {
            blogs.metaTitle = metaTitle;
            blogs.metaDescription = metaDescription;
            blogs.pageTitle = pageTitle;
            blogs.ogType = ogType;
            blogs.ogImage = ogImage;
            await blogs.save();
            return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Error saving  details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error saving intro meta details", error);
        return NextResponse.json({ message: "Error saving intro meta details" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const blogs = await Blogs.findOne({});
        if (blogs) {
            return NextResponse.json({ success: true, data: blogs }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: "Error fetching details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ success: false, message: "Error fetching details" }, { status: 500 });
    }
}

