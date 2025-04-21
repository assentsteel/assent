import React from "react";
import { boxcontent } from "./data";

import HeadingText from "./sections/AccreditationsList";
import HeroInner from  "../common/Banner/HeroInner";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Awards and Accreditation", href: "" },

  ];

  return (
    <>
<HeroInner          imageSrc="/assets/img/accreditations/accrbanner.jpg"
        title="Awards and Accreditations"
        breadcrumbs={breadcrumb}
      />
      <HeadingText data={boxcontent.data} />

    </>

  );
}
