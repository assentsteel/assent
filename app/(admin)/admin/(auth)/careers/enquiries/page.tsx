"use client"

import AdminItemContainer from '@/app/component/common/AdminItemContainer'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,DialogClose,DialogDescription } from '@/components/ui/dialog'
import { MdDelete } from 'react-icons/md'
import { HiMiniViewfinderCircle } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { FaFilePdf } from 'react-icons/fa'
import moment from 'moment'

interface Enquiry {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    dateofbirth: string;
    nationality: string;
    currentlocation: string;
    workexperience: string;
    file: string;
}

const Enquiries = () => {

    const [enquiryList, setEnquiryList] = React.useState<Enquiry[]>([]);

    useEffect(() => {
        fetchEnquiry()
    },[])

    const fetchEnquiry = async () => {
        try {
            const response = await fetch("/api/admin/careers/enquiry");
            const data = await response.json();
            setEnquiryList(data.data);
            console.log(data.data);
        } catch (error) {
            console.log(error);
        }
    }


      const handleDeleteEnquiry = async (id: string) => {
        try {
          const response = await fetch(`/api/admin/careers/enquiry?id=${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            const data = await response.json();
            alert(data.message);
            fetchEnquiry();
          }
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 h-screen'>
<div className='col-span-1 border-r border-[#00000015] h-full pr-4'>
    <AdminItemContainer>
    <div className='p-2'>
        <div className='border-b border-[#00000015] p-2'>
            <Label>Enquiries</Label>
        </div>
        <div className='flex flex-col gap-2'>
            {enquiryList.length > 0 ? (enquiryList.map((enquiry, index: number) => (
                <div key={index} className='border-b border-[#00000015] p-2 flex justify-between'>
                    <div>{enquiry.email}</div>
                    <div className='flex gap-10'>
                    <Dialog>
                        <DialogTrigger><HiMiniViewfinderCircle className='text-lg cursor-pointer' /></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>View Details</DialogTitle>
                                <DialogDescription className='flex flex-col gap-2 h-[300px] overflow-y-scroll'>
                                    <Label>First Name</Label>
                                    <Input type="text" placeholder="First Name" readOnly value={enquiry.firstname}/>
                                    <Label>Last Name</Label>
                                    <Input type="text" placeholder="Last Name" readOnly value={enquiry.lastname}/>
                                    <Label>Email</Label>
                                    <Input type="text" placeholder="Email" readOnly value={enquiry.email}/>
                                    <Label>Phone</Label>
                                    <Input type="text" placeholder="Phone" readOnly value={enquiry.phonenumber}/>
                                    <Label>DOB</Label>
                                    <Input type="text" placeholder="DOB" readOnly value={moment(enquiry.dateofbirth).format("DD-MM-YYYY")}/>
                                    <Label>Nationality</Label>
                                    <Input type="text" placeholder="Nationality" readOnly value={enquiry.nationality}/>
                                    <Label>Current Location</Label>
                                    <Input type="text" placeholder="Current Location" readOnly value={enquiry.currentlocation}/>
                                    <Label>Experience</Label>
                                    <Input type="text" placeholder="Experience" readOnly value={enquiry.workexperience}/>
                                    <Label>Resume</Label>
                                    <Link href={enquiry.file} target='_blank' rel="noopener noreferrer">
                                    <FaFilePdf className='text-lg cursor-pointer' />
                                    </Link>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md">Close</DialogClose>
                        </DialogContent>

                    </Dialog>
                    <Dialog>
                                  <DialogTrigger><MdDelete className='text-lg cursor-pointer' /></DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Are you sure?</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex gap-2">
                                      <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                                      <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleDeleteEnquiry(enquiry._id)}>Yes</DialogClose>
                                    </div>
                    
                                  </DialogContent>
                    
                                </Dialog>   
                                </div>  
                </div>
            ))):(
                <div className='flex items-center justify-center h-full'>
                    <Label>No enquiries</Label>
                </div>
            )}
        </div>

    </div>
    </AdminItemContainer>
</div>
    </div>
  )
}

export default Enquiries