import Index from "@/app/component/Sustainability";

import { Metadata } from "next";
import { getSustainability } from "@/lib/services/sustainability.service";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSustainability();

  const metadataTitle = data?.metaTitle || "Assent";
  const metadataDescription = data?.metaDescription || "Assent";
  const ogImage = ""
  const ogType = "website" as const;

return {
  title: metadataTitle,
  description: metadataDescription,
    alternates: {
    canonical: "https://www.assentsteel.com/sustainability",
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
  const data = await getSustainability();
  return (
    <>
      <Index data={data} />
    </>
  );
}
