import React from "react";
import {singletextimg,about,slideimages,Textdata,accdata} from "./data";
import Herotext from "../common/Banner/Herotext";
import BoxSlider from "../common/BoxSlider";
import TextImg from "./sections/TextImg";
import SingleImageText from "../common/SingleImageText";
import Accordion from "./sections/Accordion";
import SingleImage from "../common/SingleImage";
import { assets } from "@/public/assets/assets";
import Intro from "../common/Intro";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Quality", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"Quality"} />

      <SingleImage secimage={assets.qtbanner}/>
      <Intro data={about} />
      <section className="pt-[50px] md:pt-[70px] xl:pt-[100px]">
        <BoxSlider data={slideimages} />
        </section>
      <TextImg data={Textdata} />
      <div className="custw"><SingleImageText data={singletextimg.data} maxwidth={'max-w-[68ch]'} textright={true} /></div>
      <div className="custw"><Accordion data={accdata.data} heading={accdata.heading}   /></div>


    </>
  );
}
