import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import News from "@/app/models/News";

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const { metaTitle, metaDescription, pageTitle } = await req.json();
        const news = await News.findOne({});
        if(news){
            news.metaTitle = metaTitle;
            news.metaDescription = metaDescription;
            news.pageTitle = pageTitle;
            await news.save();
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
        const news = await News.findOne({});
        if(news){
            return NextResponse.json({ success: true, data: news }, { status: 200 });
        }else{
            return NextResponse.json({ success: false, message: "Error fetching details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ success: false, message: "Error fetching details" }, { status: 500 });
    }
}

    