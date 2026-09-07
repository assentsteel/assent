import Index from "@/app/component/GalleryDetails/Index";

import { Metadata } from "next";
import { getGalleryBySlug } from "@/lib/services/gallery.service";

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const slug = (await params).slug;
  const gallery = await getGalleryBySlug(slug);

  const metadataTitle = gallery?.metaTitle || "Assent";
  const metadataDescription = gallery?.metaDescription || "Assent";
    const ogImage = gallery?.ogImage || ""
    const ogType = (gallery?.ogType || "website") as "website";
    const canonicalUrl = `${process.env.BASE_URL}gallery-details/${slug}`;

  return {
    title: metadataTitle,
    description: metadataDescription,
      alternates: {
      canonical: canonicalUrl,
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

export default async function Home({params}: {params: Promise<{slug: string}>}) {
  const slug = (await params).slug;
  const gallery = await getGalleryBySlug(slug);
  return (
    <>
    <Index data={{ data: gallery ?? [] }} slug={slug}/>
    </>
  );
}
