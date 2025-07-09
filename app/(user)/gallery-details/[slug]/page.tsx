import Index from "@/app/component/GalleryDetails/Index";
 
import { Metadata } from "next";

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const slug = (await params).slug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/gallery`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.find((item: {slug: string}) => item.slug === slug)?.metaTitle || "Assent";
  const metadataDescription =
    data?.data?.find((item: {slug: string}) => item.slug === slug)?.metaDescription || "Assent";

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

export default async function Home({params}: {params: Promise<{slug: string}>}) {
  const slug = (await params).slug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/gallery?slug=${slug}`, { next: { revalidate: 60 } });
  const data = await response.json(); 
  return (
    <>
    <Index data={data} slug={slug}/>
    </>
  );
}
