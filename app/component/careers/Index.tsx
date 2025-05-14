import React from "react";
import {textimg,singletextimg,career} from "./data";
import HeroInner from "../common/Banner/HeroInner";
import TextByImg from "./sections/TextByImg";
import CareerText from "./sections/CareerText";
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

<TextByImg data={textimg.data} heading={"Build Your Future with ASSENT STEEL"} description={"Join ASSENT STEEL and take your career to new heights. We are committed to fostering talent, innovation, and excellence in the steel industry. Whether you're an experienced professional or just starting out, we offer opportunities for growth, learning, and success in a dynamic work environment. Build your future with us and be part of something strong."}  />
<CareerText  data={singletextimg.data} />
<Openings   data={career.data}  />
<JoinTeam   data={career.data}  />

    </>
  );
}
