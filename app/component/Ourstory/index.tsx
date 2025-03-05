'use client'
import React from "react";
import HeroInner from "../common/Banner/HeroInner";
import WhoWeare from "./WhoWeare";
import CoreValue from "./CoreValue";
import Strength from "./Strength";
import LogoTicker from "../home/sections/LogoTicker";
import Historysec from "./Historysec";
import ValueIc from "./ValueIc";

export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>
      <HeroInner
        imageSrc="/assets/img/story/banner.jpg"
        title="Our Story"
        breadcrumbs={breadcrumb}
      />
      <WhoWeare />
      <CoreValue />
      <ValueIc/>
      <Strength />
      <LogoTicker />
      <Historysec />

    </>
  );
}
