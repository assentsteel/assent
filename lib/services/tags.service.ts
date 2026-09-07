import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Tag from '@/app/models/Tags'

type TagType = {
    headerScript?: string;
    bodyScript?: string;
} | null;

export const getTag = unstable_cache(
    async (): Promise<TagType> => {
        await connectDB();

        const tag = await Tag.findOne({}).lean();

        return tag ? JSON.parse(JSON.stringify(tag)) : null;
    },
    ["tag"], // cache key
    {
        tags: ["tag"], // for revalidation
    }
);
