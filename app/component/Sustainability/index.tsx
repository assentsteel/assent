import React from "react";
import {singletextimg,about,textimg,Grsldata} from "./data";
import SingleImageText from "../common/SingleImageText";
import IntroBold from "../common/IntroBold";
import TextByImg from "../About/sections/TextByImg";
import Growslide from "./sections/Growslide";
import HeroInner from "../common/Banner/HeroInner";
import Listsec from "./sections/Listsec";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Sustainability", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <HeroInner
        imageSrc="/assets/img/about/banner.jpg"
        title="Sustainability"
        breadcrumbs={breadcrumb}
      />
        <div className="py-[40px] md:py-[50px] xl:py-[60px]">
        <IntroBold data={about} />
      </div>
      <Listsec />
      <SingleImageText data={singletextimg.data} maxwidth={'max-w-[75ch]'} textright={false} />
      <section className="ptst0">
      <TextByImg data={textimg.data} kmbtn={true} />
      </section>
      <Growslide data={Grsldata} />


    </>
  );
}
