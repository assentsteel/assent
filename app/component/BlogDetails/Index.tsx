 
import React from "react";
import Herotext from "../common/Banner/Herotext";
import BlogDetails from "./sections/BlogDetails"; 
import { Bogs } from '@/public/types/Common';  

const Index = async ({data}:{data:Bogs}) => {   
   
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blogs" },
    { label: data.mainTitle, href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>
      <Herotext breadcrumbs={breadcrumb} title={data.mainTitle} blogPage={true} />
      <BlogDetails data={data}    />

    </>
  );
}

export default Index