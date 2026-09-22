import connectDB from "@/lib/mongodb";
import Sitemap from "@/app/models/Sitemap";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const sitemap = await Sitemap.findOne({});
    if (!sitemap) {
      return NextResponse.json({ data: null }, { status: 200 });
    }
    return NextResponse.json(
      {
        data: {
          updatedAt: sitemap.updatedAt,
          urlCount: sitemap.urlCount,
          content: sitemap.content,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching sitemap", error);
    return NextResponse.json({ message: "Failed to fetch sitemap" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    if (!file.name.endsWith(".xml")) {
      return NextResponse.json({ message: "File must be a .xml file" }, { status: 400 });
    }

    const content = await file.text();
    const urlCount = (content.match(/<url>/g) || []).length;

    const sitemap = await Sitemap.findOne({});
    if (sitemap) {
      sitemap.content = content;
      sitemap.urlCount = urlCount;
      await sitemap.save();
    } else {
      await Sitemap.create({ content, urlCount });
    }

    revalidateTag("sitemap");
    return NextResponse.json({ message: "Sitemap uploaded successfully" }, { status: 200 });
  } catch (error) {
    console.log("Error uploading sitemap", error);
    return NextResponse.json({ message: "Failed to upload sitemap" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await Sitemap.deleteMany({});

    revalidateTag("sitemap");
    return NextResponse.json({ message: "Sitemap removed" }, { status: 200 });
  } catch (error) {
    console.log("Error removing sitemap", error);
    return NextResponse.json({ message: "Failed to remove sitemap" }, { status: 500 });
  }
}
