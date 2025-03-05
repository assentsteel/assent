"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { careerForm } from "@/app/schemas/careerForm";

type FormData = {
  firstName:string;
  lastName:string;
  email:string;
  phone:string;
  gender:string;
  dob:string;
  nationality:string;
  location:string;
  experience:string;
  skills:string;
  resume:string;
}

export default function ApplicationForm() {

  const {register,setValue,formState:{errors},handleSubmit,setError,reset} = useForm<FormData>({resolver:zodResolver(careerForm)})
  const [choosenFile,setChoosenFile] = useState<File | null>(null)

  const onSubmit = async(typedData:FormData) =>{
    try {
      const formData = new FormData();
      formData.append("file", choosenFile || "");
      formData.append("fileType", "file");
      const responseAfterUpload = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (responseAfterUpload.status !== 200) {
        alert("Failed to submit form")
        return;
      }else{
        const data = await responseAfterUpload.json()
        console.log("url",data.url)
        const response = await fetch("/api/admin/careers/request", {
          method: "POST",
          body: JSON.stringify({...typedData,resume:data.url}),
        });

        if(response.ok){
          alert("Thank you, we will reach out to you soon")
        }else{
          alert("Failed to submit form after upload")
        }
      }
    } catch (error) {
      console.log("Error submitting form on careers,",error)
    }finally{
      setChoosenFile(null)
      reset()
    }
  }

  const handleImageChoose = (file:File | null) =>{
    if (file?.type !== "application/pdf") {
      setError("resume",{message:"Provide only PDFs"})
      return;
    }
    setChoosenFile(file)
    setValue("resume",file.name)
  }

  return (
    <div className=" relative overflow-hidden pb-[100px]">
      <div className="container p-0">
        {/* Section Header with Animation */}

        <div>
          <div className=" bg-black/5 text-black rounded-custom overflow-hidden text-left p-[25px] lg:p-[40px]">
            <motion.h2
              className="lg:text-[32px] text-[25px] font-bold uppercase mb-3 lg:mb-[20px] xl:max-w-[74%]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }} // Animation resets on scroll
            >
              If you are interested in pursuing a position with Best Group,
              kindly fill out the form provided below.
            </motion.h2>

            <form className="flex flex-col gap-[32px]" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                <motion.input
                  {...register("firstName")}
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  type="text"
                  placeholder="First Name"
                  
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                </div>
                
                <div className="flex flex-col">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName")}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                </div>
                
              </div>
              <div className="grid lg:grid-cols-2 gap-[32px]">
                <div className="flex flex-col">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>
                
                <div className="flex flex-col">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  placeholder="Phone Number"
                  {...register("phone")}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                 {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                </div>
                
              </div>{" "}
              <div className="grid lg:grid-cols-2 gap-[32px] ">
                {/* Gender Selection */}
                <div className="flex flex-col">
                <motion.div
                  className="col-span-2 flex gap-6 items-center"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}>
                  <span className="text-black/50 text-[18px]">Gender:</span>
                  {["Male", "Female", "Other"].map((gender) => (
                    <label
                      key={gender}
                      className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={gender.toLowerCase()}
                        className="hidden peer"
                        {...register("gender")}
                      />
                      <div className="w-4 h-4 border border-black/20 rounded-full flex items-center justify-center peer-checked:bg-[#FE6601] peer-checked:scale-110  transition-all">
                        <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                      </div>
                      <span className="text-black/50 text-[18px]">
                        {gender}
                      </span>
                    </label>
                  ))}
                </motion.div>
                  {errors.gender && <span className="text-red-500">{errors.gender.message}</span>}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-[32px]">
                <div className="relative">
                <motion.input
                  className=" w-full bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  placeholder="Date of Birth"
                  {...register("dob")}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                <input type="date" onChange={(e) => setValue("dob", e.target.value)} className="outline-none top-3 text-transparent w-full left-0 absolute bg-transparent"></input>
                {errors.dob && <span className="text-red-500">{errors.dob.message}</span>}
                </div>

                  <div className="flex flex-col">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  placeholder="Nationality"
                  {...register("nationality")}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                {errors.nationality && <span className="text-red-500">{errors.nationality.message}</span>}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-[32px]">
                <div className="flex flex-col">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  placeholder="Current Location"
                  {...register("location")}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                {errors.location && <span className="text-red-500">{errors.location.message}</span>}
                </div>

                <div className="flex flex-col">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  placeholder="Work Experience"
                  {...register("experience")}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                {errors.experience && <span className="text-red-500">{errors.experience.message}</span>}
                </div>

              </div>
              <div className="grid lg:grid-cols-2 gap-[32px]">
                <div className="flex flex-col">
                <motion.textarea
                  placeholder="Key Skills"
                  rows={4}
                  {...register("skills")}
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10  text-black/50 placeholder:text-black/50 focus:outline-none"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                {errors.skills && <span className="text-red-500">{errors.skills.message}</span>}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}>
                  <label
                    htmlFor="resume"
                    className="block  text-black/50 text-[18px] mb-[16px]">
                    Upload Resume
                  </label>
                  <div className="bg-black/10 rounded-custom p-3 mt-2 relative">
                    <input
                      id="resume"
                      type="file"
                      className="block w-full text-[16px] text-black/60 file:py-2 file:px-8 file:rounded-lg file:border-0 file:text-[16px] file:bg-black file:text-white hover:file:bg-black/20 pr-[3em]"
                      onChange={(e)=>handleImageChoose(e?.target?.files?.[0] || null)}
                    />
                    {/* <div className="absolute right-[16px] top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Image
                      src={"/assets/img/careers/file.svg"}
                      alt="Upload icon"
                      width={16}
                      height={16}
                      />
                      </div> */}
                  </div>
                      {errors.resume && <span className="text-red-500">{errors.resume.message}</span>}
                </motion.div>
              </div>
              <button
                type="submit"
                className="self-start text-white bg-primary rounded-lg text-sm font-medium transition uppercase spckbtn orng">
                <div>
                  <Image
                    src={"/assets/img/icons/arrow.svg"}
                    alt=""
                    width={30}
                    height={30}
                  />
                </div>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
