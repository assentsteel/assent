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

interface SteelErectionFormProps {

    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    firstSection: {
        title: string;
        description: string;
        items:{
            image:string;
            imageAlt:string;
        }[]
    };
    secondSection: {
        title: string;
        description: string;
        image: string;
        imageAlt: string;
    };
    thirdSection: {
        title: string;
        description: string;
        items:{
            image:string;
            imageAlt:string;
            title:string;
        }[]
    };
    fourthSection: {
        title: string;
        description: string;
        items: {
            logoAlt: string;
            title: string;
            description: string;
            logo:string;
        }[]
    };
}

const SteelErectionPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<SteelErectionFormProps>();


    const { fields: firstSectionItems, append: firstSectionAppend, remove: firstSectionRemove } = useFieldArray({
        control,
        name: "firstSection.items"
    });

    const { fields: thirdSectionItems, append: thirdSectionAppend, remove: thirdSectionRemove } = useFieldArray({
        control,
        name: "thirdSection.items"
    });

    const { fields: fourthSectionItems, append: fourthSectionAppend, remove: fourthSectionRemove } = useFieldArray({
        control,
        name: "fourthSection.items"
    });


    const handleAddSteelErection = async (data: SteelErectionFormProps) => {
        try {
            const response = await fetch(`/api/admin/services/steel-erection`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding steel erection", error);
        }
    }

    const fetchSteelErectionData = async () => {
        try {
            const response = await fetch(`/api/admin/services/steel-erection`);
            if (response.ok) {
                const data = await response.json();
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("firstSection.items", data.data.firstSection.items);
                setValue("secondSection", data.data.secondSection);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fourthSection.items", data.data.fourthSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching steel erection data", error);
        }
    }



    useEffect(() => {
        fetchSteelErectionData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddSteelErection)}>


                <div className='flex flex-col gap-2'>
                    <div>
                        <Label oneInput>Page Title</Label>
                        <Input type='text' placeholder='Page Title' {...register("pageTitle")} />
                    </div>
                </div>

<AdminItemContainer>
                <Label main>First Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("firstSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
                        </div>
                        <div>
                            <Label className="text-sm font-bold">Description</Label>
                            <Controller name="firstSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                            }} />
                        </div>

                        <div>
                            <Label className='font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {firstSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b p-2 pb-5 last:border-b-0'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => firstSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name={`firstSection.items.${index}.image`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.firstSection?.items?.[index]?.image && (
                                        <p className="text-red-500">{errors.firstSection?.items?.[index]?.image.message}</p>
                                    )}
                                </div>


                            </div>

                            
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`firstSection.items.${index}.imageAlt`, {
                                        required: "Alt Tag is required"
                                    })} />
                                    {errors.firstSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.firstSection?.items?.[index]?.imageAlt.message}</p>}
                                </div>

                            </div>

                        </div>
                    ))}

                    

                </div>
                <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => firstSectionAppend({ image:"",imageAlt:"" })}>Add Item</Button>
                    </div>
                            </div>

                    </div>


                </div>
                </AdminItemContainer>

<AdminItemContainer>
                <Label main>Second Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("secondSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.secondSection?.title && <p className='text-red-500'>{errors.secondSection?.title.message}</p>}
                        </div>
                        <div>
                            <Label className="text-sm font-bold">Description</Label>
                            <Controller name="secondSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                            }} />
                        </div>

                        <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name={`secondSection.image`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.secondSection?.image && (
                                        <p className="text-red-500">{errors.secondSection?.image.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`secondSection.imageAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.secondSection?.imageAlt && <p className='text-red-500'>{errors.secondSection?.imageAlt.message}</p>}
                                </div>
                            </div>


                            </div>


                    </div>


                    


                </div>

                </AdminItemContainer>

<AdminItemContainer>
                <Label main>Third Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                        </div>
                        <div>
                            <Label className="text-sm font-bold">Description</Label>
                            <Controller name="thirdSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                            }} />
                        </div>
                        <div>
                            <Label className='font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {thirdSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b p-2 pb-5 last:border-b-0'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => thirdSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name={`thirdSection.items.${index}.image`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.thirdSection?.items?.[index]?.image && (
                                        <p className="text-red-500">{errors.thirdSection?.items?.[index]?.image.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.imageAlt`, {
                                        required: "Alt Tag is required"
                                    })} />
                                    {errors.thirdSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.imageAlt.message}</p>}
                                </div>

                            </div>


                            </div>

                            <div>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.title`, {
                                    required: "Title is required"
                                })} />
                                {errors.thirdSection?.items?.[index]?.title && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.title.message}</p>}
                            </div>


                        </div>
                    ))}

                    

                </div>
                <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => thirdSectionAppend({ image:"",imageAlt:"",title:"" })}>Add Item</Button>
                    </div>
                            </div>


                    </div>

                </div>
                </AdminItemContainer>


<AdminItemContainer>
                <Label main>Fourth Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("fourthSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Textarea placeholder='Description' {...register("fourthSection.description", {
                                required: "Description is required"
                            })} />
                            {errors.fourthSection?.description && <p className='text-red-500'>{errors.fourthSection?.description.message}</p>}
                        </div>
    
                    </div>


                    <div>
                    <Label className='font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {fourthSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b p-2 pb-5 last:border-b-0'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => fourthSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Logo</Label>
                                    <Controller
                                        name={`fourthSection.items.${index}.logo`}
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
                                    {errors.fourthSection?.items?.[index]?.logo && (
                                        <p className="text-red-500">{errors.fourthSection?.items?.[index]?.logo.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`fourthSection.items.${index}.logoAlt`, {
                                        required: "Alt Tag is required"
                                    })} />
                                    {errors.fourthSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.logoAlt.message}</p>}
                                </div>

                            </div>


                            </div>

                            <div>
                            <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`fourthSection.items.${index}.title`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.fourthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.title.message}</p>}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Description</Label>
                                    <Textarea placeholder='Description' {...register(`fourthSection.items.${index}.description`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.fourthSection?.items?.[index]?.description && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.description.message}</p>}
                                </div>
                                </div>

                        </div>
                    ))}

                    

                </div>
                <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => fourthSectionAppend({ logoAlt:"",title:"",logo:"",description:"" })}>Add Item</Button>
                    </div>
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

                <div className='flex justify-center'>
                    <Button type='submit' className="cursor-pointer text-white w-full text-[16px]">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default SteelErectionPage