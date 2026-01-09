import Index from "../component/home/Index";
import { Metadata } from "next";
 
 
export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle || "Assent";
  const metadataDescription =
    data?.data?.metaDescription || "Assent";
    const ogImage = data?.data?.ogImage
    const ogType = data?.data?.ogType || "website" || "website"

  return {
    title: metadataTitle,
    description: metadataDescription,
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

export default async function Home() {
 
    const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, { next: { revalidate: 60 } });
    const newsResponse = await fetch(`${process.env.BASE_URL}/api/admin/news`, { next: { revalidate: 60 } });
    const projResponse = await fetch(`${process.env.BASE_URL}/api/admin/projects`, { next: { revalidate: 60 } });
    const data = await response.json();
    const newsData = await newsResponse.json();
    const projData = await projResponse.json();
  return (
    <>
     <Index data={data.data} newsData={newsData.data}  projData={projData.data}/>
    </>
  );
}
 