"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
interface ExpertiseItem {
  icon: StaticImageData;
  title: string;
}

interface ExpertiseSection {
  title: string;
  subttle?: string;
  slideitems: ExpertiseItem[];
}
interface ExpertiseSectionProps {
  maxchwidth?: string;
  data: ExpertiseSection;
}
const Structure: React.FC<ExpertiseSectionProps> = ({

  data,
  maxchwidth,
}) => {


  return (
    <section className="  relative">
    <div className="container mx-auto py-0">
      <div className="flex flex-col ">
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
            <p className="text-19 font-400 lg:max-w-[120ch]">
              {data.subttle}
            </p>
          </motion.div>
        </div>

        <div className="mt-[50px] md:mt-[70px] xl:mt-[100px]">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-[50px] md:gap-y-[70px] xl:gap-y-[130px]">
              {data.slideitems.map((items, index) => (
              <div  key={index} className="flex flex-col items-center gap-3 md:gap-5 justify-center">
                <Image src={items.icon} alt="" />
                <div><p className="text-lg font-medium">{items.title}</p></div>
              </div>
              ))}
            </div>



        </div>
      </div>
      </div>
      </section>
  );
};

export default Structure;
