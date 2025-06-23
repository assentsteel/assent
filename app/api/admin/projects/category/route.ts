import { verifyAdmin } from "@/lib/verifyAdmin";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/app/models/Project";

export async function POST(request: NextRequest) {
    try {
        const {name,metaTitle,metaDescription,slug} = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const project = await Project.findOne({});
        if(!project){
            return NextResponse.json({ message: "Projects not found" }, { status: 404 });
        }
        project.categories.push({ name,metaTitle,metaDescription,slug });
        await project.save();
        return NextResponse.json({ message: "Category created successfully",success:true }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const slug = request.nextUrl.searchParams.get("slug");
        await connectDB();
        const projects = await Project.findOne({});
        if (!projects) {
            return NextResponse.json({ message: "Projects not found" }, { status: 404 });
        }
        if(id){
            const category = projects.categories.find((category: { _id: string; }) => category._id == id);
            if(!category){
                return NextResponse.json({ message: "Category not found" }, { status: 404 });
            }
            return NextResponse.json({data:category.projects,message:"Projects fetched successfully",success:true}, { status: 200 });
        }else if(slug){
            const category = projects.categories.find((category: { slug: string; }) => category.slug == slug);
            if(!category){
                return NextResponse.json({ message: "Category not found" }, { status: 404 });
            }
            return NextResponse.json({data:category.projects,message:"Projects fetched successfully",success:true}, { status: 200 });
        }
  
        return NextResponse.json({data:projects.categories,message:"Category fetched successfully",success:true}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
    const id = request.nextUrl.searchParams.get("id");
    const {name,metaTitle,metaDescription,slug} = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const project = await Project.findOne({});
        if(!project){
            return NextResponse.json({ message: "Projects not found" }, { status: 404 });
        }
        const category = project.categories.find((category: { _id: string; }) => category._id == id);
        if(!category){
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        category.name = name;
        category.metaTitle = metaTitle;
        category.metaDescription = metaDescription;
        category.slug = slug;
        await project.save();
        return NextResponse.json({ message: "Category updated successfully",success:true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
    const id = request.nextUrl.searchParams.get("id");
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const project = await Project.findOne({});
        if(!project){
            return NextResponse.json({ message: "Projects not found" }, { status: 404 });
        }
        const category = project.categories.find((category: { _id: string; }) => category._id == id);
        if(!category){
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        project.categories = project.categories.filter((category: { _id: string; }) => category._id != id);
        await project.save();
        return NextResponse.json({ message: "Category deleted successfully",success:true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}



