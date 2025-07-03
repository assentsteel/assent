import Index from "@/app/component/GlobalPresence";


export default async function Page() {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/global-presence`, { next: { revalidate: 60 } });
  const data = await response.json();
  return (
    <>
      <Index data={data.data}/>
    </>
  );
}
