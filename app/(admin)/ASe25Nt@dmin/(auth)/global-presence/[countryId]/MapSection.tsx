import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useFieldArray } from 'react-hook-form'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Controller } from 'react-hook-form'
import { UseFormRegister, Control } from 'react-hook-form'
import { GlobalPresenceFormProps } from './page'

interface MapSectionProps {
    register: UseFormRegister<GlobalPresenceFormProps>;
    control: Control<GlobalPresenceFormProps>;
    index: number;
    type: string;
}

const MapSection = ({register,control,index,type}:MapSectionProps) => {

    const { fields: secondSectionFields, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: `section.${index}.items`
    });
  return (
    <div className='p-5 rounded-md flex flex-col gap-2'>
    
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
                            <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b p-2 pb-5 last:border-b-0'>
                                <div className='absolute top-2 right-2'>
                                    <RiDeleteBinLine onClick={() => secondSectionRemove(itemIndex)} className='cursor-pointer text-red-600' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='pl-3 font-bold'>Title</Label>
                                        <Input type='text' placeholder='Title' {...register(`section.${index}.items.${itemIndex}.title`)} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='pl-3 font-bold'>Address</Label>
                                        <Textarea placeholder='Address' {...register(`section.${index}.items.${itemIndex}.address`)} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='pl-3 font-bold'>Phone</Label>
                                        <Input type='text' placeholder='Phone' {...register(`section.${index}.items.${itemIndex}.phone`)} />
                                    </div>
                                </div>

                                <div>
                                <div className='flex flex-col gap-2'>
                                        <Label className='pl-3 font-bold'>Email</Label>
                                        <Textarea placeholder='Email' {...register(`section.${index}.items.${itemIndex}.email`)} />
                                    </div>
                                    {/* <div className='flex flex-col gap-2'>
                                        <Label className='pl-3 font-bold'>Fax</Label>
                                        <Input type='text' placeholder='Fax' {...register(`section.${index}.items.${itemIndex}.fax`)} />
                                    </div> */}
                                </div>
                                
    
                            </div>
                        ))}
    
                        
    
                    </div>
                    <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => secondSectionAppend({ title: "", address: "", phone: "", email: "", fax: "" })}>Add Item +</Button>
                        </div>
                    </div>
    
    
                    </div>
  )
}

export default MapSection