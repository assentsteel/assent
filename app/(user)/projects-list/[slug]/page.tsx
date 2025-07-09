import Index from "@/app/component/Projects/Index";

import { Metadata } from "next";

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const slug = (await params).slug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/projects/category`, { next: { revalidate: 60 } });
  const data = await response.json();

  console.log(data)

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
  const response = await fetch(`${process.env.BASE_URL}/api/admin/projects/category?slug=${slug}`, { next: { revalidate: 60 } });
  const data = await response.json();
  const locationResponse = await fetch(`${process.env.BASE_URL}/api/admin/projects/location`, { next: { revalidate: 60 } });
  const locationData = await locationResponse.json(); 
  const sectorResponse = await fetch(`${process.env.BASE_URL}/api/admin/projects/sector`, { next: { revalidate: 60 } });
  const sectorData = await sectorResponse.json(); 
  return (
    <>
    <Index data={data} slug={slug} locationData={locationData.data} sectorData={sectorData.data}  />
    </>
  );
}
