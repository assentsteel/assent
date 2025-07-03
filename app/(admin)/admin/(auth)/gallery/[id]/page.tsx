"use client"

import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { ImageUploader } from '@/components/ui/image-uploader'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const AdminIndiGallery = () => {
    const {id} = useParams();
    const router = useRouter();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const handleImageUpload = (url: string) => {
        setImageUrls([...imageUrls, url]);
    };
    const handleRemoveImage = (index: number) => {
        const updatedUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(updatedUrls);
    };

    const handlePushImages = async () => {
        try {
            const response = await fetch(`/api/admin/gallery?id=${id}`, {
                method: "POST",
                body: JSON.stringify({ images: imageUrls }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                setImageUrls([]);
                router.push("/admin/gallery");
            }
        } catch (error) {
            console.log("Error in pushing images", error);
        }
    }

    const fetchImages = async () => {
        try {
            const response = await fetch(`/api/admin/gallery?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                setImageUrls(data.data);
            }
        } catch (error) {
            console.log("Error in fetching images", error);
        }
    }

    useEffect(() => {
        fetchImages();
    }, []);

  return (
    <div className='flex flex-col gap-5'>
                    <Label className="block text-sm">Images</Label>
                    <div className="mt-2">
                        <ImageUploader onChange={(url: string) => handleImageUpload(url)} deleteAfterUpload={true} />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        {imageUrls.map((url, index) => (
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
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    <Button className='text-white w-full text-[16px]' onClick={() => handlePushImages()}>Submit</Button>
                </div>
  )
}

export default AdminIndiGallery