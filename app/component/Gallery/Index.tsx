import React from "react";
import {boxcontent} from "./data";
import Herotext from "../common/Banner/Herotext";
import HeadingText from "./sections/HeadingText";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "" },

    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"Gallery"} />


      <HeadingText data={boxcontent.data} />

    </>
  );
}
