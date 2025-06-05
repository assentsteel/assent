import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import News from "@/app/models/News";


export async function GET() {
    try {
        await connectDB();
        const news = await News.findOne({});
        if(news){
            const categoryData = news.categories;
            return NextResponse.json({ success: true, data: categoryData }, { status: 200 });
        }else{
            return NextResponse.json({ success: false, message: "Error fetching category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Error fetching category" }, { status: 500 });
    }
} 

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const { name } = await req.json();
        const news = await News.findOne({});
        if(news){
            news.categories.push({name});
            await news.save();
            return NextResponse.json({ message: "category added successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error adding category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error adding category" }, { status: 500 });
    }
} 

export async function PATCH(req:NextRequest) {
    const session = await mongoose.startSession();
    try {
        await connectDB();
        session.startTransaction();
        const { name,oldName } = await req.json();
        const news = await News.findOne({});
        if(news){
            news.news.map(async (news:{category:string}) => {
                if(news.category === oldName){
                    news.category = name;
                }
            });
            await news.save();
            const category = news.categories.find((category:{name:string}) => category.name === oldName);
            if(category){
                category.name = name;
                await news.save();
                await session.commitTransaction();
                return NextResponse.json({ message: "Category updated successfully" }, { status: 200 });
            }else{
                await session.abortTransaction();
                return NextResponse.json({ message: "Error updating category" }, { status: 500 });
            }
        }else{
            await session.abortTransaction();
            return NextResponse.json({ message: "Error updating category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        return NextResponse.json({ message: "Error updating category" }, { status: 500 });
    }finally{
        await session.endSession();
    }
}

export async function DELETE(req:NextRequest) {
    const session = await mongoose.startSession();
    try {
        await connectDB();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        session.startTransaction();
        
        const news = await News.findOne({});
        if(news){
            const deletedCategory = news.categories.find((category:{_id:string}) => category._id == id);
            if(deletedCategory){
                news.news.map(async (news:{category:string}) => {
                    if(news.category === deletedCategory.name){
                        news.category = "";
                    }
                });
                news.categories = news.categories.filter((category:{_id:string}) => category._id != id);
                await news.save();
                await session.commitTransaction();
                return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
            }else{
                await session.abortTransaction();
                return NextResponse.json({ message: "Error deleted category" }, { status: 500 });
            }
        }else{
            await session.abortTransaction();
            return NextResponse.json({ message: "Error deleted category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        return NextResponse.json({ message: "Error deleted category" }, { status: 500 });
    }finally{
        await session.endSession();
    }
}
