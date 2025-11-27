import React from "react";
import Herotext from "../common/Banner/Herotext";
import BoxSlider from "../common/BoxSlider";
import TextImg from "./sections/TextImg";
import SingleImageText from "../common/SingleImageText";
import Accordion from "./sections/Accordion";
import SingleImage from "../common/SingleImage";
import FiveSWorkplace from "./sections/FiveSWorkplace";
import Intro from "../common/Intro";

import { Quality } from "@/public/types/Common";
const Index = async ({ data }: { data: Quality }) => {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: data.pageTitle, href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>
      <Herotext breadcrumbs={breadcrumb} title={data.pageTitle} />

      <SingleImage data={data} />
      <Intro data={data} />
      <section className="pt-[50px] md:pt-[70px] xl:pt-[100px]">
        <BoxSlider data={data} />
      </section>
      <SingleImageText
        data={data.fourthSection}
        maxwidth={"max-w-[68ch]"}
        textright={true}
      />
      <TextImg data={data} />
      <FiveSWorkplace />
      <div className="custw">
        <Accordion data={data} />
      </div>
    </>
  );
};
export default Index;
