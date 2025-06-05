import connectDB from "@/lib/mongodb";
import Award from "@/app/models/Award";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const {title,image,imageAlt} = await req.json();
        const awards = await Award.findOne({})
        if(awards){
            awards.awards.push({title,image,imageAlt})
            await awards.save()
            return NextResponse.json({message: "Award added successfully"},{status: 200});
        }
        else{
            return NextResponse.json({message: "Error in adding award"},{status: 500});
        }
    } catch (error) {
        console.log("Error in adding award",error);
        return NextResponse.json({message: "Error in adding award"},{status: 500});
    }
}

export async function PATCH(req:NextRequest) {
    try {
        await connectDB();
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const {title,image,imageAlt} = await req.json();
        const awards = await Award.findOne({});
        if(awards){
            awards.awards = awards.awards.map((awards:{_id:string}) => {
                if(awards._id.toString() === id){
                    return {title,image,imageAlt}
                }
                return awards
            })
            await awards.save()
            return NextResponse.json({message: "Award updated successfully"},{status: 200});
        }
        else{
            return NextResponse.json({message: "Error in updating award"},{status: 500});
        }
    } catch (error) {
        console.log("Error in updating award",error);
        return NextResponse.json({message: "Error in updating award"},{status: 500});
    }
}

export async function GET() {
    try {
        await connectDB();
        const awards = await Award.findOne({});
        if(awards){
                return NextResponse.json({message: "Award fetched successfully",data: awards},{status: 200});
            }else{
                return NextResponse.json({message: "Error in fetching award"},{status: 500}); 
            }
    } catch (error) {
        console.log("Error in fetching award",error);
        return NextResponse.json({message: "Error in fetching award"},{status: 500});
    }
}


export async function DELETE(req:NextRequest) {
    try {
        await connectDB();
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        const awards = await Award.findOne({});
        if(id){
            if(awards){
                awards.awards = awards.awards.filter((awards:{_id:string}) => awards._id.toString() !== id)
                await awards.save()
                return NextResponse.json({message: "Award deleted successfully"},{status: 200});
            }else{
                return NextResponse.json({message: "Error in deleting award"},{status: 500});
            }
        }else{
            return NextResponse.json({message: "Error in deleting award"},{status: 500});
        }   
    } catch (error) {
        console.log("Error in deleting award",error);
        return NextResponse.json({message: "Error in deleting award"},{status: 500});
    }
}
