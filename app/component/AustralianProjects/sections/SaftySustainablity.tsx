"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion"; 



        import {   gridbox } from '@/public/types/Common';

const SaftySustainablity = ({ data, maxchwidth, colnum, }: { data: gridbox, colnum?: number, maxchwidth?: number }) => {
  return (
    <section className="   relative">
    <div className="container mx-auto border-b pb-[50px] md:pb-[70px] xl:pb-[100px] ">
      <div className="flex flex-col   ">
        <div className="mb-5 lg:mb-[60px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
            variants={{
              hidden: { opacity: 0, y: 50 }, // Start below and invisible
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: "easeOut" },
              }, // Slide up and fade in
            }}
          >
            <h2 className="text-xl text-primary font-[600] leading-[1.2] mb-4 lg:mb-7" style={{ maxWidth: maxchwidth ? `${maxchwidth}ch` : undefined }}>{data.title}</h2>
            <p className="text-19   font-400   text-tertiary   lg:max-w-[97ch]">
              {data.description}
            </p>
          </motion.div>
        </div>

        <div>
          <motion.div
            className={`grid grid-cols-1 gap-5  md:grid-cols-2 xl:grid-cols-3 xl:gap-0  ${colnum ? `xxl:grid-cols-${colnum}` : 'xxl:grid-cols-4'} `}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
            variants={{
              hidden: { opacity: 0, y: 50 }, // Start below and invisible
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: "easeOut" },
              }, // Slide up and fade in
            }}
          >
            {/* Item 1 */}
           {data.items.map((expertise, index) => (
  <div key={index}> 
      <div
        style={{
          backgroundImage: `url(${expertise.image})`,
        }}
        className="group bggraygrad relative"
      >
        <div className="flex relative z-10     flex-col justify-between gap-3 border p-5 transition-all duration-500 md:h-[300px] lg:h-[340px] m-0 lg:gap-0 lg:p-[50px] xl:h-[325px]">

          {/* Image Wrapper */}
          <div className="group-hover:hidden group-hover:md:block group-hover:opacity-0 transition-all duration-500 align-center   flex h-[68px] w-[68px] rounded-[5px] justify-center  p-2 transition-colors duration-500 bg-secondary group-hover:bg-white md:h-[50px] md:w-[50px]">
            <Image
              src={expertise.logo}
              alt={expertise.logoAlt}
              width={50}
              height={50}
              className="fltrcls transition duration-500 brightness-0 invert-[1] group-hover:brightness-[1] group-hover:invert-0"
            />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-md font-semibold titlesp transition-colors duration-300 text-primary group-hover:text-primary max-w-[22ch]">
              {expertise.title}
            </h3>

            <div className="overflow-hidden">
              <p className="text-19 font-normal cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-tertiary opacity-0 transition-all duration-500 group-hover:max-h-[300px] group-hover:opacity-100">
                {expertise.description}
              </p>
            </div>
          </div>
        </div>
      </div> 
  </div>
))}

          </motion.div>
        </div>
          <div className="mt-5 lg:mt-[30px] text-sm max-w-[55ch] max-w-[97ch]"><p>{data.footerdata}</p></div>
      </div>
      </div>
      </section>
  );
};

export default SaftySustainablity;
