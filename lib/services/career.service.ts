import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Career from '@/app/models/Career'
import { Career as CareerType } from "@/public/types/Common";

export const getCareer = unstable_cache(
    async (): Promise<CareerType> => {
        await connectDB();

        const career = await Career.findOne({}).lean();

        if (!career) {
            throw new Error("Career not found");
        }

        return JSON.parse(JSON.stringify(career));
    },
    ["career"], // cache key
    {
        tags: ["career"], // for revalidation
    }
);
