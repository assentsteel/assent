import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/app/models/Gallery";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const gallery = await Gallery.findOne({});
        if (!gallery) {
            return NextResponse.json({ message: "Gallery not found" }, { status: 404 });
        }
        return NextResponse.json({data:gallery,message:"Gallery fetched successfully"}, { status: 200 });
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
        const gallery = await Gallery.findOne({})
        if (!gallery) {
            await Gallery.create(body);
            return NextResponse.json({message:"Gallery created successfully"}, { status: 201 });
        }
        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: "Gallery not found" }, { status: 404 });
        }
        const toUpdateGallery = gallery.gallery.find((item: { _id: string; })=>item._id.toString() === id);
        if (!toUpdateGallery) {
            return NextResponse.json({message:"Gallery not found"}, { status: 404 });
        }
        toUpdateGallery.bannerSection = body.bannerSection;
        toUpdateGallery.thumbnail = body.thumbnail;
        toUpdateGallery.thumbnailAlt = body.thumbnailAlt;
        toUpdateGallery.firstSection = body.firstSection;
        toUpdateGallery.metaTitle = body.metaTitle;
        toUpdateGallery.metaDescription = body.metaDescription;
        await gallery.save();
        return NextResponse.json({message:"Gallery updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}