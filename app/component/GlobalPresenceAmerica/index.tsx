import React from "react";
import {about,textimg,reach,Locationdata} from "./data";
import Herotext from "../common/Banner/Herotext";
// import SingleImageText from "../common/SingleImageText";
import SingleImage from "../common/SingleImage";
import { assets } from "@/public/assets/assets";
import IntroBold from "../common/IntroBold";
import Excellence from "./sections/Excellence";
import Location from "./sections/Location";
import Abtsect from "./sections/Abtsect";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "North America", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"North America"} />

      <SingleImage secimage={assets.americabanner}/>
      <IntroBold data={about} />

    <section className="pt-[50px] md:pt-[70px] xl:pt-[100px]   ">
        <Excellence data={reach} />
      </section>
      <Abtsect data={textimg.data} />
      {/* <SingleImageText data={singletextimg.data} maxwidth={'max-w-[68ch]'} textright={true} /> */}
    <div className="custw">
        <Location data={Locationdata.data} />
        </div>



    </>
  );
}
