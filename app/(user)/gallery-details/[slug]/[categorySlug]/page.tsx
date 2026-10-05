import Index from "@/app/component/GalleryDetails/Index";

import { Metadata } from "next";
import Script from "next/script";
import { getGalleryBySlug, getGalleryCategory } from "@/lib/services/gallery.service";

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
    console.error("Invalid gallery category seoSchema JSON-LD", error);
    return null;
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; categorySlug?: string }>;
}): Promise<Metadata> {
  const { slug, categorySlug } = await params;

  const galleryMatch = await getGalleryBySlug(slug);
  const categoryMatch = categorySlug
    ? await getGalleryCategory(slug, categorySlug)
    : null;

  const metaSource = categoryMatch || galleryMatch;

  const title = metaSource?.metaTitle || "Assent";
  const description = metaSource?.metaDescription || "Assent";
  const ogTitle = metaSource?.ogTitle || title;
  const ogDescription = metaSource?.ogDescription || description;
  const ogType = (metaSource?.ogType || "website") as "website";
  const ogImage =
    metaSource?.ogImage || metaSource?.thumbnail || metaSource?.images?.[0];
  const twitterTitle = metaSource?.twitterTitle || title;
  const twitterDescription = metaSource?.twitterDescription || description;
  const twitterImage = metaSource?.twitterImage || ogImage;
  const canonicalUrl = categoryMatch
    ? `${process.env.BASE_URL}gallery-details/${slug}/${categorySlug}`
    : `${process.env.BASE_URL}gallery-details/${slug}`;
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: ogType,
      siteName: "Assent",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : [],
    },
  };
}

export default async function Home({params}: {params: Promise<{slug: string, categorySlug: string}>}) {
  const slug = (await params).slug;
  const categorySlug = (await params).categorySlug;
  const category = await getGalleryCategory(slug, categorySlug);
  const customSchema = parseSeoSchema(category?.schema);
  return (
    <>
    {customSchema && (
      <Script
        id="gallery-category-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(customSchema),
        }}
      />
    )}
    <Index data={{ data: category ?? [] }} slug={slug} categorySlug={categorySlug}/>
    </>
  );
}
