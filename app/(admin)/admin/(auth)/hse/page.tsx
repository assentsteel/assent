"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { FileUploader } from '@/components/ui/file-uploader';
import AdminItemContainer from '@/app/component/common/AdminItemContainer';

interface HseFormProps {

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
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
            files: {
                file: string;
                title: string;
            }[]
        }[]
    };
    thirdSection: {
        title: string;
        description: string;
        image: string;
        imageAlt: string;
    };
    fourthSection: {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
        years: {
            title: string;
            items: {
                number: string;
                value: string;
            }[]
        }[]
    };
}

const HsePage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors }, watch } = useForm<HseFormProps>();


    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    // const { fields: secondSectionFileItems, append: secondSectionFileAppend, remove: secondSectionFileRemove } = useFieldArray({
    //     control,
    //     name: `secondSectionFileItems`
    // });


    const { fields: fourthSectionItems, append: fourthSectionAppend, remove: fourthSectionRemove } = useFieldArray({
        control,
        name: "fourthSection.years"
    });

    const handleAddHse = async (data: HseFormProps) => {
        try {
            const response = await fetch(`/api/admin/hse`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding hse", error);
        }
    }

    const fetchHseData = async () => {
        try {
            const response = await fetch(`/api/admin/hse`);
            if (response.ok) {
                const data = await response.json();
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("thirdSection", data.data.thirdSection);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fourthSection.years", data.data.fourthSection.years);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching hse data", error);
        }
    }



    useEffect(() => {
        fetchHseData();
    }, []);

    const handleAddFile = (index: number) => {
        const currentFiles = watch(`secondSection.items.${index}.files`) || [];
        setValue(`secondSection.items.${index}.files`, [...currentFiles, { file: "", title: "" }]);
    };

    const handleRemoveFile = (index: number, fileIndex: number) => {
        const currentFiles = watch(`secondSection.items.${index}.files`) || [];
        setValue(`secondSection.items.${index}.files`, currentFiles.filter((_, i) => i !== fileIndex));
    }

    const handleAddItem = (index: number) => {
        const currentItems = watch(`fourthSection.years.${index}.items`) || [];
        setValue(`fourthSection.years.${index}.items`, [...currentItems, { number: "", value: "" }]);
    }

    const handleRemoveItem = (index: number, itemIndex: number) => {
        const currentItems = watch(`fourthSection.years.${index}.items`) || [];
        setValue(`fourthSection.years.${index}.items`, currentItems.filter((_, i) => i !== itemIndex));
    }


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddHse)}>


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

                        </div>


                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border p-2 rounded-md flex flex-col gap-5'>


                                {secondSectionItems.map((field, index) => (
                                    <div key={field.id}>
                                        <div className='grid grid-cols-2 gap-2 relative border p-2 rounded-md'>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Image</Label>
                                                    <Controller
                                                        name={`secondSection.items.${index}.image`}
                                                        control={control}
                                                        rules={{ required: "Image is required" }}
                                                        render={({ field }) => (
                                                            <ImageUploader
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        )}
                                                    />
                                                    {errors.secondSection?.items?.[index]?.image && (
                                                        <p className="text-red-500">{errors.secondSection?.items?.[index]?.image.message}</p>
                                                    )}
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Alt Tag</Label>
                                                        <Input type='text' placeholder='Alt Tag' {...register(`secondSection.items.${index}.imageAlt`, {
                                                            required: "Value is required"
                                                        })} />
                                                        {errors.secondSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.imageAlt.message}</p>}
                                                    </div>


                                                </div>



                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div>
                                                    <Label>Title</Label>
                                                    <Input type='text' placeholder='Title' {...register(`secondSection.items.${index}.title`, {
                                                        required: "Title is required"
                                                    })} />
                                                    {errors.secondSection?.items?.[index]?.title && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.title.message}</p>}
                                                </div>

                                                <div>
                                                    <Label>Description</Label>
                                                    <Controller name={`secondSection.items.${index}.description`} control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                                        return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                                                    }} />
                                                </div>

                                                <div>
                                                    <Button type='button' className="w-full cursor-pointer text-white bg-green-400 text-[16px]" onClick={() => { handleAddFile(index) }}>Add File</Button>
                                                </div>


                                            </div>

                                        </div>



                                        <div className='grid grid-cols-2 gap-2 mt-5'>
                                            {watch(`secondSection.items.${index}.files`).map((file, fileIndex) => (
                                                <div key={fileIndex} className='grid grid-cols-1 gap-2 relative border p-2 rounded-md'>
                                                    <div className='absolute top-2 right-2'>
                                                        <RiDeleteBinLine onClick={() => handleRemoveFile(index, fileIndex)} className='cursor-pointer text-red-600' />
                                                    </div>

                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>File</Label>
                                                            <Controller
                                                                name={`secondSection.items.${index}.files.${fileIndex}.file`}
                                                                control={control}
                                                                rules={{ required: "File is required" }}
                                                                render={({ field }) => (
                                                                    <FileUploader
                                                                        value={field.value}
                                                                        onChange={(url: string) => {
                                                                            field.onChange(url); // update file URL // update size separately
                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.secondSection?.items?.[index]?.files?.[fileIndex]?.file && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.files?.[fileIndex]?.file.message}</p>}
                                                        </div>

                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex flex-col gap-2'>
                                                                <Label className='font-bold'>Title</Label>
                                                                <Input type='text' placeholder='Title' {...register(`secondSection.items.${index}.files.${fileIndex}.title`, {
                                                                    required: "Title is required"
                                                                })} />
                                                                {errors.secondSection?.items?.[index]?.files?.[fileIndex]?.title && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.files?.[fileIndex]?.title.message}</p>}
                                                            </div>


                                                        </div>


                                                    </div>

                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                ))}

                                <div>
                                    <Button type='button' className="w-full cursor-pointer text-white text-[16px]" onClick={() => { secondSectionAppend({ image: "", imageAlt: "", title: "", description: "", files: [] }) }}>Add Item</Button>
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
                                <Label className='font-bold'>Image</Label>
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
                                <Label className='font-bold'>Alt Tag</Label>
                                <Input type='text' placeholder='Alt Tag' {...register("thirdSection.imageAlt")} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="thirdSection.description" control={control} render={({ field }) => {
                                    return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                                }} />
                            </div>



                        </div>

                    </div>
                </AdminItemContainer>



                <AdminItemContainer>
                    <div>
                        <div className='flex border-b mb-5'>
                            <Label main>Fourth Section</Label>
                        </div>



                        <div className='p-5 rounded-md flex flex-col gap-5'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`fourthSection.title`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Description</Label>
                                    <Controller name="fourthSection.description" control={control} render={({ field }) => {
                                        return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                                    }} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Image</Label>
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
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register("fourthSection.imageAlt")} />
                                </div>
                            </div>

                            <Label className='font-bold'>Items</Label>
                            <div className='border p-2 rounded-md'>
                                {fourthSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b p-2 pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => fourthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Year</Label>
                                                <Input type='text' placeholder='Year' {...register(`fourthSection.years.${index}.title`)} />
                                            </div>

                                            <div>
                                                <Button type='button' className="w-full cursor-pointer text-white bg-green-400 text-[16px]" onClick={() => { handleAddItem(index) }}>Add Item</Button>
                                            </div>
                                        </div>

<div className='grid grid-cols-2 gap-2'>
                                        {watch(`fourthSection.years.${index}.items`).map((item, itemIndex) => (
                                            <div key={itemIndex} className='grid grid-cols-1 gap-2 relative border p-2 rounded-md'>
                                                <div className='absolute top-2 right-2'>
                                                    <RiDeleteBinLine onClick={() => handleRemoveItem(index, itemIndex)} className='cursor-pointer text-red-600' />
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label className='font-bold'>Number</Label>
                                                        <Input type='text' placeholder='Number' {...register(`fourthSection.years.${index}.items.${itemIndex}.number`)} />
                                                    </div>


                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex flex-col gap-2'>
                                                            <Label className='font-bold'>Value</Label>
                                                            <Input type='text' placeholder='Value' {...register(`fourthSection.years.${index}.items.${itemIndex}.value`, {
                                                                required: "Value is required"
                                                            })} />
                                                            {errors.fourthSection?.years?.[index]?.items?.[itemIndex]?.value && <p className='text-red-500'>{errors.fourthSection?.years?.[index]?.items?.[itemIndex]?.value.message}</p>}
                                                        </div>


                                                    </div>


                                                </div>

                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => fourthSectionAppend({ title: "", items: [] })}>Add Year</Button>
                            </div>

                        </div>
                    </div>
                </AdminItemContainer>




                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Meta Title</Label>
                    <Input type='text' placeholder='Meta Title' {...register("metaTitle")} />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Meta Description</Label>
                    <Input type='text' placeholder='Meta Description' {...register("metaDescription")} />
                </div>

                <div className='flex justify-center'>
                    <Button type='submit' className="w-full cursor-pointer text-white text-[16px]">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default HsePage