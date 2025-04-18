import React from "react";
import {boxcontent} from "./data";
import Herotext from "../common/Banner/Herotext";
import HeadingText from "./sections/HeadingText";
import Fillters from "./sections/Fillters";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "" },
    { label: "Commercial Projects", href: "" },

    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"Commercial Projects"} />
      <Fillters />

      <HeadingText data={boxcontent.data} />

    </>
  );
}
