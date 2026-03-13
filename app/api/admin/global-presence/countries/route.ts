import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GlobalPresence from "@/app/models/GlobalPresence";

export async function GET() {
  try {
    await connectDB();

    const globalPresence = await GlobalPresence.findOne({}).lean();

    if (!globalPresence) {
      return NextResponse.json(
        { message: "Global Presence not found" },
        { status: 404 },
      );
    }

    const countries =
      globalPresence.thirdSection?.countries?.map((country) => ({
        title: country.title,
        slug: country.slug,
      })) ?? [];

    return NextResponse.json({ data: countries }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
