import React from "react";
import HeroSection from "../common/Banner/Hero";
import LatestNews from "./LatestNews";

export default function Index() {
  return (
    <>
      <HeroSection
        imageSrc="/assets/img/news/banner.jpg"
        title="News"
        breadcrumb=""
      />
      <LatestNews />
    </>
  );
}
