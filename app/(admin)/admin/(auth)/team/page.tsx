"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'

interface TeamFormProps {

    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;

    teamSection:{
        title:string;
        description:string;
        items:{
            name:string;
            designation:string;
            image:string;
            imageAlt:string;
            linkedIn:string;
        }[]
    }
}

const TeamPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<TeamFormProps>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "teamSection.items"
    });


    const handleAddTeam = async (data: TeamFormProps) => {
        try {
            const response = await fetch(`/api/admin/team`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding team", error);
        }
    }

    const fetchTeamData = async () => {
        try {
            const response = await fetch(`/api/admin/team`);
            if (response.ok) {
                const data = await response.json();

                setValue("banner", data.data.banner);
                setValue("bannerAlt", data.data.bannerAlt);
                setValue("pageTitle", data.data.pageTitle);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("teamSection", data.data.teamSection);
                setValue("teamSection.items", data.data.teamSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching team data", error);
        }
    }



    useEffect(() => {
        fetchTeamData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddTeam)}>


                <div className='flex flex-col gap-2'>
                    <div>
                        <Label className="pl-3 font-bold">Banner</Label>
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
                        <Label className='pl-3 font-bold'>Alt Tag</Label>
                        <Input type='text' placeholder='Alt Tag' {...register("bannerAlt")} />
                    </div>
                    <div>
                        <Label className='pl-3 font-bold'>Page Title</Label>
                        <Input type='text' placeholder='Page Title' {...register("pageTitle")} />
                    </div>
                </div>

                <Label className='pl-3 font-bold border-b p-2 text-lg'>Team Section</Label>
                <div className='border p-2 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("teamSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.teamSection?.title && <p className='text-red-500'>{errors.teamSection?.title.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='pl-3 font-bold'>Description</Label>
                            <Textarea placeholder='Description' {...register("teamSection.description")} />
                        </div>
                    </div>

                            <div>
                    <Label className='pl-3 font-bold'>Members</Label>
                <div className='border p-2 rounded-md flex flex-col gap-5'>


                    {fields.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-2 gap-2 relative border p-2 rounded-md'>
                            <div className='absolute top-2 right-2'>
                                <RiDeleteBinLine onClick={() => remove(index)} className='cursor-pointer text-red-600' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Image</Label>
                                    <Controller
                                        name={`teamSection.items.${index}.image`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.teamSection?.items?.[index]?.image && <p className='text-red-500'>{errors.teamSection?.items?.[index]?.image.message}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register(`teamSection.items.${index}.imageAlt`)} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Name</Label>
                                    <Input type='text' placeholder='Name' {...register(`teamSection.items.${index}.name`, {
                                        required: "Name is required"
                                    })} />
                                    {errors.teamSection?.items?.[index]?.name && <p className='text-red-500'>{errors.teamSection?.items?.[index]?.name.message}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>Designation</Label>
                                    <Input type='text' placeholder='Designation' {...register(`teamSection.items.${index}.designation`, {
                                        required: "Designation is required"
                                    })} />
                                    {errors.teamSection?.items?.[index]?.designation && <p className='text-red-500'>{errors.teamSection?.items?.[index]?.designation.message}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='pl-3 font-bold'>LinkedIn</Label>
                                    <Input type='text' placeholder='LinkedIn' {...register(`teamSection.items.${index}.linkedIn`, {
                                        required: "LinkedIn is required"
                                    })} />
                                    {errors.teamSection?.items?.[index]?.linkedIn && <p className='text-red-500'>{errors.teamSection?.items?.[index]?.linkedIn.message}</p>}
                                </div>
                            </div>

                        </div>
                    ))}

                    <div>
                        <Button type='button' className="w-full cursor-pointer" onClick={() => append({ name: "", designation: "", linkedIn: "",image:"",imageAlt:"" })}>Add Member</Button>
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

export default TeamPage