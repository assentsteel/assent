import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Sustainability from '@/app/models/Sustainability'
import { Sustainability as SustainabilityType } from "@/public/types/Common";

export const getSustainability = unstable_cache(
    async (): Promise<SustainabilityType> => {
        await connectDB();

        const sustainability = await Sustainability.findOne({}).lean();

        if (!sustainability) {
            throw new Error("Sustainability not found");
        }

        return JSON.parse(JSON.stringify(sustainability));
    },
    ["sustainability"], // cache key
    {
        tags: ["sustainability"], // for revalidation
    }
);
