import React from "react";
import HeroInner from "../common/Banner/HeroInner";
import AboutUs from "./sections/AboutUs";
import Achievements from "./sections/Achievements";
import TextByImg from "./sections/TextByImg";
import Tabsection from "./sections/Tabsection";
import Aboutslider from "./sections/Aboutslider";
import SingleImageText from "../common/SingleImageText"; 
import SingleImage from "./sections/SingleImage";
 
import { About } from '@/public/types/Common';

const Index = async ({ data }: { data: About  }) => {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "About", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>
      <HeroInner
        imageSrc={data.banner}
        title={data.pageTitle}
        breadcrumbs={breadcrumb}
      />
      <AboutUs data={data} />
      <Achievements data={data} />
      <SingleImage data={data}/>
      <TextByImg data={data.secondSection} kmbtn={false} />
      <Aboutslider data={data} />
      <SingleImageText data={data.purposeSection} textright={true}  maxwidth={'max-w-[56ch]'} />
      <Tabsection data={data}  />

    </>
  );
}

export default Index;