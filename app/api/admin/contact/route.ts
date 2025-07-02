import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/app/models/Contact";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Enquiry from "@/app/models/Enquiry";

export async function PATCH(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const body = await req.json();
        const contact = await Contact.findOneAndUpdate({}, body, { upsert: true });
        if(contact){
            return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error saving  details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error saving team details", error);
        return NextResponse.json({ message: "Error saving team details" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const contact = await Contact.findOne({});
        if(contact){
            return NextResponse.json({ success: true, data: contact }, { status: 200 });
        }else{
            return NextResponse.json({ success: false, message: "Error fetching details" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error fetching details", error);
        return NextResponse.json({ success: false, message: "Error fetching details" }, { status: 500 });
    }
}

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        console.log(body)
        switch(body.type){
            case "generalEnquiry":
                const generalEnquiry = await Enquiry.findOne({});
                if(generalEnquiry){
                    generalEnquiry.generalEnquiry.push(body);
                    await generalEnquiry.save();
                    return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
                }else{
                    return NextResponse.json({ message: "Error saving  details" }, { status: 500 });
                }
            case "registrationForm":
                const registrationForm = await Enquiry.findOne({});
                if(registrationForm){
                    registrationForm.registrationForm.push(body);
                    await registrationForm.save();
                    return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
                }else{
                    return NextResponse.json({ message: "Error saving  details" }, { status: 500 });
                }
            case "downloadForm":
                const downloadForm = await Enquiry.findOne({});
                if(downloadForm){
                    downloadForm.downloadForm.push(body);
                    await downloadForm.save();
                    return NextResponse.json({ message: "Details saved successfully" }, { status: 200 });
                }else{
                    return NextResponse.json({ message: "Error saving  details" }, { status: 500 });
                }
        }
    } catch (error) {
        console.log("Error saving team details", error);
        return NextResponse.json({ message: "Error saving team details" }, { status: 500 });
    }
}
