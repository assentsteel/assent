"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import Link from 'next/link'


const ProjectsPage = () => {
    const [name, setName] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [sector, setSector] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [oldSectorName, setOldSectorName] = useState<string>("");
    const [oldLocationName, setOldLocationName] = useState<string>("");

    const [categories, setCategories] = useState<{ _id: string; name: string,metaTitle:string,metaDescription:string }[]>([]);
    const [sectors, setSectors] = useState<{ _id: string; name: string }[]>([]);
    const [locations, setLocations] = useState<{ _id: string; name: string }[]>([]);

    useEffect(() => {
        fetchCategories();
        fetchSectors();
        fetchLocations();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/admin/projects/category");
            const data = await res.json();
            if (data.success) {
                setCategories(data.data);
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const handleAddCategory = async () => {
        try {
            const res = await fetch("/api/admin/projects/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name,metaTitle,metaDescription }),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                setName("");
                fetchCategories();
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const handleEditCategory = async (id:string) => {
        try {
            const res = await fetch(`/api/admin/projects/category?id=${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name,metaTitle,metaDescription }),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                setName("");
                fetchCategories();
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const handleDeleteCategory = async (id:string) => {
        try {
            const res = await fetch(`/api/admin/projects/category?id=${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                fetchCategories();
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const fetchSectors = async () => {
        try {
            const res = await fetch("/api/admin/projects/sector");
            const data = await res.json();
            if (data.success) {
                setSectors(data.data);
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const handleAddSector = async () => {
        try {
            const res = await fetch("/api/admin/projects/sector", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sector }),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                setSector("");
                fetchSectors();
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const handleEditSector = async (id:string) =>{
        try {
            const res = await fetch(`/api/admin/projects/sector?id=${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sector,oldSectorName }),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                setSector("");
                setOldSectorName("");
                fetchSectors();
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }


    const handleDeleteSector = async (id:string) => {
        try {
            const res = await fetch(`/api/admin/projects/sector?id=${id}`, {
                method: "DELETE",
                body: JSON.stringify({ oldSectorName }),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                setOldSectorName("");
                fetchSectors();
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const fetchLocations = async () => {
        try {
            const res = await fetch("/api/admin/projects/location");
            const data = await res.json();
            if (data.success) {
                setLocations(data.data);
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const handleAddLocation = async () => {
        try {
            const res = await fetch("/api/admin/projects/location", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ location }),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                setLocation("");
                fetchLocations();
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const handleEditLocation = async (id:string) =>{
        try {
            const res = await fetch(`/api/admin/projects/location?id=${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ location,oldLocationName }),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                setLocation("");
                setOldLocationName("");
                fetchLocations();
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const handleDeleteLocation = async (id:string) => {
        try {
            const res = await fetch(`/api/admin/projects/location?id=${id}`, {
                method: "DELETE",
                body: JSON.stringify({ oldLocationName }),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                setOldLocationName("");
                fetchLocations();
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }




    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-5 border-dashed border-2 p-2'>
                <div className='flex items-center gap-2 justify-between'>
                    <h2 className='text-lg font-semibold'>Categories</h2>
                    <Dialog>
                        <DialogTrigger className="bg-primary text-white px-2 py-1 rounded-md" onClick={() => { setName("");setMetaTitle("");setMetaDescription(""); }}>Add Category</DialogTrigger>
                        <DialogContent className="">
                            <DialogHeader>
                                <DialogTitle>Add Category</DialogTitle>
                                <div className="flex flex-col gap-4">

                                    <div>
                                        <Label>Name</Label>
                                        <Input type="text" placeholder="Title" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Meta Title</Label>
                                        <Input type="text" placeholder="Meta Title" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Meta Description</Label>
                                        <Input type="text" placeholder="Meta Description" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
                                    </div>

                                </div>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddCategory}>Save</DialogClose>
                        </DialogContent>

                    </Dialog>
                </div>
                <div className='flex flex-col gap-2 h-[200px] overflow-y-auto'>
                    {categories.map((category, index) => (
                        <div className='flex items-center justify-between border p-2 rounded-md' key={index}>
                            <div>
                                <p>{category.name}</p>
                            </div>
                            <div className="flex items-center gap-10">
                                <Dialog>
                                    <DialogTrigger className="" onClick={() => { setName(category.name);setMetaTitle(category.metaTitle);setMetaDescription(category.metaDescription); }}><MdEdit className="cursor-pointer text-md" /></DialogTrigger>
                                    <DialogContent className="">
                                        <DialogHeader>
                                            <DialogTitle>Edit Category</DialogTitle>
                                            <div className="flex flex-col gap-4">

                                                <div>
                                                    <Label>Name</Label>
                                                    <Input type="text" placeholder="Title" value={name} onChange={(e) => setName(e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label>Meta Title</Label>
                                                    <Input type="text" placeholder="Meta Title" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label>Meta Description</Label>
                                                    <Input type="text" placeholder="Meta Description" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
                                                </div>

                                            </div>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleEditCategory(category._id)}>Save</DialogClose>
                                    </DialogContent>

                                </Dialog>

                                <Link href={`/admin/projects/${category._id}`}><IoMdExit className="cursor-pointer text-md"/></Link>
                            
                            <Dialog>
                                <DialogTrigger className=""><MdDelete className="cursor-pointer text-md" /></DialogTrigger>
                                <DialogContent className="">
                                    <DialogHeader>
                                        <DialogTitle>Delete Category</DialogTitle>
                                        <p>Are you sure you want to delete this category?</p>
                                    </DialogHeader>
                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleDeleteCategory(category._id)}>Delete</DialogClose>
                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md">Cancel</DialogClose>
                                </DialogContent>
                            </Dialog>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

                    <div className='grid grid-cols-2 gap-5'>
            <div className='flex flex-col gap-5 border-dashed border-2 p-2'>
                <div className='flex items-center gap-2 justify-between'>
                    <h2 className='text-lg font-semibold'>Sector</h2>
                    <Dialog>
                        <DialogTrigger className="bg-primary text-white px-2 py-1 rounded-md" onClick={() => {setSector("");}}>Add Sector</DialogTrigger>
                        <DialogContent className="">
                            <DialogHeader>
                                <DialogTitle>Add Sector</DialogTitle>
                                <div className="flex flex-col gap-4">

                                    <div>
                                        <Label>Name</Label>
                                        <Input type="text" placeholder="Title" value={sector} onChange={(e) => setSector(e.target.value)} />
                                    </div>

                                </div>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddSector}>Save</DialogClose>
                        </DialogContent>

                    </Dialog>
                </div>
                <div className='flex flex-col gap-2 h-[300px] overflow-y-auto'>
                    {sectors.map((sector, index) => (
                        <div className='flex items-center justify-between border p-2 rounded-md' key={index}>
                            <div>
                                <p>{sector.name}</p>
                            </div>
                            <div className="flex items-center gap-10">
                                <Dialog>
                                    <DialogTrigger className="" onClick={() => { setSector(sector.name);setOldSectorName(sector.name); }}><MdEdit className="cursor-pointer text-md" /></DialogTrigger>
                                    <DialogContent className="">
                                        <DialogHeader>
                                            <DialogTitle>Edit Sector</DialogTitle>
                                            <div className="flex flex-col gap-4">

                                                <div>
                                                    <Label>Name</Label>
                                                    <Input type="text" placeholder="Title" defaultValue={sector.name} onChange={(e) => setSector(e.target.value)} />
                                                </div>

                                            </div>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleEditSector(sector._id)}>Save</DialogClose>
                                    </DialogContent>

                                </Dialog>

                            
                            <Dialog>
                                <DialogTrigger className=""><MdDelete className="cursor-pointer text-md" /></DialogTrigger>
                                <DialogContent className="">
                                    <DialogHeader>
                                        <DialogTitle>Delete Sector</DialogTitle>
                                        <p>Are you sure you want to delete this sector?</p>
                                    </DialogHeader>
                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleDeleteSector(sector._id)}>Delete</DialogClose>
                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md">Cancel</DialogClose>
                                </DialogContent>
                            </Dialog>
                            </div>
                        </div>
                    ))}
                </div>
            </div>   



            <div className='flex flex-col gap-5 border-dashed border-2 p-2'>
                <div className='flex items-center gap-2 justify-between'>
                    <h2 className='text-lg font-semibold'>Location</h2>
                    <Dialog>
                        <DialogTrigger className="bg-primary text-white px-2 py-1 rounded-md" onClick={() => {setLocation("");}}>Add Location</DialogTrigger>
                        <DialogContent className="">
                            <DialogHeader>
                                <DialogTitle>Add Location</DialogTitle>
                                <div className="flex flex-col gap-4">

                                    <div>
                                        <Label>Name</Label>
                                        <Input type="text" placeholder="Title" value={location} onChange={(e) => setLocation(e.target.value)} />
                                    </div>

                                </div>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddLocation}>Save</DialogClose>
                        </DialogContent>

                    </Dialog>
                </div>
                <div className='flex flex-col gap-2 h-[300px] overflow-y-auto'>
                    {locations.map((location, index) => (
                        <div className='flex items-center justify-between border p-2 rounded-md' key={index}>
                            <div>
                                <p>{location.name}</p>
                            </div>
                            <div className="flex items-center gap-10">
                                <Dialog>
                                    <DialogTrigger className="" onClick={() => { setLocation(location.name); }}><MdEdit className="cursor-pointer text-md" /></DialogTrigger>
                                    <DialogContent className="">
                                        <DialogHeader>
                                            <DialogTitle>Edit Location</DialogTitle>
                                            <div className="flex flex-col gap-4">

                                                <div>
                                                    <Label>Name</Label>
                                                    <Input type="text" placeholder="Title" defaultValue={location.name} onChange={(e) => setLocation(e.target.value)} />
                                                </div>

                                            </div>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleEditLocation(location._id)}>Save</DialogClose>
                                    </DialogContent>

                                </Dialog>

                            
                            <Dialog>
                                <DialogTrigger className=""><MdDelete className="cursor-pointer text-md" /></DialogTrigger>
                                <DialogContent className="">
                                    <DialogHeader>
                                        <DialogTitle>Delete Location</DialogTitle>
                                        <p>Are you sure you want to delete this location?</p>
                                    </DialogHeader>
                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleDeleteLocation(location._id)}>Delete</DialogClose>
                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md">Cancel</DialogClose>
                                </DialogContent>
                            </Dialog>
                            </div>
                        </div>
                    ))}
                </div>
            </div>  

            </div> 
            

        </div>
    )
}

export default ProjectsPage