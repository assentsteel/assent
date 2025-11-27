import React from "react";
import IntroBold from "../common/IntroBold";
import TextByImgSlide from "./sections/TextByImgSlide";
import HeroInner from "../common/Banner/HeroInner";
import Listsec from "./sections/Listsec";
import Policy from "./sections/Policy";
import NavTabsection from "../Fabrication/sections/NavTabsection";
import Growslide from "./sections/Iconslide";
import Initiatives from "./sections/Initiatives";
import { Sustainability } from "@/public/types/Common";
import Growth from "./sections/Growth";

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
      <div className="pb-[30px] md:pb-[40px] xl:pb-[60px] pt-[50px] md:pt-[70px] xl:pt-[100px]">
        <IntroBold data={data.firstSection} />
      </div>
      <Growth />
      <Listsec data={data} />
      <div className="pt-[50px] md:pt-[70px] xl:pt-[100px]">
        <IntroBold data={data.firstSection} />
      </div>
      <Policy data={data} />
      <TextByImgSlide data={data} kmbtn={false} />
      <NavTabsection
        data={data.fourthSection}
        navigation={false}
        bgcolor="bg-primary"
        textwhite={true}
      />
      <Initiatives data={data} />
      <Growslide data={data} />
    </>
  );
};
export default Index;
