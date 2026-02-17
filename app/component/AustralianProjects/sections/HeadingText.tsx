"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  return (
    <section className="pt-[50px] md:pt-[70px] xl:pt-[100px]  overflow-hidden relative  ">
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

                <div className="text-sm font-normal  text-territory leading-[1.6] "
                dangerouslySetInnerHTML={{__html: data.description}}> 
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <h2 className="text-lg  text-primary font-[600] leading-[1.2]   mt-5 2xl:mt-[60px]">{data.innertitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[30px] mt-5 lg:mt-[30px]">
        {data.items.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div className="relative group">
              <motion.figure className="overlayclr" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={500}
                  height={500}
                  className="rounded-[15px] w-full object-cover h-[411px] xl:h-[401px] 2xl:h-[511px]"
                />
              </motion.figure>

              <div className="absolute bottom-0 px-4 pb-4 lg:px-[30px] lg:pb-[30px]">
                <motion.p
                  className="text-md xl:text-[24px] text-white font-[600] pb-[20px] border-b-2 border-white transform transition-transform duration-500 group-hover:border-secondary"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.title}
                </motion.p>
                <div className=" max-h-0 group-hover:max-h-[400px] overflow-hidden transition-all duration-500">
                     <p className="mt-[20px] text-sm text-white opacity-0 h-0 overflow-hidden group-hover:opacity-100 group-hover:h-auto transition-all duration-500 delay-100">{item.description}</p>
            
                </div>
               </div>
            </div>
          </motion.div>
        ))}
</div>

      </div>
    </section>
  );
};

export default HeadingText;
