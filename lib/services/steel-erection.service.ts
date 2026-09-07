import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import SteelErection from '@/app/models/SteelErection'
import { Services as ServicesType } from "@/public/types/Common";

export const getSteelErection = unstable_cache(
    async (): Promise<ServicesType> => {
        await connectDB();

        const steelErection = await SteelErection.findOne({}).lean();

        if (!steelErection) {
            throw new Error("Steel Erection not found");
        }

        return JSON.parse(JSON.stringify(steelErection));
    },
    ["steel-erection"], // cache key
    {
        tags: ["steel-erection"], // for revalidation
    }
);
