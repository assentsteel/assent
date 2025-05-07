import React from "react";
import {singletextimg,about,Packagesdata,IndustriesWeServe,Slidethumbdata} from "./data";
import Herotext from "../common/Banner/Herotext";
import SingleImageText from "../common/SingleImageText";
import SingleImage from "../common/SingleImage";
import { assets } from "@/public/assets/assets";
import IntroBold from "../common/IntroBold";
import Boxgrid from "./sections/Boxgrid";
import Slidetextthumb from "./sections/Slidetextthumb";
import Packages from "./sections/Packages";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Engineering", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"Engineering"} />

      <SingleImage secimage={assets.engbanner}/>
      <IntroBold data={about} />
      <section className="pt-[50px]  xl:pt-[80px]">
      <Boxgrid
      colnum={4}
        title={IndustriesWeServe.title}
        subttle={IndustriesWeServe.subttle}
        data={IndustriesWeServe.data} />
      </section>

      <Slidetextthumb data={Slidethumbdata.data} />


      <SingleImageText data={singletextimg.data} maxwidth={'max-w-[68ch]'} textright={true} />
      <Packages data={Packagesdata}    />


    </>
  );
}
