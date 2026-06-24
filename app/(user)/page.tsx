import { getHome } from "@/lib/services/home.service";
import Index from "../component/home/Index";
import { Metadata } from "next";
import { getAllNews } from "@/lib/services/news.service";
import { getAllProjects } from "@/lib/services/project.service";
 
 
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
    alternates: {
    canonical: process.env.BASE_URL,
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

export default async function Home() {
 
    // const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, { next: { revalidate: 60 } });
    // const newsResponse = await fetch(`${process.env.BASE_URL}/api/admin/news`, { next: { revalidate: 60 } });
    // const projResponse = await fetch(`${process.env.BASE_URL}/api/admin/projects`, { next: { revalidate: 60 } });
    // const data = await response.json();
    const home = await getHome()
    const newsData = await getAllNews();
    const projData = await getAllProjects();
  return (
    <>
     <Index data={home} newsData={newsData}  projData={projData}/>
    </>
  );
}
 