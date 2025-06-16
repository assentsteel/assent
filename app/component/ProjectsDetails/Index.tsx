import React from "react";
import { boxcontent } from "./data";
import HeroInner from "../common/Banner/HeroInner";
import Specs from "./sections/Specs";
import Slidethumb from "../common/Slidethumb";
import Morepjts from "./sections/Morepjts"; 
  
  import { Projectswfull } from '@/public/types/Common'; 
  const Index = async ({ data }: { data: Projectswfull['categories'][number]['projects'][number] }) => {  
    console.log(data)
  const breadcrumb = [
    { label: "Homse", href: "/" },
    { label: "Projects", href: "" },
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
      <Morepjts data={boxcontent.data} />

    </>
  );
}
export default Index;
