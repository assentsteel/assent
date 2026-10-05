import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/app/models/Gallery";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";


export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const gallery = await Gallery.findOne({});
        if (!gallery) {
            return NextResponse.json({ message: "Gallery not found" }, { status: 404 });
        }
        const id = request.nextUrl.searchParams.get("id");
        if(id){
            const toUpdateGallery = await Gallery.findById(id)
            if (!toUpdateGallery) {
                return NextResponse.json({message:"Gallery not found"}, { status: 404 });
            }
            return NextResponse.json({data:toUpdateGallery,message:"Gallery fetched successfully"}, { status: 200 });
        }
        return NextResponse.json({data:gallery,message:"Gallery fetched successfully"}, { status: 200 });
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
        const id = request.nextUrl.searchParams.get("id");
        const gallery = await Gallery.findById(id)
        if (!gallery) {
            return NextResponse.json({message:"Gallery not found"}, { status: 404 });
        }
        if(id){
            gallery.categories.push({title:body.name,slug:body.slug,thumbnail:body.thumbnail,altText:body.altText,images:[],metaTitle:body.metaTitle,metaDescription:body.metaDescription,ogTitle:body.ogTitle,ogDescription:body.ogDescription,ogType:body.ogType,ogImage:body.ogImage,twitterTitle:body.twitterTitle,twitterDescription:body.twitterDescription,twitterImage:body.twitterImage,schema:body.schema})
            await gallery.save();
            revalidateTag("all-galleries")
            return NextResponse.json({message:"Gallery item updated successfully"}, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const id = request.nextUrl.searchParams.get("id");
        const galleryId = body.galleryId;
        await connectDB();
        const gallery = await Gallery.findById(galleryId)
        if (!gallery) {
            return NextResponse.json({message:"Gallery not found"}, { status: 404 });
        }
        const toUpdateCategory = gallery.categories.find((item: { _id: string; })=>item._id.toString() === id);
        if (!toUpdateCategory) {
            return NextResponse.json({message:"Category not found"}, { status: 404 });
        }
        toUpdateCategory.title = body.name;
        toUpdateCategory.slug = body.slug;
        toUpdateCategory.thumbnail = body.thumbnail;
        toUpdateCategory.altText = body.altText;
        toUpdateCategory.metaTitle = body.metaTitle;
        toUpdateCategory.metaDescription = body.metaDescription;
        toUpdateCategory.ogTitle = body.ogTitle;
        toUpdateCategory.ogDescription = body.ogDescription;
        toUpdateCategory.ogType = body.ogType;
        toUpdateCategory.ogImage = body.ogImage;
        toUpdateCategory.twitterTitle = body.twitterTitle;
        toUpdateCategory.twitterDescription = body.twitterDescription;
        toUpdateCategory.twitterImage = body.twitterImage;
        toUpdateCategory.schema = body.schema;
        await gallery.save();
        revalidateTag("all-galleries")
        return NextResponse.json({message:"Category updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(request);
        const body = await request.json();
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const id = request.nextUrl.searchParams.get("id");
        const galleryId = body.galleryId;
        await connectDB();
        const gallery = await Gallery.findById(galleryId)
        if (!gallery) {
            return NextResponse.json({message:"Gallery not found"}, { status: 404 });
        }
        gallery.categories = gallery.categories.filter((item: { _id: string; })=>item._id.toString() !== id);
        await gallery.save();
        revalidateTag("all-galleries")
        return NextResponse.json({message:"Category deleted successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

