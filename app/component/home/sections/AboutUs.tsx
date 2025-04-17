"use client";

import Link from "next/link";
import StatsSection from "./StatsSection";
import { FaChevronRight } from "react-icons/fa6";
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
    <section className="overflow-hidden relative border-b border-territory/10 pt-[60px] lg:pt-0">
      <div className="grid grid-cols-12 items-center left-spacing pr-[15px] md:pr-0">
        <div className="col-span-12 lg:col-span-5">
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
            <div className="overflow-hidden mb-[30px] lg:mb-[70px] pb-2">
            <motion.h2
              variants={textItemVariants}
              className="text-xl leading-none text-primary font-semibold "
            >
              Founded in 2008, ASSENT STEEL INDUSTRIES is a leader in steel
              fabrication & engineering services
            </motion.h2>
            </div>
            <div className="overflow-hidden">
            <motion.div variants={textItemVariants}>
              <Link
                href="#"
                className="text-xs border-b border-secondary uppercase group pb-[16px] inline-flex items-center gap-[18px] text-territory font-medium"
              >
                About ASSENT
                <div className="w-[20px] h-[20px] text-secondary bg-territory group-hover:bg-secondary group-hover:text-primary flex items-center text-[14px] justify-center transition duration-300 ease-in-out">
                  <FaChevronRight />
                </div>
              </Link>
            </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="col-span-12 lg:col-span-7 right-0 pl-[0px] lg:pl-[50px]">
          <div ref={containerRef}>
          <StatsSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
