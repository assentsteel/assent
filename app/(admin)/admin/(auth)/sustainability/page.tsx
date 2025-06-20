"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { FileUploader } from '@/components/ui/file-uploader';
import Image from 'next/image';
import AdminItemContainer from '@/app/component/common/AdminItemContainer';

interface SustainabilityFormProps {

    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            logo: string;
            logoAlt: string;
        }[];
    };
    secondSection: {
        firstTitle: string;
        secondTitle: string;
        thirdTitle:string;
        description:string;
        file: string;
        fileName:string;
        fileDescription: string;
    };
    thirdSection: {
        title: string;
        description:string;
        items: {
            image: string;
            imageAlt: string;
        }[];
    };
    fourthSection: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
    fifthSection: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
    cardImages: string[];
}

const SustainabilityPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<SustainabilityFormProps>();


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

    const { fields: fifthSectionItems, append: fifthSectionAppend, remove: fifthSectionRemove } = useFieldArray({
        control,
        name: "fifthSection.items"
    });


    const handleAddSustainability = async (data: SustainabilityFormProps) => {
        try {
            const response = await fetch(`/api/admin/sustainability`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding sustainability", error);
        }
    }

    const fetchSustainabilityData = async () => {
        try {
            const response = await fetch(`/api/admin/sustainability`);
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
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fourthSection.items", data.data.fourthSection.items);
                setValue("fifthSection", data.data.fifthSection);
                setValue("fifthSection.items", data.data.fifthSection.items);
                setValue("cardImages", data.data.cardImages);
                setCardImageUrls(data.data.cardImages);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching sustainability data", error);
        }
    }



    useEffect(() => {
        fetchSustainabilityData();
    }, []);


    const [cardImageUrls, setCardImageUrls] = useState<string[]>([]);
    const handleCardImageUpload = (url: string) => {
        setCardImageUrls([...cardImageUrls, url]);
        setValue("cardImages", [...cardImageUrls, url]);
    };

    const handleRemoveCardImage = (index: number) => {
        const updatedUrls = cardImageUrls.filter((_, i) => i !== index);
        setCardImageUrls(updatedUrls);
        setValue("cardImages", updatedUrls);
    };


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddSustainability)}>


                <div className='flex flex-col gap-2'>
                    <div>
                        <Label className="font-bold">Banner</Label>
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
                        <Label className='font-bold'>Alt Tag</Label>
                        <Input type='text' placeholder='Alt Tag' {...register("bannerAlt")} />
                    </div>
                    <div>
                        <Label className='font-bold'>Page Title</Label>
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
                                return <Textarea placeholder="Description" {...field} />
                            }} />
                        </div>
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
                            <div className='flex flex-col gap-1'>
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
                            <Label className='font-bold'>Alt Tag</Label>
                            <Input type='text' placeholder='Alt Tag' {...register(`firstSection.items.${index}.imageAlt`)} />
                        </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Logo</Label>
                            <Controller
                                name={`firstSection.items.${index}.logo`}
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
                            {errors.firstSection?.items?.[index]?.logo && (
                                <p className="text-red-500">{errors.firstSection?.items?.[index]?.logo.message}</p>
                            )}
                            <Label className='font-bold'>Alt Tag</Label>
                            <Input type='text' placeholder='Alt Tag' {...register(`firstSection.items.${index}.logoAlt`)} />
                        </div>
                            </div>

                            <div>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register(`firstSection.items.${index}.title`)} />
                        </div>

                        </div>
                    ))}

                    

                </div>
                <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => firstSectionAppend({ logo: "", logoAlt: "",image:"",imageAlt:"",title:"" })}>Add Item</Button>
                    </div>
                </div>


                </div>

                </AdminItemContainer>


