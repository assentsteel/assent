"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import DeleteAccreditationDialog from './components/DeleteAccreditation'

const AccreditaionList = () => {

    const [files, setFiles] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchFiles = async () => {
        const response = await fetch("/api/admin/accreditation");
        const data = await response.json();
        setFiles(data.data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleClickNewAccreditation = () => {
        router.push("/admin/accreditation/new");
    };

    const handleEditAccreditation = (id: string) => {
        router.push(`/admin/accreditation/${id}`);
    };


    if (isLoading) {
        return (
            <div className="p-6 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading files...</p>
                </div>
            </div>
        );
    }


    return (
        <div>
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold">Accreditation</h1>
                <Button className="bg-primary text-white" onClick={handleClickNewAccreditation}>
                    <span className="mr-2">+</span>
                    Add Accrediation
                </Button>
            </div>

            
                {files?.length == 0 ? 
                
                (<div className="text-center py-12 bg-gray-50 rounded-lg mt-5">
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No accreditation found</h3>
                    <p className="text-gray-500 mb-4">Get started by creating your first accreditation</p>
                    <Button className="bg-primary text-white" onClick={handleClickNewAccreditation}>
                        <span className="mr-2">+</span>
                        Add Accreditation
                    </Button>
                </div>) 
                
                : 
                
                (<div className='grid grid-cols-3 gap-5 mt-5'>
                {files && files.map((item:{title:string;_id:string;files:{thumbnail:string;}[];},index) => (
                    <Card key={index}>
                        <div className='grid grid-cols-2 p-5'>
                            <CardHeader>{item.title}</CardHeader>
                            <CardContent className='w-40 h-40 relative'>
                                <Image className="absolute object-cover w-full h-full" src={item.files[0].thumbnail} alt='image' fill />
                            </CardContent>
                        </div>

                        <CardFooter className='flex gap-5'>
                            <Button variant="outline" size="sm" onClick={() => handleEditAccreditation(item._id)}>
                                Edit
                            </Button>
                            <DeleteAccreditationDialog accreditationId={item._id} onDelete={fetchFiles} />
                        </CardFooter>
                    </Card>
                ))}
                </div>)}

            </div>
        
    )
}

export default AccreditaionList