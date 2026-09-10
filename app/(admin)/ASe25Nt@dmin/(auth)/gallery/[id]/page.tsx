"use client"

import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { ImageUploader } from '@/components/ui/image-uploader'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { IoIosImages } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { FaEdit } from "react-icons/fa";
import { RiAiGenerateText } from 'react-icons/ri'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const AdminIndiGallery = () => {
    const {id} = useParams();
    const router = useRouter();
    const [category, setCategory] = useState<string>("")
    const [categoryList, setCategoryList] = useState<{_id: string, title: string,slug:string,thumbnail:string,altText:string,metaTitle:string,metaDescription:string,ogTitle:string,ogDescription:string,ogType:string,ogImage:string,twitterTitle:string,twitterDescription:string,twitterImage:string,schema:string}[]>([])
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [slug, setSlug] = useState<string>("")
    const [thumbnail, setThumbnail] = useState<string>("")
    const [altText, setAltText] = useState<string>("")
    const [itemMetaTitle, setItemMetaTitle] = useState<string>("");
      const [itemMetaDescription, setItemMetaDescription] = useState<string>("");
      const [itemOgTitle, setItemOgTitle] = useState<string>("");
      const [itemOgDescription, setItemOgDescription] = useState<string>("");
      const [itemOgType, setItemOgType] = useState<string>("");
      const [itemOgImage, setItemOgImage] = useState<string>("");
      const [itemTwitterTitle, setItemTwitterTitle] = useState<string>("");
      const [itemTwitterDescription, setItemTwitterDescription] = useState<string>("");
      const [itemTwitterImage, setItemTwitterImage] = useState<string>("");
      const [itemSchema, setItemSchema] = useState<string>("");
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
                console.log(data);
                setImageUrls(data.data.images);
                setCategoryList(data.data.categories);
            }
        } catch (error) {
            console.log("Error in fetching images", error);
        }
    }

    const handleAddCategory = async() => {
        try {
            const response = await fetch(`/api/admin/gallery/inside/category?id=${id}`,{
                method: "POST",
                body: JSON.stringify({ name: category,slug:slug,thumbnail:thumbnail,altText:altText,metaTitle:itemMetaTitle,metaDescription:itemMetaDescription,ogTitle:itemOgTitle,ogDescription:itemOgDescription,ogType:itemOgType,ogImage:itemOgImage,twitterTitle:itemTwitterTitle,twitterDescription:itemTwitterDescription,twitterImage:itemTwitterImage,schema:itemSchema }),
            });
            if(response.ok) {
                const data = await response.json();
                setCategory("");
                alert(data.message);
                fetchImages();
                // fetchGalleryData();
            }else{
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error adding category", error);
        }
    }


    const handleEditCategory = async(categoryId: string) => {
        try {
            const response = await fetch(`/api/admin/gallery/inside/category?id=${categoryId}`,{
                method: "PATCH",
                body: JSON.stringify({ name: category,slug:slug,thumbnail:thumbnail,altText:altText, galleryId: id,metaTitle:itemMetaTitle,metaDescription:itemMetaDescription,ogTitle:itemOgTitle,ogDescription:itemOgDescription,ogType:itemOgType,ogImage:itemOgImage,twitterTitle:itemTwitterTitle,twitterDescription:itemTwitterDescription,twitterImage:itemTwitterImage,schema:itemSchema }),
            });
            if(response.ok) {
                const data = await response.json();
                alert(data.message);
                fetchImages();
                // fetchGalleryData();
            }else{
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error editing category", error);
        }
    }

    const handleDeleteCategory = async(categoryId: string) => {
        try {
            const response = await fetch(`/api/admin/gallery/inside/category?id=${categoryId}`,{
                method: "DELETE",
                body: JSON.stringify({ galleryId: id }),
            });
            if(response.ok) {
                const data = await response.json();
                alert(data.message);
                fetchImages();
                // fetchGalleryData();
            }else{
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error deleting category", error);
        }
    }

    const handleAutoGenerate = () => {
        if (!category) return;
        const slug = category
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, ''); // remove leading/trailing dashes
        setSlug(slug);
    };

    useEffect(() => {
        fetchImages();
    }, []);

  return (
    <div className='flex flex-col gap-5'>
    <div className="flex flex-col gap-2 p-5 rounded-md bg-white shadow-md">
                <div className='flex justify-between items-center'>
            <Label className="block text-sm">Categories</Label>
            <Dialog>
                        <DialogTrigger className='bg-primary text-white px-3 py-1 rounded-md font-semibold' onClick={()=>{setCategory("");setSlug("");setThumbnail("");setAltText("");setItemMetaDescription("");setItemMetaTitle("");setItemOgTitle("");setItemOgDescription("");setItemOgImage("");setItemOgType("");setItemTwitterTitle("");setItemTwitterDescription("");setItemTwitterImage("");setItemSchema("")}}>Add Item</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Item</DialogTitle>
                                <DialogDescription className='flex flex-col gap-2 h-[400px] overflow-y-auto'>
                                    <div>
                                    <Label className="block text-sm">Title</Label>
                                    <Input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                                    </div>
                                    <div>
                                        <div className='flex gap-2'>
                                    <Label className="block text-sm">Slug</Label>
                                    <div className='mb-2 flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit' onClick={handleAutoGenerate}>
                                                                                    <p>Auto Generate</p>
                                                                                    <RiAiGenerateText />
                                                                                </div>
                                    </div>
                                    <Input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
                                    </div>
                                    <div>
                                    <Label className="block text-sm">Thumbnail</Label>
                                    <ImageUploader value={thumbnail} onChange={(url) => setThumbnail(url)} />
                                    </div>
                                    <div>
                                    <Label className="block text-sm">Alt Text</Label>
                                    <Input type="text" value={altText} onChange={(e) => setAltText(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Meta Title</Label>
                                        <Input type="text" placeholder="Meta Title" value={itemMetaTitle} onChange={(e) => setItemMetaTitle(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Meta Description</Label>
                                        <Input type="text" placeholder="Meta Description" value={itemMetaDescription} onChange={(e) => setItemMetaDescription(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Og Title</Label>
                                        <Input type="text" placeholder="Falls back to Meta Title if empty" value={itemOgTitle} onChange={(e) => setItemOgTitle(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Og Description</Label>
                                        <Input type="text" placeholder="Falls back to Meta Description if empty" value={itemOgDescription} onChange={(e) => setItemOgDescription(e.target.value)} />
                                    </div>

                                    <div className='flex flex-col gap-2 w-1/2'>
                <Label className='font-bold'>Og Type</Label>

                                                        <Select
                                                            onValueChange={setItemOgType}
                                                            value={itemOgType}
                                                            defaultValue="website"
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Style" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="website">
                                                                    website
                                                                </SelectItem>
                                                                <SelectItem value="article">
                                                                article
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>


                                            </div>


                                            <div className='flex flex-col gap-2 w-1/2'>
                                                <Label className='font-bold'>Og Image</Label>

                                                        <ImageUploader
                                                            value={itemOgImage}
                                                            onChange={setItemOgImage}
                                                        />

                                            </div>
                                    <div>
                                        <Label>Twitter Title</Label>
                                        <Input type="text" placeholder="Falls back to Meta Title if empty" value={itemTwitterTitle} onChange={(e) => setItemTwitterTitle(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Twitter Description</Label>
                                        <Input type="text" placeholder="Falls back to Meta Description if empty" value={itemTwitterDescription} onChange={(e) => setItemTwitterDescription(e.target.value)} />
                                    </div>
                                    <div className='flex flex-col gap-2 w-1/2'>
                                        <Label className='font-bold'>Twitter Image</Label>
                                        <ImageUploader
                                            value={itemTwitterImage}
                                            onChange={setItemTwitterImage}
                                        />
                                    </div>
                                    <div>
                                        <Label>Schema</Label>
                                        <Textarea className="font-mono text-sm" rows={8} placeholder='{ "@context": "https://schema.org", "@type": "WebPage", ... }' value={itemSchema} onChange={(e) => setItemSchema(e.target.value)} />
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddCategory}>Save</DialogClose>
                        </DialogContent>

                    </Dialog>
                    </div>
            <div className='flex flex-col gap-4 py-3'>
                {categoryList?.map((item)=>(
                    <div className='flex justify-between items-center border rounded-md p-4 hover:bg-gray-100  hover:shadow-md transform  transition-all' key={item._id}>
                    <div>
                        <p>{item.title}</p>
                    </div>
                    <div className='flex gap-8 items-center'>
                        <Dialog>
                            <DialogTrigger onClick={()=>{setCategory(item.title);setSlug(item.slug);setThumbnail(item.thumbnail);setAltText(item.altText);setItemMetaTitle(item.metaTitle);setItemMetaDescription(item.metaDescription);setItemOgTitle(item.ogTitle);setItemOgDescription(item.ogDescription);setItemOgImage(item.ogImage);setItemOgType(item.ogType);setItemTwitterTitle(item.twitterTitle);setItemTwitterDescription(item.twitterDescription);setItemTwitterImage(item.twitterImage);setItemSchema(item.schema)}}><FaEdit className='text-lg cursor-pointer' /></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Item</DialogTitle>
                                    <DialogDescription className='flex flex-col gap-2 h-[400px] overflow-y-auto'>
                                    <div>
                                    <Label className="block text-sm">Title</Label>
                                    <Input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                                    </div>
                                    <div>
                                        <div className='flex gap-2'>
                                    <Label className="block text-sm">Slug</Label>
                                    <div className='mb-2 flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit' onClick={handleAutoGenerate}>
                                                                                    <p>Auto Generate</p>
                                                                                    <RiAiGenerateText />
                                                                                </div>
                                    </div>
                                    <Input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
                                    </div>
                                    <div>
                                    <Label className="block text-sm">Thumbnail</Label>
                                    <ImageUploader value={thumbnail} onChange={(url) => setThumbnail(url)} />
                                    </div>
                                    <div>
                                    <Label className="block text-sm">Alt Text</Label>
                                    <Input type="text" value={altText} onChange={(e) => setAltText(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Meta Title</Label>
                                        <Input type="text" placeholder="Meta Title" value={itemMetaTitle} onChange={(e) => setItemMetaTitle(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Meta Description</Label>
                                        <Input type="text" placeholder="Meta Description" value={itemMetaDescription} onChange={(e) => setItemMetaDescription(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Og Title</Label>
                                        <Input type="text" placeholder="Falls back to Meta Title if empty" value={itemOgTitle} onChange={(e) => setItemOgTitle(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Og Description</Label>
                                        <Input type="text" placeholder="Falls back to Meta Description if empty" value={itemOgDescription} onChange={(e) => setItemOgDescription(e.target.value)} />
                                    </div>

                                    <div className='flex flex-col gap-2 w-1/2'>
                <Label className='font-bold'>Og Type</Label>

                                                        <Select
                                                            onValueChange={setItemOgType}
                                                            value={itemOgType}
                                                            defaultValue="website"
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Style" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="website">
                                                                    website
                                                                </SelectItem>
                                                                <SelectItem value="article">
                                                                article
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>


                                            </div>


                                            <div className='flex flex-col gap-2 w-1/2'>
                                                <Label className='font-bold'>Og Image</Label>

                                                        <ImageUploader
                                                            value={itemOgImage}
                                                            onChange={setItemOgImage}
                                                        />

                                            </div>
                                    <div>
                                        <Label>Twitter Title</Label>
                                        <Input type="text" placeholder="Falls back to Meta Title if empty" value={itemTwitterTitle} onChange={(e) => setItemTwitterTitle(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Twitter Description</Label>
                                        <Input type="text" placeholder="Falls back to Meta Description if empty" value={itemTwitterDescription} onChange={(e) => setItemTwitterDescription(e.target.value)} />
                                    </div>
                                    <div className='flex flex-col gap-2 w-1/2'>
                                        <Label className='font-bold'>Twitter Image</Label>
                                        <ImageUploader
                                            value={itemTwitterImage}
                                            onChange={setItemTwitterImage}
                                        />
                                    </div>
                                    <div>
                                        <Label>Schema</Label>
                                        <Textarea className="font-mono text-sm" rows={8} placeholder='{ "@context": "https://schema.org", "@type": "WebPage", ... }' value={itemSchema} onChange={(e) => setItemSchema(e.target.value)} />
                                    </div>
                                </DialogDescription>
                                </DialogHeader>
                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleEditCategory(item._id)}>Save</DialogClose>
                            </DialogContent>
    
                        </Dialog>
    
                        <Link href={`/ASe25Nt@dmin/gallery/${id}/${item._id}`}><IoIosImages className='text-lg cursor-pointer' /></Link>
    
                        <Dialog>
                                      <DialogTrigger><MdDelete className='text-lg cursor-pointer' /></DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Are you sure?</DialogTitle>
                                        </DialogHeader>
                                        <div className="flex gap-2">
                                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleDeleteCategory(item._id)}>Yes</DialogClose>
                                        </div>
                        
                                      </DialogContent>
                        
                                    </Dialog>
    
    
                        
                    </div>
                </div>
                ))}
                </div>

            </div>

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