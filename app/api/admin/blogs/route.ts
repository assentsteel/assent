import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Blogs from "@/app/models/Blogs";
import { revalidateTag } from "next/cache";


export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { mainTitle, subTitle, slug, content, images, category, metaTitle, metaDescription, ogTitle, ogDescription, thumbnail, thumbnailAlt, coverImage, coverImageAlt, date, ogType, ogImage, twitterTitle, twitterDescription, twitterImage, link,schema } = await req.json();
        const blogs = await Blogs.findOne({})
        if (blogs) {
            blogs.blogs.push({ mainTitle, subTitle, slug, content, images, category, metaTitle, metaDescription, ogTitle, ogDescription, thumbnail, thumbnailAlt, coverImage, coverImageAlt, date, ogType, ogImage, twitterTitle, twitterDescription, twitterImage, link, seoSchema:schema })
            await blogs.save()
            revalidateTag("all-blogs")
            return NextResponse.json({ message: "Blog added successfully" }, { status: 200 });
        }
        else {
            return NextResponse.json({ message: "Error in adding blog" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error in adding blog", error);
        return NextResponse.json({ message: "Error in adding blog" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const { mainTitle, subTitle, slug, content, images, category, metaTitle, metaDescription, ogTitle, ogDescription, thumbnail, thumbnailAlt, date, ogType, ogImage, twitterTitle, twitterDescription, twitterImage, link, schema } = await req.json();
        const blogs = await Blogs.findOne({});
        if (blogs) {
            blogs.blogs = blogs.blogs.map((blogs: { _id: string }) => {
                if (blogs._id.toString() === id) {
                    return { mainTitle, subTitle, slug, content, images, category, metaTitle, metaDescription, ogTitle, ogDescription, thumbnail, thumbnailAlt, date, ogType, ogImage, twitterTitle, twitterDescription, twitterImage, link, seoSchema:schema }
                }
                return blogs
            })
            await blogs.save()
            revalidateTag("all-blogs")
            return NextResponse.json({ message: "Blog updated successfully" }, { status: 200 });
        }
        else {
            return NextResponse.json({ message: "Error in updating blog" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error in updating blog", error);
        return NextResponse.json({ message: "Error in updating blog" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const slug = searchParams.get("slug");
        const blogs = await Blogs.findOne({});
        if (slug) {
            if (blogs) {
                const blogsData = blogs.blogs.find((blogs: { _id: string, slug: string }) => blogs.slug === slug)
                return NextResponse.json({ message: "Blogs fetched successfully", data: blogsData }, { status: 200 });
            } else {
                return NextResponse.json({ message: "Error in fetching blogs" }, { status: 500 });
            }
        } else if (id) {
            if (blogs) {
                const blogsData = blogs.blogs.find((blogs: { _id: string }) => blogs._id.toString() === id)
                return NextResponse.json({ message: "Blogs fetched successfully", data: blogsData }, { status: 200 });
            } else {
                return NextResponse.json({ message: "Error in fetching blogs" }, { status: 500 });
            }
        } else {
            if (blogs) {
                return NextResponse.json({ message: "Blogs fetched successfully", data: blogs }, { status: 200 });
            }
            else {
                return NextResponse.json({ message: "Error in fetching blogs" }, { status: 500 });
            }
        }

    } catch (error) {
        console.log("Error in fetching blogs", error);
        return NextResponse.json({ message: "Error in fetching blogs" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const blogs = await Blogs.findOne({});
        if (id) {
            if (blogs) {
                blogs.blogs = blogs.blogs.filter((blogs: { _id: string }) => blogs._id.toString() !== id)
                await blogs.save()
                revalidateTag("all-blogs")
                return NextResponse.json({ message: "Blogs deleted successfully" }, { status: 200 });
            } else {
                return NextResponse.json({ message: "Error in deleting blogs" }, { status: 500 });
            }
        } else {
            return NextResponse.json({ message: "Error in deleting blogs" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error in deleting blogs", error);
        return NextResponse.json({ message: "Error in deleting blogs" }, { status: 500 });
    }
}
