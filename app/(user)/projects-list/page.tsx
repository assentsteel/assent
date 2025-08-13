import React from "react"; 
import Index from "../../component/AllProjects/Index";

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