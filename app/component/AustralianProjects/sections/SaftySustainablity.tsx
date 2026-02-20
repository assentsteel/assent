"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion"; 

import { slideInLeft } from "../../common/MotionAnimation";


        import {   gridbox } from '@/public/types/Common';

const textVariants = {
    hidden: (direction = "x") => ({
      opacity: 0,
      [direction]: direction === "x" ? -30 : 20,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5 },
    },
  };
const SaftySustainablity = ({ data, maxchwidth, colnum, }: { data: gridbox, colnum?: number, maxchwidth?: number }) => {
  return (
    <section className="   relative">
    <div className="container mx-auto border-b pb100 ">
      <div className="flex flex-col   ">
        <div className="mb-5 lg:mb-[60px]">
         
            <motion.h2
              variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            exit="exit"
             className="text-xl text-primary font-[600] leading-[1.2] mb-4 lg:mb-[30px]" style={{ maxWidth: maxchwidth ? `${maxchwidth}ch` : undefined }}>{data.title}
             </motion.h2>
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
             <motion.p className="text-19   font-400   text-tertiary   lg:max-w-[92ch]"
          custom="y"
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2, duration: 0.5 }}>
            {data.description}
          </motion.p>
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
                  // style={{
                  //   backgroundImage: `url(${expertise.image})`,
                  // }}
                  className="group bggraygrad relative"
                >
                  <div className="flex relative z-10  flex-col justify-between gap-3 border p-5 transition-all duration-500 md:h-[300px] lg:h-[340px] lg:gap-0 lg:p-10 xl:h-[325px]">
          
                    {/* Image Wrapper */}
                    <div className="group-hover:h-0  group-hover:opacity-0 transition-all duration-500 align-center   flex h-[50px] w-[50px] lg:h-[68px] lg:w-[68px] rounded-[5px] justify-center  p-2 transition-colors duration-500 bg-secondary group-hover:bg-white ">
                      <Image
                        src={expertise.logo}
                        alt={expertise.logoAlt}
                        width={48}
                        height={48}
                        className="fltrcls transition h-[30px] w-[30px] lg:h-[48px] lg:w-[48px] duration-500 brightness-0 invert-[1] group-hover:brightness-[1] group-hover:invert-0"
                      />
                    </div>
          
                    {/* Content */}
                    <div>
                      <h3 className="text-md 2xl:text-lg leading-[1.27] font-semibold titlesp transition-colors duration-300 text-primary group-hover:text-primary max-w-[22ch]">
                        {expertise.title}
                      </h3>
              
                        <motion.div className="overflow-hidden  "
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
                        <p className="text-19 font-normal text-tertiary cntsmd hided-content max-h-0 w-[102%] overflow-hidden group-hover:pt-5  opacity-0 transition-all duration-500 group-hover:max-h-[15.4rem] group-hover:opacity-100">
                          {expertise.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div> 
            </div>
          ))}
          
                    </motion.div>
        </div> 
            <motion.div className="mt-5 lg:mt-[30px] text-sm max-w-[55ch] max-w-[97ch]"
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
             <motion.p
                  className="text-19 leading-[1.53] text-tertiary transform transition-transform duration-500 "
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {data.footerdata}
                </motion.p></motion.div>

      </div>
      </div>
      </section>
  );
};

export default SaftySustainablity;
