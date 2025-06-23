import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";
import connectDB from "@/lib/mongodb";
import Project from "@/app/models/Project";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const id = request.nextUrl.searchParams.get("id");
        console.log(id)
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const project = await Project.findOne({});
        if (!project) {
            return NextResponse.json({ message: "Projects not found" }, { status: 404 });
        }
        const category = project.categories.find((category: { _id: string; }) => category._id.toString() === id);
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        category.projects.push(data);
        await project.save();
        return NextResponse.json({ message: "Project added successfully", success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json();
        const id = request.nextUrl.searchParams.get("id");
        const projectId = request.nextUrl.searchParams.get("projectId");
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const project = await Project.findOne({});
        if (!project) {
            return NextResponse.json({ message: "Projects not found" }, { status: 404 });
        }
        const category = project.categories.find((category: { _id: string; }) => category._id.toString() === id);
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        const projectData = category.projects.find((project: { _id: string; }) => project._id.toString() === projectId);
        if (!projectData) {
            return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }
        Object.assign(projectData, data);
        await project.save();
        return NextResponse.json({ message: "Project updated successfully", success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const projectId = request.nextUrl.searchParams.get("projectId");
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const project = await Project.findOne({});
        if (!project) {
            return NextResponse.json({ message: "Projects not found" }, { status: 404 });
        }
        const category = project.categories.find((category: { _id: string; }) => category._id.toString() === id);
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        category.projects = category.projects.filter((project: { _id: string; }) => project._id.toString() !== projectId);
        await project.save();
        return NextResponse.json({ message: "Project deleted successfully", success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const categorySlug = request.nextUrl.searchParams.get("categorySlug");
        const projectId = request.nextUrl.searchParams.get("projectId");
        const projectSlug = request.nextUrl.searchParams.get("projectSlug");
        await connectDB();
        const project = await Project.findOne({});
        if (!project) {
            return NextResponse.json({ message: "Projects not found" }, { status: 404 });
        }
        if (id) {
            const category = project.categories.find((category: { _id: string; }) => category._id.toString() === id);
            if (!category) {
                return NextResponse.json({ message: "Category not found" }, { status: 404 });
            }
            const projectData = category.projects.id(projectId);
            if (!projectData) {
                return NextResponse.json({ message: "Project not found" }, { status: 404 });
            }
            return NextResponse.json({ data: projectData }, { status: 200 });
        }
        else if (categorySlug) {
            const category = project.categories.find((category: { slug: string; }) => category.slug === categorySlug);
            if (!category) {
                return NextResponse.json({ message: "Category not found" }, { status: 404 });
            }
            const projectData = category.projects.find((project: { slug: string; }) => project.slug === projectSlug);
            if (!projectData) {
                return NextResponse.json({ message: "Project not found" }, { status: 404 });
            }
            return NextResponse.json({ data: projectData }, { status: 200 });
        }else{
            return NextResponse.json({ data: project }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


