import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import News from "@/app/models/News";
import { revalidateTag } from "next/cache";

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const { metaTitle, metaDescription, pageTitle, ogTitle, ogDescription, ogType, ogImage, twitterTitle, twitterDescription, twitterImage, schema } = await req.json();
        const news = await News.findOne({});
        if(news){
            news.metaTitle = metaTitle;
            news.metaDescription = metaDescription;
            news.pageTitle = pageTitle;
            news.ogTitle = ogTitle;
            news.ogDescription = ogDescription;
            news.ogType = ogType;
            news.ogImage = ogImage;
            news.twitterTitle = twitterTitle;
            news.twitterDescription = twitterDescription;
            news.twitterImage = twitterImage;
            news.schema = schema;
            await news.save();
            revalidateTag("all-news")
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

    