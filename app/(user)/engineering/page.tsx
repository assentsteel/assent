import Index from "@/app/component/Engineering";

export default async function Page() {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/services/engineering`, { next: { revalidate: 60 } });
  const data = await response.json();
  return (
    <>
      <Index data={data.data}/>
    </>
  );
}

