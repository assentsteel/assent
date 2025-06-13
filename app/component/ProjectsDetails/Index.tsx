import React from "react";
import { boxcontent,Specss,textimg } from "./data";
import HeroInner from "../common/Banner/HeroInner";
import Specs from "./sections/Specs";
import Slidethumb from "../common/Slidethumb";
import Morepjts from "./sections/Morepjts"; 
  
  import { Projectswfull } from '@/public/types/Common'; 
  const Index = async ({ data }: { data: Projectswfull }) => {  
    console.log(data)
  const breadcrumb = [
    { label: "Homse", href: "/" },
    { label: "Projects", href: "" },
    { label: "Construction", href: "" },
    { label: "Airport", href: "" },
    { label: "Dubai International Airport Expansion", href: "" },

    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

<HeroInner
        imageSrc="/assets/img/projects-details/bnr.jpg"
        title="Dubai International Airport Expansion"
        breadcrumbs={breadcrumb}
      />
      <Specs data={Specss.data} />
      <Slidethumb data={textimg.data} />
      <Morepjts data={boxcontent.data} />

    </>
  );
}
export default Index;
