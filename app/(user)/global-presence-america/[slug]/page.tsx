import Index from "@/app/component/GlobalPresenceAmerica";

export default async function Home({params}: {params: Promise<{slug: string}>}) {
  const slug = (await params).slug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/global-presence/country?slug=${slug}`, { next: { revalidate: 60 } });
  const data = await response.json();
  return (
    <>
    <Index data={data}/>
    </>
  );
}
