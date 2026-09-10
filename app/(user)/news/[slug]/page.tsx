import Index from "@/app/component/NewsDetails/Index";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndiNews } from "@/lib/services/news.service";


const NO_INDEX_SLUGS = [
  "globalsurf-post-lourve",
  "global-surf",
];

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
    console.error("Invalid news seoSchema JSON-LD", error);
    return null;
  }
};

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const slug = (await params).slug;
  const article = await getIndiNews(slug).catch(() => null);

  const metadataTitle = article?.metaTitle || "Assent";
  const metadataDescription = article?.metaDescription || "Assent";
  const ogTitle = article?.ogTitle || metadataTitle;
  const ogDescription = article?.ogDescription || metadataDescription;
  const ogImage = article?.ogImage || "";
  const ogType = (article?.ogType || "website") as "website";
  const twitterTitle = article?.twitterTitle || metadataTitle;
  const twitterDescription = article?.twitterDescription || metadataDescription;
  const twitterImage = article?.twitterImage || ogImage;
  const canonicalUrl = `${process.env.BASE_URL}news/${slug}`;

  return {
    title: metadataTitle,
    description: metadataDescription,
      alternates: {
      canonical: canonicalUrl,
    },
    robots: NO_INDEX_SLUGS.includes(slug)
      ? { index: false, follow: false }
      : { index: true, follow: true },
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
export default async function Home({params}: {params: Promise<{slug: string}>}) {
  const slug = (await params).slug;
  const article = await getIndiNews(slug).catch(() => null);
  if (!article) {
    notFound();
  }
   const ARTICLE_SCHEMA_SLUGS = [
  "engineering-marvels",
];
  const customSchema = parseSeoSchema(article.schema);
  return (
    <>
    {/* Article Schema */}
      {ARTICLE_SCHEMA_SLUGS.includes(slug) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://www.assentsteel.com/news/${slug}`,
              },
              "headline": article.mainTitle,
              "image": article.thumbnail,
              "datePublished": article.date, // ISO format
              "author": {
                "@type": "Organization",
                "name": "Assent Steel Industries",
              },
              "publisher": {
                "@type": "Organization",
                "name": "Assent Steel Industries",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.assentsteel.com/assets/img/logo.svg",
                },
              },
            }),
          }}
        />
      )}

       {/* Article Schema – applies to ALL /news/* pages */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.assentsteel.com/news/${slug}`,
            },
            "headline": article.mainTitle,
            "image": article.thumbnail,
            "datePublished": article.date, // ISO format preferred
            "author": {
              "@type": "Organization",
              "name": "Assent Steel Industries",
            },
            "publisher": {
              "@type": "Organization",
              "name": "Assent Steel Industries",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.assentsteel.com/assets/img/logo.svg",
              },
            },
          }),
        }}
      />

      {customSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(customSchema),
          }}
        />
      )}

    <Index data={{ data: article }}  />
    </>
  );
}

