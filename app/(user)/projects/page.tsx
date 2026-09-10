import React from "react";
import Index from "../../component/AllProjects/Index";
import type { Metadata } from "next";
import Script from "next/script";
import { getAllProjects, getAllLocation, getAllSectors } from "@/lib/services/project.service";

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
    console.error("Invalid projects seoSchema JSON-LD", error);
    return null;
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const projectData = await getAllProjects();
  const seo = projectData.seo;

  const metadataTitle = seo?.metaTitle || "Industrial and Commercial Steel Projects | Assent Steel";
  const metadataDescription = seo?.metaDescription || "Discover Assent Steel’s major projects delivered worldwide. From airports to stadiums and towers, see engineering excellence in action. Click for more info!";
  const ogTitle = seo?.ogTitle || metadataTitle;
  const ogDescription = seo?.ogDescription || metadataDescription;
  const ogImage = seo?.ogImage || "";
  const ogType = (seo?.ogType || "website") as "website";
  const twitterTitle = seo?.twitterTitle || metadataTitle;
  const twitterDescription = seo?.twitterDescription || metadataDescription;
  const twitterImage = seo?.twitterImage || ogImage;

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: {
      canonical: "https://www.assentsteel.com/projects",
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

const ProjectsPage = async () => {
  const projectData = await getAllProjects();
  const locationData = await getAllLocation();
  const sectorData = await getAllSectors();
  const customSchema = parseSeoSchema(projectData.seo?.schema);
    return (
    <>
      {customSchema && (
        <Script
          id="projects-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(customSchema),
          }}
        />
      )}
      <Index data={{ data: projectData }} locationData={locationData} sectorData={sectorData} />
    </>
  );
}
export default ProjectsPage;
