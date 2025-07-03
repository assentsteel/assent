import Index from "@/app/component/ProjectsDetails/Index"

export default async function Home({params}: {params: Promise<{slug: string,itemSlug: string}>}) {
  const slug = (await params).slug;
  const itemSlug = (await params).itemSlug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/projects?categorySlug=${slug}&projectSlug=${itemSlug}`, { next: { revalidate: 60 } });
  const data = await response.json(); 
  console.log(data)
  return (
    <>
    <Index data={data.data}    />
    </>
  );
}
