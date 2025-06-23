import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GlobalPresence from "@/app/models/GlobalPresence";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const id = request.nextUrl.searchParams.get("id");
        const slug = request.nextUrl.searchParams.get("slug");
        const globalPresence = await GlobalPresence.findOne({});
        if (!globalPresence) {
            return NextResponse.json({ message: "Global Presence not found" }, { status: 404 });
        }
        if (id) {
            const item = globalPresence.thirdSection.countries.find((item: { _id: string }) => item._id == id);
            if (!item) {
                return NextResponse.json({ message: "Country not found" }, { status: 404 });
            }
            return NextResponse.json({ data: item, message: "Global Presence fetched successfully" }, { status: 200 });
        } else if (slug) {
            const item = globalPresence.thirdSection.countries.find((item: { slug: string }) => item.slug == slug);
            if (!item) {
                return NextResponse.json({ message: "Country not found" }, { status: 404 });
            }
            return NextResponse.json({ data: item, message: "Global Presence fetched successfully" }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        console.log(body);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const id = request.nextUrl.searchParams.get("id");
        const globalPresence = await GlobalPresence.findOne({});
        if (!globalPresence) {
            return NextResponse.json({ message: "Global Presence not found" }, { status: 404 });
        }
        const item = globalPresence.thirdSection.countries.find((item: { _id: string }) => item._id == id);
        if (item) {
            item.sections = body.section;
            await globalPresence.save();
            return NextResponse.json({ message: "Global Presence updated successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Country not found" }, { status: 404 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}