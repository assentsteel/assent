import Index from "@/app/component/GalleryDetails/Index";

import { Metadata } from "next";
import Script from "next/script";
import { getGalleryBySlug } from "@/lib/services/gallery.service";

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
    console.error("Invalid gallery seoSchema JSON-LD", error);
    return null;
  }
};

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const slug = (await params).slug;
  const gallery = await getGalleryBySlug(slug);

  const metadataTitle = gallery?.metaTitle || "Assent";
  const metadataDescription = gallery?.metaDescription || "Assent";
  const ogTitle = gallery?.ogTitle || metadataTitle;
  const ogDescription = gallery?.ogDescription || metadataDescription;
  const ogImage = gallery?.ogImage || "";
  const ogType = (gallery?.ogType || "website") as "website";
  const twitterTitle = gallery?.twitterTitle || metadataTitle;
  const twitterDescription = gallery?.twitterDescription || metadataDescription;
  const twitterImage = gallery?.twitterImage || ogImage;
  const canonicalUrl = `${process.env.BASE_URL}gallery-details/${slug}`;

  return {
    title: metadataTitle,
    description: metadataDescription,
      alternates: {
      canonical: canonicalUrl,
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

export default async function Home({params}: {params: Promise<{slug: string}>}) {
  const slug = (await params).slug;
  const gallery = await getGalleryBySlug(slug);
  const customSchema = parseSeoSchema(gallery?.schema);
  return (
    <>
    {customSchema && (
      <Script
        id="gallery-item-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(customSchema),
        }}
      />
    )}
    <Index data={{ data: gallery ?? [] }} slug={slug}/>
    </>
  );
}
