import React from "react"; 
import IntroBold from "../common/IntroBold";
import TextByImgSlide from "./sections/TextByImgSlide";
import HeroInner from "../common/Banner/HeroInner";
import Listsec from "./sections/Listsec";
import Policy from "./sections/Policy";
import NavTabsection from "../Fabrication/sections/NavTabsection";
import Growslide from "./sections/Iconslide";
import Initiatives from "./sections/Initiatives";
import { Sustainability } from '@/public/types/Common'; 
const Index = async ({ data }: { data: Sustainability }) => { 
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Sustainability", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ]; 
  return (
    <>

      <HeroInner
        imageSrc={data.banner}
        title={data.pageTitle}
        breadcrumbs={breadcrumb}
      />
        <div className="py-0   xl:py-[60px]">
        <IntroBold data={data.firstSection} />
      </div>
      <Listsec data={data} />
      <Policy data={data}/>
      <section className="ptst0">
      <TextByImgSlide data={data} kmbtn={false} />
      </section>
      <NavTabsection data={data.fourthSection} navigation={false} bgcolor="bg-primary" textwhite={true} />
      <Initiatives  data={data}  />
      <Growslide data={data} />

    </>
  );
}
export default Index;
