import Index from "../component/home/Index";
import { Metadata } from "next";
 
 
export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle || "Assent";
  const metadataDescription =
    data?.data?.metaDescription || "Assent";

  return {
    title: metadataTitle,
    description: metadataDescription,
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
 