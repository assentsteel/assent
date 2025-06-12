"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'next/navigation'
import { IoMdCloseCircle } from "react-icons/io";
import { sectionTypes } from './data'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import BannerSection from './BannerSection'
import NumberValue from './NumberValue'
import PersonImage from './PersonImage'
import ImageTitle from './ImageTitle'
import MapSection from './MapSection'
import NumberValueNoTitle from './NumberValueNoTitle'
import Projects from './Projects'
import { MdExpandMore } from "react-icons/md";

export interface GlobalPresenceFormProps {
    pageTitle: string;
    slug: string;
    section: Section[];
}

interface BaseSection {
    type: string;
    title: string;
  }
  
  interface BannerSectionType extends BaseSection {
    type: string;
    description: string;
    image: string;
    imageAlt: string;
  }
  
  interface NumberValueSectionType extends BaseSection {
    type: string;
    items: { number: string; value: string; description: string }[];
  }

  interface PersonImageSectionType extends BaseSection {
    type: string;
    description: string;
    designation: string;
    name: string;
    image: string;
    imageAlt: string;
  }

  interface ImageTitleSectionType extends BaseSection {
    type: string;
    description: string;
    title: string;
    image: string;
    imageAlt: string;
  }

  interface MapSectionType extends BaseSection {
    type: string;
    items: { title: string; address: string; phone: string; email: string; fax: string }[]; 
  }

  interface NumberValueNoTitleSectionType extends BaseSection {
    type: string;
    items: { number: string; value: string; description: string }[];
  }

  interface ProjectsSectionType extends BaseSection {
    type: string;
    items: { title: string; project: string; clientLocation: string; quantity: string; image: string; imageAlt: string }[];
  }

  type Section = BannerSectionType | NumberValueSectionType | PersonImageSectionType | ImageTitleSectionType | MapSectionType | NumberValueNoTitleSectionType | ProjectsSectionType;

const IndividualGlobalPresence = () => {

    const params = useParams();
    const countryId = params.countryId;

    const { register, handleSubmit, control, reset } = useForm<GlobalPresenceFormProps>({
        defaultValues: {
            section: []
        }
    });
    const [typeMenuOpen, setTypeMenuOpen] = useState(false);
    const [sections, setSections] = useState<{type: string }[]>([]);

    useEffect(() => {
        handleFetchGlobalPresence();
    },[])

          const handleAddSection = (type: string) => {
            setTypeMenuOpen(false);
            setSections([...sections, { type }]);
          };

          const handleFetchGlobalPresence = async () => {
            try {
                const response = await fetch(`/api/admin/global-presence/country?id=${countryId}`);
                const data = await response.json();
                
                if(data.data.sections.length > 0){
                    setSections(data.data.sections);
                }
                reset({ section: data.data.sections });
            } catch (error) {
                console.log(error);
            }
          }

          const handleAddGlobalPresence = async (data: GlobalPresenceFormProps) => {
            try {
                const response = await fetch(`/api/admin/global-presence/country?id=${countryId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    const data = await response.json();
                    alert(data.message);
                    // router.push("/admin/commitment");
                }
            } catch (error) {
                console.log(error);
            }
        }

        const handleRemoveSection = (index: number) => {
            const updatedSections = sections.filter((_, i) => i !== index);
            setSections(updatedSections);
          };

  return (
    <div className='flex flex-col gap-5'>
                    {sections?.length == 0 ? (
                        <div className='text-center text-gray-500 text-sm'>Start by clicking on the add section button</div>
                    )
                
                :(
                    sections?.map((section,index)=>(
                        <div key={index}>
                            <div className='flex gap-2 items-center'>
                            <h1 className='text-lg font-bold'>{`Section ${index + 1}`}</h1>
                            <IoMdCloseCircle  className='cursor-pointer text-lg text-red-600' onClick={()=>handleRemoveSection(index)}/>
                            </div>
                            {section.type == "Type 1" && (<BannerSection index={index} register={register} control={control} type={section.type}/>)}
                            {section.type == "Type 2" && (<NumberValue index={index} register={register} control={control} type={section.type}/>)}
                            {section.type == "Type 3" && (<PersonImage index={index} register={register} control={control} type={section.type}/>)}
                            {section.type == "Type 4" && (<ImageTitle index={index} register={register} control={control} type={section.type}/>)}
                            {section.type == "Type 5" && (<MapSection index={index} register={register} control={control} type={section.type}/>)}
                            {section.type == "Type 6" && (<NumberValueNoTitle index={index} register={register} control={control} type={section.type}/>)}
                            {section.type == "Type 7" && (<Projects index={index} register={register} control={control} type={section.type}/>)}
                        </div>
                    ))
                )}
                        <Button type="button" className="bg-black text-white items-center gap-2 flex" onClick={()=>setTypeMenuOpen(true)}>Add Section <MdExpandMore className='text-xl'/></Button>
                    
                    {typeMenuOpen && <div className='relative grid grid-cols-4 gap-2 border border-gray-300 p-2'>
                        <IoMdCloseCircle  className='absolute top-2 right-2 cursor-pointer text-lg' onClick={()=>setTypeMenuOpen(false)}/>
                    {sectionTypes.map((item,index)=>(
                        <div onClick={()=>handleAddSection(item.name)} key={index} className=' h-[200px] w-[200px] flex flex-col items-center justify-center hover:border-2 hover:p-2 hover:border-gray-300 hover:shadow-md hover:shadow-gray-300 hover:cursor-pointer'>
                            <Image src={item.image} alt={item.name} width={200} height={200}/>
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>}

                <Button type="submit" className="text-white" onClick={handleSubmit(handleAddGlobalPresence)}>Save</Button>
    </div>
  )
}

export default IndividualGlobalPresence