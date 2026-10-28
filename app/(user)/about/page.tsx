import Index from "@/app/component/About";
import { Metadata } from "next";
import { getAbout } from "@/lib/services/about.service";

const parseSeoSchema = (schema?: string) => {
  if (!schema) return null;

  try {
    const trimmedSchema = schema.trim();

    if (!trimmedSchema) return null;

    const scriptMatch = trimmedSchema.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i
    );

    const schemaContent = scriptMatch?.[1]?.trim() || trimmedSchema;
    return JSON.parse(schemaContent);
  } catch (error) {
    console.error("Invalid about seoSchema JSON-LD", error);
    return null;
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAbout();

  const metadataTitle = data?.seo?.metaTitle || "Assent";
  const metadataDescription =
    data?.seo?.metaDescription || "Assent";
  const ogImage = data?.seo?.ogImage || ""
  const ogType = (data?.seo?.ogType || "website") as "website";

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: {
      canonical: "https://www.assentsteel.com/about",
    },

    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: "https://www.assentsteel.com/about",
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
// const aboutPageSchema = {
//   "@context": "https://schema.org",
//   "@type": "AboutPage",
//   "@id": "https://www.assentsteel.com/about#webpage",
//   url: "https://www.assentsteel.com/about",
//   name: "About Us | Steel Manufacturer in UAE | Assent Steel",
//   description:
//     "Assent is a Dubai-based steel manufacturing company delivering dependable manufacturing, supply & installation solutions with consistent quality.",
//   isPartOf: {
//     "@id": "https://www.assentsteel.com/#website",
//   },
//   breadcrumb: {
//     "@id": "https://www.assentsteel.com/about#breadcrumb",
//   },
//   mainEntity: {
//     "@id": "https://www.assentsteel.com/#organization",
//   },
// };
// const breadcrumbSchema = {
//   "@context": "https://schema.org",
//   "@type": "BreadcrumbList",
//   "@id": "https://www.assentsteel.com/about#breadcrumb",
//   itemListElement: [
//     {
//       "@type": "ListItem",
//       position: 1,
//       name: "Home",
//       item: "https://www.assentsteel.com/",
//     },
//     {
//       "@type": "ListItem",
//       position: 2,
//       name: "About Us",
//       item: "https://www.assentsteel.com/about",
//     },
//   ],
// };

export default async function Page() {
  const data = await getAbout();
  const customSchema = parseSeoSchema(data?.seo?.schema);
  return (
    <>
      {customSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
        />
      )}
      <Index data={data}/>
    </>
  );
}