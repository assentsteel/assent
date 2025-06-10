import React from "react"; 
import Herotext from "../common/Banner/Herotext";
import HeadingText from "./sections/HeadingText";
import { Gallerydata } from '@/public/types/Common';



const Index = async ({data}:{data:Gallerydata}) => {
  // const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  // const {data:allProjects} = useSWR(`/api/admin/project`, fetcher)
  //  const response = await fetch(`${process.env.BASE_URL}/api/admin/gallery`, { next: { revalidate: 60 } });
  // const {data:allProjects} = await response.json();
   
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "" },
    { label: "Al Dabb'iya Facilities", href: "" },

    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"Al Dabb'iya Facilities"} />


      <HeadingText data={data} />

    </>
  );
}
export default Index
