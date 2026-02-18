import React from "react";
import FirstSection from "../AustralianProjects/sections/FirstSection";
import IntrosectionBold from "../AustralianProjects/sections/IntrosectionBold";
import GlobalReach from "../GlobalPresence/sections/GlobalReach";
import HeadingText from "../AustralianProjects/sections/HeadingText";
import KeyCapabilities from "../AustralianProjects/sections/KeyCapabilities"
import { singletextimg, reach,sectwo,howwework,keycap,gridsbox,whyus,susbata,partnershipdata ,accauss ,ainglelabeldata,faqdata} from "./ProjectsData";
import { GlobalReachtype } from "@/public/types/Common";
import HowweWork from "../AustralianProjects/sections/HowweWork "; 
import Faq from "../AustralianProjects/sections/Faq";
import GridBox from "../AustralianProjects/sections/GridBox";
import WhyAssent from "../AustralianProjects/sections/WhyAssent";
import SaftySustainablity from "../AustralianProjects/sections/SaftySustainablity"
import PartnershipModel from "../AustralianProjects/sections/PartnershipModel"
import AccordionAus from "../AustralianProjects/sections/AccordionAus"
 import SingleImageText from "../AustralianProjects/sections/SingleImageText"
const Index = () => {
  const sectionData = singletextimg?.data?.[0];

  return (
    <>
      {sectionData && ( 
         <IntrosectionBold
          data={{
            title: sectionData.title,
            description: sectionData.paragraphs.join(" "),
            titlecase:true,
            maxwidth:21
          }}
        /> 
      )}

      <FirstSection data={sectionData} />
 
      <GlobalReach
        bgcolor="bg-primary"
        data={
          {
            title: reach.heading,
            items: reach.data.map((item) => ({
              number: item.count,
              value: item.title,
              description: item.details,
            })),
          } as unknown as GlobalReachtype
        }
      /> 
       <HeadingText data={sectwo} />
       <HowweWork data={howwework} />
       <KeyCapabilities 
        data={keycap}
        navigation={true} />
        <GridBox 
      colnum={4} 
        data={gridsbox} />
        <WhyAssent data={whyus}/>
        
        <SaftySustainablity 
      colnum={3} 
        data={susbata} maxchwidth={30} />
       <PartnershipModel data={partnershipdata} />
       <AccordionAus data={accauss} />
     <SingleImageText data={ainglelabeldata}  textright={false}  />
     <Faq data={faqdata} />





    </>
  );
};

export default Index;
