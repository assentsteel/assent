import React from "react";
import HeroInner from "../common/Banner/HeroInner";
import AboutUs from "./sections/AboutUs";
import Achievements from "./sections/Achievements";
import {AreaExpertise,textimg,singletextimg,tabcnts,sliderdata,about} from "./data";
import TextByImg from "./sections/TextByImg";
import Tabsection from "./sections/Tabsection";
import Aboutslider from "./sections/Aboutslider";
import SingleImageText from "../common/SingleImageText";
import { assets } from "@/public/assets/assets";
import SingleImage from "./sections/SingleImage";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "About", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>
      <HeroInner
        imageSrc="/assets/img/about/banner.jpg"
        title="Our Journey Forward"
        breadcrumbs={breadcrumb}
      />
      <AboutUs data={about} />
      <Achievements AreaExpertise={AreaExpertise.data} />
      <SingleImage secimage={assets.single}/>
      <TextByImg data={textimg.data} />
      <Aboutslider data={sliderdata.data} />
      <SingleImageText data={singletextimg.data} textright={true}  maxwidth={'max-w-[56ch]'} />
      <Tabsection data={tabcnts}  />

    </>
  );
}
