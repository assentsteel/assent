
import React from "react";
import HeroInner from "../common/Banner/HeroInner";
import Specs from "./sections/Specs";
import Slidethumb from "../common/Slidethumb";
import Morepjts from "./sections/Morepjts"; 
import { useSearchParams } from "next/navigation";

  
  import { Projectswfull } from '@/public/types/Common'; 
  const Index = async ({ data,categorySlug }: { data: Projectswfull['categories'][number]['projects'][number],categorySlug: string }) => {  


  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Projects", href: `/projects-list/${categorySlug}` },
    { label: "Construction", href: "" },
    { label: data.sector, href: "" },
    { label: data.pageTitle, href: "" },

    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

<HeroInner
        imageSrc={data.banner}
        title={data.pageTitle}
        breadcrumbs={breadcrumb}
      />
      <Specs data={data} />
      <Slidethumb data={data} />
      <Morepjts sector={data.sector} projectId={data._id}/>

    </>
  );
}
export default Index;
