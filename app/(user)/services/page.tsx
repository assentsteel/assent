import Index from "@/app/component/Services";

export default async function Page() {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/services/steel-erection`, { next: { revalidate: 60 } });
  const data = await response.json();
  return (
    <>
      <Index data={data.data}/>
    </>
  );
}
