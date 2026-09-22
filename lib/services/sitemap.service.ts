import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Sitemap from "@/app/models/Sitemap";

export const getSitemap = unstable_cache(
    async (): Promise<string | null> => {
        await connectDB();

        const sitemap = await Sitemap.findOne({}).lean<{ content: string }>();

        return sitemap?.content ?? null;
    },
    ["sitemap"],
    {
        tags: ["sitemap"],
    }
);
