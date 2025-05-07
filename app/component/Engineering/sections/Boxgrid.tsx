"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ExpertiseItem {
  id: number;
  icon: string;
  title: string;
  subttle?: string;
  desc: string;
  url?: string;
}

interface ExpertiseSectionProps {
  title: string;
  colnum?: number;
  maxchwidth?: number;
  data: ExpertiseItem[];
  subttle?: string;
}

const Boxgrid: React.FC<ExpertiseSectionProps> = ({
  title,
  data,
  colnum,
  subttle,
  maxchwidth,
}) => {
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
            <h2 className="text-xl text-white font-[600] leading-[1.2] mb-4 lg:mb-7" style={{ maxWidth: maxchwidth ? `${maxchwidth}ch` : undefined }}>{title}</h2>
            <p className="text-19   font-400   text-white   lg:max-w-[120ch]">
              {subttle}
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
            {data.map((expertise) => (
              <div key={expertise.id}>

                  <div key={expertise.id}>
                    <Link href={`${expertise.url}`}>
                      <div
                        key={expertise.id}
                        className="group flex flex-col justify-between gap-3 border p-5 transition-all duration-500 hover:bg-primary md:h-[300px]  lg:h-[340px] lg:gap-0 lg:p-10 xl:h-[414px]"
                      >
                        {/* Image Wrapper */}
                        <div className="align-center flex h-[68px] w-[68px] rounded-[5px] justify-center bg-secondary p-2 transition-colors duration-500 group-hover:bg-white md:h-[50px] md:w-[50px]">
                          <Image
                            src={expertise.icon}
                            alt={expertise.title}
                            className="fltrcls transition duration-500  brightness-0 invert-[1]   group-hover:brightness-[1] group-hover:invert-0"
                          />
                        </div>

                        {/* Content */}
                        <div>
                          {/* Title */}
                          <h3 className="text-md font-semibold titlesp transition-colors duration-300 text-white group-hover:text-white">
                            {expertise.title}
                          </h3>

                          <div className=" overflow-hidden">
                            <p
                              className="text-19 font-normal cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-white
                                opacity-0 transition-all duration-500 group-hover:max-h-[15rem] group-hover:opacity-100"
                            >
                              {expertise.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

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
