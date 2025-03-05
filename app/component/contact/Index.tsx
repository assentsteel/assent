import React from "react";
import Details from "./Details";
import HeroInner from "../common/Banner/Hero";

export const Index = () => {
  return (
    <>
      <HeroInner
        imageSrc="/assets/img/contact/banner.jpg"
        title="Contact Us"
        breadcrumb=""
      />
      <Details />
    </>
  );
};
