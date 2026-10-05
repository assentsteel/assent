import Index from "@/app/component/GlobalPresence";
import { Metadata } from "next";
import { getGlobalPresence } from "@/lib/services/global-presence.service";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobalPresence();

  const metadataTitle = data?.seo?.metaTitle || "Assent";
  const metadataDescription =
    data?.seo?.metaDescription || "Assent";
    const ogImage = data?.seo?.ogImage || ""
    const ogType = (data?.seo?.ogType || "website") as "website";

  return {
    title: metadataTitle,
    description: metadataDescription,
      alternates: {
      canonical: "https://www.assentsteel.com/global-presence",
    },
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: process.env.BASE_URL,
      siteName: "Assent",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metadataTitle,
        },
      ],
      type: ogType,
    },
  };
}

export default async function Page() {
  const data = await getGlobalPresence();
  return (
    <>
      <Index data={data}/>
    </>
  );
}
