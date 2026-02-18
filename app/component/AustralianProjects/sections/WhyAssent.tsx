"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion"; 
import { slideInLeft } from "../../common/MotionAnimation";
gsap.registerPlugin(ScrollTrigger);

import { whyus } from "@/public/types/Common";
 
  const WhyAssent = ({ data }: { data: whyus }) => {

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
    <section className="py100   overflow-hidden relative ">
      <div className="container">
        <div>
          <motion.h2
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            exit="exit"
            className="text-xl font-[600] leading-[1.2] mb-4 lg:mb-[30px]  text-primary      "
          >
            {data.title}
          </motion.h2>
          <motion.p className="text-sm text-tertiary font-[400] leading-[1.5] mb-5 xl:mb-[40px] 2xl:mb-[60px] max-w-[105ch]"
          custom="y"
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2, duration: 0.5 }}>
            {data.description}
          </motion.p>
          
        </div>
          <div className="lg:grid   lg:grid-cols-[457px_auto] xl:grid-cols-[500px_auto] 2xl:grid-cols-[797px_auto] lg:items-center xxl:items-center gap-5 lg:gap-[66px]">
             <div className="w-full     ">
            {/* {data.items.map((item, index) => ( */}
              <motion.div
                className=" hidden lg:block"
                // key={index}
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                exit="exit"
              >
                <figure className="image-wrapper h-full ">
                  <Image
                    src={data.items[activeIndex].image}
                    alt=""
                    className="rounded-[15px] w-full object-cover "
                    priority
                    width={500}
                    height={500}
                  />
                </figure>
              </motion.div>
            {/* ))} */}
          </div>
          <div className="w-full   mt-6 lg:mt-0">
            {data.items.map((da, index) => (
              <div
                className="border-b first:border-t  border-[#00000015]"
                key={index}
              >
                <motion.div
                  key={index}
                  className="group py-5 lg:py-[20px] 2xl:py-[30px] transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setActiveIndex(index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {/* FIXED ROW */}
                  <div className=" ">
                    

                    {/* TITLE + DESCRIPTION */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        {/* TITLE */}
                        <h3 className={`${
                        activeIndex === index ? "text-secondary" : "text-territory"
                      } capitalize text-[17px] md:text-md group-hover:text-secondary transition-all duration-300 leading-[1.22] font-[500]  pr-6`}>
                          {da.title}
                        </h3>
 
                      </div>

                      {/* DESCRIPTION DROPDOWN */}
                      <AnimatePresence mode="wait">
                        {activeIndex === index && (
                          <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: 1,
                              height: "auto",
                              marginTop: "20px",
                            }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-[70ch] text-territory text-sm font-[400] leading-[1.7] pr-6 overflow-hidden"
                          >
                             <motion.div
                className=" mb-4 lg:hidden" 
              >
                <figure className="image-wrapper h-full ">
                  <Image
                    src={data.items[activeIndex].image}
                    alt=""
                    className="rounded-[15px] w-full object-cover "
                    priority
                    width={500}
                    height={500}
                  />
                </figure>
              </motion.div>
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

       
        </div>
      </div>
    </section>
  );
};

export default WhyAssent;
