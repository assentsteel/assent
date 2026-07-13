import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import News from "@/app/models/News";
import { News as NewsType } from "@/public/types/Common";


export const getAllNews = unstable_cache(
    async (): Promise<NewsType> => {
        await connectDB();
        console.log("calledddd");


        const news = await News.findOne({}).lean()

        if (!news) {
            throw new Error("News not found");
        }

        return JSON.parse(JSON.stringify(news));
    },
    ["all-news"], // cache key
    {
        tags: ["all-news"], // for revalidation
    }
);

export const getIndiNews = unstable_cache(
    async (slug: string): Promise<NewsType['news'][number]> => {
        await connectDB();

        const news = await News.findOne({});
        const newsData = news.news.find((news:{_id:string,slug:string}) => news.slug === slug)

        if (!newsData) {
            throw new Error("News not found");
        }

        return JSON.parse(JSON.stringify(newsData));
    },
    ["indi-news"], // cache key
    {
        tags: ["indi-news"], // for revalidation
    }
);