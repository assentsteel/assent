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

interface BlastingFormProps {

    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    firstSection: {
        title: string;
        description: string;
        image: string;
        imageAlt: string;
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
        image: string;
        imageAlt: string;
    };
    fourthSection: {
        title: string;
        items: {
            logoAlt: string;
            title: string;
            logo:string;
            number:string;
            value:string;
            description:string;
        }[];
    };
    fifthSection: {
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

const BlastingPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<BlastingFormProps>();


    const { fields: fourthSectionItems, append: fourthSectionAppend, remove: fourthSectionRemove } = useFieldArray({
        control,
        name: "fourthSection.items"
    });

    const { fields: fifthSectionItems, append: fifthSectionAppend, remove: fifthSectionRemove } = useFieldArray({
        control,
        name: "fifthSection.items"
    });


    const handleAddBlasting = async (data: BlastingFormProps) => {
        try {
            const response = await fetch(`/api/admin/services/blasting`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding blasting", error);
        }
    }

    const fetchBlastingData = async () => {
        try {
            const response = await fetch(`/api/admin/services/blasting`);
            if (response.ok) {
                const data = await response.json();
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("thirdSection", data.data.thirdSection);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fourthSection.items", data.data.fourthSection.items);
                setValue("fifthSection", data.data.fifthSection);
                setValue("fifthSection.items", data.data.fifthSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching blasting data", error);
        }
    }



    useEffect(() => {
        fetchBlastingData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddBlasting)}>


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

                            <div className='grid grid-cols-2 gap-2'>
                                

                        <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Image</Label>
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

                            </div>
                            
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`firstSection.imageAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.firstSection?.imageAlt && <p className='text-red-500'>{errors.firstSection?.imageAlt.message}</p>}
                                </div>
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

                        <div className='grid grid-cols-2 gap-2'>
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

                        <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name={`thirdSection.image`}
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
                                </div>

                            </div>

                            
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.imageAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.thirdSection?.imageAlt && <p className='text-red-500'>{errors.thirdSection?.imageAlt.message}</p>}
                                </div>
                            </div>
                            </div>


                    </div>

                </div>
                </AdminItemContainer>


<AdminItemContainer>
                                <Label main>Fourth Section</Label>
                <div className='border p-2 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                    
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("fourthSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                        </div>

                         <div>
                            <Label className='font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {fourthSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b p-2 h-[400px] last:border-b-0'>
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
                                        required: "Value is required"
                                    })} />
                                    {errors.fourthSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.logoAlt.message}</p>}
                                </div>

                            </div>


                            </div>


                            <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Number</Label>
                                    <Input type='text' placeholder='Number' {...register(`fourthSection.items.${index}.number`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.fourthSection?.items?.[index]?.number && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.number.message}</p>}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Value</Label>
                                    <Input type='text' placeholder='Value' {...register(`fourthSection.items.${index}.value`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.fourthSection?.items?.[index]?.value && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.value.message}</p>}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Description</Label>
                                    <Controller
                                    name={`fourthSection.items.${index}.description`}
                                    control={control}
                                    rules={{ required: "Description is required" }}
                                    render={({ field }) => (
                                        <ReactQuill value={field.value || ""} onChange={field.onChange} />
                                    )}
                                    />
                                    {errors.fourthSection?.items?.[index]?.description && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.description.message}</p>}
                                </div>

                            </div>


                        </div>
                    ))}

                    

                </div>
                <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => fourthSectionAppend({ logoAlt:"",title:"",logo:"",number:"",value:"",description:"" })}>Add Item</Button>
                    </div>
                            </div>
                        

                    </div>

                </div>
                </AdminItemContainer>


<AdminItemContainer>
                                <Label main>Fifth Section</Label>
                <div className='border p-2 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("fifthSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.fifthSection?.title && <p className='text-red-500'>{errors.fifthSection?.title.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Textarea placeholder='Description' {...register("fifthSection.description", {
                                required: "Description is required"
                            })} />
                            {errors.fifthSection?.description && <p className='text-red-500'>{errors.fifthSection?.description.message}</p>}
                        </div>
    
                    </div>


                    <div>
                    <Label className='font-bold'>Items</Label>
                <div className='border rounded-md flex flex-col gap-5 p-2'>


                    {fifthSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b p-2 pb-5 last:border-b-0'>
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
                                    {errors.fifthSection?.items?.[index]?.logo && (
                                        <p className="text-red-500">{errors.fifthSection?.items?.[index]?.logo.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`fifthSection.items.${index}.logoAlt`, {
                                        required: "Alt Tag is required"
                                    })} />
                                    {errors.fifthSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.logoAlt.message}</p>}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`fifthSection.items.${index}.title`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.fifthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.title.message}</p>}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Description</Label>
                                    <Textarea placeholder='Description' {...register(`fifthSection.items.${index}.description`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.fifthSection?.items?.[index]?.description && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.description.message}</p>}
                                </div>

                            </div>


                            </div>

                        </div>
                    ))}

                    

                </div>
                <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => fifthSectionAppend({ logoAlt:"",title:"",logo:"",description:"" })}>Add Item</Button>
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
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default BlastingPage