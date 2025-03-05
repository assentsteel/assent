"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const sectors = [
  {
    id: 1,
    title: "Residential",
    icon: "/assets/img/icons/residential.svg",
    poster: "/assets/img/sectors/01.jpg",
  },
  {
    id: 2,
    title: "Commercial",
    icon: "/assets/img/icons/commercial.svg",
    poster: "/assets/img/sectors/02.jpg",
  },
  {
    id: 3,
    title: "Industrial",
    icon: "/assets/img/icons/industrial.svg",
    poster: "/assets/img/sectors/03.jpg",
  },
  {
    id: 4,
    title: "Hospitality",
    icon: "/assets/img/icons/hospitality.svg",
    poster: "/assets/img/sectors/04.jpg",
  },
  {
    id: 5,
    title: "Retail",
    icon: "/assets/img/icons/retail.svg",
    poster: "/assets/img/sectors/05.jpg",
  },
];

const Sectors = () => {
  return (
    <section className="section-spacing bg-custom-gray overflow-hidden">
      <div className="container">
        {/* Section Title and Description Animation */}
        <motion.div
          className="lg:w-[50%]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-5 lg:mb-[30px] leading-none text-black">
            Other Sectors
          </h2>
        </motion.div>

        {/* Grid Section with Sectors */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[10px] items-center mt-5 lg:mt-[60px]">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.id}
              className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-custom shadow-lg group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}>
              <Image
                src={sector.poster}
                alt="Background Image"
                fill
                className="object-cover"
              />

              <motion.div
                className="absolute flex flex-col inset-x-[10px] xxl:inset-x-[20px] bottom-[10px] xxl:bottom-[20px] p-[10px] xxl:p-[20px] backdrop-blur-[10px] bg-white/10 text-white rounded-custom flex flex-col gap-[20px] group-hover:bg-primary transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}>
                <Image
                  src={sector.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="transition-all duration-500 group-hover:invert group-hover:brightness-0"
                />
                <motion.div
                  className="flex justify-between items-center w-full"
                  whileHover={{ opacity: 1 }}>
                  <h4 className="text-md font-semibold text-white transition-opacity duration-500">
                    {sector.title}
                  </h4>
                  <Image
                    src="/assets/img/icons/arwtp.svg"
                    alt=""
                    width={0}
                    height={0}
                    className="transition-all duration-500 ease-in-out group-hover:w-[14px]"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sectors;
