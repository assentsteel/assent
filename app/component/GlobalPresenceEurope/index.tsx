import React from "react";
import {singletextimg,about,reach,Locationdata} from "./data";
import Herotext from "../common/Banner/Herotext";
import SingleImageText from "../common/SingleImageText";
import SingleImage from "../common/SingleImage";
import { assets } from "@/public/assets/assets";
import IntroBold from "../common/IntroBold";
import Location from "./sections/Location";
import EuReach from "./sections/EuReach";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Europe", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"Europe"} />

      <SingleImage secimage={assets.eurbanner}/>
      <IntroBold data={about} />
      <section className="pt-[50px] md:pt-[70px] xl:pt-[100px]">
      <EuReach data={reach}/>
      </section>


      <SingleImageText data={singletextimg.data} maxwidth={'max-w-[68ch]'} textright={true} />
      <div className="custw"><Location data={Locationdata.data} />
      </div>



    </>
  );
}
