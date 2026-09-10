
import Index from "@/app/component/NewsList/Index";
import { Metadata } from "next";
import Script from "next/script";
import { getAllNews } from "@/lib/services/news.service";

const parseSeoSchema = (schema?: string) => {
  if (!schema) return null;

  try {
    const trimmedSchema = schema.trim();

    if (!trimmedSchema) return null;

    const scriptMatch = trimmedSchema.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i
    );

    const schemaContent = scriptMatch?.[1]?.trim() || trimmedSchema;
    return JSON.parse(schemaContent);
  } catch (error) {
    console.error("Invalid news seoSchema JSON-LD", error);
    return null;
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAllNews();

  const metadataTitle = data?.metaTitle || "Assent";
  const metadataDescription = data?.metaDescription || "Assent";
  const ogTitle = data?.ogTitle || metadataTitle;
  const ogDescription = data?.ogDescription || metadataDescription;
  const ogImage = data?.ogImage || "";
  const ogType = (data?.ogType || "website") as "website";
  const twitterTitle = data?.twitterTitle || metadataTitle;
  const twitterDescription = data?.twitterDescription || metadataDescription;
  const twitterImage = data?.twitterImage || ogImage;

  return {
    title: metadataTitle,
    description: metadataDescription,
      alternates: {
      canonical: "https://www.assentsteel.com/news",
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: process.env.BASE_URL,
      siteName: "Assent",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }]
        : [],
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : [],
    },
  };
}


export default async function Page() {
  const data = await getAllNews();
  const customSchema = parseSeoSchema(data?.schema);
  return (
    <>
      {customSchema && (
        <Script
          id="news-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(customSchema),
          }}
        />
      )}
      <Index data={data}/>
    </>
  );
}
