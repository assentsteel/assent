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

import GlobalPresenceAfrica from "@/app/component/GlobalPresenceAfrica";
import GlobalPresenceAmerica from "@/app/component/GlobalPresenceAmerica";
import GlobalPresenceEurope from "@/app/component/GlobalPresenceEurope";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const slug = (await params).slug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/global-presence/country?slug=${slug}`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle || "Assent";
  const metadataDescription =
    data?.data?.metaDescription || "Assent";
    const ogImage = data?.data?.ogImage
    const ogType = data?.data?.ogType || "website"

  return {
    title: metadataTitle,
    description: metadataDescription,
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ REQUIRED by Next.js

  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/global-presence/country?slug=${slug}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) notFound();

  const data = await response.json();

  if (slug.includes("north-america")) {
    return <GlobalPresenceAmerica data={data} />;
  }

  if (slug.includes("europe")) {
    return <GlobalPresenceEurope data={data} />;
  }

  if (slug.includes("africa")) {
    return <GlobalPresenceAfrica data={data} />;
  }

  notFound();
}
