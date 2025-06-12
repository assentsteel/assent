import React from "react";
import {career} from "./data";
import HeroInner from "../common/Banner/HeroInner";
import TextByImg from "./sections/TextByImg";
import CareerText from "./sections/CareerText";
import Openings from "./sections/Openings";
import JoinTeam from "./sections/JoinTeam";
import { Career } from '@/public/types/Common';
 

const Index = async ({ data }: { data: Career }) => { 
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Careers", href: "" },

  ];

  return (
    <>
<HeroInner
        imageSrc={data.banner}
        title={data.pageTitle}
        breadcrumbs={breadcrumb}
      />

<TextByImg data={data}   />
<CareerText  data={data} />
<Openings   data={data}  />
<JoinTeam   data={career.data}  />

    </>
  );
}
export default Index;
