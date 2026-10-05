import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Fabrication from '@/app/models/Fabrication'
import { Fabrication as FabricationType } from "@/public/types/Common";

export const getFabrication = unstable_cache(
    async (): Promise<FabricationType> => {
        await connectDB();

        const fabrication = await Fabrication.findOne({}).lean();

        if (!fabrication) {
            throw new Error("Fabrication not found");
        }

        return JSON.parse(JSON.stringify(fabrication));
    },
    ["fabrication"], // cache key
    {
        tags: ["fabrication"], // for revalidation
    }
);
