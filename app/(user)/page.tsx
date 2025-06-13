import Index from "../component/home/Index";


export default async function Home() {

    const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, { next: { revalidate: 60 } });
    const data = await response.json();
    console.log(data);
  return (
    <>
     <Index/>
    </>
  );
}
