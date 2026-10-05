import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Award from '@/app/models/Award'
import { Awards as AwardsType } from "@/public/types/Common";

export const getAwards = unstable_cache(
    async (): Promise<AwardsType> => {
        await connectDB();

        const awards = await Award.findOne({}).lean();

        if (!awards) {
            throw new Error("Award not found");
        }

        return JSON.parse(JSON.stringify(awards));
    },
    ["awards"], // cache key
    {
        tags: ["awards"], // for revalidation
    }
);
