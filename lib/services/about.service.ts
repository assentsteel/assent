import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import About from '@/app/models/About'
import { About as AboutType } from "@/public/types/Common";

export const getAbout = unstable_cache(
    async (): Promise<AboutType> => {
        await connectDB();

        const about = await About.findOne({}).lean();

        if (!about) {
            throw new Error("About not found");
        }

        return JSON.parse(JSON.stringify(about));
    },
    ["about"], // cache key
    {
        tags: ["about"], // for revalidation
    }
);
