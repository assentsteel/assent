import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Gallery from '@/app/models/Gallery'
import GalleryMeta from '@/app/models/GalleryMeta'
import { Gallery as GalleryType, GalleryMeta as GalleryMetaType } from "@/public/types/Common";

export const getAllGalleries = unstable_cache(
    async (): Promise<GalleryType> => {
        await connectDB();

        const galleries = await Gallery.find({}).sort({ index: 1 }).lean();

        return JSON.parse(JSON.stringify(galleries));
    },
    ["all-galleries"], // cache key
    {
        tags: ["all-galleries"], // for revalidation
    }
);

export const getGalleryMeta = unstable_cache(
    async (): Promise<GalleryMetaType | null> => {
        await connectDB();

        const meta = await GalleryMeta.findOne({}).lean();

        return meta ? JSON.parse(JSON.stringify(meta)) : null;
    },
    ["gallery-meta"], // cache key
    {
        tags: ["gallery-meta"], // for revalidation
    }
);

export async function getGalleryBySlug(slug: string) {
    const galleries = await getAllGalleries();
    return galleries.find((item) => item.slug === slug);
}

export async function getGalleryCategory(gallerySlug: string, categorySlug: string) {
    const gallery = await getGalleryBySlug(gallerySlug);
    return gallery?.categories?.find((item) => item.slug === categorySlug);
}
