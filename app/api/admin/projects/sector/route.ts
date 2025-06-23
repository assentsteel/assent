import { verifyAdmin } from "@/lib/verifyAdmin";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Sector from "@/app/models/Sector";
import Project from "@/app/models/Project";
import { startSession } from "mongoose";

export async function POST(request: NextRequest) {
    try {
        const {sector} = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const createSector = await Sector.create({name:sector});
        if(!createSector){
            return NextResponse.json({ message: "Failed creating sector" }, { status: 404 });
        }
        return NextResponse.json({ message: "Sector created successfully",success:true }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const sectors = await Sector.find({});
        if (!sectors) {
            return NextResponse.json({ message: "Sectors not found" }, { status: 404 });
        }
        return NextResponse.json({data:sectors,message:"Sector fetched successfully",success:true}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
    const id = request.nextUrl.searchParams.get("id");
    const {sector,oldSectorName} = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const editSector = await Sector.findByIdAndUpdate({_id:id},{$set:{name:sector}});
        if(!editSector){
            return NextResponse.json({ message: "Failed editing sector" }, { status: 404 });
        }
        const projects = await Project.find({})
        projects.map((item)=>{
            if(item.sector == oldSectorName){
                item.sector = sector;
                item.save();
            }
        })
        return NextResponse.json({ message: "Sector updated successfully",success:true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const session = await startSession();
    try {
        const id = request.nextUrl.searchParams.get("id");
        const {oldSectorName} = await request.json();
            const isAdmin = await verifyAdmin(request);
            if (!isAdmin) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
            await connectDB();
            const projects = await Project.find({})
            session.startTransaction();
            projects.map((item)=>{
                if(item.sector == oldSectorName){
                    item.sector = "";
                    item.save();
                }
            })
            const deleteSector = await Sector.findByIdAndDelete({_id:id});
            if(!deleteSector){
                session.abortTransaction();
                return NextResponse.json({ message: "Failed deleting sector" }, { status: 404 });
            }
            session.commitTransaction();
            return NextResponse.json({ message: "Sector deleted successfully",success:true }, { status: 200 });
        } catch (error) {
            console.log(error);
            session.abortTransaction();
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
}



