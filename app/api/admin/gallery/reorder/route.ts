import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/app/models/Gallery";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      const { items } = body; // array of reordered galleries with _id fields
  
      const isAdmin = await verifyAdmin(request);
      if (!isAdmin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      await connectDB();
  
      // Build bulk operations for efficiency
      const bulkOps = items.map((item:{_id:string,index:number}, index: number) => ({
        updateOne: {
          filter: { _id: item._id },
          update: { $set: { index } },
        },
      }));
  
      await Gallery.bulkWrite(bulkOps);
      revalidateTag("all-galleries")

      return NextResponse.json({ message: "Reordered successfully" }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }