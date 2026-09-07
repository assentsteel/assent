import Index from "@/app/component/Engineering";

import { Metadata } from "next";
import { getEngineering } from "@/lib/services/engineering.service";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getEngineering();

  const metadataTitle = data?.metaTitle || "Assent";
  const metadataDescription =
    data?.metaDescription || "Assent";
    const ogImage = data?.ogImage || ""
    const ogType = (data?.ogType || "website") as "website";

  return {
    title: metadataTitle,
    description: metadataDescription,
      alternates: {
      canonical: "https://www.assentsteel.com/steel-engineering-services",
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
  const data = await getEngineering();
  return (
    <>
      <Index data={data}/>
    </>
  );
}

