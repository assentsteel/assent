import Index from "@/app/component/Projects/Index";

export default async function Home({params}: {params: Promise<{slug: string}>}) {
  const slug = (await params).slug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/projects/category?slug=${slug}`, { next: { revalidate: 60 } });
  const data = await response.json();
  const locationResponse = await fetch(`${process.env.BASE_URL}/api/admin/projects/location`, { next: { revalidate: 60 } });
  const locationData = await locationResponse.json(); 
  const sectorResponse = await fetch(`${process.env.BASE_URL}/api/admin/projects/sector`, { next: { revalidate: 60 } });
  const sectorData = await sectorResponse.json(); 
  return (
    <>
    <Index data={data} slug={slug} locationData={locationData.data} sectorData={sectorData.data}  />
    </>
  );
}
