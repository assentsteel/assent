import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";
import  connectDB  from "@/lib/mongodb";
import Project from "@/app/models/Project";


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
        if(!project){
            return NextResponse.json({ message: "Projects not found" }, { status: 404 });
        }
        const category = project.categories.find((category: { _id: string; }) => category._id == id);
        if(!category){
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        category.projects = category.projects.filter((project: { _id: string; }) => project._id != projectId);
        await project.save();
        return NextResponse.json({ message: "Project deleted successfully",success:true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}