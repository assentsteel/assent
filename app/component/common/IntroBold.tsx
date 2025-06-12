"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

 
  
        import {   introbold } from '@/public/types/Common';   
        
        const IntroBold = ({ data }: { data: introbold}) => {    
   const containerRef = useRef(null);

   const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };


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
  return (
    <section className="pt-10 xl:pt-[42px]   overflow-hidden relative  ">
      <div className="container">
      <div className="grid grid-cols-12   ">
        <div className="col-span-12 lg:col-span-5">
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
        className="text-xl text-primary font-[600] leading-[1.2] mb-4 lg:mb-0"
        custom="x"
        variants={textVariants}
      >
        {data.title}
      </motion.h2>


          </motion.div>
        </div>

<motion.div
  className="col-span-12 lg:col-span-7 right-0 pl-[0px] lg:pl-[50px]"
>
  <div>
  <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className=""
              >

                  <div >
 
        <motion.div 
          className="text-sm font-normal mb-5 last:mb-0   text-territory leading-[1.6]"
          custom="y"
  variants={textVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  transition={{ delay: 0.2  , duration: 0.5 }}
  dangerouslySetInnerHTML={{__html: data.description}}
        > 
        </motion.div> 
     </div>
    </motion.div>
  </div>
</motion.div>
        </div>
        </div>
    </section>
  );
};

export default IntroBold;
