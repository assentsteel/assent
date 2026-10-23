import Index from "@/app/component/GlobalPresence";
import { Metadata } from "next";
import { getGlobalPresence } from "@/lib/services/global-presence.service";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobalPresence();

  const metadataTitle = data?.seo?.metaTitle || "Assent";
  const metadataDescription =
    data?.seo?.metaDescription || "Assent";
    const ogImage = data?.seo?.ogImage || ""
    const ogType = (data?.seo?.ogType || "website") as "website";

  return {
    title: metadataTitle,
    description: metadataDescription,
      alternates: {
      canonical: "https://www.assentsteel.com/global-presence",
    },
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: "https://www.assentsteel.com/global-presence",
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
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.assentsteel.com/global-presence#webpage",
  url: "https://www.assentsteel.com/global-presence",
  name: "Steel Engineering and Fabrication in US, Europe and Africa",
  description:
    "Discover premier steel structure fabrication & installation services across the Middle East, North America, Africa & Europe.",
  isPartOf: { "@id": "https://www.assentsteel.com/#website" },
  breadcrumb: {
    "@id": "https://www.assentsteel.com/global-presence#breadcrumb",
  },
  mainEntity: {
    "@id": "https://www.assentsteel.com/global-presence#itemlist",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://www.assentsteel.com/global-presence#itemlist",
  name: "Assent Steel markets",
  numberOfItems: 5,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Structural Steel Fabrication for USA Projects",
      url: "https://www.assentsteel.com/global-presence/usa",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Structural Steel Fabrication for UK Projects",
      url: "https://www.assentsteel.com/global-presence/united-kingdom",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "EN 1090 Certified Structural Steel Fabrication for Europe",
      url: "https://www.assentsteel.com/global-presence/europe",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Heavy Structural Steel Fabrication for Africa",
      url: "https://www.assentsteel.com/global-presence/africa",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Structural Steel Fabrication for Australian Projects",
      url: "https://www.assentsteel.com/global-presence/australia",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.assentsteel.com/global-presence#breadcrumb",
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
      name: "Global Presence",
      item: "https://www.assentsteel.com/global-presence",
    },
  ],
};

export default async function Page() {
  const data = await getGlobalPresence();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Index data={data}/>
    </>
  );
}
