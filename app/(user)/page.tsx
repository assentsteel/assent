import { getHome } from "@/lib/services/home.service";
import Index from "../component/home/Index";
import { Metadata } from "next";
import { getAllNews } from "@/lib/services/news.service";
import { getAllProjects } from "@/lib/services/project.service";
 
 
export async function generateMetadata(): Promise<Metadata> {
  const data = await getHome();

  const metadataTitle = data?.metaTitle || "Assent";
  const metadataDescription =
    data?.metaDescription || "Assent";
    const ogImage = data?.ogImage || ""
    const ogType = (data?.ogType || "website") as "website";

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
    const home = await getHome()
    const newsData = await getAllNews();
    const projData = await getAllProjects();
  return (
    <>
     <Index data={home} newsData={newsData}  projData={projData}/>
    </>
  );
}
 