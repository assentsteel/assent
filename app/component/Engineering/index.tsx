import React from "react"; 
import Herotext from "../common/Banner/Herotext";
import SingleImageText from "../common/SingleImageText";
import SingleImage from "../common/SingleImage"; 
import IntroBold from "../common/IntroBold";
import Boxgrid from "./sections/Boxgrid";

import Packages from "./sections/Packages";
import ProjectModels from "./sections/ProjectModels";
import WhyChoose from "../common/WhyChoose";
import { Engineering } from '@/public/types/Common'; 
const Index = async ({ data }: { data: Engineering }) => { 
   
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: data.pageTitle, href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={data.pageTitle} />

      <SingleImage data={data}/>
      <IntroBold data={data.firstSection} />
      <section className="pt-[50px]  xl:pt-[80px]">
      <Boxgrid
      colnum={4} 
        data={data} />
      </section>
    <ProjectModels data={data}/>



      <SingleImageText data={data.fourthSection} maxwidth={'max-w-[68ch]'} textright={true} />
      <Packages data={data}    />
      <WhyChoose data={data.sixthSection} />

    </>
  );
}
export default Index
