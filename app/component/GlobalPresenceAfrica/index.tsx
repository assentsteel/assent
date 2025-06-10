import React from "react";
import {about,slidedata,reach,Locationdata} from "./data";
import Herotext from "../common/Banner/Herotext";
// import SingleImageText from "../common/SingleImageText";
import SingleImage from "../common/SingleImage";
import { assets } from "@/public/assets/assets";
import IntroBold from "../common/IntroBold";
import Location from "../GlobalPresenceAmerica/sections/Location";
import GlobalReach from "../GlobalPresence/sections/GlobalReach";
import ProjectAfrica from "./sections/ProjectAfrica";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Africa", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"Africa"} />

      <SingleImage secimage={assets.afbanner}/>
      <IntroBold data={about} />
        <GlobalReach data={reach} />

    <div className="custw">
      {/* <SingleImageText data={singletextimg.data} maxwidth={'max-w-[68ch]'} textright={true} /> */}
      </div>
      <ProjectAfrica data={slidedata} />
    <Location data={Locationdata.data} />



    </>
  );
}
