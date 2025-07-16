import React, { useState } from 'react'
import { motion } from "framer-motion";
import Image from 'next/image';
import { z } from "zod";
import { registrationFormSchema } from "@/app/schemas/registrationForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


type RegistrationForm = z.infer<typeof registrationFormSchema>


const RegistrationForm = () => {

    const {register,handleSubmit,formState:{errors},setValue,reset,formState:{isSubmitting}} = useForm<RegistrationForm>({
        resolver:zodResolver(registrationFormSchema)
    })

      const [tradelicenseFile, setTradelicenseFile] = React.useState<File | null>(null);
      const [vatregistrationFile, setVatregistrationFile] = React.useState<File | null>(null);

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

        const [tradelicenseFileName, setTradelicenseFileName] = useState("");
        const [vatregistrationFileName, setVatregistrationFileName] = useState("");
        
          const handleTradelicenseFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e)
            const file = e.target.files?.[0];
            setTradelicenseFile(file || null);
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
        
            if (file.size > 3 * 1024 * 1024) {
              alert("File must be smaller than 3MB.");
              e.target.value = "";
              return;
            }
        
            setValue("tradelicense", file,{shouldValidate: true});
            setTradelicenseFileName(file.name);
          };

          const handleVatregistrationFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e)
            const file = e.target.files?.[0];
            console.log(file)
            setVatregistrationFile(file || null);
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
        
            if (file.size > 3 * 1024 * 1024) {
              alert("File must be smaller than 3MB.");
              e.target.value = "";
              return;
            }
        
            setValue("vatregistration", file,{shouldValidate: true});
            setVatregistrationFileName(file.name);
          };

          const onSubmit = async(data: RegistrationForm) =>{
              try {
                if(tradelicenseFile){
                  const formData = new FormData();
                  formData.append("file", tradelicenseFile as File);
                  formData.append("fileType", "file");
                  const tradeLicenseResponse = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: formData,
                  });
                  if (tradeLicenseResponse.status !== 200) {
                    alert("Something went wrong, try again")
                    return;
                  }
                  if(vatregistrationFile){
                    const formData = new FormData();
                    formData.append("file", vatregistrationFile as File);
                    formData.append("fileType", "file");
                    const vatRegistrationResponse = await fetch("/api/admin/upload", {
                      method: "POST",
                      body: formData,
                    });
                    if (vatRegistrationResponse.status !== 200) {
                      alert("Something went wrong, try again")
                      return;
                    }
                    const vatRegistrationData = await vatRegistrationResponse.json();
                    const tradeLicenseData = await tradeLicenseResponse.json();
                    if(tradeLicenseData.url && vatRegistrationData.url){
                      const formResponse = await fetch("/api/admin/contact", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({...data,tradelicense:tradeLicenseData.url,vatregistration:vatRegistrationData.url}),
                      });
                      if (formResponse.ok) {
                        const data = await formResponse.json();
                        alert(data.message);
                        reset()
                        setTradelicenseFile(null);
                        setVatregistrationFile(null);
                        setTradelicenseFileName("");
                        setVatregistrationFileName("");
                      }else{
                        alert("Something went wrong, try again")
                      }
                    }
                  }
                }
              } catch (error) {
                  console.log(error)
              }
          }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 lg:gap-y-14 lg:gap-x-6 xxl:gap-x-10 mb-5 lg:mb-[40px]"
              variants={containerVariants}
            >
              {["Name of the Company", "Type of Product", "Contact Person","Designation","Contact No","Email ID"].map((placeholder, i) => (
                <motion.div
                  key={i}
                  className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0"
                  variants={fadeUp}
                >
                  <input
                    type={placeholder === "Email ID" ? "email" : placeholder === "Contact Number" ? "number" : "text"}
                    placeholder={placeholder}
                    className="px-1 appearance-none bg-transparent border-0 border-b border-[#dcdcdc] focus:outline-none focus:ring-0 focus:border-black text-[#595959] text-xs py-2 pr-6 w-full placeholder:text-[#595959]"
                    {...register(placeholder.split(" ").join("").toLowerCase() as keyof z.infer<typeof registrationFormSchema>)}
                  />
                  {errors[placeholder.split(" ").join("").toLowerCase() as keyof z.infer<typeof registrationFormSchema>] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[placeholder.split(" ").join("").toLowerCase() as keyof z.infer<typeof registrationFormSchema>]?.message}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
        
            {/* Message */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 lg:gap-y-10 lg:gap-x-6 xxl:gap-x-10 mb-5 lg:mb-[40px] lg:mt-14'>
            <motion.div
              className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0 flex flex-col gap-4"
              variants={fadeUp}
            >
                <label htmlFor="tradelicense" className="text-[#595959] text-xs">Attachments, <span className='font-[500]'>Trade License</span></label>
                <label
        htmlFor="file-upload"
        className="cursor-pointer bg-[#1E1E1E1A] p-6 shadow-sm flex items-center space-x-4 w-full"
      >
        <div className="text-2xl text-gray-700">
          {/* Your SVG icon here */}
          <Image src="/assets/img/icons/attatchment.svg" alt="attachment" width={20} height={20}/>
        </div>
        <div className="text-sm text-[gray-700]">
          <p>
            {tradelicenseFileName || (
              <span className="text-[#595959] font-400 text-[16px]">
                Max File size: 3MB, File format: doc, docx, pdf
              </span>
            )}
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleTradelicenseFileChange}
          className="hidden"
        />
      </label>
      {errors.tradelicense && (
        <p className="text-red-500 text-xs mt-1">
          {errors.tradelicense?.message}
        </p>
      )}
            </motion.div>

            <motion.div
              className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0 flex flex-col gap-4"
              variants={fadeUp}
            >
                <label htmlFor="vatregistration" className="text-[#595959] text-xs">Attachments, <span className='font-[500]'>VAT Registration No</span></label>
                <label
        htmlFor="file-upload-vat"
        className="cursor-pointer bg-[#1E1E1E1A] p-6 shadow-sm flex items-center space-x-4 w-full"
      >
        <div className="text-2xl text-gray-700">
          {/* Your SVG icon here */}
          <Image src="/assets/img/icons/attatchment.svg" alt="attachment" width={20} height={20}/>
        </div>
        <div className="text-sm text-[gray-700]">
          <p>
            {vatregistrationFileName || (
              <span className="text-[#595959] font-400 text-[16px]">
                Max File size: 3MB, File format: doc, docx, pdf
              </span>
            )}
          </p>
        </div>
        <input
          id="file-upload-vat"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleVatregistrationFileChange}
          className="hidden"
        />
      </label>
      {errors.vatregistration && (
        <p className="text-red-500 text-xs mt-1">
          {errors.vatregistration?.message}
        </p>
      )}
            </motion.div>
            </div>

            <input type="hidden" {...register("type")} value="registrationForm" />
        
            {/* Submit Button */}
            <motion.div variants={fadeUp} className="flex lg:justify-end">
              <motion.button
              disabled={isSubmitting}
                className="min-w-[173px] bg-[#0A2657] text-white text-[16px] font-[400] px-8 py-4 rounded-full shadow-md hover:bg-primary transition duration-300"
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

export default RegistrationForm