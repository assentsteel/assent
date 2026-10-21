"use client"

import AdminItemContainer from '@/app/component/common/AdminItemContainer'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { MdDelete } from 'react-icons/md'

interface FileDownloadItem {
    _id: string;
    name: string;
    email: string;
    fileName: string;
    fileUrl: string;
    createdAt: string;
}

const FileDownloadsPage = () => {
    const [downloads, setDownloads] = useState<FileDownloadItem[]>([]);

    const fetchDownloads = async () => {
        try {
            const response = await fetch("/api/admin/file-downloads");
            const data = await response.json();
            if (response.ok) {
                setDownloads(data.data);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching file downloads", error);
        }
    }

    useEffect(() => {
        fetchDownloads();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/file-downloads?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchDownloads();
            }
        } catch (error) {
            console.log("Error deleting file download", error);
        }
    }

    return (
        <div className='flex flex-col gap-5'>
            <AdminItemContainer>
                <Label main>File Downloads</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='grid grid-cols-5 gap-2 font-bold border-b p-2'>
                        <Label>Name</Label>
                        <Label>Email</Label>
                        <Label>File</Label>
                        <Label>Date</Label>
                        <Label>Action</Label>
                    </div>
                    <div className='flex flex-col gap-2 max-h-[600px] overflow-y-auto'>
                        {downloads.length > 0 ? downloads.map((item) => (
                            <div key={item._id} className='grid grid-cols-5 gap-2 items-center border-b p-2'>
                                <div className='text-sm'>{item.name}</div>
                                <div className='text-sm'>{item.email}</div>
                                <div className='text-sm'>{item.fileName}</div>
                                <div className='text-sm'>{new Date(item.createdAt).toLocaleDateString()}</div>
                                <Dialog>
                                    <DialogTrigger><MdDelete className='cursor-pointer text-red-600 text-lg' /></DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Delete this record?</DialogTitle>
                                        </DialogHeader>
                                        <div className='flex gap-2'>
                                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md">Cancel</DialogClose>
                                            <DialogClose className="bg-red-600 text-white px-2 py-1 rounded-md" onClick={() => handleDelete(item._id)}>Delete</DialogClose>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )) : (
                            <div className='text-center p-5 text-sm text-gray-500'>No downloads yet</div>
                        )}
                    </div>
                </div>
            </AdminItemContainer>
        </div>
    )
}

export default FileDownloadsPage
