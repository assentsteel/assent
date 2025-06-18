"use client"

import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Controller, useFieldArray } from 'react-hook-form'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { UseFormRegister, Control } from 'react-hook-form'
import { GlobalPresenceFormProps } from './page'

interface ProjectsProps {
    register: UseFormRegister<GlobalPresenceFormProps>;
    control: Control<GlobalPresenceFormProps>;
    index: number;
    type: string;
}

const Projects = ({register,control,index,type}:ProjectsProps) => {

    const { fields: secondSectionFields, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: `section.${index}.items`
    });

  return (
    <div className='border p-2 rounded-md flex flex-col gap-2'>
                                <div>
                                    <Label className='pl-3 font-bold'>Title</Label>
                                    <Input type="text" placeholder="Title" {...register(`section.${index}.title`)} />
                                </div>
                                <div>
                        <Controller
                                                        name={`section.${index}.type`}
                                                        control={control}
                                                        defaultValue={type}
                                                        render={({ field }) => <input type="hidden" {...field} />}
                                                    />
                        <Label className='pl-3 font-bold'>Items</Label>
                    <div className='border p-2 rounded-md flex flex-col gap-5'>
    
    
                        {secondSectionFields.map((field, itemIndex) => (
                            <div key={field.id} className='grid grid-cols-2 gap-2 relative border p-2 rounded-md'>
                                <div className='absolute top-2 right-2'>
                                    <RiDeleteBinLine onClick={() => secondSectionRemove(itemIndex)} className='cursor-pointer text-red-600' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='pl-3 font-bold'>Title</Label>
                                        <Input type='text' placeholder='Title' {...register(`section.${index}.items.${itemIndex}.title`)} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='pl-3 font-bold'>Project</Label>
                                        <Textarea placeholder='Project' {...register(`section.${index}.items.${itemIndex}.project`)} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='pl-3 font-bold'>Client Location</Label>
                                        <Input type='text' placeholder='Client Location' {...register(`section.${index}.items.${itemIndex}.clientLocation`)} />
                                    </div>
                                </div>

                                <div>
                                <div className='flex flex-col gap-2'>
                                        <Label className='pl-3 font-bold'>Quantity</Label>
                                        <Input type='text' placeholder='Quantity' {...register(`section.${index}.items.${itemIndex}.quantity`)} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='pl-3 font-bold'>Image</Label>
                                        <Controller name={`section.${index}.items.${itemIndex}.image`} control={control} render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={(url:string)=>field.onChange(url)}
                                            />
                                        )} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='pl-3 font-bold'>Alt Tag</Label>
                                        <Input type='text' placeholder='Alt Tag' {...register(`section.${index}.items.${itemIndex}.imageAlt`)} />
                                    </div>
                                </div>
                                
    
                            </div>
                        ))}
    
                        <div>
                            <Button type='button' className="w-full cursor-pointer bg-green-400" onClick={() => secondSectionAppend({ title: "", project: "", clientLocation: "", quantity: "", image: "", imageAlt: "" })}>Add Item +</Button>
                        </div>
    
                    </div>
                    </div>
    
    
                    </div>
  )
}

export default Projects