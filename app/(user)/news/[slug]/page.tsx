import Index from "@/app/component/NewsDetails/Index";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndiNews } from "@/lib/services/news.service";


const NO_INDEX_SLUGS = [
  "globalsurf-post-lourve",
  "global-surf",
];

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const slug = (await params).slug;
  const article = await getIndiNews(slug).catch(() => null);

  const metadataTitle = article?.metaTitle || "Assent";
  const metadataDescription =
    article?.metaDescription || "Assent";
    const ogImage = article?.ogImage || ""
    const ogType = (article?.ogType || "website") as "website";
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
export default async function Home({params}: {params: Promise<{slug: string}>}) {
  const slug = (await params).slug;
  const article = await getIndiNews(slug).catch(() => null);
  if (!article) {
    notFound();
  }
   const ARTICLE_SCHEMA_SLUGS = [
  "engineering-marvels",
];
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

    <Index data={{ data: article }}  />
    </>
  );
}

