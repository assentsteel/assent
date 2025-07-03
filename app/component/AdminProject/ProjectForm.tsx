"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { useForm, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { ImageUploader } from '@/components/ui/image-uploader'
import Image from 'next/image'
import { RiAiGenerateText } from 'react-icons/ri'



interface ProjectFormProps {
  banner:string;
  bannerAlt:string;
  pageTitle:string;
  
  description: string;
    title: string;
    slug: string;
    sector: string;
    location: string;
    employer: string;
    contractor: string;
    consultant: string;
    scope: string;
    steelTonnage: string;
    thumbnail: string;
    thumbnailAlt: string;
    metaTitle: string;
    metaDescription: string;
    images: string []
}

const ProjectForm = ({ editMode }: { editMode?: boolean }) => {

    const router = useRouter();
    const { categoryId:id,projectId } = useParams();

    const [sectorList, setSectorList] = useState<{ name: string }[]>([]);
    const [locationList, setLocationList] = useState<{ name: string }[]>([]);

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<ProjectFormProps>();

    const handleAddProject = async (data: ProjectFormProps) => {
        try {
            const response = await fetch(editMode ? `/api/admin/projects?id=${id}&projectId=${projectId}` : `/api/admin/projects?id=${id}`, {
                method: editMode ? "PATCH" : "POST",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                router.push("/admin/projects/"+id);
            }
        } catch (error) {
            console.log("Error in adding blog", error);
        }
    }

    const fetchProjectData = async () => {
        try {
            const response = await fetch(`/api/admin/projects?id=${id}&projectId=${projectId}`);
            if (response.ok) {
                const data = await response.json();
                setValue("title", data.data.title);
                setValue("slug", data.data.slug);
                setValue("description", data.data.description);
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("sector", data.data.sector);
                setValue("location", data.data.location);
                setValue("employer", data.data.employer);
                setValue("contractor", data.data.contractor);
                setValue("consultant", data.data.consultant);
                setValue("scope", data.data.scope);
                setValue("steelTonnage", data.data.steelTonnage);
                setValue("thumbnail", data.data.thumbnail);
                setValue("thumbnailAlt", data.data.thumbnailAlt);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("images", data.data.images);
                setImageUrls(data.data.images);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching blog data", error);
        }
    }


    const fetchLocation = async () => {
        try {
            const response = await fetch("/api/admin/projects/location");
            if (response.ok) {
                const data = await response.json();
                setLocationList(data.data);
            }
        } catch (error) {
            console.log("Error in fetching location", error);
        }
    }

    const fetchSector = async () => {
        try {
            const response = await fetch("/api/admin/projects/sector");
            if (response.ok) {
                const data = await response.json();
                setSectorList(data.data);
            }
        } catch (error) {
            console.log("Error in fetching sector", error);
        }
    }


    useEffect(() => {
        if(editMode){
          fetchLocation().then(()=>fetchSector()).then(()=>fetchProjectData());
        }else{
            fetchLocation().then(()=>fetchSector());
        }
    }, []);

    useEffect(() => {
        if (watch("slug") === undefined) return;
        const slug = watch("slug").replace(/\s+/g, '-');
        setValue("slug", slug);
    }, [watch("slug")])

    const handleAutoGenerate = () => {
        const name = watch("pageTitle");
        if (!name) return;
        const slug = name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''); // remove leading/trailing dashes
        setValue("slug", slug);
      };



    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const handleImageUpload = async (uploadedUrl: string) => {
        setImageUrls((prev) => [...prev, uploadedUrl]);
        setValue("images", [...imageUrls, uploadedUrl]);
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
        setValue(
            "images",
            imageUrls.filter((_, index) => index !== indexToRemove)
        );
    }; 



    return (
        <div className='flex flex-col gap-5'>
            <h1 className='text-md font-semibold'>{editMode ? "Edit Project" : "Add Project"}</h1>
            <form className='flex flex-col gap-5 border p-2 rounded-md' onSubmit={handleSubmit(handleAddProject)}>
                <div>
                    <Label className=''>Banner</Label>
                    <Controller
                        name="banner"
                        control={control}
                        rules={{ required: "Banner is required" }}
                        render={({ field }) => (
                            <ImageUploader
                                onChange={(url:string)=>field.onChange(url)}
                                value={field.value}
                            />
                        )}
                    />
                    {errors.banner && <p className='text-red-500'>{errors.banner.message}</p>}
                </div>
                <div>
                    <Label className=''>Banner Alt</Label>
                    <Input type='text' placeholder='Banner Alt' {...register("bannerAlt", { required: "Banner Alt is required" })} />
                    {errors.bannerAlt && <p className='text-red-500'>{errors.bannerAlt.message}</p>}
                </div>
                <div>
                    <Label className=''>Page Title</Label>
                    <Input type='text' placeholder='Page Title' {...register("pageTitle", { required: "Page Title is required" })} />
                    {errors.pageTitle && <p className='text-red-500'>{errors.pageTitle.message}</p>}
                </div>
                <div>
                <Label className='flex gap-2 items-center mb-1'>
                                                Slug
                                                <div className='flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit' onClick={handleAutoGenerate}>
                                                    <p>Auto Generate</p>
                                                    <RiAiGenerateText />
                                                </div>
                                                </Label>
                    <Input type='text' placeholder='Slug' {...register("slug", {
                        required: "Slug is required", pattern: {
                            value: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                            message: "Slug must contain only lowercase letters, numbers, and hyphens (no spaces)"
                        }
                    })} />
                    {errors.slug && <p className='text-red-500'>{errors.slug.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className=''>Sector</Label>
                    <Controller
                        name="sector"
                        control={control}
                        rules={{ required: "Sector is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Sector" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sectorList.map((item, index) => (
                                        <SelectItem key={index} value={item.name}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.sector && <p className="text-red-500">{errors.sector.message}</p>}

                </div>

                <div className='flex flex-col gap-2'>
                    <Label className=''>Location</Label>
                    <Controller
                        name="location"
                        control={control}
                        rules={{ required: "Location is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locationList.map((item, index) => (
                                        <SelectItem key={index} value={item.name}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.location && <p className="text-red-500">{errors.location.message}</p>}

                </div>


                <div>
                    <Label className=''>Employer</Label>
                    <Input type='text' placeholder='Employer' {...register("employer")} />
                </div>

                <div>
                    <Label className=''>Contractor</Label>
                    <Input type='text' placeholder='Contractor' {...register("contractor")} />
                </div>

                <div>
                    <Label className=''>Consultant</Label>
                    <Input type='text' placeholder='Consultant' {...register("consultant")} />
                </div>

                <div>
                    <Label className=''>Scope</Label>
                    <Input type='text' placeholder='Scope' {...register("scope")} />
                </div>

                <div>
                    <Label className=''>Steel Tonnage</Label>
                    <Input type='text' placeholder='Steel Tonnage' {...register("steelTonnage")} />
                </div>


                <div className='grid grid-cols-1 gap-2'>
                    <div>
                        <div>
                            <Label className=''>Thumbnail</Label>
                            <ImageUploader onChange={(url) => setValue("thumbnail", url)} value={watch("thumbnail")} />
                            {errors.thumbnail && <p className='text-red-500'>{errors.thumbnail.message}</p>}
                        </div>
                        <div>
                            <Label className=''>Thumbnail Alt</Label>
                            <Input type='text' placeholder='Alt Tag' {...register("thumbnailAlt")} />
                            {errors.thumbnailAlt && <p className='text-red-500'>{errors.thumbnailAlt.message}</p>}
                        </div>
                    </div>


                </div>

                <div className='flex flex-col gap-2 border p-2 rounded-md'>
                   
                <div>
                    <Label className="block text-sm pl-2 ">Images</Label>
                    <div className="mt-2">
                        <ImageUploader onChange={handleImageUpload} deleteAfterUpload={true} />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        {imageUrls.map((url, index) => (
                            <div key={index} className="relative h-40">
                                <Image
                                    src={url}
                                    alt={`Uploaded image ${index + 1}`}
                                    className="h-full w-full object-cover rounded-lg"
                                    width={100}
                                    height={100}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                

                </div>

                <div>
                    <Label className=''>Title</Label>
                    <Input type='text' placeholder='Title' {...register("title", { required: "Title is required" })} />
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                </div>

                <div>
                    <Label className=''>Description</Label>
                    <Controller name="description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                        return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                    }} />
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                </div>

                <div className="h-fit w-full p-2 border-2 border-gray-300 rounded-md mt-5">
                    <div className="flex justify-between border-b-2 pb-2">
                        <Label className="text-sm ">Meta Section</Label>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                        <div>
                            <Label>Meta title</Label>
                            <Input type="text" {...register("metaTitle")} />
                        </div>
                        <div>
                            <Label>Meta Description</Label>
                            <Input type="text" {...register("metaDescription")} />
                        </div>
                    </div>
                </div>


                <div className='flex justify-center'>
                    <Button type='submit' className="cursor-pointer text-white">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default ProjectForm