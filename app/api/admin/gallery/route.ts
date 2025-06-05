import connectDB from "@/lib/mongodb";
import Gallery from "@/app/models/Gallery";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        await connectDB();
        if(id){
            const {images} = await req.json();
            const gallery = await Gallery.findOneAndUpdate({_id:id},{images:images});
            if(gallery){
                return NextResponse.json({message: "Item updated successfully",success:true},{status: 200});
            }
            else{
                return NextResponse.json({message: "Error in updating item",success:false},{status: 500});
            }
        }
        const {title,thumbnail,thumbnailAlt} = await req.json();
        const gallery = await Gallery.create({title,thumbnail,thumbnailAlt})
        if(gallery){
            return NextResponse.json({message: "Item added successfully",success:true},{status: 200});
        }
        else{
            return NextResponse.json({message: "Error in adding item",success:false},{status: 500});
        }
    } catch (error) {
        console.log("Error in adding item",error);
        return NextResponse.json({message: "Error in adding item"},{status: 500});
    }
}

export async function PATCH(req:NextRequest) {
    try {
        await connectDB();
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const {title,thumbnail,thumbnailAlt} = await req.json();
        const gallery = await Gallery.findOneAndUpdate({_id:id},{title,thumbnail,thumbnailAlt});
        if(gallery){
            return NextResponse.json({message: "Item updated successfully",success:true},{status: 200});
        }
        else{
            return NextResponse.json({message: "Error in updating item",success:false},{status: 500});
        }
    } catch (error) {
        console.log("Error in updating item",error);
        return NextResponse.json({message: "Error in updating item"},{status: 500});
    }
}

export async function GET(req:NextRequest) {
    try {
        await connectDB();
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const slug = searchParams.get("slug");
        if(slug){
            const gallery = await Gallery.findOne({slug:slug});
            if(gallery){
                return NextResponse.json({message: "Gallery fetched successfully",data: gallery.images,success:true},{status: 200});
            }else{
                return NextResponse.json({message: "Error in fetching gallery",success:false},{status: 500}); 
            }
        }else if(id){
            const gallery = await Gallery.findOne({_id:id});
            if(gallery){
                return NextResponse.json({message: "Gallery fetched successfully",data: gallery.images,success:true},{status: 200});
            }else{
                return NextResponse.json({message: "Error in fetching gallery",success:false},{status: 500}); 
            }
        }else{
            const gallery = await Gallery.find({});
            if(gallery){
                return NextResponse.json({message: "Gallery fetched successfully",data: gallery,success:true},{status: 200});
            }
            else{
                return NextResponse.json({message: "Error in fetching gallery",success:false},{status: 500});
            }
        }

    } catch (error) {
        console.log("Error in fetching gallery",error);
        return NextResponse.json({message: "Error in fetching gallery"},{status: 500});
    }
}

export async function DELETE(req:NextRequest) {
    try {
        await connectDB();
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const gallery = await Gallery.findByIdAndDelete({_id:id});
        if(gallery){
                return NextResponse.json({message: "Gallery deleted successfully",success:true},{status: 200});
            }else{
                return NextResponse.json({message: "Error in deleting gallery",success:false},{status: 500});
            }
    } catch (error) {
        console.log("Error in deleting gallery",error);
        return NextResponse.json({message: "Error in deleting gallery"},{status: 500});
    }
}
