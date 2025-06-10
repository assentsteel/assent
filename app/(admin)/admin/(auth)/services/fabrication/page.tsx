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

interface FabricationFormProps {

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
      }[]
    };
    thirdSection: {
        title: string;
        description:string;
        items:{
            logoAlt: string;
            title: string;
            logo:string;
        }[]
    };
    fourthSection: {
        title: string;
        description:string;
        items: {
            title:string;
            images:{
                imageAlt: string;
                image:string;
            }[]
        }[];
    };
    fifthSection: {
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

const FabricationPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors },watch } = useForm<FabricationFormProps>();



    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
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

    const { fields: sixthSectionItems, append: sixthSectionAppend, remove: sixthSectionRemove } = useFieldArray({
        control,
        name: "sixthSection.items"
    });

    const handleAddFabrication = async (data: FabricationFormProps) => {
        try {
            const response = await fetch(`/api/admin/services/fabrication`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding fabrication", error);
        }
    }

    const fetchFabricationData = async () => {
        try {
            const response = await fetch(`/api/admin/services/fabrication`);
            if (response.ok) {
                const data = await response.json();
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fourthSection.items", data.data.fourthSection.items);
                setValue("fifthSection", data.data.fifthSection);
                setValue("fifthSection.items", data.data.fifthSection.items);
                setValue("sixthSection", data.data.sixthSection);
                setValue("sixthSection.items", data.data.sixthSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching fabrication data", error);
        }
    }



    useEffect(() => {
        fetchFabricationData();
    }, []);


    const handleAddImage = (index: number) => {
        const currentFiles = watch(`fourthSection.items.${index}.images`) || [];
        setValue(`fourthSection.items.${index}.images`, [...currentFiles, { imageAlt: "", image: "" }]);
      };

    const handleRemoveImage = (index: number,fileIndex:number) => {
        const currentFiles = watch(`fourthSection.items.${index}.images`) || [];
        setValue(`fourthSection.items.${index}.images`, currentFiles.filter((_, i) => i !== fileIndex));
    }


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddFabrication)}>


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
                            <Label className='pl-3 font-bold'>Title</Label>
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


                    {secondSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border p-2 rounded-md h-[450px]'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Image</Label>
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
                                    <Label className='pl-3 font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`secondSection.items.${index}.imageAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.secondSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.imageAlt.message}</p>}
                                </div>

                            </div>


                            </div>


                            <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`secondSection.items.${index}.title`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.secondSection?.items?.[index]?.title && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.title.message}</p>}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Description</Label>
                                    <Controller name={`secondSection.items.${index}.description`} control={control} render={({ field }) => {
                                        return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                                    }} />
                                    {errors.secondSection?.items?.[index]?.description && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.description.message}</p>}
                                </div>


                            </div>


                        </div>
                    ))}

                    <div>
                        <Button type='button' className="w-full cursor-pointer" onClick={() => secondSectionAppend({ image: "", imageAlt: "", title: "", description: "" })}>Add Item</Button>
                    </div>

                </div>
                </div>
                    

                </div>


                <Label className='pl-3 font-bold border-b p-2 text-lg'>Third Section</Label>
                <div className='border p-2 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                    
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Description</Label>
                            <Textarea placeholder='Description' {...register("thirdSection.description", {
                                required: "Description is required"
                            })} />
                            {errors.thirdSection?.description && <p className='text-red-500'>{errors.thirdSection?.description.message}</p>}
                        </div>

                            
                            <div>
                            <Label className='pl-3 font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {thirdSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border p-2 rounded-md'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => thirdSectionRemove(index)} className='cursor-pointer text-red-600' />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Logo</Label>
                                    <Controller
                                        name={`thirdSection.items.${index}.logo`}
                                        control={control}
                                        rules={{ required: "Logo is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.thirdSection?.items?.[index]?.logo && (
                                        <p className="text-red-500">{errors.thirdSection?.items?.[index]?.logo.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.logoAlt`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.thirdSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.logoAlt.message}</p>}
                                </div>

                            </div>


                            </div>


                            <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Title</Label>
                                    <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.title`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.thirdSection?.items?.[index]?.title && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.title.message}</p>}
                                </div>


                            </div>


                        </div>
                    ))}

                    <div>
                        <Button type='button' className="w-full cursor-pointer" onClick={() => thirdSectionAppend({ logo: "", logoAlt: "", title: "" })}>Add Item</Button>
                    </div>

                </div>
                            </div>
                        

                    </div>

                </div>


                <Label className='pl-3 font-bold border-b p-2 text-lg'>Fourth Section</Label>
                                <div className='border p-2 rounded-md flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
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
                
                
                                    <div>
                                    <Label className='pl-3 font-bold'>Items</Label>
                                <div className='border p-2 rounded-md flex flex-col gap-5'>
                
                
                                    {fourthSectionItems.map((field, index) => (
                                        <div key={field.id}>
                                        <div  className='grid grid-cols-2 gap-2 relative border p-2 rounded-md'>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => fourthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                            </div>
                
                                            
                
                                            <div className='flex flex-col gap-2'>
                                                <div>
                                                <Label>Title</Label>
                                                <Input type='text' placeholder='Title' {...register(`fourthSection.items.${index}.title`, {
                                                    required: "Title is required"
                                                })} />
                                                {errors.fourthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.title.message}</p>}
                                                </div>
                
                
                                            <div>
                                        <Button type='button' className="w-full cursor-pointer" onClick={() => {handleAddImage(index)}}>Add Image</Button>
                                    </div>
                
                
                                            </div>
                
                                        </div>
                
                                        
                
                                        <div className='grid grid-cols-3 gap-2'>
                                            {watch(`fourthSection.items.${index}.images`)?.map((element, elementIndex) => (
                                        <div key={elementIndex} className='grid grid-cols-1 gap-2 relative border p-2 rounded-md'>
                                            <div className='absolute top-2 right-2'>
                                                <RiDeleteBinLine onClick={() => handleRemoveImage(index, elementIndex)} className='cursor-pointer text-red-600' />
                                            </div>
                
                                            <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                    <Label className='pl-3 font-bold'>Image</Label>
                                                    <Controller
                                                        name={`fourthSection.items.${index}.images.${elementIndex}.image`}
                                                        control={control}
                                                        rules={{ required: "Image is required" }}
                                                        render={({ field }) => (
                                                            <ImageUploader
                                                                value={field.value}
                                                                onChange={(url:string) => {
                                                                    field.onChange(url); // update file URL // update size separately
                                                                  }}
                                                            />
                                                        )}
                                                    />
                                                    {errors.fourthSection?.items?.[index]?.images?.[elementIndex] && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.images?.[elementIndex].message}</p>}
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='pl-3 font-bold'>Image Alt</Label>
                                                    <Input type='text' placeholder='Title' {...register(`fourthSection.items.${index}.images.${elementIndex}.imageAlt`, {
                                                        required: "Title is required"
                                                    })} />
                                                    {errors.fourthSection?.items?.[index]?.images?.[elementIndex]?.imageAlt && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.images?.[elementIndex]?.imageAlt.message}</p>}
                                                </div>
                
                                            </div>
                
                                        </div>
                                    ))}
                                    </div>
                
                                        </div>
                                    ))}
                
                                    <div>
                                        <Button type='button' className="w-full cursor-pointer" onClick={() => {fourthSectionAppend({ title: "",images:[]})}}>Add Item</Button>
                                    </div>
                
                                </div>
                                </div>
                                    
                
                                </div>



                                <Label className='pl-3 font-bold border-b p-2 text-lg'>Fifth Section</Label>
                <div className='border p-2 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                    
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("fifthSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.fifthSection?.title && <p className='text-red-500'>{errors.fifthSection?.title.message}</p>}
                        </div>

                         <div>
                            <Label className='pl-3 font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {fifthSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border p-2 rounded-md h-[400px]'>
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
                                        required: "Value is required"
                                    })} />
                                    {errors.fifthSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.logoAlt.message}</p>}
                                </div>

                            </div>


                            </div>


                            <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Number</Label>
                                    <Input type='text' placeholder='Number' {...register(`fifthSection.items.${index}.number`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.fifthSection?.items?.[index]?.number && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.number.message}</p>}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Value</Label>
                                    <Input type='text' placeholder='Value' {...register(`fifthSection.items.${index}.value`, {
                                        required: "Value is required"
                                    })} />
                                    {errors.fifthSection?.items?.[index]?.value && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.value.message}</p>}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Description</Label>
                                    <Controller
                                    name={`fifthSection.items.${index}.description`}
                                    control={control}
                                    rules={{ required: "Description is required" }}
                                    render={({ field }) => (
                                        <ReactQuill value={field.value || ""} onChange={field.onChange} />
                                    )}
                                    />
                                    {errors.fifthSection?.items?.[index]?.description && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.description.message}</p>}
                                </div>

                            </div>


                        </div>
                    ))}

                    <div>
                        <Button type='button' className="w-full cursor-pointer" onClick={() => fifthSectionAppend({ logoAlt:"",title:"",logo:"",number:"",value:"",description:"" })}>Add Item</Button>
                    </div>

                </div>
                            </div>
                        

                    </div>

                </div>



                                <Label className='pl-3 font-bold border-b p-2 text-lg'>Sixth Section</Label>
                <div className='border p-2 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("sixthSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.sixthSection?.title && <p className='text-red-500'>{errors.sixthSection?.title.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Description</Label>
                            <Textarea placeholder='Description' {...register("sixthSection.description", {
                                required: "Description is required"
                            })} />
                            {errors.sixthSection?.description && <p className='text-red-500'>{errors.sixthSection?.description.message}</p>}
                        </div>
    
                    </div>


                    <div>
                    <Label className='pl-3 font-bold'>Items</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {sixthSectionItems.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border p-2 rounded-md'>
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

                    <div>
                        <Button type='button' className="w-full cursor-pointer" onClick={() => sixthSectionAppend({ title: "", logo: "", logoAlt: "", description: "" })}>Add Item</Button>
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
                    <Button type='submit'>Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default FabricationPage