"use client"
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Controller, useFieldArray } from 'react-hook-form'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { UseFormRegister, Control } from 'react-hook-form'
import { GlobalPresenceFormProps } from './page'

interface NumberValueProps {
    register: UseFormRegister<GlobalPresenceFormProps>;
    control: Control<GlobalPresenceFormProps>;
    index: number;
    type: string;
}

const NumberValue = ({register,control,index,type}:NumberValueProps) => {

    const { fields: secondSectionFields, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: `section.${index}.items`
    });


  return (
    <div className='border p-2 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <Controller
                                name={`section.${index}.type`}
                                control={control}
                                defaultValue={type}
                                render={({ field }) => <input type="hidden" {...field} />}
                            />
                            <div className='flex flex-col gap-1'>
                                <Label className='pl-3 font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`section.${index}.title`)} />
                            </div>
                        </div>
    
                                <div>
                        <Label className='pl-3 font-bold'>Items</Label>
                    <div className='border p-2 rounded-md flex flex-col gap-5'>
    
    
                        {secondSectionFields.map((field, itemIndex) => (
                            <div key={field.id} className='grid grid-cols-2 gap-2 relative border p-2 rounded-md'>
                                <div className='absolute top-2 right-2'>
                                    <RiDeleteBinLine onClick={() => secondSectionRemove(itemIndex)} className='cursor-pointer text-red-600' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='pl-3 font-bold'>Number</Label>
                                        <Input type='text' placeholder='Number' {...register(`section.${index}.items.${itemIndex}.number`)} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='pl-3 font-bold'>Value</Label>
                                        <Input type='text' placeholder='Value' {...register(`section.${index}.items.${itemIndex}.value`)} />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='pl-3 font-bold'>Description</Label>
                                        <Textarea placeholder='Description' {...register(`section.${index}.items.${itemIndex}.description`)} />
                                    </div>
                                </div>
    
                            </div>
                        ))}
    
                        <div>
                            <Button type='button' className="w-full cursor-pointer bg-green-400" onClick={() => secondSectionAppend({ description: "", number: "", value: "" })}>Add Item +</Button>
                        </div>
    
                    </div>
                    </div>
    
    
                    </div>
  )
}

export default NumberValue