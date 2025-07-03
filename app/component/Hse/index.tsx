import React from "react"; 
import Herotext from "../common/Banner/Herotext";
import SingleImageText from "../common/SingleImageText";
import SingleImage from "../common/SingleImage"; 
import IntroBold from "../common/IntroBold";
import TextByImg from "../About/sections/TextByImg";
import Growslide from "./sections/Growslide";
import Commitments from "./sections/Commitments";

import { Hse } from '@/public/types/Common'; 
const Index = async ({ data }: { data: Hse }) => { 
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: data.pageTitle, href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={data.pageTitle} />

      <SingleImage data={data}/>
      <IntroBold data={data.firstSection} />
      <Commitments data={data} />
      <SingleImageText data={data.thirdSection} maxwidth={'max-w-[75ch]'} textright={false} />
      <section className="ptst0">
      <TextByImg data={data.fourthSection} kmbtn={true} />
      </section>
      <Growslide data={data} />


    </>
  );
}
export default Index
