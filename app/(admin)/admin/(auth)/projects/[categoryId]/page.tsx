"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
// import {closestCorners, DndContext, DragEndEvent} from '@dnd-kit/core'
// import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
// import { useSortable } from '@dnd-kit/sortable';
// import ProjectCard from "./ProjectCard";

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [projects, setProjects] = useState<{ _id: string; title: string }[]>([]);
    const [reorderMode, setReorderMode] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch(`/api/admin/projects/category?id=${categoryId}`);
            const data = await res.json();
            if (data.success) {
                setProjects(data.data);
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const handleDeleteProject = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/projects?id=${categoryId}&projectId=${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
                fetchProjects();
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }


    // const getTaskPos = (id: string) => projects.findIndex((item:{_id:string})=>( item._id == id))
    // const handleDragEnd = (event: DragEndEvent) => {
    //     const { active, over } = event;
      
    //     if (!over || active.id === over.id) return;
      
    //     setProjects((projects: { _id: string; title: string }[]) => {
    //       const originalPos = getTaskPos(active.id);
    //       const newPos = getTaskPos(over.id);
    //       return arrayMove(projects, originalPos, newPos);
    //     });
    //   };


    const confirmPosition = async() => {
        setReorderMode(!reorderMode);

        const updatedProjects = projects.map((project, index) => ({
            ...project,
            index: index + 1,
        }));

        setProjects(updatedProjects); 

        const formData = new FormData()
        formData.append('projects',JSON.stringify(updatedProjects))
        const response = await fetch('/api/admin/projects/reorder',{
            method:"POST",
            body:formData
        })
        if(response.ok){
            const data = await response.json()
            if(data.success){
                alert(data.message)
            }
        }
    };

    if (projects.length === 0) {
        return (
            <div className="flex items-center justify-center h-full flex-col gap-2">
                <p>No projects found, add one by clicking the button below</p>
                <Link href={`/admin/projects/${categoryId}/add`}>
                    <Button className="text-white">Add Project</Button>
                </Link>
            </div>
        )
    }
    
    return (
        <>
            <div className="flex justify-between mb-5">
                <h3 className="text-md font-semibold">Projects</h3>
                <div className="flex items-center gap-2">
                <Link href={reorderMode ? `#` : `/admin/projects/${categoryId}/add`}>
                    <Button className="text-white text-[16px]" disabled={reorderMode}>Add Project</Button>
                </Link>
                <Button disabled={true} className="text-white text-[16px]" onClick={() => confirmPosition()}>{reorderMode ? "Done" : "Reorder"}</Button>
                </div>
            </div>
            <div className="flex flex-col gap-2">

            {/* {reorderMode && 
            
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <SortableContext items={projects.map((project) => project._id)} strategy={verticalListSortingStrategy}>
                    {projects?.map((project, index) => (
                        <ProjectCard key={index} project={project} id={project._id} />
                    ))}
                </SortableContext>
            </DndContext>
            
            } */}





            {!reorderMode && projects?.map((project, index) => (
                <div className='flex items-center justify-between border p-2 rounded-md' key={index}>
                    <div>
                        <p className="text-[16px]">{project.title}</p>
                    </div>
                    <div className="flex items-center gap-10">

                        <Link href={`/admin/projects/${categoryId}/edit/${project._id}`}><MdEdit className="cursor-pointer text-md" /></Link>

                        <Dialog>
                            <DialogTrigger className=""><MdDelete className="cursor-pointer text-md" /></DialogTrigger>
                            <DialogContent className="">
                                <DialogHeader>
                                    <DialogTitle>Delete Project</DialogTitle>
                                    <p>Are you sure you want to delete this project?</p>
                                </DialogHeader>
                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteProject(project._id)}>Delete</DialogClose>
                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md">Cancel</DialogClose>
                            </DialogContent>
                        </Dialog>


                    </div>
                </div>
            ))}
            </div>
        </>
    )
}

export default CategoryPage