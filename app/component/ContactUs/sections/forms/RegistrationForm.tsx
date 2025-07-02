import React, { useState } from 'react'
import { motion } from "framer-motion";
import Image from 'next/image';

const RegistrationForm = () => {

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

        const [fileName, setFileName] = useState("");
        
          const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
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
        
            setFileName(file.name);
          };

  return (
    <div>
        <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-14 lg:gap-x-6 xxl:gap-x-10 mb-5 lg:mb-[40px]"
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
                  />
                </motion.div>
              ))}
            </motion.div>
        
            {/* Message */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-10 lg:gap-x-6 xxl:gap-x-10 mb-5 lg:mb-[40px] mt-14'>
            <motion.div
              className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0 flex flex-col gap-4"
              variants={fadeUp}
            >
                <label htmlFor="" className="text-[#595959] text-xs">Attachments, <span className='font-[500]'>Trade License</span></label>
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
            {fileName || (
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
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
            </motion.div>

            <motion.div
              className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0 flex flex-col gap-4"
              variants={fadeUp}
            >
                <label htmlFor="" className="text-[#595959] text-xs">Attachments, <span className='font-[500]'>VAT Registration No</span></label>
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
            {fileName || (
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
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
            </motion.div>
            </div>
        
            {/* Submit Button */}
            <motion.div variants={fadeUp} className="flex justify-end">
              <motion.button
                className="min-w-[173px] bg-[#0A2657] text-white text-[16px] font-[400] px-8 py-4 rounded-full shadow-md hover:bg-primary transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SUBMIT
              </motion.button>
            </motion.div>
    </div>
  )
}

export default RegistrationForm