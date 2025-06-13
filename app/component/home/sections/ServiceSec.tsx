"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md"; 
import { Home } from "@/public/types/Common";
 

const ServiceSec = ({ data }: { data: Home }) => {

  return (
    <section className="section-spacing overflow-hidden bg-primary">
      <div className="container">
        {/* Section Header Animation */}
        {/* Section Title and Description Animation */}
        <motion.div className="flex overflow-hidden" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-xl font-semibold mb-5 lg:mb-[50px] leading-none text-white">{data.servicesSection.title}</h2>
        </motion.div>
        {/* Grid Section with Sectors */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-[30px] items-center border-b border-white/35">
          {data.servicesSection.items.map((sector, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer before:content-[''] before:absolute before:bottom-0 before:top-auto before:left-0 before:h-[4px] before:bg-secondary before:z-10 before:w-0 before:mx-auto hover:before:w-full before:transition-all before:duration-300 before:ease-in-out border-b border-white/30 lg:border-b-0 perspective-[1000px]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.3 }}
              viewport={{ once: true, amount: 0.5 }}>
              <motion.div className="rounded-custom overflow-hidden relative min-h-[450px] flex items-end group" whileHover={{ scale: 1.05, rotateY: 10, }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                  <div className="bg-gradient-to-t from-black to-transparent absolute bottom-0 left-0 z-10 w-full h-0 group-hover:h-full transition-all duration-300"></div>
                <Image src={sector.image} alt={sector.imageAlt} width={800} height={800} className="absolute top-0 left-0 w-full h-full -z-1" />
                <MdArrowOutward className="text-white absolute right-[20px] z-10 text-[0px] group-hover:text-lg top-[20px] opacity-0 transition-all ease-in-out duration-500 group-hover:opacity-100 translate-x-[10px] hover:translate-x-[0px] " />
                <div className="p-5 lg:p-8 relative z-20 translate-y-full group-hover:-translate-y-0 transition-all duration-300">
                  <p className="text-white text-base font-normal">{sector.description}</p>
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col text-white rounded-custom gap-[20px] group-hover:bg-primary transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true, amount: 0.3 }}>
                <motion.div className="flex justify-between items-center w-full pt-[30px] pb-[20px] lg:pt-[45px] lg:pb-[35px]"
                  whileHover={{ opacity: 1 }}>
                  <h4 className="text-lg font-semibold text-white transition-opacity duration-500"> {sector.title} </h4>
                  <Image src={sector.logo} alt={sector.logoAlt} width={35} height={35} className="transition-all duration-500 invert brightness-0 group-hover:invert-0 group-hover:brightness-100 w-0 group-hover:w-[35px]"/>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSec;
