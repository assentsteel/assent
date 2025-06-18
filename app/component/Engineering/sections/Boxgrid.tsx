"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { assets } from "@/public/assets/assets";

 const dataimagebg = [
  assets.hrbn1,
  assets.hrbn2,
  assets.hrbn3,
  assets.hrbn4,
  assets.hrbn5,
  assets.hrbn6,
  assets.hrbn7,
];


        import {   Engineering } from '@/public/types/Common';

const Boxgrid = ({ data, maxchwidth, colnum }: { data: Engineering, colnum?: number, maxchwidth?: number }) => {
          console.log(data)
  return (
    <section className="bg-primary overimg relative">
    <div className="container mx-auto py-4">
      <div className="flex flex-col py-[50px]  lg:py-[90px]  ">
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
            <h2 className="text-xl text-white font-[600] leading-[1.2] mb-4 lg:mb-7" style={{ maxWidth: maxchwidth ? `${maxchwidth}ch` : undefined }}>{data.secondSection.title}</h2>
            <p className="text-19   font-400   text-white   lg:max-w-[120ch]">
              {data.secondSection.description}
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
           {data.secondSection.items.map((expertise, index) => (
  <div key={index}>
    <Link href={`#`}>
      <div
        style={{
          backgroundImage: `url(${expertise.image})`,
        }}
        className="group dddd relative"
      >
        <div className="flex relative z-10 bg-primary group-hover:bg-[#00000000] flex-col justify-between gap-3 border p-5 transition-all duration-500 md:h-[300px] lg:h-[340px] lg:gap-0 lg:p-10 xl:h-[414px]">

          {/* Image Wrapper */}
          <div className="align-center   flex h-[68px] w-[68px] rounded-[5px] justify-center  p-2 transition-colors duration-500 bg-secondary group-hover:bg-white md:h-[50px] md:w-[50px]">
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
            <h3 className="text-md font-semibold titlesp transition-colors duration-300 text-white group-hover:text-white">
              {expertise.title}
            </h3>

            <div className="overflow-hidden">
              <p className="text-19 font-normal cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-white opacity-0 transition-all duration-500 group-hover:max-h-[15rem] group-hover:opacity-100">
                {expertise.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
))}

          </motion.div>
        </div>
      </div>
      </div>
      </section>
  );
};

export default Boxgrid;
