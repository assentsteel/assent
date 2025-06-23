import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GalleryMeta from "@/app/models/GalleryMeta";

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const { metaTitle, metaDescription, pageTitle } = await req.json();
        const gallery = await GalleryMeta.findOneAndUpdate({}, { metaTitle, metaDescription, pageTitle },{upsert:true});
        if(gallery){
            return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
        }else{
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
        const gallery = await GalleryMeta.findOne({});
        if(gallery){
            return NextResponse.json({ success: true, data: gallery }, { status: 200 });
        }else{
            return NextResponse.json({ success: false, message: "Error fetching details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ success: false, message: "Error fetching details" }, { status: 500 });
    }
}



    