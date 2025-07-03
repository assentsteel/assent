"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {  gdsVariants, gdVariants, slideInTop } from "../../common/MotionAnimation";
gsap.registerPlugin(ScrollTrigger);
 
  
import { GpEuReachdata} from '@/public/types/Common';   
        
       const Excellence = ({ data }: { data: GpEuReachdata }) => {    
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
    <div className="py-[50px] md:py-[70px] xl:py-[100px] overflow-hidden relative bg-primary ">
      <div className="container">
  <div className="mb-8 lg:mb-[60px]">
    <motion.h2 className="text-xl text-white font-semibold"  variants={slideInTop}
                 initial="hidden"
                 whileInView="visible"
                 exit="exit">
      {data.title}
    </motion.h2>
  </div>

  <motion.div
  className="grid grid-cols-12"
  variants={gdVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  {data.items.map((item, index) => (
    <motion.div
      key={index}
      variants={gdsVariants}
      className="col-span-12"
      whileHover={{
        scale: 1.02,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        transition: { duration: 0.3 },
      }}
    >
      <div className="border-t border-[#ffffff40]">
        <div className="md:flex items-center py-9 px-4 md:px-8 transition-all duration-300">
          <div className="w-full md:w-1/2">
            <div className="mb-4 md:mb-0 lg:flex gap-2 items-baseline">
              <h3 className="text-xl font-semibold text-white">
                {item.number}
              </h3>
              <span className="text-md text-white">{item.value}</span>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-sm text-white">{item.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</motion.div>

</div>

    </div>
  );
};

export default Excellence;
