"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion"
import { assets } from "@/public/assets/assets";
import { slideInLeft } from "../../common/MotionAnimation";
gsap.registerPlugin(ScrollTrigger); 

import { Sustainability } from '@/public/types/Common';  

const Initiatives = ({ data }: { data: Sustainability }) => {   
  const [activeIndex, setActiveIndex] = useState(0);
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
    <section className="pt-[50px] md:pt-[70px] xl:pt-[100px] pb-[50px] md:pb-[70px] xl:pb-[100px]   overflow-hidden relative ">
      <div className="container">
        <div>
          <motion.h2
            variants={slideInLeft}
            initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            exit="exit"
            className="text-xl  text-primary font-[600] leading-[1.2] mb-4 lg:mb-[40px]"
          >
            {data.fifthSection.title}
          </motion.h2>

        </div>
        <div className="lg:flex lg:items-center xxl:items-center">

          <div className="w-full lg:w-[60%] pr-0 lg:pr-[35px] mt-6 lg:mt-0">
  {data.fifthSection.items.map((da, index) => (
    <div className="border-b last:border-b-0  border-[#00000015]" key={index}>
      <motion.div
      key={index}
      className="group  py-5  lg:py-[20px] xxl:py-[30px] group transition-all duration-300"
      onMouseEnter={() => setActiveIndex(index)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
        <div className="flex gap-5 items-start">
        <Image src={assets.arrowgreen} alt="" className={`${activeIndex === index ? ' ' : 'brightness-0 opacity-[1]'} `} width={20} height={20}/>
          <div>
          <h3
          className={`  text-md   group-hover:text-secondary transition-all duration-300 cursor-pointer leading-[1] font-[500] text-territory
          `}
        > {da.title}
          </h3>
          <AnimatePresence mode="wait">
        {activeIndex === index && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: "20px" }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4 }}
            className="text-territory text-sm font-[400] leading-[1.7]"
          >
            <p>{da.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
      </div>

    </motion.div>
    </div>
  ))}
          </div>
          <div className="w-full lg:w-[40%] pl-0 lg:pl-[35px] ">
            {data.fifthSection.items.map((item ,index) => (
              <motion.div className=" hidden first:block" key={index}
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              exit="exit">
                <figure className="image-wrapper h-full ">
                  <Image
                    src={item.image}
                    alt=""
                    className="rounded-[15px] w-full object-cover "
                    priority
                    width={500}
                    height={500}
                  />
                </figure>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Initiatives;
