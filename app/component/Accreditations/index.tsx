import React from "react";
import HeroInner from "../common/Banner/HeroInner";
import Certificates from "./Certificates";

export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "News and Events", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>
      <HeroInner
        imageSrc="/assets/img/story/banner.jpg"
        title="Accreditations"
        breadcrumbs={breadcrumb}
      />
<Certificates />

    </>
  );
}
