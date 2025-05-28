import React from "react";
import {singletextimg,about,Packagesdata,IndustriesWeServe} from "./data";
import Herotext from "../common/Banner/Herotext";
import SingleImageText from "../common/SingleImageText";
import SingleImage from "../common/SingleImage";
import { assets } from "@/public/assets/assets";
import IntroBold from "../common/IntroBold";
import Boxgrid from "./sections/Boxgrid";

import Packages from "./sections/Packages";
import ProjectModels from "./sections/ProjectModels";
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
    <ProjectModels/>
   


      <SingleImageText data={singletextimg.data} maxwidth={'max-w-[68ch]'} textright={true} />
      <Packages data={Packagesdata}    />


    </>
  );
}
