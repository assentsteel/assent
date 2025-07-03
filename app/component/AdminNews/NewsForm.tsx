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



interface NewsFormProps {
    mainTitle: string;
    subTitle: string;
    slug: string;
    content: string;
    category: string;
    thumbnail: string;
    thumbnailAlt: string;
    coverImage: string;
    coverImageAlt: string;
    metaTitle: string;
    metaDescription: string;
    images: string []
}

const NewsForm = ({ editMode }: { editMode?: boolean }) => {

    const router = useRouter();
    const { id } = useParams();

    const [categoryList, setCategoryList] = useState<{ name: string }[]>([]);

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<NewsFormProps>();

    const handleAddNews = async (data: NewsFormProps) => {
        try {
            const response = await fetch(editMode ? `/api/admin/news?id=${id}` : "/api/admin/news", {
                method: editMode ? "PATCH" : "POST",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                router.push("/admin/news");
            }
        } catch (error) {
            console.log("Error in adding news", error);
        }
    }

    const fetchNewsData = async () => {
        try {
            const response = await fetch(`/api/admin/news?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                setValue("mainTitle", data.data.mainTitle);
                setValue("subTitle", data.data.subTitle);
                setValue("slug", data.data.slug);
                setValue("content", data.data.content);
                setValue("category", data.data.category);
                setValue("thumbnail", data.data.thumbnail);
                setValue("thumbnailAlt", data.data.thumbnailAlt);
                setValue("coverImage", data.data.coverImage);
                setValue("coverImageAlt", data.data.coverImageAlt);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("images", data.data.images);
                setImageUrls(data.data.images);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching news data", error);
        }
    }



    const fetchCategory = async () => {
        try {
            const response = await fetch("/api/admin/news/category");
            if (response.ok) {
                const data = await response.json();
                setCategoryList(data.data);
            }
        } catch (error) {
            console.log("Error in fetching category", error);
        }
    }

    // const fetchLocation = async () => {
    //     try {
    //         const response = await fetch("/api/admin/location");
    //         if (response.ok) {
    //             const data = await response.json();
    //             setLocationList(data.data);
    //         }
    //     } catch (error) {
    //         console.log("Error in fetching location", error);
    //     }
    // }


    useEffect(() => {
        fetchCategory().then(() => ((editMode) ? fetchNewsData() : null));
    }, []);

    useEffect(() => {
        if (watch("slug") === undefined) return;
        const slug = watch("slug").replace(/\s+/g, '-');
        setValue("slug", slug);
    }, [watch("slug")])

    const handleAutoGenerate = () => {
        const name = watch("mainTitle");
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
            <h1 className='text-md font-semibold'>{editMode ? "Edit News" : "Add News"}</h1>
            <form className='flex flex-col gap-5 border p-2 rounded-md' onSubmit={handleSubmit(handleAddNews)}>
                <div>
                    <Label className=''>Main Title</Label>
                    <Input type='text' placeholder='Title' {...register("mainTitle", { required: "Title is required" })} />
                    {errors.mainTitle && <p className='text-red-500'>{errors.mainTitle.message}</p>}
                </div>
                <div>
                    <Label className=''>Sub Title</Label>
                    <Input type='text' placeholder='Title' {...register("subTitle")} />
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
                    <Label className=''>Category</Label>
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=""
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryList.map((item, index) => (
                                        <SelectItem key={index} value={item.name}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}

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
                    <Label className="block text-sm ">Images</Label>
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
                    <Label className=''>Content</Label>
                    <Controller name="content" control={control} rules={{ required: "Content is required" }} render={({ field }) => {
                        return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                    }} />
                    {errors.content && <p className='text-red-500'>{errors.content.message}</p>}
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
                    <Button type='submit' className='bg-primary text-white w-full text-[16px]'>Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default NewsForm