import React from "react"; 
import Index from "../../component/AllProjects/Index";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Industrial and Commercial Steel Projects | Assent Steel",
  description: "Discover Assent Steel’s major projects delivered worldwide. From airports to stadiums and towers, see engineering excellence in action. Click for more info!",
};
const ProjectsPage = async () => {  
    const response = await fetch(`${process.env.BASE_URL}/api/admin/projects`, { next: { revalidate: 60 } });
  const data = await response.json();
  const locationResponse = await fetch(`${process.env.BASE_URL}/api/admin/projects/location`, { next: { revalidate: 60 } });
  const locationData = await locationResponse.json(); 
  const sectorResponse = await fetch(`${process.env.BASE_URL}/api/admin/projects/sector`, { next: { revalidate: 60 } });
  const sectorData = await sectorResponse.json(); 
    return (
    <Index data={data} locationData={locationData.data} sectorData={sectorData.data} />
  );
}
export default ProjectsPage;