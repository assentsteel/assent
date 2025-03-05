'use client'
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useSWR from "swr";
import { Accreditation } from "@/app/types/AccreditationType";


const Certificates = () => {

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data }:{data:Accreditation} = useSWR(`/api/admin/accreditation`, fetcher)

  useEffect(()=>{
    console.log(data)
  },[data])

  return (
    <motion.section className="section-spacing overflow-hidden"
    initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      >
      <div className="container">



          <div className=" ">
            <div className="flex flex-col  gap-4 lg:gap-10 leading-none mb-20"  >
            <h2 className="text-lg  font-bold uppercase text-black">
            Our Certificates
            </h2>
            <p className="text-sm text-secondary/75 max-w-[90ch] leading-[1.4]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          </div>

          <div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[10px] md:gap-[15px] lg:gap-[30px] xl:gap-[60px] items-center mt-5 lg:mt-[60px]">
          {data?.data.map((sector, index) => (
            <motion.div
              key={sector._id}
              className="relative h-[300px] lg:h-[663px] overflow-hidden rounded-custom shadow-lg group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Image src={sector.files[0].thumbnail} alt="Background Image" fill className="object-cover" />

              <motion.div
                className="absolute flex flex-col inset-x-[10px] xxl:inset-x-[20px] bottom-[10px] xxl:bottom-[20px] p-[10px] xxl:p-[20px] backdrop-blur-[10px] bg-white/10 text-white rounded-custom gap-[20px] group-hover:bg-primary transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >

                <motion.div
                  className="flex justify-between items-center w-full group"
                  whileHover={{ opacity: 1 }}
                >
                  <h4 className="text-md font-semibold text-white transition-opacity duration-500">
                    {sector.title}
                  </h4>
 <div className="flex items-center">
            <div className="w-[8px] h-[8px] bg-primary rounded-full transition-opacity duration-500 opacity-100 group-hover:opacity-0"></div>
            <Image
              src="/assets/img/icons/arwtp.svg"
              alt=""
              width={0}
              height={0}
              className="transition-all duration-500 ease-in-out group-hover:w-[14px]"
            />
          </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
          </div>
          </div>

      </div>
    </motion.section>
  );
};

export default Certificates;