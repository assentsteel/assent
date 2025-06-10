import React from "react"; 
import Herotext from "../common/Banner/Herotext";
import HeadingText from "./sections/HeadingText";

import { Gallery } from '@/public/types/Common';

const Index = async ({ data }: { data: Gallery }) => { 
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "" },

    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"Gallery"} />


      <HeadingText data={data} />

    </>
  );
}

export default Index;