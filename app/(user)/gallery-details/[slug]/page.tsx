import Index from "@/app/component/GalleryDetails/Index";
 

export default async function Home({params}: {params: Promise<{slug: string}>}) {
  const slug = (await params).slug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/gallery?slug=${slug}`, { next: { revalidate: 60 } });
  const data = await response.json();
  console.log(data);
  return (
    <>
    <Index data={data}/>
    </>
  );
}
