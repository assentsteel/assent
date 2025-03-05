"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";


const sectors = [
  {
    id: 1,
    title: "Engineering",
    icon: "/assets/img/icns/Engineering iocn.svg",
    poster: "/assets/img/service/Engineering.jpg",
  },
  {
    id: 2,
    title: "Fabrication",
    icon: "/assets/img/icns/Fabrication.svg",
    poster: "/assets/img/service/fabrication.png",
  },
  {
    id: 3,
    title: "Blasting & Painting",
    icon: "/assets/img/icns/Blasting & Painting.svg",
    poster: "/assets/img/service/Painting.jpg",
  },
  {
    id: 4,
    title: "Steel Erection",
    icon: "/assets/img/icns/Steel Erection.svg",
    poster: "/assets/img/service/Erection.jpg",
  },

];

const ServiceSec = () => {

  return (
    <section className="section-spacing overflow-hidden bg-primary">
      <div className="container">
        {/* Section Header Animation */}
      
        {/* Section Title and Description Animation */}
        <motion.div
          className="flex overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className="text-xl font-semibold mb-5 lg:mb-[50px] leading-none text-white ">
          Services
          </h2>
       
        </motion.div>

        {/* Grid Section with Sectors */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-[30px] items-center border-b border-white/35">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.id}
              className="relative group cursor-pointer before:content-[''] before:absolute before:bottom-0 before:top-auto before:left-0 before:h-[4px] before:bg-secondary before:z-10  before:w-0 before:mx-auto hover:before:w-full before:transition-all before:duration-300 before:ease-in-out border-b border-white/30 lg:border-b-0"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.3 }}
            
              viewport={{ once: true, amount: 0.5 }}>
                <motion.div className="rounded-custom overflow-hidden relative"  whileHover={{ scale: 1.05, rotateY: 10, rotateX: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 10 }}>
              <Image
                src={sector.poster}
                alt="Background Image"
                width={800} height={800}
              />
              <MdArrowOutward className="text-white absolute right-[20px] z-10 text-[0px] group-hover:text-lg top-[20px] opacity-0 transition-all ease-in-out duration-500 group-hover:opacity-100 translate-x-[10px] hover:translate-x-[0px] " />
              </motion.div>

              <motion.div
                className="flex flex-col text-white rounded-custom gap-[20px] group-hover:bg-primary transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true, amount: 0.3 }}>
              
                <motion.div
                  className="flex justify-between items-center w-full pt-[30px] pb-[20px] lg:pt-[45px] lg:pb-[35px]"
                  whileHover={{ opacity: 1 }}>
                  <h4 className="text-lg font-semibold text-white transition-opacity duration-500">
                    {sector.title}
                  </h4>
                  <Image
                  src={sector.icon}
                  alt=""
                  width={35}
                  height={35}
                  className="transition-all duration-500 invert brightness-0 group-hover:invert-0 group-hover:brightness-100 w-0 group-hover:w-[35px]"
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

export default ServiceSec;
