import React from "react"; 
import Herotext from "../common/Banner/Herotext";
import SingleImage from "../common/SingleImage"; 
import IntroBold from "../common/IntroBold";
import BoxgridSlider from "./sections/BoxgridSlider";
import Structure from "./sections/Structure";
import NavTabsection from "./sections/NavTabsection";
import WhyChoose from "../common/WhyChoose";
import Boxgds from "../common/Boxgds";
import { Fabrication } from '@/public/types/Common'; 
const Index = async ({ data }: { data: Fabrication }) => {  
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
      <section>
        <div className="container border-b pb-[50px]  xl:pb-[100px]">

        </div>
      </section>
      <NavTabsection data={data.secondSection} navigation={true} />
      <BoxgridSlider 
        data={data} />
      <section className="py-[50px]  xl:py-[100px]">
      <Structure
        data={data} />
      </section>
       <section className="pt-[50px]  xl:pt-[80px]">
      <Boxgds
      colnum={3} 
        data={data.fifthSection} />
      </section>
    <WhyChoose data={data.sixthSection} />


    </>
  );
}
export default Index