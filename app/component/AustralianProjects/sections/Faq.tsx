"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion"; 
gsap.registerPlugin(ScrollTrigger);

import { typefaq } from "@/public/types/Common";
 
  const Faq = ({ data }: { data: typefaq }) => {

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
 const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };
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
    <section className="  pb90   overflow-hidden relative ">
      <div className="container">
        <div>
          
          <motion.div
              variants={textContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2
                className={`text-xl  text-primary font-[600] leading-[1.2] xl:leading-[1] mb-5 lg:mb-[60px]`}
                custom="x"
                variants={textVariants} 

              >
                {data.title}
              </motion.h2>
            </motion.div>
        </div>
          <div className=" ">
            
          <div className="w-full   mt-6 lg:mt-0">
            {data.items.map((da, index) => (
              <div
                className="border-b first:border-t border-[#00000015]"
                key={index}
              >
                <motion.div
                  key={index}
                  className="group py-6 lg:py-[25px] xxl:py-[42.5px] transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setActiveIndex(index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {/* FIXED ROW */}
                  <div className="flex gap-5 items-start">
                   
                    {/* TITLE + DESCRIPTION */}
                    <div className="flex-1">
                      <div className="flex justify-between ">
                        {/* TITLE */}
                        <h3 className={` capitalize text-[17px] md:text-md text-primary transition-all duration-300 leading-[1.2] xl:leading-[1] font-[500]  pr-3 xl:pr-6 `}>
                          {da.title}
                        </h3>

                        {/* RIGHT ARROW (aligns EXACTLY with the title) */}
                        <Image
                          src="/assets/img/icons/arrow_down.png"
                          alt="logo"
                          width={17}
                          height={8}
                          className={`w-[17px] h-[8px] transition-all duration-300 ${
                            activeIndex === index ? "rotate-180" : ""
                          }`}
                        />
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
                            }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-[105ch] text-territory text-sm font-[400] leading-[1.58] pr-6 overflow-hidden !mt-4 lg:!mt-[30px]"
                          >
                            <p >{da.description}</p>
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

export default Faq;
