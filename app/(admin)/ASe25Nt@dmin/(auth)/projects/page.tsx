"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import Link from 'next/link'
import { RiAiGenerateText } from 'react-icons/ri'
import SeoFields from '@/app/component/common/SeoFields'
import { SeoFormValues } from '@/types/seo'

interface CategoryFormValues {
    name: string;
    slug: string;
    seo: SeoFormValues;
}

const emptyCategoryForm: CategoryFormValues = {
    name: "",
    slug: "",
    seo: {
        metaTitle: "",
        metaDescription: "",
        ogTitle: "",
        ogDescription: "",
        ogType: "",
        ogImage: "",
        twitterTitle: "",
        twitterDescription: "",
        twitterImage: "",
        schema: "",
    },
};

interface SeoOnlyFormValues {
    seo: SeoFormValues;
}

const emptySeoForm: SeoOnlyFormValues = {
    seo: {
        metaTitle: "",
        metaDescription: "",
        ogTitle: "",
        ogDescription: "",
        ogType: "",
        ogImage: "",
        twitterTitle: "",
        twitterDescription: "",
        twitterImage: "",
        schema: "",
    },
};

const ProjectsPage = () => {
    const {
        register: registerCategory,
        handleSubmit: handleSubmitCategory,
        control: categoryControl,
        formState: { errors: categoryErrors },
        reset: resetCategory,
        setValue: setCategoryValue,
        watch: watchCategory,
    } = useForm<CategoryFormValues>({ defaultValues: emptyCategoryForm });

    const {
        register: registerSeo,
        handleSubmit: handleSubmitSeo,
        control: seoControl,
        formState: { errors: seoErrors },
        reset: resetSeo,
    } = useForm<SeoOnlyFormValues>({ defaultValues: emptySeoForm });

    const [sector, setSector] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [oldSectorName, setOldSectorName] = useState<string>("");
    const [oldLocationName, setOldLocationName] = useState<string>("");

    const [categories, setCategories] = useState<{ _id: string; name: string; seo?: SeoFormValues; slug: string }[]>([]);
    const [sectors, setSectors] = useState<{ _id: string; name: string }[]>([]);
    const [locations, setLocations] = useState<{ _id: string; name: string }[]>([]);

    useEffect(() => {
        fetchCategories();
        fetchSectors();
        fetchLocations();
        fetchSeo();
    }, []);

    const fetchSeo = async () => {
        try {
            const res = await fetch("/api/admin/projects/intrometa");
            const data = await res.json();
            if (data.success) {
                resetSeo({ seo: { ...emptySeoForm.seo, ...data.data.seo } });
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const submitSeo = async (formData: SeoOnlyFormValues) => {
        try {
            const res = await fetch("/api/admin/projects/intrometa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            alert(data.message);
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

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

    const handleAddCategory = async (formData: CategoryFormValues) => {
        try {
            const res = await fetch("/api/admin/projects/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                resetCategory(emptyCategoryForm);
                fetchCategories();
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const handleEditCategory = async (id:string, formData: CategoryFormValues) => {
        try {
            const res = await fetch(`/api/admin/projects/category?id=${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                resetCategory(emptyCategoryForm);
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


    const watchedSlug = watchCategory("slug");
    useEffect(() => {
        if (!watchedSlug) return;
        const newSlug = watchedSlug.replace(/\s+/g, '-');
        if (newSlug !== watchedSlug) setCategoryValue("slug", newSlug);
    }, [watchedSlug])

    const handleAutoGenerate = () => {
        const name = watchCategory("name");
        if (!name) return;
        const slug = name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''); // remove leading/trailing dashes
        setCategoryValue("slug", slug);
      };

    return (
        <div className='flex flex-col gap-5'>
            <form className="h-fit w-full p-2 border-2 border-gray-300 rounded-md flex flex-col gap-4" onSubmit={handleSubmitSeo(submitSeo)}>
                <div className="flex justify-between border-b-2 pb-2">
                    <Label className="text-sm font-bold">SEO Section</Label>
                    <Button type="submit" className="text-white text-[16px]">
                        Save
                    </Button>
                </div>
                <SeoFields<SeoOnlyFormValues> control={seoControl} register={registerSeo} errors={seoErrors} />
            </form>

            <div className='flex flex-col gap-5 border-dashed border-2 p-2'>
                <div className='flex items-center gap-2 justify-between'>
                    <h2 className='text-md font-semibold'>Categories</h2>
                    <Dialog>
                        <DialogTrigger className="bg-primary text-white px-2 py-1 rounded-md" onClick={() => resetCategory(emptyCategoryForm)}>Add Category</DialogTrigger>
                        <DialogContent className="max-h-[85vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Add Category</DialogTitle>
                                <form className="flex flex-col gap-4" onSubmit={handleSubmitCategory(handleAddCategory)}>

                                    <div>
                                        <Label>Name</Label>
                                        <Input type="text" placeholder="Title" {...registerCategory("name", { required: "Name is required" })} />
                                        {categoryErrors.name && <p className='text-red-500'>{categoryErrors.name.message}</p>}
                                    </div>
                                    <div>
                <Label className='flex gap-2 items-center mb-1'>
                                                Slug
                                                <div className='flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit' onClick={handleAutoGenerate}>
                                                    <p>Auto Generate</p>
                                                    <RiAiGenerateText />
                                                </div>
                                                </Label>
                    <Input type='text' placeholder='Slug' {...registerCategory("slug", { required: "Slug is required" })} />
                    {categoryErrors.slug && <p className='text-red-500'>{categoryErrors.slug.message}</p>}
                </div>

                                    <SeoFields<CategoryFormValues> control={categoryControl} register={registerCategory} errors={categoryErrors} />

                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" type="submit">Save</DialogClose>
                                </form>
                            </DialogHeader>
                        </DialogContent>

                    </Dialog>
                </div>
                <div className='flex flex-col gap-2 h-[200px] overflow-y-auto'>
                    {categories.map((category, index) => (
                        <div className='flex items-center justify-between border p-2 rounded-md' key={index}>
                            <div>
                                <p className="text-[16px]">{category.name}</p>
                            </div>
                            <div className="flex items-center gap-10">
                                <Dialog>
                                    <DialogTrigger className="" onClick={() => resetCategory({ name: category.name, slug: category.slug, seo: { ...emptyCategoryForm.seo, ...category.seo } })}><MdEdit className="cursor-pointer text-md" /></DialogTrigger>
                                    <DialogContent className="max-h-[85vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>Edit Category</DialogTitle>
                                            <form className="flex flex-col gap-4" onSubmit={handleSubmitCategory((data) => handleEditCategory(category._id, data))}>

                                                <div>
                                                    <Label>Name</Label>
                                                    <Input type="text" placeholder="Title" {...registerCategory("name", { required: "Name is required" })} />
                                                    {categoryErrors.name && <p className='text-red-500'>{categoryErrors.name.message}</p>}
                                                </div>
                                                <div>
                <Label className='flex gap-2 items-center mb-1'>
                                                Slug
                                                <div className='flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit' onClick={handleAutoGenerate}>
                                                    <p>Auto Generate</p>
                                                    <RiAiGenerateText />
                                                </div>
                                                </Label>
                    <Input type='text' placeholder='Slug' {...registerCategory("slug", { required: "Slug is required" })} />
                    {categoryErrors.slug && <p className='text-red-500'>{categoryErrors.slug.message}</p>}
                </div>

                                                <SeoFields<CategoryFormValues> control={categoryControl} register={registerCategory} errors={categoryErrors} />

                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" type="submit">Save</DialogClose>
                                            </form>
                                        </DialogHeader>
                                    </DialogContent>

                                </Dialog>

                                <Link href={`/ASe25Nt@dmin/projects/${category._id}`}><IoMdExit className="cursor-pointer text-md"/></Link>
                            
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
                    <h2 className='text-md font-semibold'>Sector</h2>
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
                                <p className="text-[16px]">{sector.name}</p>
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
                    <h2 className='text-md font-semibold'>Location</h2>
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
                                <p className="text-[16px]">{location.name}</p>
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