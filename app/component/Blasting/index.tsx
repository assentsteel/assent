import React from "react";
import {about,whychoosedata,strengthServe} from "./data";
import Herotext from "../common/Banner/Herotext";
// import SingleImageText from "../common/SingleImageText";
import SingleImage from "../common/SingleImage";
import { assets } from "@/public/assets/assets";
import IntroBold from "../common/IntroBold";
// import TextByImg from "../About/sections/TextByImg";
import Boxgds from "../common/Boxgds";
import WhyChoose from "../common/WhyChoose";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Blasting, Painting & Fire proofing ", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"Blasting, Painting & Fire proofing "} />

      <SingleImage secimage={assets.blastingbn}/>
      <IntroBold data={about} />
      {/* <SingleImageText data={singletextimg.data} maxwidth={'max-w-[68ch]'} textright={false} />
      <div className="ptst0"><TextByImg data={textimg.data} /></div> */}

  <section className="pt-[50px]  xl:pt-[80px]">
      <Boxgds
      colnum={3}
        title={strengthServe.title}
        data={strengthServe.data} />
      </section>
    <WhyChoose data={whychoosedata} />
    </>
  );
}
