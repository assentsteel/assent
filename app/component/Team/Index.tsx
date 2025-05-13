import React from "react";
import { boxcontent } from "./data";

import HeroInner from  "../common/Banner/HeroInner";
import Teamlist from "./sections/Teamlist";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Leadership Team", href: "" },

  ];

  return (
    <>
<HeroInner          imageSrc="/assets/img/team/teambanner.jpg"
        title="Leadership Team"
        breadcrumbs={breadcrumb}
      />
      <Teamlist data={boxcontent} />

    </>

  );
}
