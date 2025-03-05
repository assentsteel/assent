import React from "react";

import HeroSection from "../common/Banner/Hero";
import LatestEvents from "./LatestEvents";

export default function Index() {
  return (
    <>
      <HeroSection
        imageSrc="/assets/img/news/banner.jpg"
        title="Events"
        breadcrumb=""
      />
      <LatestEvents />
    </>
  );
}
