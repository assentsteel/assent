import Index from "../component/home/Index";
 
 
export default async function Home() {
 
  console.log(process.env.BASE_URL);
    const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, { next: { revalidate: 60 } });
    const newsResponse = await fetch(`${process.env.BASE_URL}/api/admin/news`, { next: { revalidate: 60 } });
    const projResponse = await fetch(`${process.env.BASE_URL}/api/admin/projects`, { next: { revalidate: 60 } });
    const data = await response.json();
    const newsData = await newsResponse.json();
    const projData = await projResponse.json();
  return (
    <>
     <Index />
    </>
  );
}
 