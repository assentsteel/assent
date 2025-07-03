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
import AdminItemContainer from '@/app/component/common/AdminItemContainer';

interface AboutFormProps {

    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        mainTitle: string;
        subTitle: string;
        description: string;
        items: {
            number: string;
            value: string;
        }[];
    };
    secondSection: {
        image1: string;
        image2: string;
        image1Alt: string;
        image2Alt: string;
        title: string;
        description: string;
    };
    historySection: {
        title: string;
        items: {
            year: string;
            title: string;
            description: string;
            image: string;
            imageAlt: string;
        }[];
    };
    purposeSection: {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
    };
    coreValues: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
}

const AboutPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<AboutFormProps>();


    const { fields: firstSectionItems, append: firstSectionAppend, remove: firstSectionRemove } = useFieldArray({
        control,
        name: "firstSection.items"
    });

    const { fields: historySectionItems, append: historySectionAppend, remove: historySectionRemove } = useFieldArray({
        control,
        name: "historySection.items"
    });

    const { fields: coreValuesItems, append: coreValuesAppend, remove: coreValuesRemove } = useFieldArray({
        control,
        name: "coreValues.items"
    });

    const handleAddAbout = async (data: AboutFormProps) => {
        try {
            const response = await fetch(`/api/admin/about`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding about", error);
        }
    }

    const fetchAboutData = async () => {
        try {
            const response = await fetch(`/api/admin/about`);
            if (response.ok) {
                const data = await response.json();
                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("firstSection.items", data.data.firstSection.items);
                setValue("secondSection", data.data.secondSection);
                setValue("historySection", data.data.historySection);
                setValue("historySection.items", data.data.historySection.items);
                setValue("purposeSection", data.data.purposeSection);
                setValue("coreValues", data.data.coreValues);
                setValue("coreValues.items", data.data.coreValues.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching about data", error);
        }
    }



    useEffect(() => {
        fetchAboutData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddAbout)}>


                    <AdminItemContainer>
                        <Label className="" main>Banner</Label>
                        <div className='p-5 rounded-md grid grid-cols-2 gap-5'>
                    <div>
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
                    <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                        <Label className='font-bold'>Alt Tag</Label>
                        <Input type='text' placeholder='Alt Tag' {...register("bannerAlt")} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label className='font-bold'>Page Title</Label>
                        <Input type='text' placeholder='Page Title' {...register("pageTitle")} />
                    </div>
                    </div>
                </div>
                </AdminItemContainer>

                <AdminItemContainer>
                <Label main>First Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Main Title</Label>
                            <Input type='text' placeholder='Main Title' {...register("firstSection.mainTitle", {
                                required: "Main Title is required"
                            })} />
                            {errors.firstSection?.mainTitle && <p className='text-red-500'>{errors.firstSection?.mainTitle.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Sub Title</Label>
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
                    </div>


                    <div>
                    <Label className='font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5 mt-0.5'>


                    {firstSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => firstSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Number</Label>
                                    <Input type='text' placeholder='Number' {...register(`firstSection.items.${index}.number`)} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Value</Label>
                                    <Input type='text' placeholder='Value' {...register(`firstSection.items.${index}.value`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.firstSection?.items?.[index]?.value && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.value.message}</p>}
                                </div>
                            </div>

                        </div>
                    ))}

                    <div className='flex justify-end'>
                        <Button type='button' className="" addItem onClick={() => firstSectionAppend({ number: "", value: "" })}>Add Item</Button>
                    </div>

                </div>
                </div>


                </div>
                </AdminItemContainer>


                <AdminItemContainer>
                <Label main>Second Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='grid grid-cols-2 gap-2'>
                    <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Image 1</Label>
                            <Controller
                                name="secondSection.image1"
                                control={control}
                                rules={{ required: "Image is required" }}
                                render={({ field }) => (
                                    <ImageUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.secondSection?.image1 && (
                                <p className="text-red-500">{errors.secondSection?.image1.message}</p>
                            )}
                            <Label className='font-bold'>Alt Tag</Label>
                            <Input type='text' placeholder='Alt Tag' {...register("secondSection.image1Alt")} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Image 2</Label>
                            <Controller
                                name="secondSection.image2"
                                control={control}
                                rules={{ required: "Image is required" }}
                                render={({ field }) => (
                                    <ImageUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.secondSection?.image2 && (
                                <p className="text-red-500">{errors.secondSection?.image2.message}</p>
                            )}
                            <Label className='font-bold'>Alt Tag</Label>
                            <Input type='text' placeholder='Alt Tag' {...register("secondSection.image2Alt")} />
                        </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("secondSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.secondSection?.title && <p className='text-red-500'>{errors.secondSection?.title.message}</p>}
                        </div>
                        
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name="secondSection.description" control={control} render={({ field }) => {
                                return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                            }} />
                        </div>

                        

                    </div>

                </div>
                </AdminItemContainer>


                <AdminItemContainer>
                <Label main>History Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("historySection.title", {
                                required: "Title is required"
                            })} />
                            {errors.historySection?.title && <p className='text-red-500'>{errors.historySection?.title.message}</p>}
                        </div>
    
                    </div>


                    <div>
                    <Label className='font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {historySectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => historySectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name={`historySection.items.${index}.image`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.historySection?.items?.[index]?.image && (
                                        <p className="text-red-500">{errors.historySection?.items?.[index]?.image.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`historySection.items.${index}.imageAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.historySection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.historySection?.items?.[index]?.imageAlt.message}</p>}
                                </div>
                            </div>


                            </div>

                            <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Year</Label>
                                    <Input type='text' placeholder='Year' {...register(`historySection.items.${index}.year`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.historySection?.items?.[index]?.year && <p className='text-red-500'>{errors.historySection?.items?.[index]?.year.message}</p>}
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`historySection.items.${index}.title`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.historySection?.items?.[index]?.title && <p className='text-red-500'>{errors.historySection?.items?.[index]?.title.message}</p>}
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Description</Label>
                                    <Textarea placeholder='Description' {...register(`historySection.items.${index}.description`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.historySection?.items?.[index]?.description && <p className='text-red-500'>{errors.historySection?.items?.[index]?.description.message}</p>}
                                </div>
                            </div>
                            </div>

                        </div>
                    ))}

                    

                </div>
                <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => historySectionAppend({ year: "", title: "", description: "", image: "", imageAlt: "" })}>Add Item</Button>
                    </div>
                </div>
                    

                </div>
                </AdminItemContainer>


                <AdminItemContainer>
                <Label main>Purpose Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Image</Label>
                            <Controller
                                name="purposeSection.image"
                                control={control}
                                rules={{ required: "Image is required" }}
                                render={({ field }) => (
                                    <ImageUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.purposeSection?.image && (
                                <p className="text-red-500">{errors.purposeSection?.image.message}</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("purposeSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.purposeSection?.title && <p className='text-red-500'>{errors.purposeSection?.title.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name="purposeSection.description" control={control} render={({ field }) => {
                                return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                            }} />
                        </div>

                        

                    </div>

                </div>
                </AdminItemContainer>


                    <AdminItemContainer>
                    <Label main>Core Values</Label>

                <div className='p-5 rounded-md flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`coreValues.title`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.coreValues?.title && <p className='text-red-500'>{errors.coreValues?.title.message}</p>}
                                </div>
                            </div>

                    <Label>Items</Label>
                    <div className='border p-2 rounded-md'>
                    {coreValuesItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-2 last:border-b-0'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => coreValuesRemove(index)} className='cursor-pointer text-red-600' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Image</Label>
                                    <Controller
                                        name={`coreValues.items.${index}.image`}
                                        control={control}
                                        rules={{ required: "Logo is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.coreValues?.items?.[index]?.image && <p className='text-red-500'>{errors.coreValues?.items?.[index]?.image.message}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`coreValues.items.${index}.imageAlt`)} />
                                </div>
                                
                            </div>

                            <div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`coreValues.items.${index}.title`)} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Description</Label>
                                    <Textarea placeholder='Description' {...register(`coreValues.items.${index}.description`)} />
                                </div>
                                
                            </div>

                        </div>
                    ))}
                    
                    </div>
                    <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => coreValuesAppend({ image: "", imageAlt: "", title: "", description: "" })}>Add Item</Button>
                    </div>
                    

                </div>
                </AdminItemContainer>





                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Meta Title</Label>
                    <Input type='text' placeholder='Meta Title' {...register("metaTitle")} />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='pl-3 font-bold'>Meta Description</Label>
                    <Input type='text' placeholder='Meta Description' {...register("metaDescription")} />
                </div>

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default AboutPage