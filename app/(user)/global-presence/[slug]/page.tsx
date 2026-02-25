// import Index from "@/app/component/GlobalPresenceAfrica";

// export default async function Home({params}: {params: Promise<{slug: string}>}) {
//   const slug = (await params).slug;
//   const response = await fetch(`${process.env.BASE_URL}/api/admin/global-presence/country?slug=${slug}`, { next: { revalidate: 60 } });
//   const data = await response.json();
//   return (
//     <>
//     <Index data={data}/>
//     </>
//   );
// }



// import Index from "@/app/component/GlobalPresenceAfrica";

// export default async function Home({params}: {params: Promise<{slug: string}>}) {
//   const slug = (await params).slug;
//   const response = await fetch(`${process.env.BASE_URL}/api/admin/global-presence/country?slug=${slug}`, { next: { revalidate: 60 } });
//   const data = await response.json();
//   return (
//     <>
//     <Index data={data}/>
//     </>
//   );
// }



// import Index from "@/app/component/GlobalPresenceAmerica";

// export default async function Home({params}: {params: Promise<{slug: string}>}) {
//   const slug = (await params).slug;
//   const response = await fetch(`${process.env.BASE_URL}/api/admin/global-presence/country?slug=${slug}`, { next: { revalidate: 60 } });
//   const data = await response.json();
//   return (
//     <>
//     <Index data={data}/>
//     </>
//   );
// }



// import Index from "@/app/component/GlobalPresenceEurope";

// export default async function Home({params}: {params: Promise<{slug: string}>}) {
//   const slug = (await params).slug;
//   const response = await fetch(`${process.env.BASE_URL}/api/admin/global-presence/country?slug=${slug}`, { next: { revalidate: 60 } });
//   const data = await response.json();
//   return (
//     <>
//     <Index data={data}/>
//     </>
//   );
// }

// import AustralianProjects from "@/app/component/AustralianProjects";
// import { notFound } from "next/navigation";
// import { Metadata } from "next"; 
// import * as AustraliaData from "../../../component/AustralianProjects/australianProjectsData";
// import * as africaData from "../../../component/AustralianProjects/AfricaProjectsData";
// import * as ukData from "../../../component/AustralianProjects/UkProjectsData";
// import * as europeData from "../../../component/AustralianProjects/EuropeProjectsData";
// import * as americaData from "../../../component/AustralianProjects/AmericaProjectsData";

// // ✅ Single source of truth for all props
//  export type AustralianProjectsProps = {
//   singletextimg: typeof AustraliaData.singletextimg & { titlecase?: boolean; maxwidth?: number };
//   reach: typeof AustraliaData.reach;
//   sectwo: typeof AustraliaData.sectwo;
//   howwework: typeof AustraliaData.howwework;
//   keycap: typeof AustraliaData.keycap;
//   gridsbox: typeof AustraliaData.gridsbox;
//   whyus: typeof AustraliaData.whyus;
//   susbata: typeof AustraliaData.susbata;
//   partnershipdata: typeof AustraliaData.partnershipdata;
//   accauss: typeof AustraliaData.accauss;
//   ainglelabeldata: typeof AustraliaData.ainglelabeldata;
//   faqdata: typeof AustraliaData.faqdata;
// };

// // ✅ All props as a single object
// const australiaProps: AustralianProjectsProps = {
//   singletextimg: { ...AustraliaData.singletextimg, titlecase: true, maxwidth: 21 },
//   reach: AustraliaData.reach,
//   sectwo: AustraliaData.sectwo,
//   howwework: AustraliaData.howwework,
//   keycap: AustraliaData.keycap,
//   gridsbox: AustraliaData.gridsbox,
//   whyus: AustraliaData.whyus,
//   susbata: AustraliaData.susbata,
//   partnershipdata: AustraliaData.partnershipdata,
//   accauss: AustraliaData.accauss,
//   ainglelabeldata: AustraliaData.ainglelabeldata,
//   faqdata: AustraliaData.faqdata,
// };

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   const slug = (await params).slug;
//   const response = await fetch(
//     `${process.env.BASE_URL}/api/admin/global-presence/country?slug=${slug}`,
//     { next: { revalidate: 60 } }
//   );
//   const data = await response.json();

//   const metadataTitle = data?.data?.metaTitle || "Assent";
//   const metadataDescription = data?.data?.metaDescription || "Assent";
//   const ogImage = data?.data?.ogImage;
//   const ogType = data?.data?.ogType || "website";
//   const canonicalUrl = `https://www.assentsteel.com/global-presence/${slug}`;

