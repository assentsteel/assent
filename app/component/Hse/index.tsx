import React from "react";
import {about,Grsldata,cdata} from "./data";
import Herotext from "../common/Banner/Herotext";
// import SingleImageText from "../common/SingleImageText";
import SingleImage from "../common/SingleImage";
import { assets } from "@/public/assets/assets";
import IntroBold from "../common/IntroBold";
// import TextByImg from "../About/sections/TextByImg";
import Growslide from "./sections/Growslide";
import Commitments from "./sections/Commitments";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "HSE", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"Health, Safety & Environment"} />

      <SingleImage secimage={assets.hsebanner}/>
      <IntroBold data={about} />
      <Commitments data={cdata.data} heading={cdata.heading} />
      {/* <SingleImageText data={singletextimg.data} maxwidth={'max-w-[75ch]'} textright={false} /> */}
      <section className="ptst0">
      {/* <TextByImg data={textimg.data} kmbtn={true} /> */}
      </section>
      <Growslide data={Grsldata} />


    </>
  );
}
