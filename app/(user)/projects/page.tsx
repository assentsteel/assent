import React from "react";
import Index from "../../component/AllProjects/Index";
import type { Metadata } from "next";
import { getAllProjects, getAllLocation, getAllSectors } from "@/lib/services/project.service";
export const metadata: Metadata = {
  title: "Industrial and Commercial Steel Projects | Assent Steel",
  description: "Discover Assent Steel’s major projects delivered worldwide. From airports to stadiums and towers, see engineering excellence in action. Click for more info!",
};
const ProjectsPage = async () => {
  const projectData = await getAllProjects();
  const locationData = await getAllLocation();
  const sectorData = await getAllSectors();
    return (
    <Index data={{ data: projectData }} locationData={locationData} sectorData={sectorData} />
  );
}
export default ProjectsPage;