"use client";

import React, { useState } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { careerFormSchema } from "@/schemas/careerSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller  } from "react-hook-form";
gsap.registerPlugin(ScrollTrigger);
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useJobSelectContext } from "@/contexts/jobSelectionContext";


interface Opening {
  title: string;
  location: string;
}

type OpeningProps = Opening[];



type CareerFormProps = z.infer<typeof careerFormSchema>

const JoinTeam = ({openings}: {openings: OpeningProps}) => {

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { jobSelect } = useJobSelectContext();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors,isSubmitting },
    setValue,
    reset,
  } = useForm<CareerFormProps>({
    resolver: zodResolver(careerFormSchema),
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      setFile(file);
    }
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

    if (!file) {
      alert("No file selected.");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, DOC, and DOCX files are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File must be smaller than 10MB.");
      e.target.value = "";
      return;
    }
    setValue("file", file, { shouldValidate: true });
    setFileName(file.name);
  };
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        width: 100,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Starts when the top of the section is 85% in view
          toggleActions: "play none none none",
        },
      });
    }
  }, []);


  const onSubmit: SubmitHandler<CareerFormProps> = async(data) => {
    if(fileName){
        const formData = new FormData();
        formData.append("file",file as File);
        formData.append("fileType", "file");
        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        if (response.status !== 200) {
          alert("Something went wrong, please try again");
          return;
        }
        const fileData = await response.json();
        if(fileData.url){
          const formResponse = await fetch("/api/admin/careers", {
            method: "POST",
            body: JSON.stringify({...data,file:fileData.url}),
          });
          if(formResponse.ok){
            const formdata = await formResponse.json();
            alert(formdata.message);
            setFileName("");
            reset();
          }
        }
    }
  };

  useEffect(() => {
    if (jobSelect) {
      setValue("position", jobSelect, { shouldValidate: true });
    }
  }, [jobSelect]);

  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px]   overflow-hidden relative "  id="wantToJoin">
      <div className="container">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <motion.h2
      className="text-xl text-primary font-[600] leading-[1.2] mb-3 lg:mb-[30px]"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      Join Our Team
    </motion.h2>

    <form onSubmit={handleSubmit(onSubmit)}>

    {/* Reusable animation wrapper for fields */}
    {[
      ["First Name", "Last Name"],
      ["Email", "Phone Number"],
      ["Date of Birth", "Nationality"],
      ["Current Location", "Work Experience"],
    ].map((pair, idx) => (
      <motion.div
        key={idx}
        className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 lg:gap-x-6 xxl:gap-x-10 mb-4 lg:mb-7"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * idx, duration: 0.6 }}
        viewport={{ once: true }}
      >
        {pair.map((placeholder, i) => (
          <div key={i} className="relative w-full mt-2">
            {placeholder === "Date of Birth" ? <Controller
              name="dateofbirth"
              control={control}
              render={({ field }) => (
                <div className="px-1 appearance-none bg-transparent border-0 border-b border-[#ieieie] focus:outline-none focus:ring-0 focus:border-[black] text-[#595959] text-xs py-2 pr-6 w-full h-10">
                  {!field.value && <label className="text-[#595959]">{placeholder}</label>}
                <input type="date" max={new Date().toISOString().split("T")[0]} {...field} className={`${field.value ? "text-[#595959]" : "text-transparent"} absolute inset-0  px-1 bg-transparent border-0 border-[#ccc] focus:outline-none focus:border-black text-xs pr-6 w-full`}/>
                </div>
              )}
            /> : <input
              type={placeholder.includes("Email") ? "email" : "text"}
              {...register(placeholder.split(" ").join("").toLowerCase() as keyof CareerFormProps)}
              placeholder={placeholder}
              className="px-1 appearance-none bg-transparent border-0 border-b border-[#ieieie] focus:outline-none focus:ring-0 focus:border-[black] text-[#595959] text-xs py-2 pr-6 w-full"
            />} 
            {errors[placeholder.split(" ").join("").toLowerCase() as keyof CareerFormProps] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[placeholder.split(" ").join("").toLowerCase() as keyof CareerFormProps]?.message?.toString()}
              </p>
            )}
          </div>
        ))}
      </motion.div>
    ))}
    

    {/* Gender */}
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 mb-4 lg:mb-7 gap-x-4 lg:gap-x-6 xxl:gap-x-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="relative w-full flex gap-4 mt-2 items-center">
        <p className="text-[16px] text-[#595959]">Gender</p>
        <div className="flex gap-4">
          {["Male", "Female", "Others"].map((gender, i) => (
            <label key={i} className="inline-flex items-center cursor-pointer mr-3">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <input
                    type="radio"
                    {...field}
                    value={gender.toLowerCase()}
                    className="appearance-none w-5 h-5 border-2 border-green-500 rounded-full checked:bg-green-500 checked:border-green-500 transition duration-200"
                  />
                  
                )}
              />
              
              <span className="ml-2 text-[#595959]">{gender}</span>
            </label>
          ))}
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">
              {errors.gender?.message?.toString()}
            </p>
          )}
        </div>
        </div>

      <div>
        <div className="relative w-full lg:flex lg:gap-4 lg:items-center mt-2 flex gap-y-2 flex-col lg:flex-row">
              <p className="text-[16px] text-[#595959] font-normal">Position</p>
              <div className="flex gap-4 w-full">
                <Controller
                  name="position"
                  control={control}
                  rules={{ required: "Position is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value as string}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full border-0 border-b border-[#e4e5e4] outline-none focus:outline-none focus:ring-0 focus:border-b shadow-none rounded-none">
                        <SelectValue
                          placeholder="Select Position"
                          className="text-secondary"
                        />
                      </SelectTrigger>

                      <SelectContent className="border-none shadow-none outline-none ring-0 focus:ring-0 focus:outline-none">
                        {openings.map((opening, i) => (
                          <SelectItem
                            key={i}
                            value={opening.title}
                            className="text-secondary focus:bg-transparent focus:outline-none focus:ring-0 focus:border-none hover:bg-gray-100"
                          >
                            {opening.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                  )}
                />
              </div>
            </div>
              {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position?.message}</p>}

      </div>
    </motion.div>

    {/* File Upload + Submit */}
    <motion.div
      className="w-full lg:w-1/2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-[#1E1E1E1A] p-6 rounded-2xl shadow-sm flex items-center space-x-4 w-full"
      >
        <div className="text-2xl text-gray-700">
          {/* Your SVG icon here */}
           <Image src="/assets/img/icons/attatchment.svg" alt="attachment" width={20} height={20}/>
        </div>
        <div className="text-sm text-[gray-700]">
          <p>
            {fileName || (
              <span className="text-[1F1F1FB5] font-400 text-[16px]">
                Max. 10 MB. pdf, doc, docx
              </span>
            )}
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          {...register("file")}
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
        {errors.file && (
          <p className="text-red-500 text-xs mt-1">
            {errors.file?.message?.toString()}
          </p>
        )}
      </label>

      <motion.button
      disabled={isSubmitting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 min-w-[173px] bg-[#0A2657] text-white text-[16px] font-[400] px-8 py-4 rounded-full shadow-md hover:bg-primary transition duration-300"
      >
        SUBMIT
      </motion.button>
    </motion.div>
    </form>
  </motion.div>
</div>
    </section>
  );
};

export default JoinTeam;
