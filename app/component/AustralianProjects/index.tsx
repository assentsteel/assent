import React from "react";
import FirstSection from "./sections/FirstSection";
import IntrosectionBold from "./sections/IntrosectionBold";
import GlobalReach from "../../component/GlobalPresence/sections/GlobalReach";
import HeadingText from "./sections/HeadingText";
import KeyCapabilities from "./sections/KeyCapabilities"
import { singletextimg, reach,sectwo,howwework,keycap,gridsbox,whyus,susbata,partnershipdata ,accauss ,ainglelabeldata,faqdata} from "./australianProjectsData";
import { GlobalReachtype } from "@/public/types/Common";
import HowweWork from "./sections/HowweWork "; 
import Faq from "./sections/Faq";
import GridBox from "./sections/GridBox";
import WhyAssent from "./sections/WhyAssent";
import SaftySustainablity from "./sections/SaftySustainablity"
import PartnershipModel from "./sections/PartnershipModel"
import AccordionAus from "./sections/AccordionAus"
 import SingleImageText from "./sections/SingleImageText"
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
