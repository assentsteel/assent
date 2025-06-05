"use client"

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ImageUploader } from "@/components/ui/image-uploader";


export default function News() {

  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [pageTitle, setPageTitle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imageAlt, setImageAlt] = useState<string>("");

  const [banner, setBanner] = useState<string>("");
  const [bannerAlt, setBannerAlt] = useState<string>("");

  const [awardList, setAwardList] = useState<{_id: string, title: string, image: string, imageAlt: string}[]>([]);

  
  const handleAddAward = async() => {
    try {
      const response = await fetch("/api/admin/awards",{
        method: "POST",
        body: JSON.stringify({ title, image, imageAlt }),
      });
      if(response.ok) {
        const data = await response.json();
        setTitle("");
        setImage("");
        setImageAlt("");
        alert(data.message);
        handleFetchAward();
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error adding industry", error);
    }
  }


  const handleFetchAward = async() => {
    try {
      const response = await fetch("/api/admin/awards");
      if(response.ok) {
        const data = await response.json();
        setMetaTitle(data.data.metaTitle);
        setMetaDescription(data.data.metaDescription);
        setPageTitle(data.data.pageTitle);
        setBanner(data.data.banner);
        setBannerAlt(data.data.bannerAlt);
        setAwardList(data.data.awards);
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching awards", error);
    }
  }

  const handleEditAward = async(id: string) => {
    try {
      const response = await fetch(`/api/admin/awards?id=${id}`,{
        method: "PATCH",
        body: JSON.stringify({ title, image, imageAlt }),
      });
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchAward();
        setTitle("");
        setImage("");
        setImageAlt("")
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error editing award", error);
    }
  }

  const handleDeleteAward = async(id: string) => {
    try {
      const response = await fetch(`/api/admin/awards?id=${id}`,{
        method: "DELETE",
      });
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchAward();
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error deleting award", error);
    }
  }



  const submitMetaSection = async() => {
    try {
      const response = await fetch("/api/admin/awards/intrometa",{
        method: "POST",
        body: JSON.stringify({ metaTitle, metaDescription, pageTitle, banner, bannerAlt }),
      });
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        handleFetchAward();
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
        console.log("Error saving details", error);
    }
  }

  useEffect(()=>{ 
    handleFetchAward();
  },[])

  return (
    <div className="h-fit grid grid-cols-1 gap-5">
                              <div className="h-fit w-full p-2 border-2 border-gray-300 rounded-md mt-5 ">
                                  <div className="flex justify-between border-b-2 pb-2">
                                      <Label className="text-sm font-bold">Meta Section</Label>
                                      <Button onClick={submitMetaSection} className="text-white">Save</Button>
                                  </div>
                                  <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                                        <div>
                                            <Label>Banner</Label>
                                            <ImageUploader
                                            onChange={(url)=>setBanner(url)}
                                            value={banner}
                                            />
                                        </div>
                                        <div>
                                            <Label>Banner Alt Text</Label>
                                            <Input type="text" value={bannerAlt} onChange={(e) => setBannerAlt(e.target.value)} />
                                        </div>
                                      <div>
                                          <Label>Page Title</Label>
                                          <Input type="text" value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} />
                                      </div>
                                      <div>
                                          <Label>Meta title</Label>
                                          <Input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                                      </div>
                                      <div>
                                          <Label>Meta Description</Label>
                                          <Input type="text" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
                                      </div>
                                  </div>
                              </div>

        <div className="h-[400px] w-full p-2 border-2 border-gray-300 rounded-md overflow-y-hidden">
          <div className="flex justify-between border-b-2 pb-2">
            <Label className="text-sm font-bold">Awards And Accreditations</Label>
            <Dialog>
              <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>{setTitle(""); setImage(""); setImageAlt("")}}>Add Award</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Award</DialogTitle>
                  <div>
                    <div>
                    <Label>Title</Label>
                    <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                    <Label>Image</Label>
                    <ImageUploader
                    onChange={(url)=>setImage(url)}
                    value={image}
                    />
                    </div>
                    <div>
                    <Label>Alt Text</Label>
                    <Input type="text" placeholder="Alt Text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} />
                    </div>
                  </div>
                </DialogHeader>
                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddAward}>Save</DialogClose>
              </DialogContent>

            </Dialog>
          </div>
          <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-3/4">
            {awardList?.map((item)=>(
              <div className="flex justify-between border p-1 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
              <div>
                {item.title}
              </div>
              <div className="flex gap-5">
              <Dialog>
              <DialogTrigger onClick={()=>{setTitle(item.title); setImage(item.image); setImageAlt(item.imageAlt)}}><MdEdit/></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Award</DialogTitle>
                  <div>
                    <div>
                    <Label>Title</Label>
                    <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                    <Label>Image</Label>
                    <ImageUploader
                    onChange={(url)=>setImage(url)}
                    value={image}
                    />
                    </div>
                    <div>
                    <Label>Alt Text</Label>
                    <Input type="text" placeholder="Alt Text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} />
                    </div>
                  </div>
                </DialogHeader>
                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleEditAward(item._id)}>Save</DialogClose>
              </DialogContent>

            </Dialog>



                <Dialog>
              <DialogTrigger><MdDelete/></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2">
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleDeleteAward(item._id)}>Yes</DialogClose>
                </div>

              </DialogContent>

            </Dialog>

              </div>
            </div>
            ))}
            
          </div>
        </div>

    </div>
  );
}

