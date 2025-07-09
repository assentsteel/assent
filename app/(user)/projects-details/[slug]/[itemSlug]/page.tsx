import Index from "@/app/component/ProjectsDetails/Index"
import { Metadata } from "next";

export async function generateMetadata({params}: {params: Promise<{slug: string,itemSlug: string}>}): Promise<Metadata> {
  const slug = (await params).slug;
  const itemSlug = (await params).itemSlug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/projects?categorySlug=${slug}&projectSlug=${itemSlug}`, { next: { revalidate: 60 } });
  const data = await response.json();

  console.log(data)

  const metadataTitle = data?.data?.metaTitle || "Assent";
  const metadataDescription =
    data?.data?.metaDescription || "Assent";

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

export default async function Home({params}: {params: Promise<{slug: string,itemSlug: string}>}) {
  const slug = (await params).slug;
  const itemSlug = (await params).itemSlug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/projects?categorySlug=${slug}&projectSlug=${itemSlug}`, { next: { revalidate: 60 } });
  const data = await response.json(); 
  console.log(data)
  return (
    <>
    <Index data={data.data}    />
    </>
  );
}
