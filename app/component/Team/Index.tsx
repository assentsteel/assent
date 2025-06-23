import React from "react"; 

import HeroInner from  "../common/Banner/HeroInner";
import Teamlist from "./sections/Teamlist";

import { Team } from '@/public/types/Common';
 

const Index = async ({ data }: { data: Team }) => { 
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Leadership Team", href: "" },

  ];

  return (
    <>
<HeroInner          imageSrc={data.banner}
        title={data.pageTitle}
        breadcrumbs={breadcrumb}
      />
      <Teamlist data={data} />

    </>

  );
}
export default Index