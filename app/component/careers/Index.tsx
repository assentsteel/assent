import React from "react";
import {career} from "./data";
import HeroInner from "../common/Banner/HeroInner";
import TextByImg from "./sections/TextByImg";
import CareerText from "./sections/CareerText";
import Openings from "./sections/Openings";
import JoinTeam from "./sections/JoinTeam";
import { Career } from '@/public/types/Common';
import { JobSelectContextProvider } from '@/contexts/jobSelectionContext'; 

const Index = async ({ data }: { data: Career }) => { 
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Careers", href: "" },

  ];

  return (
    <JobSelectContextProvider>

<HeroInner
        imageSrc={data.banner}
        title={data.pageTitle}
        breadcrumbs={breadcrumb}
      />

<TextByImg data={data}   />
<CareerText  data={data} />
<Openings   data={data}  />
<JoinTeam  openings={data.thirdSection.items}/>

    </JobSelectContextProvider>
  );
}
export default Index;
