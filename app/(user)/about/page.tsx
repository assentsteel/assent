import Index from "@/app/component/About";
import { Metadata } from "next";
import { getAbout } from "@/lib/services/about.service";

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
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.assentsteel.com/about#webpage",
  url: "https://www.assentsteel.com/about",
  name: "About Us | Steel Manufacturer in UAE | Assent Steel",
  description:
    "Assent is a Dubai-based steel manufacturing company delivering dependable manufacturing, supply & installation solutions with consistent quality.",
  isPartOf: {
    "@id": "https://www.assentsteel.com/#website",
  },
  breadcrumb: {
    "@id": "https://www.assentsteel.com/about#breadcrumb",
  },
  mainEntity: {
    "@id": "https://www.assentsteel.com/#organization",
  },
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.assentsteel.com/about#breadcrumb",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.assentsteel.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Us",
      item: "https://www.assentsteel.com/about",
    },
  ],
};

export default async function Page() {
  const data = await getAbout();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Index data={data}/>
    </>
  );
}