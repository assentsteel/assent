import { NextRequest, NextResponse } from "next/server";
import Project from "@/app/models/Project";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
export async function POST(req: NextRequest) {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        await connectDB()
        const id = req.nextUrl.searchParams.get("id")
        const formData = await req.formData()
        const projects = formData.get("projects") as string
        const actualProjects = JSON.parse(projects)
        const allProjects = await Project.findOne({})
        const categoryProjects = allProjects.categories.find((category: { _id: string; }) => category._id == id)
        if(!categoryProjects){
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        categoryProjects.projects = actualProjects
        await allProjects.save()
        session.commitTransaction()
        return NextResponse.json({ message: "Projects reordered successfully",success:true }, { status: 200 })
    } catch (error) {
        console.log(error)
        session.abortTransaction()
        return NextResponse.json({ message: "Internal Server Error",success:false }, { status: 500 })
    }
    finally{
        session.endSession()
    }
}


