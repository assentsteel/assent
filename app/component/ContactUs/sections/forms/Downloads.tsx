import React from 'react'
import { motion } from "framer-motion";
import { downloadFormSchema } from "@/app/schemas/downloadForm";
import { z } from "zod";
import {useForm,Controller} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";


type DownloadForm = z.infer<typeof downloadFormSchema>

const Downloads = () => {

    const {register,handleSubmit,formState:{errors},control,reset} = useForm<DownloadForm>({
        resolver:zodResolver(downloadFormSchema)
    })
    const containerVariants = {
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      };
    
      const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1, y: 0, transition: { duration: 0.5 }},
        };

        const onSubmit = async(data: DownloadForm) => {
            try {
                const response = await fetch("/api/admin/contact", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                  });
                  if (response.ok) {
                    const data = await response.json();
                    alert(data.message);
                    reset()
                  }else{
                    alert("Something went wrong, try again")
                  }
            } catch (error) {
                console.log(error)
            }
        }
        
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("type")} value="downloadForm"/>
        <div className="relative w-full flex gap-4 mt-2 lg:mb-14 mb-5">
        <p className="text-[#595959] text-xs">Select</p>
        <div className="flex gap-4">
          {["Request Pre-Qualification", "Request Brochure"].map((option, i) => (
            <Controller<DownloadForm> name="requestType" control={control} key={i} render={({ field }) => (
            <label key={i} className="inline-flex items-center cursor-pointer mr-3">
              <input
                type="radio"
                {...field}
                value={option}
                className="appearance-none w-5 h-5 border-2 border-green-500 rounded-full checked:bg-green-500 checked:border-green-500 transition duration-200"
              />
              <span className="ml-2 text-[#595959] text-xs">{option}</span>
            </label>
            )}/>
          ))}
          {errors.requestType && <p className="text-red-500 text-xs">{errors.requestType.message}</p>}
        </div>
      </div>
        <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 lg:gap-y-14 lg:gap-x-6 xxl:gap-x-10 mb-5 lg:mb-[40px]"
      variants={containerVariants}
    >
      {["Name", "Designation", "Company Name","Contact No","Email Id"].map((placeholder, i) => (
        <motion.div
          key={i}
          className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0"
          variants={fadeUp}
        >
          <input
            type={placeholder === "Email ID" ? "email" : placeholder === "Contact Number" ? "number" : "text"}
            placeholder={placeholder}
            {...register(placeholder.split(" ").join("").toLowerCase() as keyof DownloadForm)}
            className="px-1 appearance-none bg-transparent border-0 border-b border-[#dcdcdc] focus:outline-none focus:ring-0 focus:border-black text-[#595959] text-xs py-2 pr-6 w-full placeholder:text-[#595959]"
          />
          {errors[placeholder.split(" ").join("").toLowerCase() as keyof DownloadForm] && (
            <p className="text-red-500 text-xs mt-1">{errors[placeholder.split(" ").join("").toLowerCase() as keyof DownloadForm]?.message}</p>
          )}
        </motion.div>
      ))}
    </motion.div>

    {/* Message */}
    <motion.div
      className="relative w-full mb-2 md:mb-0 md:mt-14"
      variants={fadeUp}
    >
      <textarea
        placeholder="Purpose"
        rows={6}
        {...register("purpose")}
        className=" placeholder:text-[#595959] w-full px-1 lg:py-2 pr-6 text-xs text-[#595959] bg-transparent border-0 border-b border-[#dcdcdc] focus:outline-none focus:ring-0 focus:border-black appearance-none"
      />
      {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose.message}</p>}
    </motion.div>

    {/* Submit Button */}
    <motion.div variants={fadeUp}>
      <motion.button
        className="mt-6 min-w-[173px] bg-[#0A2657] text-white text-[16px] font-[400] px-8 py-4 rounded-full shadow-md hover:bg-primary transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
      >
        SUBMIT
      </motion.button>
    </motion.div>
    </form>
  )
}

export default Downloads