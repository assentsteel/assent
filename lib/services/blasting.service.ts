import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Blasting from '@/app/models/Blasting'
import { Blasting as BlastingType } from "@/public/types/Common";

export const getBlasting = unstable_cache(
    async (): Promise<BlastingType> => {
        await connectDB();

        const blasting = await Blasting.findOne({}).lean();

        if (!blasting) {
            throw new Error("Blasting not found");
        }

        return JSON.parse(JSON.stringify(blasting));
    },
    ["blasting"], // cache key
    {
        tags: ["blasting"], // for revalidation
    }
);
