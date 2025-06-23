import React from "react";
import {career} from "./data";
import HeroInner from "../common/Banner/HeroInner";
import TextByImg from "./sections/TextByImg";
import GetInTouch from "./sections/GetInTouch";
import { Contact } from '@/public/types/Common';
 

const Index = async ({ data }: { data: Contact }) => { 
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: data.pageTitle, href: "" },

  ];

  return (
    <>
<HeroInner
        imageSrc={data.banner}
        title={data.pageTitle}
        breadcrumbs={breadcrumb}
      />

<TextByImg data={data} />
<GetInTouch   data={career.data}  />

    </>
  );
}
export default Index
