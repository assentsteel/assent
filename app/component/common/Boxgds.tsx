"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";


interface ExpertiseItem {
  id: number;
  icon: string;
  title: string;
  subttle?: string;
  desc: string;
  url?: string;
  paragraph?: string[];
}

interface ExpertiseSectionProps {
  title: string;
  colnum?: number;
  maxchwidth?: number;
  data: ExpertiseItem[];
  subttle?: string;
}

const Boxgds: React.FC<ExpertiseSectionProps> = ({
  title,
  data,
  colnum,
  maxchwidth,
}) => {
  return (
    <section className="bg-primary   relative">
    <div className="container mx-auto  ">
      <div className="flex flex-col py-[50px]  lg:py-[100px]  ">
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
            <h2 className="text-xl text-white font-[600] leading-[1.2] mb-0" style={{ maxWidth: maxchwidth ? `${maxchwidth}ch` : undefined }}>{title}</h2>

          </motion.div>
        </div>

        <div>
          <motion.div
            className={`grid grid-cols-1    md:grid-cols-2 xl:grid-cols-3 xl:gap-0  ${colnum ? `xxl:grid-cols-${colnum}` : 'xxl:grid-cols-4'} `}
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
           {data.map((expertise, index) => (
  <div key={index}
        className="custom-grid group">
        <div className="flex relative z-10 bg-primary bgd  flex-col justify-between  gap-8 md:gap-0  px-5 py-[50px] xl:py-[100px] group-hover:lg:py-[30px] transition-all duration-500 md:h-[400px] lg:h-[408px]   lg:p-10  ">

          {/* Image Wrapper */}
          <div className="align-center   flex h-[64px] w-[64px] rounded-[5px] justify-center   transition-colors duration-500    ">
            <Image
              src={expertise.icon}
              alt={expertise.title}
              className="fltrcls transition duration-500  "
            />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-xl font-semibold titlesp transition-colors duration-300 text-white group-hover:text-primary leading-[1.2]">
              {expertise.title} <span className="text-lg font-medium">{expertise.subttle}</span>
                     </h3>
                     <p className="text-lg font-medium cntsmd hided-content  overflow-hidden pt-2 text-white group-hover:text-primary  ">
                {expertise.desc}
              </p>

                   <div className="overflow-hidden">


             {expertise.paragraph && (
              <ul className="list-disc list-inside marker:mr-1 text-md font-normal cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-white group-hover:text-primary opacity-0 transition-all duration-500 group-hover:max-h-[15rem] group-hover:opacity-100">
                {expertise.paragraph.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
            </div>
          </div>
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

export default Boxgds;
