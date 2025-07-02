"use client"

import AdminItemContainer from '@/app/component/common/AdminItemContainer'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'
import { generalEnquirySchema } from '@/app/schemas/generalEnquiry'
import { registrationFormSchema } from '@/app/schemas/registrationForm'
import { downloadFormSchema } from '@/app/schemas/downloadForm'
import { z } from 'zod'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,DialogClose } from '@/components/ui/dialog'
import { HiMiniViewfinderCircle } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { FaFilePdf } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'


interface EnquiryData {
  generalEnquiry: z.infer<typeof generalEnquirySchema>;
  registrationForm: z.infer<typeof registrationFormSchema>[];
  downloadForm: z.infer<typeof downloadFormSchema>[];
}

const Enquiries = () => {

    const [enquiryData, setEnquiryData] = React.useState<EnquiryData>();
    const [enquiryList, setEnquiryList] = React.useState<
  | z.infer<typeof generalEnquirySchema>[]
  | z.infer<typeof registrationFormSchema>[]
  | z.infer<typeof downloadFormSchema>[]
>([]);

    useEffect(() => {
        fetchEnquiry()
    },[])

    const fetchEnquiry = async () => {
        try {
            const response = await fetch("/api/admin/enquiry");
            const data = await response.json();
            setEnquiryData(data.data);
            console.log(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const [selectedOnce, setSelectedOnce] = React.useState(false);

    const handleEnquirySelect = (type: keyof EnquiryData) => {
        setSelectedOnce(true);
        if (enquiryData) {
          const data = enquiryData[type];
          setEnquiryList(Array.isArray(data) ? data : [data]);
        }
      };

      const handleDeleteEnquiry = async (id: string, type: string) => {
        try {
          const response = await fetch(`/api/admin/enquiry?id=${id}&type=${type}`, {
            method: "DELETE",
          });
          if (response.ok) {
            await fetchEnquiry();
            handleEnquirySelect(type as keyof EnquiryData);
          }
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-screen'>
<div className='col-span-2 border-r border-[#00000015] h-full pr-4'>
    <AdminItemContainer>
    <div className='p-2'>
        <div className='border-b border-[#00000015] p-2'>
            <Label>Enquiries</Label>
        </div>
        <div className='flex flex-col gap-2'>
            {selectedOnce ? (enquiryList.length > 0 ? (enquiryList.map((enquiry: z.infer<typeof generalEnquirySchema> | z.infer<typeof registrationFormSchema> | z.infer<typeof downloadFormSchema>, index: number) => (
                <div key={index} className='border-b border-[#00000015] p-2 flex justify-between'>
                    <div>{enquiry.emailid}</div>
                    <div className='flex gap-10'>
                    {enquiry.type === "generalEnquiry" && <Dialog>
                        <DialogTrigger><HiMiniViewfinderCircle className='text-lg cursor-pointer' /></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>View Details</DialogTitle>
                                <DialogDescription className='flex flex-col gap-2 h-[300px] overflow-y-scroll'>
                                    <Label>Name</Label>
                                    <Input type="text" placeholder="Name" readOnly value={(enquiry as z.infer<typeof generalEnquirySchema>).name}/>
                                    <Label>Email</Label>
                                    <Input type="text" placeholder="Email" readOnly value={(enquiry as z.infer<typeof generalEnquirySchema>).emailid}/>
                                    <Label>Contact</Label>
                                    <Input type="text" placeholder="Contact" readOnly value={(enquiry as z.infer<typeof generalEnquirySchema>).contactnumber}/>
                                    <Label>Message</Label>
                                    <Textarea placeholder="Message" readOnly value={(enquiry as z.infer<typeof generalEnquirySchema>).message}/>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md">Close</DialogClose>
                        </DialogContent>

                    </Dialog>}

                    {enquiry.type === "registrationForm" && <Dialog>
                        <DialogTrigger><HiMiniViewfinderCircle className='text-lg cursor-pointer' /></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>View Details</DialogTitle>
                                <DialogDescription className='flex flex-col gap-2 h-[300px] overflow-y-scroll'>
                                    <Label>Name of the Company</Label>
                                    <Input type="text" placeholder="Name" readOnly value={(enquiry as z.infer<typeof registrationFormSchema>).nameofthecompany}/>
                                    <Label>Type of Product</Label>
                                    <Input type="text" placeholder="Email" readOnly value={(enquiry as z.infer<typeof registrationFormSchema>).typeofproduct}/>
                                    <Label>Contact Person</Label>
                                    <Input type="text" placeholder="Contact" readOnly value={(enquiry as z.infer<typeof registrationFormSchema>).contactperson}/>
                                    <Label>Designation</Label>
                                    <Input type="text" placeholder="Designation" readOnly value={(enquiry as z.infer<typeof registrationFormSchema>).designation}/>
                                    <Label>Contact No</Label>
                                    <Input type="text" placeholder="Contact" readOnly value={(enquiry as z.infer<typeof registrationFormSchema>).contactno}/>
                                    <Label>Email</Label>
                                    <Input type="text" placeholder="Email" readOnly value={(enquiry as z.infer<typeof registrationFormSchema>).emailid}/>
                                    <Label>Trade License</Label>
                                    <Link href={(enquiry as z.infer<typeof registrationFormSchema>).tradelicense as unknown as string} target='_blank' rel="noopener noreferrer">
                                    <FaFilePdf className='text-lg cursor-pointer' />
                                    </Link>
                                    <Label>VAT Registration No</Label>
                                    <Link href={(enquiry as z.infer<typeof registrationFormSchema>).vatregistration as unknown as string} target='_blank' rel="noopener noreferrer">
                                    <FaFilePdf className='text-lg cursor-pointer' />
                                    </Link>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md">Close</DialogClose>
                        </DialogContent>

                    </Dialog>}

                    {enquiry.type === "downloadForm" && <Dialog>
                        <DialogTrigger><HiMiniViewfinderCircle className='text-lg cursor-pointer' /></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>View Details</DialogTitle>
                                <DialogDescription className='flex flex-col gap-2 h-[300px] overflow-y-scroll'>
                                <Label>Request Type</Label>
                                <Input type="text" placeholder="Request Type" readOnly value={(enquiry as z.infer<typeof downloadFormSchema>).requestType}/>
                                    <Label>Name</Label>
                                    <Input type="text" placeholder="Name" readOnly value={(enquiry as z.infer<typeof downloadFormSchema>).name}/>
                                    <Label>Designation</Label>
                                    <Input type="text" placeholder="Designation" readOnly value={(enquiry as z.infer<typeof downloadFormSchema>).designation}/>
                                    <Label>Company Name</Label>
                                    <Input type="text" placeholder="Company Name" readOnly value={(enquiry as z.infer<typeof downloadFormSchema>).companyname}/>
                                    <Label>Contact No</Label>
                                    <Input type="text" placeholder="Contact No" readOnly value={(enquiry as z.infer<typeof downloadFormSchema>).contactno}/>
                                    <Label>Email</Label>
                                    <Input type="text" placeholder="Email" readOnly value={(enquiry as z.infer<typeof downloadFormSchema>).emailid}/>
                                    <Label>Purpose</Label>
                                    <Textarea placeholder="Purpose" readOnly value={(enquiry as z.infer<typeof downloadFormSchema>).purpose}/>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md">Close</DialogClose>
                        </DialogContent>

                    </Dialog>
                    }
                    <Dialog>
                                  <DialogTrigger><MdDelete className='text-lg cursor-pointer' /></DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Are you sure?</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex gap-2">
                                      <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                                      <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={()=>handleDeleteEnquiry(enquiry._id, enquiry.type)}>Yes</DialogClose>
                                    </div>
                    
                                  </DialogContent>
                    
                                </Dialog>   
                                </div>  
                </div>
            ))):(
                <div className='flex items-center justify-center h-full'>
                    <Label>No enquiries</Label>
                </div>
            )):(<div className='flex items-center justify-center h-full'>
                <Label>Select a type to view the enquiries</Label>
            </div>)}
        </div>

    </div>
    </AdminItemContainer>
</div>
<div className='col-span-1'>
    <AdminItemContainer>
        <div className='p-2'>
    <div className='border-b border-[#00000015] p-2'>
        <Label>Types</Label>
    </div>
    <div className='flex flex-col gap-2'>
        <div className='border-b border-[#00000015] p-2 cursor-pointer' onClick={() => handleEnquirySelect("generalEnquiry")}>
            <div>General Enquiry</div>
        </div>
        <div className='border-b border-[#00000015] p-2 cursor-pointer' onClick={() => handleEnquirySelect("registrationForm")}>
            <div>Registration Form</div>
        </div>
        <div className='border-b border-[#00000015] p-2 cursor-pointer' onClick={() => handleEnquirySelect("downloadForm")}>
            <div>Download Form</div>
        </div>
    </div>
    </div>
    </AdminItemContainer>
</div>

    </div>
  )
}

export default Enquiries