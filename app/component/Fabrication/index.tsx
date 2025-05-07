import React from "react";
import {about,IndustriesWeServe,Structuredata,tabcnts} from "./data";
import Herotext from "../common/Banner/Herotext";
import SingleImage from "../common/SingleImage";
import { assets } from "@/public/assets/assets";
import IntroBold from "../common/IntroBold";
import BoxgridSlider from "./sections/BoxgridSlider";
import Structure from "./sections/Structure";
import Tabsection from "../About/sections/Tabsection";
import NavTabsection from "./sections/NavTabsection";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Fabrication", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"Fabrication"} />

      <SingleImage secimage={assets.fabbanner}/>
      <IntroBold data={about} />
      <section>
        <div className="container border-b pb-[50px]  xl:pb-[100px]">

        </div>
      </section>
      <NavTabsection data={tabcnts} navigation={true} />
      <BoxgridSlider
      colnum={4}
        data={IndustriesWeServe} />
      <section className="py-[50px]  xl:py-[100px]">
      <Structure
        data={Structuredata} />
      </section>



    </>
  );
}
