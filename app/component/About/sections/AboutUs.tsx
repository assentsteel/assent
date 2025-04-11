"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);



const AboutUs = () => {
   const containerRef = useRef(null);

   const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
    <section className="section-spacing   overflow-hidden relative  ">
      <div className="container">
      <div className="grid grid-cols-12  left-spacing pr-[15px] md:pr-0">
        <div className="col-span-12 lg:col-span-4">
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="overflow-hidden mb-[20px] lg:mb-[48px]">
            <motion.p
              variants={textItemVariants}
              className="text-md uppercase text-[#595959] font-medium border-b inline-flex border-secondary pb-[10px] lg:pb-[25px] leading-none "
            >
              About Company
            </motion.p>
            </div>


          </motion.div>
        </div>
        <div className="col-span-12 lg:col-span-8 right-0 pl-[0px] lg:pl-[50px]">
          <div >
          <div className="overflow-hidden pb-2">
            <motion.h2
              className="text-xl  text-primary font-[600] leading-[1.2] mb-4 lg:mb-6"
            >
              Leading Steel Fabrication & Engineering Excellence in the GCC
              </motion.h2>
              <p className="text-sm font-normal mb-3 lg-mb-6 text-territory leading-[1.6]">A prominent member company of the ASGC Group, ASSENT STEEL INDUSTRIES L.L.C started in 2008 with a fully equipped and highly advanced Steel manufacturing company in Dubai and the GCC Region.</p>

              <p className="text-sm font-normal text-territory leading-[1.6]">Today, ASSENT STEEL INDUSTRIES L.L.C is a leading Steel Fabrication and Erection company in the region, supported by a large steel engineering services facility to serve the requirements of industrial and commercial projects. Our team of industry experts focuses on delivering high-quality products and services to serve the high global demand for steel construction products.

              </p>
            </div>
          </div>
        </div>
        </div>
        </div>
    </section>
  );
};

export default AboutUs;
