"use client";

import Image  from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);
 
  
  import { Career } from '@/public/types/Common';  
  
  const CareerText = ({ data }: { data: Career }) => {    
  const containerRef = useRef(null);


  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        width: 100,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Starts when the top of the section is 85% in view
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px]   overflow-hidden relative ">
      <div className="container">
  {/* {data.secondSection.items.map((item ,index) => ( */}
    <motion.div
       
      className="rounded-[15px] p-4  lg:py-[120px] lg:px-[100px] blueoverlay relative"
      style={{
        background: `url(${
          typeof data.secondSection.image === "string" ? data.secondSection.image : data.secondSection.image
        })`,
        backgroundSize: "cover",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full md:w-5/6 xl:w-2/3 flex flex-col justify-center relative z-10 h-full">
        <motion.h2
          className="text-xl text-white font-[600] leading-[1.2] mb-3 lg:mb-[30px]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {data.secondSection.title}
        </motion.h2>
 
          <motion.p 
            className="text-white text-base font-[400] leading-[1.8]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 , duration: 0.6 }}
          >
            {data.secondSection.description}
          </motion.p> 

        <div className="grid grid-cols-1 lg:grid-cols-2 mt-6 lg:mt-10 border-b border-white">
          {data.secondSection.items.map((spec, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 lg:gap-7 py-4 lg:py-[25px] border-t border-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
            >
              <Image src={spec.logo} alt={spec.logoAlt} width={37} height={38} />
              <p className="text-md text-white">{spec.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
 
</div>
    </section>
  );
};

export default CareerText;
