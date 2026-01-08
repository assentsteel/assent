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

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/global-presence/country?slug=${slug}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) notFound();

  const data = await response.json();

  /**
   * Decide region based on slug
   */
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
