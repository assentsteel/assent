import React from "react";
import HeroSection from "./sections/HeroSection";
import AboutUs from "./sections/AboutUs";
import LogoTicker from "./sections/LogoTicker";
import ServiceSec from "./sections/ServiceSec";
import ProjectsSection from "./sections/ProjectSec";
import Sustainability from "./sections/Sustainability";
import MediaSection from "./sections/MediaSection";

import { Home,News,Projectswfull } from '@/public/types/Common';

const Index = async ({ data,newsData,projData }: { data: Home,newsData: News , projData: Projectswfull }) => { 
  console.log(projData);
  return (
    <>
      <HeroSection data={data}/>
      <AboutUs data={data}/>
      <LogoTicker data={data}/>
      <ServiceSec data={data} />
      <ProjectsSection data={projData}/>
      <Sustainability data={data}/>
      <MediaSection data={newsData} />
    </>
  );
};

export default Index;
