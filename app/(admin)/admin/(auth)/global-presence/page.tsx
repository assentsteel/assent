"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'

interface GlobalPresenceFormProps {

    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        mainTitle: string;
        subTitle: string;
        description: string;
    };
    secondSection: {
        title: string;
        items:{
            number: string;
            value: string;
            description: string;
        }[]
    };
    thirdSection: {
        title: string;
        countries:{
            title: string;
            slug: string;
            image: string;
            imageAlt: string;
        }[]
    };
}

const GlobalPresencePage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<GlobalPresenceFormProps>();


    const { fields: secondSectionFields, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const { fields: thirdSectionFields, append: thirdSectionAppend, remove: thirdSectionRemove } = useFieldArray({
        control,
        name: "thirdSection.countries"
    });

    const handleAddGlobalPresence = async (data: GlobalPresenceFormProps) => {
        try {
            const response = await fetch(`/api/admin/global-presence`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding career", error);
        }
    }

    const fetchGlobalPresenceData = async () => {
        try {
            const response = await fetch(`/api/admin/global-presence`);
            if (response.ok) {
                const data = await response.json();

                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.countries", data.data.thirdSection.countries);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching career data", error);
        }
    }



    useEffect(() => {
        fetchGlobalPresenceData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddGlobalPresence)}>


                <div className='flex flex-col gap-2'>
                    <div>
                        <Label className="pl-3 font-bold">Banner</Label>
                        <Controller
                            name="banner"
                            control={control}
                            rules={{ required: "Banner is required" }}
                            render={({ field }) => (
                                <ImageUploader
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.banner && (
                            <p className="text-red-500">{errors.banner.message}</p>
                        )}
                    </div>
                    <div>
                        <Label className='pl-3 font-bold'>Alt Tag</Label>
                        <Input type='text' placeholder='Alt Tag' {...register("bannerAlt")} />
                    </div>
                    <div>
                        <Label className='pl-3 font-bold'>Page Title</Label>
                        <Input type='text' placeholder='Page Title' {...register("pageTitle")} />
                    </div>
                </div>

                <Label className='pl-3 font-bold border-b p-2 text-lg'>First Section</Label>
                <div className='border p-2 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Main Title</Label>
                            <Input type='text' placeholder='Main Title' {...register("firstSection.mainTitle", {
                                required: "Main Title is required"
                            })} />
                            {errors.firstSection?.mainTitle && <p className='text-red-500'>{errors.firstSection?.mainTitle.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Sub Title</Label>
                            <Input type='text' placeholder='Sub Title' {...register("firstSection.subTitle", {
                                required: "Sub Title is required"
                            })} />
                            {errors.firstSection?.subTitle && <p className='text-red-500'>{errors.firstSection?.subTitle.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Description</Label>
                            <Controller
                                name="firstSection.description"
                                control={control}
                                rules={{ required: "Description is required" }}
                                render={({ field }) => (
                                    <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                                )}
                            />
                            {errors.firstSection?.description && <p className='text-red-500'>{errors.firstSection?.description.message}</p>}
                        </div>
                    </div>

                </div>


                <Label className='pl-3 font-bold border-b p-2 text-lg'>Second Section</Label>
                <div className='border p-2 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("secondSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.secondSection?.title && <p className='text-red-500'>{errors.secondSection?.title.message}</p>}
                        </div>
                    </div>

                            <div>
                    <Label className='pl-3 font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {secondSectionFields.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border p-2 rounded-md'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Number</Label>
                                    <Input type='text' placeholder='Number' {...register(`secondSection.items.${index}.number`)} />
                                    {errors.secondSection?.items?.[index]?.number && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.number.message}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Value</Label>
                                    <Input type='text' placeholder='Value' {...register(`secondSection.items.${index}.value`)} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Description</Label>
                                    <Textarea placeholder='Description' {...register(`secondSection.items.${index}.description`, {
                                        required: "Description is required"
                                    })} />
                                    {errors.secondSection?.items?.[index]?.description && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.description.message}</p>}
                                </div>
                            </div>

                        </div>
                    ))}

                    <div>
                        <Button type='button' className="w-full cursor-pointer text-white" onClick={() => secondSectionAppend({ description: "", number: "", value: "" })}>Add Item</Button>
                    </div>

                </div>
                </div>


                </div>


                <Label className='pl-3 font-bold border-b p-2 text-lg'>Third Section</Label>
                <div className='border p-2 rounded-md flex flex-col gap-2'>

                            <div>

                            <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                        </div>

                        
                    <Label className='pl-3 font-bold'>Countries</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>

                    
                    {thirdSectionFields.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border p-2 rounded-md'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => thirdSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`thirdSection.countries.${index}.title`, {
                                        required: "Title is required"
                                    })} />
                                    {errors.thirdSection?.countries?.[index]?.title && <p className='text-red-500'>{errors.thirdSection?.countries?.[index]?.title.message}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Slug</Label>
                                    <Input type='text' placeholder='Slug' {...register(`thirdSection.countries.${index}.slug`, {
                                        required: "Slug is required", pattern: {
                                            value: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                                            message: "Slug must contain only lowercase letters, numbers, and hyphens (no spaces)"
                                        }
                                    })} />
                                    {errors.thirdSection?.countries?.[index]?.slug && <p className='text-red-500'>{errors.thirdSection?.countries?.[index]?.slug.message}</p>}
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div>
                                    <Label className='pl-3 font-bold'>Image</Label>
                                    <Controller
                                        name={`thirdSection.countries.${index}.image`}
                                        control={control}
                                        render={({ field }) => (
                                            <ImageUploader value={field.value} onChange={(url) => field.onChange(url)} />
                                        )}
                                    />
                                    {errors.thirdSection?.countries?.[index]?.image && <p className='text-red-500'>{errors.thirdSection?.countries?.[index]?.image.message}</p>}
                                </div>
                                <div>
                                    <Label className='pl-3 font-bold'>Image Alt</Label>
                                    <Input type='text' placeholder='Image Alt' {...register(`thirdSection.countries.${index}.imageAlt`, {
                                        required: "Image Alt is required"
                                    })} />
                                    {errors.thirdSection?.countries?.[index]?.imageAlt && <p className='text-red-500'>{errors.thirdSection?.countries?.[index]?.imageAlt.message}</p>}
                                </div>
                            </div>

                        </div>
                    ))}

                    <div>
                        <Button type='button' className="w-full cursor-pointer text-white" onClick={() => thirdSectionAppend({ title: "", slug: "", image: "", imageAlt: "" })}>Add Item</Button>
                    </div>

                </div>
                </div>


                </div>




                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Meta Title</Label>
                    <Input type='text' placeholder='Meta Title' {...register("metaTitle")} />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Meta Description</Label>
                    <Input type='text' placeholder='Meta Description' {...register("metaDescription")} />
                </div>

                <div className='flex justify-center'>
                    <Button type='submit' className="cursor-pointer text-white">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default GlobalPresencePage