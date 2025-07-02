import React from 'react'
import { motion } from "framer-motion";

const Downloads = () => {

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
        
  return (
    <div>
        <div className="relative w-full flex gap-4 mt-2 mb-14">
        <p className="text-[16px] text-[#595959]">Gender</p>
        <div className="flex gap-4">
          {["Male", "Female", "Others"].map((gender, i) => (
            <label key={i} className="inline-flex items-center cursor-pointer mr-3">
              <input
                type="radio"
                name="gender"
                value={gender.toLowerCase()}
                className="appearance-none w-5 h-5 border-2 border-green-500 rounded-full checked:bg-green-500 checked:border-green-500 transition duration-200"
              />
              <span className="ml-2 text-[#595959]">{gender}</span>
            </label>
          ))}
        </div>
      </div>
        <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-14 lg:gap-x-6 xxl:gap-x-10 mb-5 lg:mb-[40px]"
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
            className="px-1 appearance-none bg-transparent border-0 border-b border-[#dcdcdc] focus:outline-none focus:ring-0 focus:border-black text-[#595959] text-xs py-2 pr-6 w-full placeholder:text-[#595959]"
          />
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
        className=" placeholder:text-[#595959] w-full px-1 py-2 pr-6 text-xs text-[#595959] bg-transparent border-0 border-b border-[#dcdcdc] focus:outline-none focus:ring-0 focus:border-black appearance-none"
      />
    </motion.div>

    {/* Submit Button */}
    <motion.div variants={fadeUp}>
      <motion.button
        className="mt-6 min-w-[173px] bg-[#0A2657] text-white text-[16px] font-[400] px-8 py-4 rounded-full shadow-md hover:bg-primary transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        SUBMIT
      </motion.button>
    </motion.div>
    </div>
  )
}

export default Downloads