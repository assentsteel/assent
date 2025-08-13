import React from "react"; 
import Herotext from "../common/Banner/Herotext";
import HeadingText from "./sections/HeadingText"; 
import { AllProjects } from '@/app/types/AllProjects'; 


const Index = async ({ data,locationData,sectorData }: { data:AllProjects,locationData: {name:string}[],sectorData: {name:string}[] }) => {  
  console.log(data)
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "" },
    { label: "All Projects", href: "" },

    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  const projectData = data.data.categories.flatMap((category) =>
    category.projects.map((project) => ({
      ...project,
      category: category.name // or category if you want the whole object
    }))
  );
  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"All Projects"} />
      {/* <Fillters /> */}

      <HeadingText data={projectData} categoryslug={"All Projects"} locationData={locationData} sectorData={sectorData} categoryData={data.data.categories}/>

    </>
  );
}
export default Index;