import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Award from "@/app/models/Award";
import { revalidateTag } from "next/cache";

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const { metaTitle, metaDescription, pageTitle, banner, bannerAlt,ogType,ogImage } = await req.json();
        const awards = await Award.findOneAndUpdate({}, { metaTitle, metaDescription, pageTitle, banner, bannerAlt,ogType,ogImage }, { upsert: true });
        if(awards){
            revalidateTag("awards")
            return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error saving  details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error saving intro meta details", error);
        return NextResponse.json({ message: "Error saving intro meta details" }, { status: 500 });
    }
}