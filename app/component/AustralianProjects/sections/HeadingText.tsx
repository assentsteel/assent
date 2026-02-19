"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react"; 
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card"
gsap.registerPlugin(ScrollTrigger);

 
  
      import { Sectwo } from '@/public/types/Common';   
        const HeadingText = ({ data }: { data: Sectwo }) => {
 
  const containerRef = useRef(null);

  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -30, transition: { duration: 0.4 } },
  };
  const slideInbtm = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
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
 
  return (
    <section className="pt100  overflow-hidden relative  ">
      <div className="container">
        <div className="grid grid-cols-12   ">
          <div className="col-span-12 lg:col-span-12">
            <motion.div
               variants={slideInLeft}
               initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="overflow-hidden mb-[20px] 2xl:mb-[30px] ">
                <h2 className="text-xl  text-primary font-[600] leading-[1.364]   max-w-[20ch]">
                   {data.title} 
                </h2>
              </div>
            </motion.div>
          </div>
          <div className="col-span-12 lg:col-span-12 ">
            <div>
              <motion.div className="overflow-hidden max-w-[140ch]"
               variants={slideInbtm}
               initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}>

                <div className="text-sm font-normal  text-territory leading-[1.53] "
                dangerouslySetInnerHTML={{__html: data.description}}> 
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <h2 className="text-lg  text-primary font-[600] leading-[1.267]   mt-5 2xl:mt-[60px]">{data.innertitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[30px] mt-5 lg:mt-[30px]">
       <Card data={{ items: data.items }} />
</div>

      </div>
    </section>
  );
};

export default HeadingText;
