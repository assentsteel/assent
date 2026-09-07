 import Index from "@/app/component/AccreditationsList/Index";

 import { Metadata } from "next";
 import { getAwards } from "@/lib/services/awards.service";

 export async function generateMetadata(): Promise<Metadata> {
  const data = await getAwards();

  const metadataTitle = data?.metaTitle || "Assent";
  const metadataDescription =
    data?.metaDescription || "Assent";
    const ogImage = data?.ogImage || ""
    const ogType = (data?.ogType || "website") as "website";

  return {
    title: metadataTitle,
    description: metadataDescription,
      alternates: {
      canonical: "https://www.assentsteel.com/awards-and-accreditations",
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
  const data = await getAwards();
  return (
    <>
      <Index data={data}/>
    </>
  );
}
