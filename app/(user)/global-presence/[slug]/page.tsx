import AustralianProjects from "@/app/component/AustralianProjects";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getGlobalPresenceCountries, getGlobalPresenceCountry } from "@/lib/services/global-presence.service";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;

  const data = await getGlobalPresenceCountry(slug);

  const metadataTitle = data?.metaTitle || "Assent";
  const metadataDescription = data?.metaDescription || "Assent";
  const canonicalUrl = `https://www.assentsteel.com/global-presence/${slug}`;

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: process.env.BASE_URL,
      siteName: "Assent",
      type: "website",
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

  return <AustralianProjects data={data} />;
}
