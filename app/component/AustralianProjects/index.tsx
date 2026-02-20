import React from "react";
import FirstSection from "./sections/FirstSection";
import IntrosectionBold from "./sections/IntrosectionBold";
import GlobalReachprojects from "../../component/GlobalPresence/sections/GlobalReachprojects";
import HeadingText from "./sections/HeadingText";
import KeyCapabilities from "./sections/KeyCapabilities"
// import { singletextimg, reach,sectwo,howwework,keycap,gridsbox,whyus,susbata,partnershipdata ,accauss ,ainglelabeldata,faqdata} from "./australianProjectsData";
 
import HowweWork from "./sections/HowweWork "; 
import Faq from "./sections/Faq";
import GridBox from "./sections/GridBox";
import WhyAssent from "./sections/WhyAssent";
import SaftySustainablity from "./sections/SaftySustainablity"
import PartnershipModel from "./sections/PartnershipModel"
import AccordionAus from "./sections/AccordionAus"
 import SingleImageText from "./sections/SingleImageText"
      import { introbold,GlobalRtps,Sectwotp,HowWework,keycaptur,gridbox,whyustre,Partnerst,Accaus,ainglelabel ,typefaq} from '@/public/types/Common';
 
  
        //  const Index = ({ sectwo ,singletextimg}: { sectwo: Sectwotp,  }) => {
          const Index = ({
            singletextimg,
      reach,      
  sectwo,
  howwework,
  keycap,
  gridsbox,
  whyus,
  partnershipdata,
  accauss,
  ainglelabeldata,
  susbata,
  faqdata
}: {
  singletextimg:introbold;
  reach:GlobalRtps;
  sectwo: Sectwotp;
  howwework: HowWework;
  keycap: keycaptur;
  gridsbox: gridbox;
  whyus:whyustre;
  susbata: gridbox;
  partnershipdata: Partnerst;
  accauss: Accaus;
  ainglelabeldata: ainglelabel;
  faqdata: typefaq;
}) => {

 const sectionData = singletextimg?.data?.[0];

  return (
    <>
      {sectionData && ( 
         <IntrosectionBold
          data={singletextimg          }
        /> 
      )} 

      <FirstSection data={sectionData} />

      <GlobalReachprojects
        bgcolor="bg-primary"
        data={reach        }
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
