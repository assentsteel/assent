import { Metadata } from "next";
import Index from "@/app/component/Team/Index";

 export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/team`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle || "Assent";
  const metadataDescription =
    data?.data?.metaDescription || "Assent";

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

 export default async function Page() {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/team`, { next: { revalidate: 60 } });
  const data = await response.json();
  return (
    <>
      <Index data={data.data}/>
    </>
  );
}
