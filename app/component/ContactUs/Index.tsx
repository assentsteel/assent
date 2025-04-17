import React from "react";
import {address,career} from "./data";
import HeroInner from "../common/Banner/HeroInner";
import TextByImg from "./sections/TextByImg";
import GetInTouch from "./sections/GetInTouch";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Contact Us", href: "" },

  ];

  return (
    <>
<HeroInner
        imageSrc="/assets/img/contact/cbanner.jpg"
        title="Contact Us"
        breadcrumbs={breadcrumb}
      />

<TextByImg data={address.data} />
<GetInTouch   data={career.data}  />

    </>
  );
}
