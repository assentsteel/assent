import Index from "@/app/component/ContactUs/Index";
import { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { getContact } from "@/lib/services/contact.service";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContact();

  const metadataTitle = data?.metaTitle || "Assent";
  const metadataDescription =
    data?.metaDescription || "Assent";
  const ogImage = data?.ogImage || ""
  const ogType = (data?.ogType || "website") as "website";

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: {
      canonical: "https://www.assentsteel.com/contact-us",
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
  const data = await getContact();

  return (
    <>
      {/* Breadcrumb Schema */}
      <Script
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
      />

      <Suspense fallback={null}>
        <Index data={data} />
      </Suspense>
    </>
  );
}
