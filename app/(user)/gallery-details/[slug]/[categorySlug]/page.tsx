import Index from "@/app/component/GalleryDetails/Index";
 
import { Metadata } from "next";

type GalleryCategory = {
  _id: string;
  title: string;
  slug: string;
  thumbnail?: string;
  images?: string[];
  metaTitle?: string;
  metaDescription?: string;
  ogType?: string;
};

type GalleryItem = {
  _id: string;
  title: string;
  slug: string;
  thumbnail?: string;
  images?: string[];
  categories?: GalleryCategory[];
  metaTitle?: string;
  metaDescription?: string;
  ogType?: string;
};


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; categorySlug?: string }>;
}): Promise<Metadata> {
  const { slug, categorySlug } = await params;

  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/gallery`,
    { next: { revalidate: 60 } }
  );

  const data = await response.json();
  const galleries = data?.data || [];

  const galleryMatch = galleries.find(
    (item: { slug: string }) => item.slug === slug
  );

  const categoryMatch = categorySlug
    ? galleries
        .flatMap((item: GalleryItem) => item.categories || [])
        .find((cat: { slug: string }) => cat.slug === categorySlug)
    : null;

  const metaSource = categoryMatch || galleryMatch;

  const title = metaSource?.metaTitle || "Assent";
  const description = metaSource?.metaDescription || "Assent";
  const ogType = metaSource?.ogType || "website";
  const ogImage =
    metaSource?.thumbnail || metaSource?.images?.[0];

  return {
    title,
    description,
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
  const response = await fetch(`${process.env.BASE_URL}/api/admin/gallery/inside?gallerySlug=${slug}&categorySlug=${categorySlug}`, { next: { revalidate: 60 } });
  const data = await response.json(); 
  return (
    <>
    <Index data={data} slug={slug} categorySlug={categorySlug}/>
    </>
  );
}
