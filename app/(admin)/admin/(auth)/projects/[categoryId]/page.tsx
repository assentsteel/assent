"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [projects, setProjects] = useState<{ _id: string; title: string }[]>([]);

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
                <h3 className="text-lg font-bold">Projects</h3>
                <Link href={`/admin/projects/${categoryId}/add`}>
                    <Button className="text-white">Add Project</Button>
                </Link>
            </div>
            {projects?.map((project, index) => (
                <div className='flex items-center justify-between border p-2 rounded-md' key={index}>
                    <div>
                        <p>{project.title}</p>
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
        </>
    )
}

export default CategoryPage