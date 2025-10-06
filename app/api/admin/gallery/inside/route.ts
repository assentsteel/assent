import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/app/models/Gallery";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const gallerId = request.nextUrl.searchParams.get("galleryId");
        const gallerySlug = request.nextUrl.searchParams.get("gallerySlug");
        const categorySlug = request.nextUrl.searchParams.get("categorySlug");
        if(gallerId){
            const toUpdateGallery = await Gallery.findById(gallerId)
            if (!toUpdateGallery) {
                return NextResponse.json({message:"Gallery not found"}, { status: 404 });
            }
            const categoryId = request.nextUrl.searchParams.get("categoryId");
            if(categoryId){
                const toUpdateCategory = toUpdateGallery.categories.find((item: { _id: string; })=>item._id.toString() === categoryId);
                if (!toUpdateCategory) {
                    return NextResponse.json({message:"Category not found"}, { status: 404 });
                }
                return NextResponse.json({data:toUpdateCategory,message:"Category fetched successfully"}, { status: 200 });
            }
            return NextResponse.json({message:"Gallery fetching failed"}, { status: 400 });
        }
        else if(gallerySlug && categorySlug){
            const toUpdateGallery = await Gallery.findOne({slug:gallerySlug})
            if (!toUpdateGallery) {
                return NextResponse.json({message:"Gallery not found"}, { status: 404 });
            }
            const category = toUpdateGallery.categories.find((item: { slug: string; })=>item.slug === categorySlug);
            if(category){
                return NextResponse.json({data:category,message:"Category fetched successfully"}, { status: 200 });
            }
            return NextResponse.json({message:"Gallery fetching failed"}, { status: 400 });
        }
        return NextResponse.json({message:"Gallery fetching failed"}, { status: 400 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const galleryId = request.nextUrl.searchParams.get("galleryId");
        const categoryId = request.nextUrl.searchParams.get("categoryId");
        console.log(galleryId,categoryId);
        const gallery = await Gallery.findById(galleryId)
        if (!gallery) {
            return NextResponse.json({message:"Gallery not found"}, { status: 404 });
        }
            if(categoryId){
                const toUpdateCategory = gallery.categories.find((item: { _id: string; })=>item._id.toString() === categoryId);
                if (!toUpdateCategory) {
                    return NextResponse.json({message:"Category not found"}, { status: 404 });
                }
                toUpdateCategory.images = body.images;
                await gallery.save();
                return NextResponse.json({message:"Category updated successfully"}, { status: 200 });
            }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


