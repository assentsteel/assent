import React from "react";
import { boxcontent,Specss,textimg } from "./data";
import HeroInner from "../common/Banner/HeroInner";
import Specs from "./sections/Specs";
import TextByImg from "./sections/TextByImg";
import Morepjts from "./sections/Morepjts";
export default function Index() {
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
        imageSrc="/assets/img/story/banner.jpg"
        title="Dubai International Airport Expansion"
        breadcrumbs={breadcrumb}
      />
      <Specs data={Specss.data} />
      <TextByImg data={textimg.data} />
      <Morepjts data={boxcontent.data} />

    </>
  );
}
