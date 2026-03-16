import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import Blogs from "@/app/models/Blogs";


export async function GET() {
    try {
        await connectDB();
        const blogs = await Blogs.findOne({});
        if (blogs) {
            const categoryData = blogs.categories;
            return NextResponse.json({ success: true, data: categoryData }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: "Error fetching category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Error fetching category" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { name } = await req.json();
        const blogs = await Blogs.findOne({});
        if (blogs) {
            blogs.categories.push({ name });
            await blogs.save();
            return NextResponse.json({ message: "category added successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Error adding category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error adding category" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const session = await mongoose.startSession();
    try {
        await connectDB();
        session.startTransaction();
        const { name, oldName } = await req.json();
        const blogs = await Blogs.findOne({});
        if (blogs) {
            blogs.categories.map(async (blogs: { category: string }) => {
                if (blogs.category === oldName) {
                    blogs.category = name;
                }
            });
            await blogs.save();
            const category = blogs.categories.find((category: { name: string }) => category.name === oldName);
            if (category) {
                category.name = name;
                await blogs.save();
                await session.commitTransaction();
                return NextResponse.json({ message: "Category updated successfully" }, { status: 200 });
            } else {
                await session.abortTransaction();
                return NextResponse.json({ message: "Error updating category" }, { status: 500 });
            }
        } else {
            await session.abortTransaction();
            return NextResponse.json({ message: "Error updating category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        return NextResponse.json({ message: "Error updating category" }, { status: 500 });
    } finally {
        await session.endSession();
    }
}

export async function DELETE(req: NextRequest) {
    const session = await mongoose.startSession();
    try {
        await connectDB();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        session.startTransaction();

        const blogs = await Blogs.findOne({});
        if (blogs) {
            const deletedCategory = blogs.categories.find((category: { _id: string }) => category._id == id);
            if (deletedCategory) {
                blogs.blogs.map(async (blogs: { category: string }) => {
                    if (blogs.category === deletedCategory.name) {
                        blogs.category = "";
                    }
                });
                blogs.categories = blogs.categories.filter((category: { _id: string }) => category._id != id);
                await blogs.save();
                await session.commitTransaction();
                return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
            } else {
                await session.abortTransaction();
                return NextResponse.json({ message: "Error deleted category" }, { status: 500 });
            }
        } else {
            await session.abortTransaction();
            return NextResponse.json({ message: "Error deleted category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        return NextResponse.json({ message: "Error deleted category" }, { status: 500 });
    } finally {
        await session.endSession();
    }
}
