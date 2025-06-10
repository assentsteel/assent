import React from "react";
import {about,listsc,policydata,tabcnts,Islideata,focusdata} from "./data";
import IntroBold from "../common/IntroBold";
// import TextByImg from "../About/sections/TextByImg";
import HeroInner from "../common/Banner/HeroInner";
import Listsec from "./sections/Listsec";
import Policy from "./sections/Policy";
import NavTabsection from "../Fabrication/sections/NavTabsection";
import Growslide from "./sections/Iconslide";
import Initiatives from "./sections/Initiatives";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Sustainability", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <HeroInner
        imageSrc="/assets/img/sustainability/susbanner.jpg"
        title="Sustainability"
        breadcrumbs={breadcrumb}
      />
        <div className="py-0   xl:py-[60px]">
        <IntroBold data={about} />
      </div>
      <Listsec listitem={listsc.data} />
      <Policy data={policydata}/>
      <section className="ptst0">
      {/* <TextByImg data={textimg.data} kmbtn={false} /> */}
      </section>
      <NavTabsection data={tabcnts} navigation={false} bgcolor="bg-primary" textwhite={true} />
      <Initiatives  data={focusdata}  />
      <Growslide data={Islideata} />

    </>
  );
}
