"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteProjectDialog from "./components/DeleteProjectDialog";
import { useRouter } from "next/navigation";
type Project = {
  _id: string;
  name: string;
  description: string;
  images: string[];
  specifications: {
    name: string;
    value: string;
  }[];
};

export default function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  const fetchProjects = async () => {
    const response = await fetch("/api/admin/projects");
    const data = await response.json();
    setProjects(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleClickNewProject = () => {
    router.push("/admin/projects/new");
  };

  const handleEditProject = (projectId: string) => {
    router.push(`/admin/projects/${projectId}`);
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button className="bg-primary text-white" onClick={handleClickNewProject}>
          <span className="mr-2">+</span>
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first project</p>
          <Button className="bg-primary text-white" onClick={handleClickNewProject}>
            <span className="mr-2">+</span>
            Add Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="group">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-semibold">{project.name}</h2>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-primary hover:bg-primary/10"
                      onClick={() => handleEditProject(project._id)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <DeleteProjectDialog projectId={project._id} onDelete={fetchProjects} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
