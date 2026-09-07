import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Blogs from '@/app/models/Blogs'
import { Blogs as BlogsType, Bogs as BlogType } from "@/public/types/Common";

export const getAllBlogs = unstable_cache(
    async (): Promise<BlogsType> => {
        await connectDB();

        const blogs = await Blogs.findOne({}).lean();

        if (!blogs) {
            throw new Error("Blogs not found");
        }

        return JSON.parse(JSON.stringify(blogs));
    },
    ["all-blogs"], // cache key
    {
        tags: ["all-blogs"], // for revalidation
    }
);

export async function getBlogBySlug(slug: string): Promise<BlogType | undefined> {
    const blogs = await getAllBlogs();
    return blogs.blogs.find((blog) => blog.slug === slug);
}
