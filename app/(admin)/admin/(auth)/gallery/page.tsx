"use client"

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import { ImageUploader } from '@/components/ui/image-uploader';
import Link from 'next/link'
import { RiAiGenerateText } from 'react-icons/ri'
import { Button } from '@/components/ui/button'

const AdminGallery = () => {

    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [thumbnailAlt, setThumbnailAlt] = useState("");
    const [items, setItems] = useState<{ _id: string; title: string; thumbnail: string; thumbnailAlt: string,slug:string }[]>([]);
    const [slug, setSlug] = useState<string>("")
      const [metaTitle, setMetaTitle] = useState<string>("");
      const [metaDescription, setMetaDescription] = useState<string>("");
      const [pageTitle, setPageTitle] = useState<string>("");

    const handleAddItem = async () => {
        try {
            const res = await fetch("/api/admin/gallery", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, thumbnail, thumbnailAlt,slug }),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                setTitle("");
                setThumbnail("");
                setThumbnailAlt("");
                fetchItems();
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const handleEditItem = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/gallery?id=${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, thumbnail, thumbnailAlt,slug }),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                setTitle("");
                setThumbnail("");
                setThumbnailAlt("");
                fetchItems();
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const handleDeleteItem = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/gallery?id=${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                fetchItems();
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }

    const fetchItems = async () => {
        try {
            const res = await fetch("/api/admin/gallery");
            const data = await res.json();
            if (data.success) {
                setItems(data.data);
                setMetaTitle(data.data.metaTitle);
                setMetaDescription(data.data.metaDescription);
                setPageTitle(data.data.pageTitle);
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    }


    const handleFetchMeta = async() => {
        try {
          const response = await fetch("/api/admin/gallery/intrometa");
          if(response.ok) {
            const data = await response.json();
            setMetaTitle(data.data.metaTitle);
            setMetaDescription(data.data.metaDescription);
            setPageTitle(data.data.pageTitle);
          }else{
            const data = await response.json();
            alert(data.message);
          }
        } catch (error) {
          console.log("Error fetching details", error);
        }
      }


    const submitMetaSection = async() => {
        try {
          const response = await fetch("/api/admin/gallery/intrometa",{
            method: "POST",
            body: JSON.stringify({ metaTitle, metaDescription, pageTitle }),
          });
          if(response.ok) {
            const data = await response.json();
            alert(data.message);
            handleFetchMeta();
          }else{
            const data = await response.json();
            alert(data.message);
          }
        } catch (error) {
            console.log("Error saving details", error);
        }
      }

    useEffect(() => {
        fetchItems();
        handleFetchMeta();
    }, []);

    useEffect(() => {
        if (!slug) return;
        const newSlug = slug.replace(/\s+/g, '-');
        setSlug(newSlug);
    }, [slug])

    const handleAutoGenerate = () => {
        if (!title) return;
        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, ''); // remove leading/trailing dashes
        setSlug(slug);
    };


    return (
        <div>
            <div className='flex flex-col gap-5'>
            <div className="h-fit w-full p-2 border-2 border-gray-300 rounded-md mt-5">
                                              <div className="flex justify-between border-b-2 pb-2">
                                                  <Label className="text-sm font-bold">Meta Section</Label>
                                                  <Button onClick={submitMetaSection} className="text-white text-[16px]">Save</Button>
                                              </div>
                                              <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                                                
                                                  <div>
                                                      <Label>Page Title</Label>
                                                      <Input type="text" defaultValue={pageTitle} onChange={(e) => setPageTitle(e.target.value)} />
                                                  </div>
                                                  <div>
                                                      <Label>Meta title</Label>
                                                      <Input type="text" defaultValue={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                                                  </div>
                                                  <div>
                                                      <Label>Meta Description</Label>
                                                      <Input type="text" defaultValue={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
                                                  </div>
                                              </div>
                                          </div>
                <div className='flex items-center gap-2 justify-between'>
                    <h2 className='text-md font-semibold'>Items</h2>
                    <Dialog>
                        <DialogTrigger className="bg-primary text-white px-2 py-1 rounded-md" onClick={() => { setTitle(""); setThumbnail(""); setThumbnailAlt("");setSlug("") }}>Add Item</DialogTrigger>
                        <DialogContent className="">
                            <DialogHeader>
                                <DialogTitle>Add Item</DialogTitle>
                                <div className="flex flex-col gap-4">

                                    <div>
                                        <Label>Title</Label>
                                        <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label className='flex gap-2 items-center mb-1'>
                                            Slug
                                            <div className='flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit' onClick={handleAutoGenerate}>
                                                <p>Auto Generate</p>
                                                <RiAiGenerateText />
                                            </div>
                                        </Label>
                                        <Input type='text' placeholder='Slug' value={slug} onChange={(e) => setSlug(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Thumbnail</Label>
                                        <ImageUploader value={thumbnail} onChange={(url) => setThumbnail(url)} />
                                    </div>
                                    <div>
                                        <Label>Thumbnail Alt</Label>
                                        <Input type="text" placeholder="Thumbnail Alt" value={thumbnailAlt} onChange={(e) => setThumbnailAlt(e.target.value)} />
                                    </div>

                                </div>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddItem}>Save</DialogClose>
                        </DialogContent>

                    </Dialog>
                </div>
                <div className='flex flex-col gap-2 h-[200px] overflow-y-auto'>
                    {items.map((item, index) => (
                        <div className='flex items-center justify-between border p-2 rounded-md' key={index}>
                            <div>
                                <p className="text-[16px]">{item.title}</p>
                            </div>
                            <div className="flex items-center gap-10">
                                <Dialog>
                                    <DialogTrigger className="" onClick={() => { setTitle(item.title); setThumbnail(item.thumbnail); setThumbnailAlt(item.thumbnailAlt);setSlug(item.slug) }}><MdEdit className="cursor-pointer text-md" /></DialogTrigger>
                                    <DialogContent className="">
                                        <DialogHeader>
                                            <DialogTitle>Edit Item</DialogTitle>
                                            <div className="flex flex-col gap-4">

                                                <div>
                                                    <Label>Title</Label>
                                                    <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label className='flex gap-2 items-center mb-1'>
                                                        Slug
                                                        <div className='flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit' onClick={handleAutoGenerate}>
                                                            <p>Auto Generate</p>
                                                            <RiAiGenerateText />
                                                        </div>
                                                    </Label>
                                                    <Input type='text' placeholder='Slug' value={slug} onChange={(e) => setSlug(e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label>Thumbnail</Label>
                                                    <ImageUploader value={thumbnail} onChange={(url) => setThumbnail(url)} />
                                                </div>
                                                <div>
                                                    <Label>Thumbnail Alt</Label>
                                                    <Input type="text" placeholder="Thumbnail Alt" value={thumbnailAlt} onChange={(e) => setThumbnailAlt(e.target.value)} />
                                                </div>

                                            </div>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditItem(item._id)}>Save</DialogClose>
                                    </DialogContent>

                                </Dialog>

                                <Link href={`/admin/gallery/${item._id}`}><IoMdExit className="cursor-pointer text-md" /></Link>

                                <Dialog>
                                    <DialogTrigger className=""><MdDelete className="cursor-pointer text-md" /></DialogTrigger>
                                    <DialogContent className="">
                                        <DialogHeader>
                                            <DialogTitle>Delete Item</DialogTitle>
                                            <p>Are you sure you want to delete this item?</p>
                                        </DialogHeader>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteItem(item._id)}>Delete</DialogClose>
                                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md">Cancel</DialogClose>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminGallery