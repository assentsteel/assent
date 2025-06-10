import React from "react";
import HeroInner from "../common/Banner/HeroInner";
import {reach,discover} from "./data";
// import AboutUs from "../About/sections/AboutUs";
import GlobalReach from "./sections/GlobalReach";
import DiscoverPresence from "./sections/DiscoverPresence";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Global Presence", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>
      <HeroInner
        imageSrc="/assets/img/gp/gpbanner.jpg"
        title="Global Presence"
        breadcrumbs={breadcrumb}
      />
      {/* <AboutUs data={about} /> */}
      <GlobalReach data={reach} bgcolor="bg-primary"/>
    <DiscoverPresence data={discover.data}/>

    </>
  );
}
