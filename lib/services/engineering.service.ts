import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Engineering from '@/app/models/Engineering'
import { Engineering as EngineeringType } from "@/public/types/Common";

export const getEngineering = unstable_cache(
    async (): Promise<EngineeringType> => {
        await connectDB();

        const engineering = await Engineering.findOne({}).lean();

        if (!engineering) {
            throw new Error("Engineering not found");
        }

        return JSON.parse(JSON.stringify(engineering));
    },
    ["engineering"], // cache key
    {
        tags: ["engineering"], // for revalidation
    }
);
