import { getSitemap } from "@/lib/services/sitemap.service";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const content = await getSitemap();
    if (content) {
      return new NextResponse(content, {
        status: 200,
        headers: { "Content-Type": "application/xml" },
      });
    }
  } catch (error) {
    console.log("Error fetching sitemap from database", error);
  }

  try {
    const fallback = await fs.readFile(path.join(process.cwd(), "public", "sitemap.xml"), "utf-8");
    return new NextResponse(fallback, {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.log("Error reading fallback sitemap", error);
    return new NextResponse("Not found", { status: 404 });
  }
}
