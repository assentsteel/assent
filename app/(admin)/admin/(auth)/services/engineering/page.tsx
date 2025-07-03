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
import { ThreeDUploader } from '@/components/ui/3d-uploader';
import AdminItemContainer from '@/app/component/common/AdminItemContainer';

interface EngineeringFormProps {

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
      title:string;
      description:string;
      items:{
        image:string;
        imageAlt:string;
        title:string;
        description:string;
        logoAlt:string;
        logo:string;
      }[]
    };
    thirdSection: {
        title: string;
        description:string;
        image:string;
        imageAlt:string;
        imageThumbnail:string;
        imageAltThumbnail:string;
        threeDFile:string;
        threeDFileAlt:string;
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
            title:string;
            elements:{
                logoAlt: string;
                title: string;
                description: string;
                logo:string;
            }[]
        }[];
    };
    sixthSection: {
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

const EngineeringPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors },watch } = useForm<EngineeringFormProps>();



    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const { fields: fifthSectionItems, append: fifthSectionAppend, remove: fifthSectionRemove } = useFieldArray({
        control,
        name: "fifthSection.items"
    });

    const { fields: sixthSectionItems, append: sixthSectionAppend, remove: sixthSectionRemove } = useFieldArray({
        control,
        name: "sixthSection.items"
    });

    const handleAddEngineering = async (data: EngineeringFormProps) => {
        try {
            const response = await fetch(`/api/admin/services/engineering`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding engineering", error);
        }
    }

    const fetchEngineeringData = async () => {
        try {
            const response = await fetch(`/api/admin/services/engineering`);
            if (response.ok) {
                const data = await response.json();
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fifthSection", data.data.fifthSection);
                setValue("fifthSection.items", data.data.fifthSection.items);
                setValue("sixthSection", data.data.sixthSection);
                setValue("sixthSection.items", data.data.sixthSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching engineering data", error);
        }
    }



    useEffect(() => {
        fetchEngineeringData();
    }, []);


    const handleAddElement = (index: number) => {
        const currentFiles = watch(`fifthSection.items.${index}.elements`) || [];
        setValue(`fifthSection.items.${index}.elements`, [...currentFiles, { logoAlt: "", title: "", description: "", logo: "" }]);
      };

    const handleRemoveElement = (index: number,fileIndex:number) => {
        const currentFiles = watch(`fifthSection.items.${index}.elements`) || [];
        setValue(`fifthSection.items.${index}.elements`, currentFiles.filter((_, i) => i !== fileIndex));
    }


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddEngineering)}>


                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
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
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Textarea placeholder='Description' {...register("secondSection.description", {
                                required: "Description is required"
                            })} />
                            {errors.secondSection?.description && <p className='text-red-500'>{errors.secondSection?.description.message}</p>}
                        </div>
    
                    </div>


                    <div>
                    <Label className='font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {secondSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b pb-5 last:border-b-0'>
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

                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`secondSection.items.${index}.title`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.secondSection?.items?.[index]?.title && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.title.message}</p>}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Description</Label>
                                    <Textarea placeholder='Description' {...register(`secondSection.items.${index}.description`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.secondSection?.items?.[index]?.description && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.description.message}</p>}
                                </div>

                            </div>


                            </div>


                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Logo</Label>
                                    <Controller
                                        name={`secondSection.items.${index}.logo`}
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
                                    {errors.secondSection?.items?.[index]?.logo && (
                                        <p className="text-red-500">{errors.secondSection?.items?.[index]?.logo.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`secondSection.items.${index}.logoAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.secondSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.logoAlt.message}</p>}
                                </div>
                            </div>


                            </div>


                        </div>
                    ))}

                    

                </div>
                <div className='flex justify-end mt-2'>
                        <Button type='button' addItem onClick={() => secondSectionAppend({ image: "", imageAlt: "", title: "", description: "", logoAlt: "", logo: "" })}>Add Item</Button>
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
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name="thirdSection.description" control={control} render={({ field }) => {
                                return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                            }} />
                        </div>

                            <div className='grid grid-cols-3 gap-2'>
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
                            <Label className='font-bold'>Image Thumbnail</Label>
                            <Controller
                                name="thirdSection.imageThumbnail"
                                control={control}
                                rules={{ required: "Image Thumbnail is required" }}
                                render={({ field }) => (
                                    <ImageUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.thirdSection?.imageThumbnail && (
                                <p className="text-red-500">{errors.thirdSection?.imageThumbnail.message}</p>
                            )}
                            <Label className='font-bold'>Alt Tag</Label>
                            <Input type='text' placeholder='Alt Tag' {...register("thirdSection.imageAltThumbnail")} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>3d File</Label>
                            <Controller
                                name="thirdSection.threeDFile"
                                control={control}
                                rules={{ required: "3d File is required" }}
                                render={({ field }) => (
                                    <ThreeDUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.thirdSection?.threeDFile && (
                                <p className="text-red-500">{errors.thirdSection?.threeDFile.message}</p>
                            )}
                            <Label className='font-bold'>Alt Tag</Label>
                            <Input type='text' placeholder='Alt Tag' {...register("thirdSection.threeDFileAlt")} />
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

                </div>
                </AdminItemContainer>

                <AdminItemContainer>        
                <Label main>Fifth Section</Label>
                                <div className='p-5 rounded-md flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-1'>
                                            <Label className='font-bold'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register("fifthSection.title", {
                                                required: "Title is required"
                                            })} />
                                            {errors.fifthSection?.title && <p className='text-red-500'>{errors.fifthSection?.title.message}</p>}
                                        </div>
                    
                                    </div>
                
                
                                    <div>
                                    <Label className='font-bold'>Items</Label>
                                <div className='border p-2 rounded-md flex flex-col gap-5'>
                
                
                                    {fifthSectionItems.map((field, index) => (
                                        <div key={field.id}>
                                        <div  className='grid grid-cols-2 gap-2 relative p-2 rounded-md'>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => fifthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                            </div>
                
                                            
                
                                            <div className='flex flex-col gap-2'>
                                                <div>
                                                <Label>Title</Label>
                                                <Input type='text' placeholder='Title' {...register(`fifthSection.items.${index}.title`, {
                                                    required: "Title is required"
                                                })} />
                                                {errors.fifthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.title.message}</p>}
                                                </div>
                
                
                                            <div>
                                        <Button type='button' className="w-full cursor-pointer text-white" onClick={() => {handleAddElement(index)}}>Add Element</Button>
                                    </div>
                
                
                                            </div>
                
                                        </div>
                
                                        
                
                                        <div className='grid grid-cols-2 gap-2'>
                                            {watch(`fifthSection.items.${index}.elements`)?.map((element, elementIndex) => (
                                        <div key={elementIndex} className='grid grid-cols-1 gap-2 relative border rounded-md p-2'>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => handleRemoveElement(index, elementIndex)} className='cursor-pointer text-red-600' />
                                            </div>
                
                                            <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Logo</Label>
                                                    <Controller
                                                        name={`fifthSection.items.${index}.elements.${elementIndex}.logo`}
                                                        control={control}
                                                        rules={{ required: "Logo is required" }}
                                                        render={({ field }) => (
                                                            <ImageUploader
                                                                value={field.value}
                                                                onChange={(url:string) => {
                                                                    field.onChange(url); // update file URL // update size separately
                                                                  }}
                                                                isLogo
                                                            />
                                                        )}
                                                    />
                                                    {errors.fifthSection?.items?.[index]?.elements?.[elementIndex]?.logo && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.elements?.[elementIndex]?.logo.message}</p>}
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Logo Alt</Label>
                                                    <Input type='text' placeholder='Title' {...register(`fifthSection.items.${index}.elements.${elementIndex}.logoAlt`, {
                                                        required: "Title is required"
                                                    })} />
                                                    {errors.fifthSection?.items?.[index]?.elements?.[elementIndex]?.logoAlt && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.elements?.[elementIndex]?.logoAlt.message}</p>}
                                                </div>
                
                                                <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Title</Label>
                                                    <Input type='text' placeholder='Title' {...register(`fifthSection.items.${index}.elements.${elementIndex}.title`, {
                                                        required: "Title is required"
                                                    })} />
                                                    {errors.fifthSection?.items?.[index]?.elements?.[elementIndex]?.title && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.elements?.[elementIndex]?.title.message}</p>}
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Description</Label>
                                                    <Input type='text' placeholder='Description' {...register(`fifthSection.items.${index}.elements.${elementIndex}.description`, {
                                                        required: "Description is required"
                                                    })} />
                                                    {errors.fifthSection?.items?.[index]?.elements?.[elementIndex]?.description && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.elements?.[elementIndex]?.description.message}</p>}
                                                </div>
                
                                                
                                            </div>
                
                
                                            </div>
                
                                        </div>
                                    ))}
                                    </div>
                
                                        </div>
                                    ))}
                
                                    <div className='flex justify-end'>
                                        <Button type='button' addItem onClick={() => {fifthSectionAppend({ title: "", elements: []})}}>Add Item</Button>
                                    </div>
                
                                </div>
                                </div>
                                    
                
                                </div>
                                </AdminItemContainer>


                                <AdminItemContainer>
                                <Label main>Sixth Section</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("sixthSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.sixthSection?.title && <p className='text-red-500'>{errors.sixthSection?.title.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Textarea placeholder='Description' {...register("sixthSection.description", {
                                required: "Description is required"
                            })} />
                            {errors.sixthSection?.description && <p className='text-red-500'>{errors.sixthSection?.description.message}</p>}
                        </div>
    
                    </div>


                    <div>
                    <Label className='font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {sixthSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b p-2 pb-5'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => sixthSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Logo</Label>
                                    <Controller
                                        name={`sixthSection.items.${index}.logo`}
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
                                    {errors.sixthSection?.items?.[index]?.logo && (
                                        <p className="text-red-500">{errors.sixthSection?.items?.[index]?.logo.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`sixthSection.items.${index}.logoAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.sixthSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.logoAlt.message}</p>}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`sixthSection.items.${index}.title`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.sixthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.title.message}</p>}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Description</Label>
                                    <Textarea placeholder='Description' {...register(`sixthSection.items.${index}.description`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.sixthSection?.items?.[index]?.description && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.description.message}</p>}
                                </div>

                            </div>


                            </div>

                        </div>
                    ))}

                    <div className='flex justify-end'>
                        <Button type='button' addItem onClick={() => sixthSectionAppend({ title: "", logo: "", logoAlt: "", description: "" })}>Add Item</Button>
                    </div>

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

export default EngineeringPage