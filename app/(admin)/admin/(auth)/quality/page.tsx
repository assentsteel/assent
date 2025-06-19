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

interface QualityFormProps {

    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    firstSection: {
        mainTitle: string;
        subTitle: string;
        description: string;
        image: string;
        imageAlt: string;
    };
    certificateSection: {
      title:string;
      items:{
        image:string;
        imageAlt:string;
      }[]
    };
    thirdSection: {
        title: string;
        description:string;
        image:string;
        imageAlt:string;
    };
    fourthSection: {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
    };
    fifthSection: {
        title: string;
        items: {
            logo: string;
            logoAlt: string;
            title: string;
            description: string;
        }[];
    };
}

const QualityPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<QualityFormProps>();


    const { fields: certificateSectionItems, append: certificateSectionAppend, remove: certificateSectionRemove } = useFieldArray({
        control,
        name: "certificateSection.items"
    });

    const { fields: fifthSectionItems, append: fifthSectionAppend, remove: fifthSectionRemove } = useFieldArray({
        control,
        name: "fifthSection.items"
    });

    const handleAddQuality = async (data: QualityFormProps) => {
        try {
            const response = await fetch(`/api/admin/quality`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding quality", error);
        }
    }

    const fetchQualityData = async () => {
        try {
            const response = await fetch(`/api/admin/quality`);
            if (response.ok) {
                const data = await response.json();
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("certificateSection", data.data.certificateSection);
                setValue("certificateSection.items", data.data.certificateSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fifthSection", data.data.fifthSection);
                setValue("fifthSection.items", data.data.fifthSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching quality data", error);
        }
    }



    useEffect(() => {
        fetchQualityData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddQuality)}>


                <div className='flex flex-col gap-2'>
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
                        <div>
                            <Label className="text-sm font-bold">Description</Label>
                            <Controller name="firstSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                            }} />
                        </div>

                        <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Image</Label>
                                    <Controller
                                        name={`firstSection.image`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.firstSection?.image && (
                                        <p className="text-red-500">{errors.firstSection?.image.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`firstSection.imageAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.firstSection?.imageAlt && <p className='text-red-500'>{errors.firstSection?.imageAlt.message}</p>}
                                </div>
                            </div>


                            </div>


                    </div>


                    


                </div>


                <Label className='pl-3 font-bold border-b p-2 text-lg'>Certificates Section</Label>
                <div className='border p-2 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("certificateSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.certificateSection?.title && <p className='text-red-500'>{errors.certificateSection?.title.message}</p>}
                        </div>
    
                    </div>


                    <div>
                    <Label className='pl-3 font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {certificateSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border p-2 rounded-md'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => certificateSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Image</Label>
                                    <Controller
                                        name={`certificateSection.items.${index}.image`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.certificateSection?.items?.[index]?.image && (
                                        <p className="text-red-500">{errors.certificateSection?.items?.[index]?.image.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`certificateSection.items.${index}.imageAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.certificateSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.certificateSection?.items?.[index]?.imageAlt.message}</p>}
                                </div>
                            </div>


                            </div>


                        </div>
                    ))}

                    <div>
                        <Button type='button' className="w-full cursor-pointer text-white" onClick={() => certificateSectionAppend({ image: "", imageAlt: "" })}>Add Item</Button>
                    </div>

                </div>
                </div>
                    

                </div>


                <Label className='pl-3 font-bold border-b p-2 text-lg'>Third Section</Label>
                <div className='border p-2 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Image</Label>
                            <Controller
                                name="thirdSection.image"
                                control={control}
                                rules={{ required: "Image is required" }}
                                render={({ field }) => (
                                    <ImageUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.thirdSection?.image && (
                                <p className="text-red-500">{errors.thirdSection?.image.message}</p>
                            )}
                            <Label className='pl-3 font-bold'>Alt Tag</Label>
                            <Input type='text' placeholder='Alt Tag' {...register("thirdSection.imageAlt")} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Description</Label>
                            <Controller name="thirdSection.description" control={control} render={({ field }) => {
                                return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                            }} />
                        </div>

                        

                    </div>

                </div>


                <Label className='pl-3 font-bold border-b p-2 text-lg'>Fourth Section</Label>
                <div className='border p-2 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Image</Label>
                            <Controller
                                name="fourthSection.image"
                                control={control}
                                rules={{ required: "Image is required" }}
                                render={({ field }) => (
                                    <ImageUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.fourthSection?.image && (
                                <p className="text-red-500">{errors.fourthSection?.image.message}</p>
                            )}
                            <Label className='pl-3 font-bold'>Alt Tag</Label>
                            <Input type='text' placeholder='Alt Tag' {...register("fourthSection.imageAlt")} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("fourthSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Description</Label>
                            <Textarea placeholder='Description' {...register("fourthSection.description", {
                                required: "Description is required"
                            })} />
                            {errors.fourthSection?.description && <p className='text-red-500'>{errors.fourthSection?.description.message}</p>}
                        </div>

                        

                    </div>

                </div>




                <div>
                    <div className='flex border-b mb-5'>
                    <Label className='pl-3 font-bold text-lg'>Fifth Section</Label>
                    </div>

                    

                <div className='border p-2 rounded-md flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`fifthSection.title`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.fifthSection?.title && <p className='text-red-500'>{errors.fifthSection?.title.message}</p>}
                                </div>
                            </div>

                    {fifthSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border p-2 rounded-md'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => fifthSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Logo</Label>
                                    <Controller
                                        name={`fifthSection.items.${index}.logo`}
                                        control={control}
                                        rules={{ required: "Logo is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                                isLogo
                                            />
                                        )}
                                    />
                                    {errors.fifthSection?.items?.[index]?.logo && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.logo.message}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`fifthSection.items.${index}.logoAlt`)} />
                                </div>
                                
                            </div>

                            <div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`fifthSection.items.${index}.title`)} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Description</Label>
                                    <Textarea placeholder='Description' {...register(`fifthSection.items.${index}.description`)} />
                                </div>
                                
                            </div>

                        </div>
                    ))}

                    <div>
                        <Button type='button' className="w-full cursor-pointer text-white" onClick={() => fifthSectionAppend({ logo: "", logoAlt: "", title: "", description: "" })}>Add Item</Button>
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
                    <Button type='submit' className="w-full cursor-pointer text-white">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default QualityPage