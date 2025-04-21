import React from "react";
import {singletextimg,boxcontent,textrts} from "./data";
import SingleImage from "./sections/SingleImage";
import Herotext from "../common/Banner/Herotext";
import ContentText from "./sections/ContentText";
import SingleImageText from "./sections/SingleImageText";
import HeadingText from "./sections/HeadingText";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Steel Erection", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext  breadcrumbs={breadcrumb} title={"Steel Erection"} />
      <SingleImage />
      <ContentText data={textrts} />
      <SingleImageText data={singletextimg.data}  />
      <HeadingText data={boxcontent.data} />

    </>
  );
}
