import AustralianProjects from "@/app/component/AustralianProjects";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getGlobalPresenceCountries, getGlobalPresenceCountry } from "@/lib/services/global-presence.service";

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
    console.error("Invalid global presence country seoSchema JSON-LD", error);
    return null;
  }
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;

  const data = await getGlobalPresenceCountry(slug);

  const metadataTitle = data?.seo?.metaTitle || "Assent";
  const metadataDescription = data?.seo?.metaDescription || "Assent";
  const ogImage = data?.seo?.ogImage || "";
  const ogType = (data?.seo?.ogType || "website") as "website";
  const canonicalUrl = `https://www.assentsteel.com/global-presence/${slug}`;

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: canonicalUrl,
      siteName: "Assent",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: metadataTitle }]
        : [],
      type: ogType,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const countries = await getGlobalPresenceCountries();
  const validSlugs = countries.map((c) => c.slug);

  if (!validSlugs.includes(slug)) notFound();

  const data = await getGlobalPresenceCountry(slug);

  if (!data) notFound();

  const customSchema = parseSeoSchema(data?.seo?.schema);

  return (
    <>
      {customSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
        />
      )}
      <AustralianProjects data={data} />
    </>
  );
}
