import React from "react";
import SingleImage from "./sections/SingleImage";
import Herotext from "../common/Banner/Herotext";
import ContentText from "./sections/ContentText";
import HeadingText from "./sections/HeadingText";
import SingleImageText from "../common/SingleImageText";
import WhyChoose from "../common/WhyChoose";

import { Services } from '@/public/types/Common'; 
const Index = async ({ data }: { data: Services }) => { 
  
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: data.pageTitle, href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext  breadcrumbs={breadcrumb} title={data.pageTitle} />
      <SingleImage data={data}  />
      <ContentText data={data} />
      <div className="custw"><SingleImageText data={data.secondSection} maxwidth={'max-w-[96ch]'}  /></div>
      <HeadingText data={data} />

    <WhyChoose data={data.fourthSection} />

    </>
  );
}

export default Index