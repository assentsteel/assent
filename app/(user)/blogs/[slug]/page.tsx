import Index from "@/app/component/BlogDetails/Index"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Script from "next/script"
import { getBlogBySlug } from "@/lib/services/blogs.service"

const NO_INDEX_SLUGS = [
  "globalsurf-post-lourve",
  "global-surf",
  "in-house-vs-outsourced-steel-blasting-and-painting-cost-quality-and-timeline-impact"
]

const parseSeoSchema = (schema?: string) => {
  if (!schema) return null

  try {
    const trimmedSchema = schema.trim()

    if (!trimmedSchema) return null

    const scriptMatch = trimmedSchema.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i
    )

    const schemaContent = scriptMatch?.[1]?.trim() || trimmedSchema
    return JSON.parse(schemaContent)
  } catch (error) {
    console.error("Invalid blog seoSchema JSON-LD", error)
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {

  const { slug } = await params

  const blog = await getBlogBySlug(slug)

  if (!blog) return {}

  const canonicalUrl = `https://www.assentsteel.com/blogs/${slug}`

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

  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  const customSchema = parseSeoSchema(blog.seoSchema)

  return (
    <>
      {/* Article Schema */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.assentsteel.com/blogs/${slug}`,
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

      {customSchema && (
        <Script
          id="blog-custom-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(customSchema),
          }}
        />
      )}

      <Index data={blog} />
    </>
  )
}
