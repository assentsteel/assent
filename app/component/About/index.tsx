import React from "react";
import HeroInner from "../common/Banner/HeroInner";
import AboutUs from "./sections/AboutUs";
import Achievements from "./sections/Achievements";
import {AreaExpertise,textimg,singletextimg,tabcnts} from "./data";
import SingleImage from "./sections/SingleImage";
import TextByImg from "./sections/TextByImg";
import SingleImageText from "./sections/SingleImageText";
import Tabsection from "./sections/Tabsection";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "About", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>
      <HeroInner
        imageSrc="/assets/img/story/banner.jpg"
        title="Our Journey Forward"
        breadcrumbs={breadcrumb}
      />
      <AboutUs />
      <Achievements AreaExpertise={AreaExpertise.data} />
      <SingleImage />
      <TextByImg data={textimg.data} />
      <SingleImageText data={singletextimg.data}    />
      <Tabsection data={tabcnts.data}  />

    </>
  );
}
