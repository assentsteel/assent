"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);



const ContentText = () => {
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

  return (
    <section className="section-spacing   overflow-hidden relative  ">
      <div className="container">
      <div className="grid grid-cols-12  left-spacing pr-[15px] md:pr-0">
        <div className="col-span-12 lg:col-span-5">
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="overflow-hidden mb-[20px] ">
            <motion.h2
              className="text-xl  text-primary font-[600] leading-[1.2] "
            >
              Safe & Efficient Steel Erection Solutions
              </motion.h2>
            </div>


          </motion.div>
        </div>
        <div className="col-span-12 lg:col-span-7 right-0 pl-[0px] lg:pl-[50px]">
          <div >
          <div className="overflow-hidden ">

              <p className="text-sm font-normal  text-territory leading-[1.6]">With over a decade of experience, ASSENT STEEL INDUSTRIES L.L.C is a trusted steel erection company in Dubai, UAE. We provide complete, integrated erection and construction solutions, capable of installing up to 4,000 tonnes of structural steel per month. Our skilled team ensures efficient planning, from material delivery to installation, optimizing cost, time, and safety. Working alongside industry experts, we deliver customized, stable, and high-quality erection solutions tailored to project needs.</p>
            </div>
          </div>
        </div>
        </div>
        </div>
    </section>
  );
};

export default ContentText;
