import Index from "@/app/component/Projects/Index";

import { Metadata } from "next";
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
        console.error("Invalid project category seoSchema JSON-LD", error);
        return null;
    }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const slug = (await params).slug;
    const projectData = await getAllProjects();
    const category = projectData.categories.find((item) => item.slug === slug);
    const seo = category?.seo;

    console.log("SEO",seo)

    const metadataTitle = seo?.metaTitle || "Assent";
    const metadataDescription = seo?.metaDescription || "Assent";
    const ogTitle = seo?.ogTitle || metadataTitle;
    const ogDescription = seo?.ogDescription || metadataDescription;
    const ogImage = seo?.ogImage || "";
    const ogType = (seo?.ogType || "website") as "website";
    const twitterTitle = seo?.twitterTitle || metadataTitle;
    const twitterDescription = seo?.twitterDescription || metadataDescription;
    const twitterImage = seo?.twitterImage || ogImage;
    const canonicalUrl = `${process.env.BASE_URL}projects/${slug}`;

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

export default async function Home({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const projectData = await getAllProjects();
    const locationData = await getAllLocation();
    const sectorData = await getAllSectors();

    const category = projectData.categories.find((item) => item.slug === slug);
    const title = category?.name;
    const customSchema = parseSeoSchema(category?.seo?.schema);

    return (
        <>
            {customSchema && (
                <Script
                    id="project-category-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(customSchema),
                    }}
                />
            )}
            <Index data={{ data: category?.projects ?? [] }} slug={slug} locationData={locationData} sectorData={sectorData} title={title ?? ""} />
        </>
    );
}
