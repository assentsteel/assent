import Index from "@/app/component/Projects/Index";

import { Metadata } from "next";
import { getAllProjects, getAllLocation, getAllSectors } from "@/lib/services/project.service";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const slug = (await params).slug;
    const projectData = await getAllProjects();
    const category = projectData.categories.find((item) => item.slug === slug);

    const metadataTitle = category?.metaTitle || "Assent";
    const metadataDescription = category?.metaDescription || "Assent";
    const ogImage = "";
    const ogType = "website" as const;
    const canonicalUrl = `${process.env.BASE_URL}projects/${slug}`;

    return {
        title: metadataTitle,
        description: metadataDescription,
        alternates: {
            canonical: canonicalUrl,
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

export default async function Home({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const projectData = await getAllProjects();
    const locationData = await getAllLocation();
    const sectorData = await getAllSectors();

    const category = projectData.categories.find((item) => item.slug === slug);
    const title = category?.name;

    return (
        <>
            <Index data={{ data: category?.projects ?? [] }} slug={slug} locationData={locationData} sectorData={sectorData} title={title ?? ""} />
        </>
    );
}
