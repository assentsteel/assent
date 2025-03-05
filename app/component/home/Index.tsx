import React from "react";
import HeroSection from "./sections/HeroSection";
import AboutUs from "./sections/AboutUs";
import LogoTicker from "./sections/LogoTicker";
import ServiceSec from "./sections/ServiceSec";
import ProjectsSection from "./sections/ProjectSec";
import Sustainability from "./sections/Sustainability";
import MediaSection from "./sections/MediaSection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <LogoTicker />
      <ServiceSec />
      <ProjectsSection/>
      <Sustainability/>
      <MediaSection/>
    </>
  );
};

export default Index;
