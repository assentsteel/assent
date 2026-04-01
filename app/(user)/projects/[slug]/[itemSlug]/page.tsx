
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
    const ogImage = data?.data?.ogImage
    const ogType = data?.data?.ogType || "website"
     const canonicalUrl = `${process.env.BASE_URL}projects/${slug}/${itemSlug}`;

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

export default async function Home({params}: {params: Promise<{slug: string,itemSlug: string}>}) {
  const slug = (await params).slug;
  const itemSlug = (await params).itemSlug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/projects?categorySlug=${slug}&projectSlug=${itemSlug}`, { next: { revalidate: 60 } });
  const data = await response.json(); 
  console.log(data)
  return (
    <>
    <Index data={data.data}  categorySlug={slug} />
    </>
  );
}
