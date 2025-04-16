import React from "react";
import {textimg,singletextimg,career} from "./data";
import HeroInner from "../common/Banner/HeroInner";
import TextByImg from "./sections/TextByImg";
import SingleImageText from "./sections/SingleImageText";
import Openings from "./sections/Openings";
import JoinTeam from "./sections/JoinTeam";
export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Careers", href: "" },

  ];

  return (
    <>
<HeroInner
        imageSrc="/assets/img/careers/banner.jpg"
        title="Careers"
        breadcrumbs={breadcrumb}
      />

<TextByImg data={textimg.data} />
<SingleImageText  data={singletextimg.data} />
<Openings   data={career.data}  />
<JoinTeam   data={career.data}  />

    </>
  );
}
