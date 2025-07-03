import React from "react";
import HeroInner from "../common/Banner/HeroInner"; 
import AboutUs from "../About/sections/AboutUs";
import GlobalReach from "./sections/GlobalReach";
import DiscoverPresence from "./sections/DiscoverPresence";

import { GlobalPresence } from '@/public/types/Common'; 
const Index = async ({ data }: { data: GlobalPresence }) => {
 
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: data.pageTitle, href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>
      <HeroInner
        imageSrc={data.banner}
        title={data.pageTitle}
        breadcrumbs={breadcrumb}
      />
      <AboutUs data={data} />
      <GlobalReach data={data.secondSection} bgcolor="bg-primary"/>
    <DiscoverPresence data={data}/>

    </>
  );
}
export default Index