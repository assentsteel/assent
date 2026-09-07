import Index from "@/app/component/GalleryDetails/Index";

import { Metadata } from "next";
import { getGalleryBySlug, getGalleryCategory } from "@/lib/services/gallery.service";


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
  const ogType = (metaSource?.ogType || "website") as "website";
  const ogImage =
    metaSource?.thumbnail || metaSource?.images?.[0];
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
      title,
      description,
      type: ogType,
      siteName: "Assent",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
        : [],
    },
  };
}

export default async function Home({params}: {params: Promise<{slug: string, categorySlug: string}>}) {
  const slug = (await params).slug;
  const categorySlug = (await params).categorySlug;
  const category = await getGalleryCategory(slug, categorySlug);
  return (
    <>
    <Index data={{ data: category ?? [] }} slug={slug} categorySlug={categorySlug}/>
    </>
  );
}
