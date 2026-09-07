import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Contact from '@/app/models/Contact'
import { Contact as ContactType } from "@/public/types/Common";

export const getContact = unstable_cache(
    async (): Promise<ContactType> => {
        await connectDB();

        const contact = await Contact.findOne({}).lean();

        if (!contact) {
            throw new Error("Contact not found");
        }

        return JSON.parse(JSON.stringify(contact));
    },
    ["contact"], // cache key
    {
        tags: ["contact"], // for revalidation
    }
);
