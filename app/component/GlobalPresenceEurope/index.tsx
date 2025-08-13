import React from "react"; 
import Herotext from "../common/Banner/Herotext";
import SingleImageText from "../common/SingleImageText"; 
// import { assets } from "@/public/assets/assets"; 
import Location from "../GlobalPresenceAmerica/sections/Location";
import EuReach from "./sections/EuReach";

import SingleImageGp from "../GlobalPresenceAmerica/sections/SingleImageGp";
import IntroBoldGp from "../GlobalPresenceAmerica/sections/IntroBoldGp";
import { Gpeurope } from '@/public/types/Common';
const Index = async ({data}:{data:Gpeurope}) => { 
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Global Presence", href: "/global-presence" },
    { label: data.data.title, href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={data.data.title} />
      <SingleImageGp data={data.data.sections[0]}/>
      <IntroBoldGp data={data.data.sections[0]} />
      <section className="pt-[50px] md:pt-[70px] xl:pt-[100px]">
      <EuReach data={data.data.sections[1]}/>
      </section>


      <SingleImageText data={data.data.sections[2]} maxwidth={'max-w-[68ch]'} textright={true} />
      <div className="custw">
        <Location data={data.data.sections[3]} />
        </div>



    </>
  );
}
export default Index
