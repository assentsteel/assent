
import Index from "@/app/component/ProjectsDetails/Index"
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getAllProjects } from "@/lib/services/project.service";

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
    console.error("Invalid project seoSchema JSON-LD", error);
    return null;
  }
};

export async function generateMetadata({params}: {params: Promise<{slug: string,itemSlug: string}>}): Promise<Metadata> {
  const slug = (await params).slug;
  const itemSlug = (await params).itemSlug;
  const projectData = await getAllProjects();
  const project = projectData.categories.find((item) => item.slug === slug)?.projects.find((item) => item.slug === itemSlug);

  const metadataTitle = project?.metaTitle || "Assent";
  const metadataDescription = project?.metaDescription || "Assent";
  const ogTitle = project?.ogTitle || metadataTitle;
  const ogDescription = project?.ogDescription || metadataDescription;
  const ogImage = project?.ogImage || "";
  const ogType = (project?.ogType || "website") as "website";
  const twitterTitle = project?.twitterTitle || metadataTitle;
  const twitterDescription = project?.twitterDescription || metadataDescription;
  const twitterImage = project?.twitterImage || ogImage;
  const canonicalUrl = `${process.env.BASE_URL}projects/${slug}/${itemSlug}`;

  return {
    title: metadataTitle,
    description: metadataDescription,
      alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: process.env.BASE_URL,
      siteName: "Assent",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
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

export default async function Home({params}: {params: Promise<{slug: string,itemSlug: string}>}) {
  const slug = (await params).slug;
  const itemSlug = (await params).itemSlug;
  const projectData = await getAllProjects();
  const project = projectData.categories.find((item) => item.slug === slug)?.projects.find((item) => item.slug === itemSlug);
  if (!project) {
    notFound();
  }
  const customSchema = parseSeoSchema(project.schema);
  return (
    <>
    {customSchema && (
      <Script
        id="project-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(customSchema),
        }}
      />
    )}
    <Index data={project}  categorySlug={slug} />
    </>
  );
}
