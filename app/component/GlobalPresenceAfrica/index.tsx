import React from "react"; 
import Herotext from "../common/Banner/Herotext"; 
import Location from "../GlobalPresenceAmerica/sections/Location";
import GlobalReachGp from "../GlobalPresenceAmerica/sections/GlobalReachGp";
import ProjectAfrica from "./sections/ProjectAfrica";
import SingleImageText from "../common/SingleImageText";  
import SingleImageGp from "../GlobalPresenceAmerica/sections/SingleImageGp";
import IntroBoldGp from "../GlobalPresenceAmerica/sections/IntroBoldGp";
import { Gpafrica } from '@/public/types/Common';
const Index = async ({data}:{data:Gpafrica}) => {  
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
        <GlobalReachGp data={data.data.sections[1]} />

    <div className="custw"> 
      <SingleImageText data={data.data.sections[2]} maxwidth={'max-w-[68ch]'} textright={true} />
      </div>
     <ProjectAfrica data={data.data.sections[3]} />
     <Location data={data.data.sections[4]}  />



    </>
  );
}
export default Index
