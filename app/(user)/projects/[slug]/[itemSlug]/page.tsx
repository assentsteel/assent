
import Index from "@/app/component/ProjectsDetails/Index"
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects } from "@/lib/services/project.service";

export async function generateMetadata({params}: {params: Promise<{slug: string,itemSlug: string}>}): Promise<Metadata> {
  const slug = (await params).slug;
  const itemSlug = (await params).itemSlug;
  const projectData = await getAllProjects();
  const project = projectData.categories.find((item) => item.slug === slug)?.projects.find((item) => item.slug === itemSlug);

  const metadataTitle = project?.metaTitle || "Assent";
  const metadataDescription =
    project?.metaDescription || "Assent";
    const ogImage = ""
    const ogType = "website" as const;
     const canonicalUrl = `${process.env.BASE_URL}projects/${slug}/${itemSlug}`;

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

export default async function Home({params}: {params: Promise<{slug: string,itemSlug: string}>}) {
  const slug = (await params).slug;
  const itemSlug = (await params).itemSlug;
  const projectData = await getAllProjects();
  const project = projectData.categories.find((item) => item.slug === slug)?.projects.find((item) => item.slug === itemSlug);
  if (!project) {
    notFound();
  }
  return (
    <>
    <Index data={project}  categorySlug={slug} />
    </>
  );
}