<AdminItemContainer>
                <Label main>Second Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <Label className='font-bold'>First Title</Label>
                            <Input type='text' placeholder='First Title' {...register("secondSection.firstTitle", {
                                required: "First Title is required"
                            })} />
                            {errors.secondSection?.firstTitle && <p className='text-red-500'>{errors.secondSection?.firstTitle.message}</p>}
                        </div>
                        <div>
                            <Label className='font-bold'>Second Title</Label>
                            <Input type='text' placeholder='Second Title' {...register("secondSection.secondTitle", {
                                required: "Second Title is required"
                            })} />
                            {errors.secondSection?.secondTitle && <p className='text-red-500'>{errors.secondSection?.secondTitle.message}</p>}
                        </div>
                        <div>
                            <Label className="text-sm font-bold">Description</Label>
                            <Controller name="secondSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                return <Textarea placeholder="Description" {...field} />
                            }} />
                        </div>
                    <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>File</Label>
                            <Controller
                                name="secondSection.file"
                                control={control}
                                rules={{ required: "File is required" }}
                                render={({ field }) => (
                                    <FileUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.secondSection?.file && (
                                <p className="text-red-500">{errors.secondSection?.file.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className='font-bold'>File Name</Label>
                            <Input type='text' placeholder='File Name' {...register("secondSection.fileName", {
                                required: "File Name is required"
                            })} />
                            {errors.secondSection?.fileName && <p className='text-red-500'>{errors.secondSection?.fileName.message}</p>}
                        </div>
                        <div>
                            <Label className='font-bold'>Third Title</Label>
                            <Input type='text' placeholder='Third Title' {...register("secondSection.thirdTitle", {
                                required: "Third Title is required"
                            })} />
                            {errors.secondSection?.thirdTitle && <p className='text-red-500'>{errors.secondSection?.thirdTitle.message}</p>}
                        </div>
                        <div>
                            <Label className='font-bold'>File Description</Label>
                            <Input type='text' placeholder='File Description' {...register("secondSection.fileDescription", {
                                required: "File Description is required"
                            })} />
                            {errors.secondSection?.fileDescription && <p className='text-red-500'>{errors.secondSection?.fileDescription.message}</p>}
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
                            <Label className='font-bold'>Description</Label>
                            <Controller name="thirdSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                return <ReactQuill value={field.value} onChange={field.onChange} />
                            }} />
                            {errors.thirdSection?.description && <p className='text-red-500'>{errors.thirdSection?.description.message}</p>}
                        </div>
    
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

                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.imageAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.thirdSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.imageAlt.message}</p>}
                                </div>
                            </div>


                        </div>
                    ))}

                    

                </div>
                <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => thirdSectionAppend({ image: "", imageAlt: "" })}>Add Item</Button>
                    </div>
                </div>
                    

                </div>
                </AdminItemContainer>


                <AdminItemContainer>
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
                            </div>

                    <Label>Items</Label>
                    {fourthSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b p-2 pb-5 last:border-b-0'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => fourthSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name={`fourthSection.items.${index}.image`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.fourthSection?.items?.[index]?.image && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.image.message}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`fourthSection.items.${index}.imageAlt`)} />
                                </div>
                                
                            </div>

                            <div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`fourthSection.items.${index}.title`)} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Description</Label>
                                    <Textarea placeholder='Description' {...register(`fourthSection.items.${index}.description`)} />
                                </div>
                                
                            </div>

                        </div>
                    ))}

                    <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => fourthSectionAppend({ image: "", imageAlt: "", title: "", description: "" })}>Add Item</Button>
                    </div>

                </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <div className='flex border-b mb-5'>
                    <Label main>Fifth Section</Label>
                    </div>

                    

                <div className='p-5 rounded-md flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`fifthSection.title`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.fifthSection?.title && <p className='text-red-500'>{errors.fifthSection?.title.message}</p>}
                                </div>
                            </div>

                    {fifthSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b p-2 pb-5 last:border-b-0'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => fifthSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name={`fifthSection.items.${index}.image`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.fifthSection?.items?.[index]?.image && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.image.message}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`fifthSection.items.${index}.imageAlt`)} />
                                </div>
                                
                            </div>

                            <div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`fifthSection.items.${index}.title`)} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Description</Label>
                                    <Textarea placeholder='Description' {...register(`fifthSection.items.${index}.description`)} />
                                </div>
                                
                            </div>

                        </div>
                    ))}

                    <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => fifthSectionAppend({ image: "", imageAlt: "", title: "", description: "" })}>Add Item</Button>
                    </div>

                </div>
                </AdminItemContainer>

                <Label className='font-bold text-lg'>Card Images</Label>
                    <div className='flex flex-col gap-5'>
                                        <div className="mt-2">
                                            <ImageUploader onChange={(url: string) => handleCardImageUpload(url)} deleteAfterUpload={true} />
                                        </div>
                                        <div className="mt-4 grid grid-cols-3 gap-4">
                                            {cardImageUrls.map((url, index) => (
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
                                                        onClick={() => handleRemoveCardImage(index)}
                                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>



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

export default SustainabilityPage