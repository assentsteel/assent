import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Team from '@/app/models/Team'
import { Team as TeamType } from "@/public/types/Common";

export const getTeam = unstable_cache(
    async (): Promise<TeamType> => {
        await connectDB();

        const team = await Team.findOne({}).lean();

        if (!team) {
            throw new Error("Team not found");
        }

        return JSON.parse(JSON.stringify(team));
    },
    ["team"], // cache key
    {
        tags: ["team"], // for revalidation
    }
);
