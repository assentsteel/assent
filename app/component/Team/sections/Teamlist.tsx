"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { slideInLeft, slideInTop,containerVariants, itemVariants } from "../../common/MotionAnimation"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { assets } from "@/public/assets/assets";
gsap.registerPlugin(ScrollTrigger);

 
  
    import { Team } from '@/public/types/Common';   
    
    const Teamlist = ({ data }: { data: Team }) => {    
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
    <section className="py-[50px] md:py-[70px] xl:py-[100px]     overflow-hidden relative  ">
      <div className="container">
        <div>
          <motion.h2
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="font-semibold text-primary text-xl mb-8"
          >
            {data.teamSection.title}
          </motion.h2>
          <motion.div
            variants={slideInTop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-sm max-w-[102ch] text-territory mb-10"
          >
            <p>{data.teamSection.description}</p>
          </motion.div>
        </div>

          <motion.div
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4  gap-8"
  variants={containerVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
          >
        {data.teamSection.items.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <div className="relative group rounded-[15px] overflow-hidden h-full group">
              <div className="bg-[#CACBCA] group-hover:bg-primary relative transition-all duration-500 ">
              <figure className=" ">
                <Image
                  src={item.image}
                  alt=""
                  width={500}
                  height={500}
                  className="grayscale-[1] group-hover:grayscale-0 transition-all duration-400 w-full object-cover"
                />
                </figure>
                <Image
                  src={assets.lin}
                  alt=""
                  width={67}
                  height={67}
                  className="cursor-pointer absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-[-20px] group-hover:translate-x-0"
                />
              </div>
                <div className="">
                   <div className="px-5 py-5 lg:px-10 lg:py-5 bg-[#F5F5F5] rounded-b-[15px]" >
                    <p className="text-md font-semibold text-territory ">{item.name}</p>
                    <p className="text-[#595959]">{item.designation} </p>
                  </div>
                </div>


            </div>
          </motion.div>
        ))}
      </motion.div>

      </div>
    </section>
  );
};

export default Teamlist;
