"use client";

import { useParams } from "next/navigation";
import ProjectForm from "../project-form";

export default function ProjectPage() {
  const { id } = useParams();
  return <ProjectForm projectId={id as string} />;
}
