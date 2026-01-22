import React from "react"; 
import Herotext from "../common/Banner/Herotext";
import SingleImageText from "../common/SingleImageText";
import SingleImageGp from "./sections/SingleImageGp";
// import { assets } from "@/public/assets/assets";
  import IntroBoldGp from "./sections/IntroBoldGp";
import Excellence from "./sections/Excellence";
import Location from "./sections/Location";
import Abtsect from "./sections/Abtsect";
import { GpAmerica } from '@/public/types/Common';
import ProjectAfrica from "../GlobalPresenceAfrica/sections/ProjectAfrica";
const Index = async ({data}:{data:GpAmerica}) => { 
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

    <section className="pt-[50px] md:pt-[70px] xl:pt-[100px]   ">
        <Excellence data={data.data.sections[1]} />
      </section>
      <Abtsect data={data.data.sections[2]} />
      <SingleImageText data={data.data.sections[3]} maxwidth={'max-w-[68ch]'} textright={true} />  
      <div className="py-[50px] md:py-[70px] xl:py-[100px]   ">
      <ProjectAfrica data={data.data.sections[5]} />
    </div>
    <div className="custw">
        <Location data={data.data.sections[4]} />
        </div>

    </>
  );
}
export default Index

