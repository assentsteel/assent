import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import HSE from '@/app/models/Hse'
import { Hse as HseType } from "@/public/types/Common";

export const getHse = unstable_cache(
    async (): Promise<HseType> => {
        await connectDB();

        const hse = await HSE.findOne({}).lean();

        if (!hse) {
            throw new Error("HSE not found");
        }

        return JSON.parse(JSON.stringify(hse));
    },
    ["hse"], // cache key
    {
        tags: ["hse"], // for revalidation
    }
);
