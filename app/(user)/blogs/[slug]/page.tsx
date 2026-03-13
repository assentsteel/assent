import Index from "@/app/component/BlogDetails/Index"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { blogData } from "@/app/component/BlogList/data"

const NO_INDEX_SLUGS = ["globalsurf-post-lourve", "global-surf"]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {

  const { slug } = await params

  const blog = blogData?.data?.[0]?.news?.find(
    (item) => item.slug === slug
  )

  if (!blog) return {}

  const canonicalUrl = `https://www.assentsteel.com/news/${slug}`

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: NO_INDEX_SLUGS.includes(slug)
      ? { index: false, follow: false }
      : { index: true, follow: true },

    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      url: canonicalUrl,
      siteName: "Assent",
      images: [
        {
          url: blog.thumbnail,
          width: 1200,
          height: 630,
          alt: blog.mainTitle,
        },
      ],
      type: "article",
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params

  const blog = blogData?.data?.[0]?.news?.find(
    (item) => item.slug === slug
  )

  if (!blog) {
    notFound()
  }

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.assentsteel.com/news/${slug}`,
            },
            headline: blog.mainTitle,
            image: blog.thumbnail,
            datePublished: blog.date,
            author: {
              "@type": "Organization",
              name: "Assent Steel Industries",
            },
            publisher: {
              "@type": "Organization",
              name: "Assent Steel Industries",
              logo: {
                "@type": "ImageObject",
                url: "https://www.assentsteel.com/assets/img/logo.svg",
              },
            },
          }),
        }}
      />

      <Index data={blog} />
    </>
  )
}