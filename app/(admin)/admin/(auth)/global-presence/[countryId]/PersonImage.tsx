import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Controller } from 'react-hook-form'
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import {ImageUploader} from '@/components/ui/image-uploader'
import { UseFormRegister, Control } from 'react-hook-form'
import { GlobalPresenceFormProps } from './page'

interface PersonImageProps {
    register: UseFormRegister<GlobalPresenceFormProps>;
    control: Control<GlobalPresenceFormProps>;
    index: number;
    type: string;
}

const PersonImage = ({register,control,index,type}:PersonImageProps) => {
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
                            <Label className='pl-3 font-bold'>Name</Label>
                            <Input type='text' placeholder='Name' {...register(`section.${index}.name`)} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Designation</Label>
                            <Input type='text' placeholder='Designation' {...register(`section.${index}.designation`)} />
                        </div>
                        <div>
                            <Label className="text-sm font-bold">Description</Label>
                            <Controller name={`section.${index}.description`} control={control} render={({ field }) => {
                                return <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                            }} />
                        </div>

                        <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Image</Label>
                                    <Controller
                                        name={`section.${index}.image`}
                                        control={control}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>

                                <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`section.${index}.imageAlt`)} />
                                </div>
                            </div>


                            </div>


                    </div>


                </div>
  )
}

export default PersonImage