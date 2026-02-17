import Index from "@/app/component/Quality";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/quality`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle || "Assent";
  const metadataDescription = data?.data?.metaDescription || "Assent";
  const ogImage = data?.data?.ogImage
  const ogType = data?.data?.ogType || "website"

return {
  title: metadataTitle,
  description: metadataDescription,
    alternates: {
    canonical: "https://www.assentsteel.com/quality",
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

export default async function Page() {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/quality`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return (
    <>
      <Index data={data.data} />
    </>
  );
}
