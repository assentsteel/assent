import { NextRequest, NextResponse } from "next/server";
import Project from "@/app/models/Project";
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const projects = formData.get("projects") as string
        const actualProjects = JSON.parse(projects)

        for (let i = 0; i < actualProjects.length; i++) {
            await Project.updateOne({ _id: actualProjects[i]._id }, { index: i + 1 })
        }
        

        return NextResponse.json({ message: "Projects reordered successfully",success:true }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error",success:false }, { status: 500 })
    }
}