//   return {
//     title: metadataTitle,
//     description: metadataDescription,
//     alternates: { canonical: canonicalUrl },
//     openGraph: {
//       title: metadataTitle,
//       description: metadataDescription,
//       url: process.env.BASE_URL,
//       siteName: "Assent",
//       images: [{ url: ogImage, width: 1200, height: 630, alt: metadataTitle }],
//       type: ogType,
//     },
//   };
// }

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;

//   const response = await fetch(
//     `${process.env.BASE_URL}/api/admin/global-presence/country?slug=${slug}`,
//     { next: { revalidate: 60 } }
//   );

//   if (!response.ok) notFound();

//   // if (slug.includes("usa")) {
//     if (slug === "usa") {
//     return <AustralianProjects {...americaData} />;   
//   } 
//     // if (slug.includes("europe")) {
//     if (slug === "europe") {
//     return <AustralianProjects {...europeData} />;   
//   } 
//   // if (slug.includes("africa")) {
//     if (slug === "africa") { 
//     return <AustralianProjects {...africaData} />;   
//   } 
//   // if (slug.includes("united-kingdom")) {
//     if (slug === "united-kingdom") { 
//     return <AustralianProjects {...ukData} />;   
//   }
//   // if (slug.includes("australia")) {
//     if (slug === "australia") { 
//     return <AustralianProjects {...australiaProps} />;  // ✅ single spread
//   }

//   notFound();
// }


// import AustralianProjects from "@/app/component/AustralianProjects";
// import { notFound } from "next/navigation";
// import { Metadata } from "next";
// import { transformGlobalPresenceData } from "@/app/component/AustralianProjects/transformGlobalPresenceData";

// // ─── Metadata ─────────────────────────────────────────────────────────────────

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   const slug = (await params).slug;

//   const response = await fetch(
//     `${process.env.BASE_URL}/api/admin/global-presence/${slug}`,
//     { next: { revalidate: 60 } }
//   );
//   const data = await response.json();

//   const metadataTitle = data?.data?.metaTitle || "Assent";
//   const metadataDescription = data?.data?.metaDescription || "Assent";
//   const ogImage = data?.data?.ogImage;
//   const ogType = data?.data?.ogType || "website";
//   const canonicalUrl = `https://www.assentsteel.com/global-presence/${slug}`;

//   return {
//     title: metadataTitle,
//     description: metadataDescription,
//     alternates: { canonical: canonicalUrl },
//     openGraph: {
//       title: metadataTitle,
//       description: metadataDescription,
//       url: process.env.BASE_URL,
//       siteName: "Assent",
//       images: [{ url: ogImage, width: 1200, height: 630, alt: metadataTitle }],
//       type: ogType,
//     },
//   };
// }

// // ─── Page ─────────────────────────────────────────────────────────────────────

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;

//   const response = await fetch(
//     `${process.env.BASE_URL}/api/admin/global-presence/${slug}`,
//     { next: { revalidate: 60 } }
//   );

//   if (!response.ok) notFound();

//   const json = await response.json();
//   const apiData = json?.data;

//   if (!apiData) notFound();

//   // Transform the raw API payload into the component-ready props shape.
//   // Pass per-slug options (titlecase, maxwidth) as needed.
//   const props = transformGlobalPresenceData(apiData, {
//     titlecase: true,
//     maxwidth: 21,
//   });

//   // Every slug now uses the same AustralianProjects shell; the transformer
//   // handles differences in the backend data.
//   if (
//     slug === "usa" ||
//     slug === "europe" ||
//     slug === "africa" ||
//     slug === "united-kingdom" ||
//     slug === "australia"
//   ) {
//     return <AustralianProjects {...props} />;
//   }

//   notFound();
// }


import AustralianProjects from "@/app/component/AustralianProjects";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { GlobalPresencePageData } from "@/app/component/AustralianProjects/types";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;

  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/global-presence/${slug}`,
    { next: { revalidate: 60 } }
  );
  const json = await response.json();
  const data: GlobalPresencePageData = json?.data;

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

  const listResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/global-presence/countries`,
    { next: { revalidate: 60 } }
  );

  if (!listResponse.ok) notFound();

  const listJson = await listResponse.json();

  const countries: { slug: string }[] = listJson?.data ?? [];


  const validSlugs = countries.map((c) => c.slug);

  if (!validSlugs.includes(slug)) notFound();

  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/global-presence/${slug}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) notFound();

  const json = await response.json();
  const data: GlobalPresencePageData = json?.data;

  if (!data) notFound();

  return <AustralianProjects data={data} />;
}
