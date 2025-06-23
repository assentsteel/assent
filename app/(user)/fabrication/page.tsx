import Index from "@/app/component/Fabrication";

export default async function Page() {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/services/fabrication`, { next: { revalidate: 60 } });
  const data = await response.json();
  return (
    <>
      <Index data={data.data}/>
    </>
  );
}
