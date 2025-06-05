import { verifyAdmin } from "@/lib/verifyAdmin";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Location from "@/app/models/Location";
import Project from "@/app/models/Project";
import { startSession } from "mongoose";

export async function POST(request: NextRequest) {
    try {
        const {location} = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const createLocation = await Location.create({name:location});
        if(!createLocation){
            return NextResponse.json({ message: "Failed creating location" }, { status: 404 });
        }
        return NextResponse.json({ message: "Location created successfully",success:true }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const locations = await Location.find({});
        if (!locations) {
            return NextResponse.json({ message: "Locations not found" }, { status: 404 });
        }
        return NextResponse.json({data:locations,message:"Location fetched successfully",success:true}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
    const id = request.nextUrl.searchParams.get("id");
    const {location,oldLocationName} = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const editLocation = await Location.findByIdAndUpdate({_id:id},{$set:{name:location}});
        if(!editLocation){
            return NextResponse.json({ message: "Failed editing location" }, { status: 404 });
        }
        const projects = await Project.find({})
        projects.map((item)=>{
            if(item.location == oldLocationName){
                item.location = location;
                item.save();
            }
        })
        return NextResponse.json({ message: "Location updated successfully",success:true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const session = await startSession();
    try {
        const id = request.nextUrl.searchParams.get("id");
        const {oldLocationName} = await request.json();
            const isAdmin = await verifyAdmin(request);
            if (!isAdmin) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
            await connectDB();
            const projects = await Project.find({})
            session.startTransaction();
            projects.map((item)=>{
                if(item.location == oldLocationName){
                    item.location = "";
                    item.save();
                }
            })
            const deleteLocation = await Location.findByIdAndDelete({_id:id});
            if(!deleteLocation){
                session.abortTransaction();
                return NextResponse.json({ message: "Failed deleting location" }, { status: 404 });
            }
            session.commitTransaction();
            return NextResponse.json({ message: "Location deleted successfully",success:true }, { status: 200 });
        } catch (error) {
            console.log(error);
            session.abortTransaction();
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
}



