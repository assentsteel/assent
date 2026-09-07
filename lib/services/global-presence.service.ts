import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import GlobalPresence from '@/app/models/GlobalPresence'
import GlobalPresenceAfrica from '@/app/models/GlobalPresenceAfrica'
import GlobalPresenceAustralia from '@/app/models/GlobalPresenceAustralia'
import GlobalPresenceEurope from '@/app/models/GlobalPresenceEurope'
import GlobalPresenceUnitedKingdom from '@/app/models/GlobalPresenceUnitedKingdom'
import GlobalPresenceUsa from '@/app/models/GlobalPresenceUsa'
import { GlobalPresence as GlobalPresenceType } from "@/public/types/Common";
import { GlobalPresencePageData } from "@/app/component/AustralianProjects/types";

export const getGlobalPresence = unstable_cache(
    async (): Promise<GlobalPresenceType> => {
        await connectDB();

        const globalPresence = await GlobalPresence.findOne({}).lean();

        if (!globalPresence) {
            throw new Error("Global Presence not found");
        }

        return JSON.parse(JSON.stringify(globalPresence));
    },
    ["global-presence"], // cache key
    {
        tags: ["global-presence"], // for revalidation
    }
);

export async function getGlobalPresenceCountries(): Promise<{ title: string; slug: string }[]> {
    const globalPresence = await getGlobalPresence();
    return globalPresence.thirdSection?.countries?.map((country) => ({
        title: country.title,
        slug: country.slug,
    })) ?? [];
}

const countryModels: Record<string, typeof GlobalPresenceAfrica> = {
    "africa": GlobalPresenceAfrica,
    "australia": GlobalPresenceAustralia,
    "europe": GlobalPresenceEurope,
    "united-kingdom": GlobalPresenceUnitedKingdom,
    "usa": GlobalPresenceUsa,
};

const countryGetters: Record<string, () => Promise<GlobalPresencePageData | null>> = Object.fromEntries(
    Object.entries(countryModels).map(([slug, model]) => [
        slug,
        unstable_cache(
            async (): Promise<GlobalPresencePageData | null> => {
                await connectDB();
                const doc = await model.findOne({}).lean();
                return doc ? JSON.parse(JSON.stringify(doc)) : null;
            },
            [`global-presence-${slug}`],
            { tags: [`global-presence-${slug}`] }
        ),
    ])
);

export async function getGlobalPresenceCountry(slug: string): Promise<GlobalPresencePageData | null> {
    const getter = countryGetters[slug];
    if (!getter) return null;
    return getter();
}
