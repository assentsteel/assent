import React from "react"; 
import Herotext from "../common/Banner/Herotext";
import HeadingText from "./sections/HeadingText"; 
import { Projectsw } from '@/public/types/Common'; 
const Index = async ({ data, slug }: { data: Projectsw, slug: string }) => {  
  console.log(data)
  const unslugify = (slug: string): string => {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "" },
    { label: unslugify(slug), href: "" },

    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={unslugify(slug)} />
      {/* <Fillters /> */}

      <HeadingText data={data} categoryslug={slug} />

    </>
  );
}
export default Index;

