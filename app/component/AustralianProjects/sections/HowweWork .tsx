"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/public/assets/assets";
import { slideInLeft } from "../../common/MotionAnimation";
gsap.registerPlugin(ScrollTrigger);

import { HowWework } from "@/public/types/Common";
 
  const HowweWork = ({ data }: { data: HowWework }) => {

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
    <section className="pt60 pb100   overflow-hidden relative ">
      <div className="container">
        <div>
          <motion.h2
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            exit="exit"
            className="text-lg  text-primary font-[600] leading-[1.27] mb-2  xl:mb-5 2xl:mb-[40px]"
          >
            {data.title}
          </motion.h2>
          
        </div>
          <div className="lg:grid   lg:grid-cols-[400px_auto]  xl:grid-cols-[550px_auto] 2xl:grid-cols-[656px_auto] lg:items-center xxl:items-center gap-5 lg:gap-[66px]">
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
          <div className="w-full     ">
            {data.items.map((da, index) => (
              <div
                className="border-b last:border-b-0 border-[#00000015]"
                key={index}
              >
                <motion.div
                  key={index}
                  className="group last:pb-0 last:lg:pb-[20px] last:xxl:pb-[30px] py-5 lg:py-[20px] xxl:py-[30px] transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setActiveIndex(index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {/* FIXED ROW */}

                    <div className="flex-1">
                  <div className="flex gap-3 xl:gap-5 items-start">
                    {/* LEFT ARROW (rotates when active) */}
                    <Image
                      src={assets.arrowgreen}
                      alt=""
                      width={20}
                      height={20}
                      className={`transition-all duration-300 ${
                        activeIndex === index ? "" : "brightness-0 opacity-[1]"
                      }`}
                    />

                    {/* TITLE + DESCRIPTION */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        {/* TITLE */}
                        <h3 className={`${
                        activeIndex === index ? "text-secondary" : "text-territory"
                      } capitalize text-[17px] md:text-md group-hover:text-secondary transition-all duration-300 leading-[1.2] font-[500]  pr-6`}>
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

                    </div>
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
                              marginTop: "10px",
                            }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-[70ch] text-territory text-sm font-[400] leading-[1.7] lg:pr-6 overflow-hidden lg:ps-[38px]"
                          >
                            <motion.div
                className=" mt-3 mb-3 lg:hidden" 
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
                </motion.div>
              </div>
            ))}
          </div>

       
          </div>
      </div>
    </section>
  );
};

export default HowweWork;
