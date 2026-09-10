import Index from "@/app/component/ContactUs/Index";
import { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { getContact } from "@/lib/services/contact.service";

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
    console.error("Invalid contact seoSchema JSON-LD", error);
    return null;
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContact();

  const metadataTitle = data?.metaTitle || "Assent";
  const metadataDescription = data?.metaDescription || "Assent";
  const ogTitle = data?.ogTitle || metadataTitle;
  const ogDescription = data?.ogDescription || metadataDescription;
  const ogImage = data?.ogImage || "";
  const ogType = (data?.ogType || "website") as "website";
  const twitterTitle = data?.twitterTitle || metadataTitle;
  const twitterDescription = data?.twitterDescription || metadataDescription;
  const twitterImage = data?.twitterImage || ogImage;

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: {
      canonical: "https://www.assentsteel.com/contact-us",
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: process.env.BASE_URL,
      siteName: "Assent",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }]
        : [],
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : [],
    },
  };
}

export default async function Page() {
  const data = await getContact();
  const customSchema = parseSeoSchema(data?.schema);

  return (
    <>
      {/* Breadcrumb Schema */}
      {/* <Script
        id="contact-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "WebSite",
                  "@id": "https://www.assentsteel.com/",
                  "name": "Home"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "WebPage",
                  "@id": "https://www.assentsteel.com/contact-us",
                  "name": "Contact Us"
                }
              }
            ]
          }),
        }}
      /> */}

      {customSchema && (
        <Script
          id="contact-custom-schema"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(customSchema),
          }}
        />
      )}

      <Suspense fallback={null}>
        <Index data={data} />
      </Suspense>
    </>
  );
}
