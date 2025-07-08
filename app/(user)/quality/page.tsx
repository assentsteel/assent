import Index from "@/app/component/Quality";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/quality`, { next: { revalidate: 60 } });
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
  const response = await fetch(`${process.env.BASE_URL}/api/admin/quality`, { next: { revalidate: 60 } });
  const data = await response.json();
  return (
    <>
      <Index data={data.data}/>
    </>
  );
}
