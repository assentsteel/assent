import React from "react"; 

import AccreditationsList from "./sections/AccreditationsList";
import HeroInner from  "../common/Banner/HeroInner";

import { Awards } from '@/public/types/Common';
 

const Index = async ({ data }: { data: Awards }) => { 
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: data.pageTitle, href: "" },

  ];

  return (
    <>
<HeroInner          imageSrc={data.banner}
        title={data.pageTitle}
        breadcrumbs={breadcrumb}
      />
      <AccreditationsList data={data} />

    </>

  );
}
export default Index;
