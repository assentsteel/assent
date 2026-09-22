"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AdminItemContainer from '@/app/component/common/AdminItemContainer'
import { FiUploadCloud, FiCheckCircle, FiXCircle, FiX, FiFileText } from 'react-icons/fi'

interface SitemapInfo {
    updatedAt: string;
    urlCount: number;
    content: string;
}

interface FormValues {
    headerScript: string;
    bodyScript: string;
}

interface FormValues2 {
    currentPassword: string;
    newPassword: string;
}


const Settings = () => {

    const { register, handleSubmit, setValue, getValues } = useForm<FormValues | FormValues2>();
    const [currentPasswordIsCorrect, setCurrentPasswordIsCorrect] = React.useState<boolean>(false);

    const [toEmailGeneral, setToEmailGeneral] = useState("")
    const [toEmailRegistration, setToEmailRegistration] = useState("")
    const [toEmailDownload, setToEmailDownload] = useState("")
    const [toEmailCareer, setToEmailCareer] = useState("")

    const [sitemapFile, setSitemapFile] = useState<File | null>(null)
    const [sitemapUploading, setSitemapUploading] = useState(false)
    const [sitemapRemoving, setSitemapRemoving] = useState(false)
    const [sitemapStatus, setSitemapStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
    const [sitemapInfo, setSitemapInfo] = useState<SitemapInfo | null>(null)
    const [loadingSitemapInfo, setLoadingSitemapInfo] = useState(true)

    const onSubmit = async (data: FormValues | FormValues2) => {
        try {
            const response = await fetch("/api/admin/tags", {
                method: "POST",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error saving details", error);
        }
    }

    const EmailSectionSubmit = async () => {
        try {
            const response = await fetch("/api/admin/emails", {
                method: "PATCH",
                body: JSON.stringify({ toEmailDownload, toEmailGeneral, toEmailRegistration, toEmailCareer }),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error saving details", error);
        }
    }

    const fetchTag = async () => {
        try {
            const response = await fetch("/api/admin/tags");
            if (response.ok) {
                const data = await response.json();
                setValue('headerScript', data.tag.headerScript);
                setValue('bodyScript', data.tag.bodyScript);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching details", error);
        }
    }


    const fetchEmails = async () => {
        try {
            const response = await fetch("/api/admin/emails");
            if (response.ok) {
                const data = await response.json();
                setToEmailDownload(data.data.toEmailDownload)
                setToEmailRegistration(data.data.toEmailRegistration)
                setToEmailGeneral(data.data.toEmailGeneral)
                setToEmailCareer(data.data.toEmailCareer)
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching details", error);
        }
    }

    const fetchSitemapInfo = async () => {
        setLoadingSitemapInfo(true)
        try {
            const response = await fetch(`/api/admin/sitemap`);
            if (response.ok) {
                const data = await response.json();
                setSitemapInfo(data.data ?? null);
            } else {
                setSitemapInfo(null);
            }
        } catch (error) {
            console.log("Error in fetching sitemap info", error);
            setSitemapInfo(null);
        } finally {
            setLoadingSitemapInfo(false)
        }
    }

    const handleSitemapFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] ?? null;
        setSitemapStatus(null);

        if (selected && !selected.name.endsWith(".xml")) {
            setSitemapStatus({ type: "error", message: "File must be a .xml file" });
            setSitemapFile(null);
            return;
        }
        setSitemapFile(selected);
    }

    const handleSitemapUpload = async () => {
        if (!sitemapFile) return;

        setSitemapUploading(true);
        setSitemapStatus(null);

        try {
            const formData = new FormData();
            formData.append("file", sitemapFile);

            const response = await fetch(`/api/admin/sitemap`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setSitemapStatus({ type: "success", message: data.message ?? "Sitemap uploaded successfully" });
                setSitemapFile(null);
                fetchSitemapInfo();
            } else {
                setSitemapStatus({ type: "error", message: data.message ?? "Upload failed" });
            }
        } catch (error) {
            console.log("Error in uploading sitemap", error);
            setSitemapStatus({ type: "error", message: "Upload failed. Please try again." });
        } finally {
            setSitemapUploading(false);
        }
    }

    const handleSitemapRemove = async () => {
        setSitemapRemoving(true);
        setSitemapStatus(null);

        try {
            const response = await fetch(`/api/admin/sitemap`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (response.ok) {
                setSitemapInfo(null);
                setSitemapStatus({ type: "success", message: data.message ?? "Sitemap removed" });
            } else {
                setSitemapStatus({ type: "error", message: data.message ?? "Failed to remove sitemap" });
            }
        } catch (error) {
            console.log("Error in removing sitemap", error);
            setSitemapStatus({ type: "error", message: "Failed to remove sitemap. Please try again." });
        } finally {
            setSitemapRemoving(false);
        }
    }

    useEffect(() => {
        fetchTag();
        fetchEmails();
        fetchSitemapInfo();
    }, []);

    const checkCurrentPassword = async () => {
        try {
            const currentPassword = getValues('currentPassword');
            if (!currentPassword) {
                alert("Please enter current password");
                return;
            }
            const response = await fetch("/api/admin/settings/check-password", {
                method: "POST",
                body: JSON.stringify({ currentPassword }),
            });
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setCurrentPasswordIsCorrect(true);
                    setValue('currentPassword', "");
                    alert(data.message);
                } else {
                    setCurrentPasswordIsCorrect(false);
                    alert(data.message);
                }
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error saving details", error);
        }
    }


    const submitNewPassword = async () => {
        try {
            const newPassword = getValues('newPassword');
            if (!newPassword) {
                alert("Please enter new password");
                return;
            }
            const response = await fetch("/api/admin/settings/check-password", {
                method: "PATCH",
                body: JSON.stringify({ newPassword }),
            });
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setCurrentPasswordIsCorrect(false);
                    setValue('newPassword', "");
                    alert(data.message);
                } else {
                    setCurrentPasswordIsCorrect(false);
                    alert(data.message);
                }
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error saving details", error);
        }
    }


    return (
        <div className='grid grid-cols-2 gap-5'>
            <AdminItemContainer>
                <Label main>Meta Section</Label>
                <div className='flex flex-col gap-5 border-r-gray-300 p-5'>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <Label className=''>Header Script</Label>
                            <Textarea {...register('headerScript')}></Textarea>
                        </div>

                        <div className="space-y-4">
                            <Label className=''>Body Script</Label>
                            <Textarea {...register('bodyScript')}></Textarea>
                        </div>
                        <div className="flex justify-center">
                            <Button type="submit" className='w-full cursor-pointer text-white text-[16px]'>Submit</Button>
                        </div>
                    </form>
                </div>
            </AdminItemContainer>

            <AdminItemContainer>
                <Label main>Change Password</Label>
                {!currentPasswordIsCorrect ? (<form className='flex flex-col gap-5 p-5'>
                    <div className="space-y-4">
                        <Label className=''>Current Password</Label>
                        <Input {...register('currentPassword')}></Input>
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className='text-[16px]'>Type in the current password and hit continue</p>
                        <Button type="button" className='w-full cursor-pointer text-white text-[16px]' onClick={checkCurrentPassword}>Continue</Button>
                    </div>
                </form>)

                    :

                    (<form className='flex flex-col gap-5 p-5'>
                        <div className="space-y-4">
                            <Label className=''>New Password</Label>
                            <Input {...register('newPassword')}></Input>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className='text-[16px]'>Type in the new password and hit continue</p>
                            <Button type="button" className='w-full cursor-pointer text-white text-[16px]' onClick={submitNewPassword}>Confirm</Button>
                        </div>
                    </form>)

                }
            </AdminItemContainer>


            <AdminItemContainer>
                <Label main>Email Section</Label>
                <div className='flex flex-col gap-5 border-r-gray-300 p-5'>
                    <div className='flex flex-col gap-5'>
                        <div className="space-y-4">
                            <Label className=''>To email (General Enquiry)</Label>
                            <Input value={toEmailGeneral} onChange={(e) => setToEmailGeneral(e.target.value)}></Input>
                        </div>
                        <div className="space-y-4">
                            <Label className=''>To email (Registration Form)</Label>
                            <Input value={toEmailRegistration} onChange={(e) => setToEmailRegistration(e.target.value)}></Input>
                        </div>
                        <div className="space-y-4">
                            <Label className=''>To email (Download Form)</Label>
                            <Input value={toEmailDownload} onChange={(e) => setToEmailDownload(e.target.value)}></Input>
                        </div>
                        <div className="space-y-4">
                            <Label className=''>To email (Career Form)</Label>
                            <Input value={toEmailCareer} onChange={(e) => setToEmailCareer(e.target.value)}></Input>
                        </div>
                        <div className="flex justify-center">
                            <Button type="button" className='w-full cursor-pointer text-white text-[16px]' onClick={() => EmailSectionSubmit()}>Submit</Button>
                        </div>
                    </div>
                </div>
            </AdminItemContainer>

            <AdminItemContainer>
                <Label main>Sitemap</Label>

                <div className="flex flex-col gap-3 rounded-md p-5">
                    {loadingSitemapInfo ? (
                        <p className="text-sm text-gray-500">Loading...</p>
                    ) : sitemapInfo ? (
                        <div className="relative flex flex-col gap-3 rounded-md border border-black/20 p-4">
                            <button
                                type="button"
                                onClick={handleSitemapRemove}
                                disabled={sitemapRemoving}
                                className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-red-600 disabled:opacity-50"
                                aria-label="Remove sitemap"
                            >
                                <FiX className="text-xl" />
                            </button>

                            <div className="flex items-center gap-3">
                                <FiFileText className="flex-shrink-0 text-2xl text-gray-500" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold">sitemap.xml</span>
                                    <span className="text-xs text-gray-500">
                                        {sitemapInfo.urlCount} URLs · Updated{" "}
                                        {new Date(sitemapInfo.updatedAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <a
                                href="/sitemap.xml"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-fit text-sm text-blue-600 underline"
                            >
                                View live sitemap
                            </a>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-black/20 p-6">
                                <FiUploadCloud className="text-3xl text-gray-400" />
                                <input
                                    type="file"
                                    accept=".xml"
                                    onChange={handleSitemapFileChange}
                                    className="text-sm"
                                />
                                {sitemapFile && (
                                    <p className="text-sm text-gray-600">Selected: {sitemapFile.name}</p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    className="text-white"
                                    disabled={!sitemapFile || sitemapUploading}
                                    onClick={handleSitemapUpload}
                                >
                                    {sitemapUploading ? "Uploading..." : "Upload Sitemap"}
                                </Button>
                            </div>
                        </>
                    )}

                    {sitemapStatus && (
                        <div
                            className={`flex items-center gap-2 text-sm ${sitemapStatus.type === "success" ? "text-green-600" : "text-red-500"}`}
                        >
                            {sitemapStatus.type === "success" ? <FiCheckCircle /> : <FiXCircle />}
                            <p>{sitemapStatus.message}</p>
                        </div>
                    )}
                </div>
            </AdminItemContainer>

        </div>
    )
}

export default Settings