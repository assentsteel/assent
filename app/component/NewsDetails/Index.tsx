 
import React from "react";
import Herotext from "../common/Banner/Herotext";
import NewsDetails from "./sections/NewsDetails"; 
import { Newsdetails } from '@/public/types/Common';  

const Index = async ({data}:{data:Newsdetails}) => {   
   
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    { label: data.data.mainTitle, href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>
      <Herotext breadcrumbs={breadcrumb} title={data.data.mainTitle} />
      <NewsDetails data={data}    />

    </>
  );
}

export default Index