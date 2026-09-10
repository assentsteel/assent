import Index from "@/app/component/About";
import { Metadata } from "next";
import { getAbout } from "@/lib/services/about.service";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAbout();

  const metadataTitle = data?.seo?.metaTitle || "Assent";
  const metadataDescription =
    data?.seo?.metaDescription || "Assent";
  const ogImage = data?.seo?.ogImage || ""
  const ogType = (data?.seo?.ogType || "website") as "website";

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: {
      canonical: "https://www.assentsteel.com/about",
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
  const data = await getAbout();
  return (
    <>
      <Index data={data}/>
    </>
  );
}