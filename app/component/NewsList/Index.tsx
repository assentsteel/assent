import React from "react"; 

import Herotext from "../common/Banner/Herotext";
import Fillters from  "./sections/Fillters";
import RecentNews from "./sections/RecentNews";
import NewsList from "./sections/NewsList";
import { News } from '@/public/types/Common';
 

const Index = async ({ data }: { data: News }) => { 
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "News", href: "" },

  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"News"} />
      <RecentNews data={data} />
      <Fillters />
      <NewsList data={data} />


    </>

  );
}

export default Index;
