"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { GPNinthSection } from "../types";
const PartnershipModel = ({ data }: { data: GPNinthSection }) => {
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <section className="py100  overflow-hidden relative  ">
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
                <h2 className="text-xl  text-primary font-[600] leading-[1.2] max-w-[20ch] max-w-[33ch]">
                  {data.title}
                </h2>
              </div>
            </motion.div>
          </div>
          <div className="col-span-12 lg:col-span-12 ">
            <div>
              <div className="overflow-hidden max-w-[122ch]">
                <motion.div
                  className="text-sm font-normal  text-territory leading-[1.48] "
                  variants={slideInbtm}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  dangerouslySetInnerHTML={{ __html: data.description }}
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-lg  text-primary font-[600] leading-[1.27]   mt-7 2xl:mt-[60px]">
          {data.subtitle}
        </h2>
        <div className=" mt-5 lg:mt-[60px]">
          {data.items.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="border-b border-[#E6E6E6] last:border-b-0 first:border-t px-[20px] hover:bg-[linear-gradient(360deg,_#D9D9D9_0%,_rgba(217,217,217,0)_100%)] transition-colors duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 xl:gap-10 2xl:gap-[235px] lg:items-center justify-between py-7 lg:py-[44px] ">
                <h3 className="text-md font-[500] text-black lg:w-1/2">
                  {item.title}
                </h3>
                <p className="text-sm font-normal text-territory max-w-[58ch] lg:w-1/2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipModel;
