import React from "react";
import {boxcontent,textrts,slideimages,whychoosedata} from "./data";
import SingleImage from "./sections/SingleImage";
import Herotext from "../common/Banner/Herotext";
import ContentText from "./sections/ContentText";
import HeadingText from "./sections/HeadingText";
// import SingleImageText from "../common/SingleImageText";
import WhyChoose from "../common/WhyChoose";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Steel Erection", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext  breadcrumbs={breadcrumb} title={"Steel Erection"} />
      <SingleImage data={slideimages}  />
      <ContentText data={textrts} />
      {/* <div className="custw"><SingleImageText data={singletextimg.data} maxwidth={'max-w-[96ch]'}  /></div> */}
      <HeadingText data={boxcontent.data} />

    <WhyChoose data={whychoosedata} />

    </>
  );
}
