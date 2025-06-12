import React from "react"; 
import Herotext from "../common/Banner/Herotext";
import SingleImageText from "../common/SingleImageText";
import SingleImage from "../common/SingleImage"; 
import IntroBold from "../common/IntroBold";
import TextByImg from "../About/sections/TextByImg";
import Boxgds from "../common/Boxgds";
import WhyChoose from "../common/WhyChoose";

import { Blasting } from '@/public/types/Common'; 
const Index = async ({ data }: { data: Blasting }) => { 
  
 
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
     <SingleImageText data={data.secondSection} maxwidth={'max-w-[68ch]'} textright={false} />
        <div className="ptst0"><TextByImg data={data.thirdSection} /></div>

  <section className="pt-[50px]  xl:pt-[80px]">
      <Boxgds
      colnum={3} 
        data={data.fourthSection} />
      </section>
    <WhyChoose data={data.fifthSection} />
    </>
  );
}
export default Index
