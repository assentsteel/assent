"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { containersVariants, textItemsVariants } from "../../common/MotionAnimation";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useState } from "react";
import { useSearchContext } from "@/contexts/searchContext";

gsap.registerPlugin(ScrollTrigger);

import Image from "next/image";


   import {   Sustainability  } from '@/public/types/Common';
import Link from "next/link";

   const Policy = ({ data }: { data: Sustainability}) => {
  const containerRef = useRef(null);

   const {setSearchActive} = useSearchContext();

  const [isOpen, setIsOpen] = useState(false); 

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

      useEffect(() => {
        if (isOpen) {
          const scrollY = window.scrollY;
          document.body.dataset.scrollY = String(scrollY);
          document.body.style.position = 'fixed';
          document.body.style.overflow = 'hidden';
          document.body.style.top = `-${scrollY}px`;
          document.body.style.width = '100%';
          //search context was used here to avoid conflicts between two contexts
          setSearchActive(true);
        } else {
          const scrollY = document.body.dataset.scrollY;
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
          window.scrollTo(0, scrollY ? parseInt(scrollY) : 0);
          //search context was used here to avoid conflicts between two contexts
          setSearchActive(false);
        }
      }, [isOpen]);


  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px] overflow-hidden relative  ">
        <div className="container">
          <div className="py-[50px] md:py-[70px] xl:py-[100px] border-t border-b">
          <div className="grid grid-cols-12  left-spacing pr-[15px] md:pr-0">
            <div className="col-span-12 lg:col-span-6 mb-6 lg:mb-0">
              <motion.div
                className="h-full"
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
  className="flex flex-col justify-between h-full"
  variants={containersVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  <motion.div
    className="overflow-hidden mb-[20px] lg:mb-[48px]"
    variants={textItemsVariants}
  >
    <motion.p
      variants={textItemsVariants}
      className="text-md uppercase text-[#595959] font-medium border-b inline-flex border-secondary pb-[10px] lg:pb-[25px] leading-none"
    >
      {data.secondSection.firstTitle}
    </motion.p>
  </motion.div>

  <motion.div
    variants={textItemsVariants}
    className="bg-[#F2F6F6] p-4 md:px-[40px] md-py-[15px] rounded-[15px]"
  >
    <motion.h3
      className="text-md font-semibold text-territory mb-2"
      variants={textItemsVariants}
    >
       {data.secondSection.thirdTitle}
    </motion.h3>

    <motion.p
      className="text-sm text-territory opacity-85 mb-3 lg:mb-8"
      variants={textItemsVariants}
    >
     {data.secondSection.fileDescription}
    </motion.p>

    <motion.button
      variants={textItemsVariants}
      className="group gap-4 flex justify-between items-center mt-auto border border-secondary py-2 px-6 rounded-full bg-white hover:bg-secondary hover:text-white text-territory transition text-xs h-[40px] lg:h-[48px] font-medium uppercase relative"
    >
      <span className="w-fit text-center">
      {data.secondSection.fileName}
      </span>
      <div className="flex gap-3">
                        <Link href={data.secondSection.file} target="_blank"><div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                            <path d="M1.6084 15H12.6084M7.1084 1V11.5M7.1084 11.5L10.3167 8.4375M7.1084 11.5L3.90007 8.4375" stroke="#1F1F1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div></Link>
                        <div>
                                <Image src="/assets/img/icns/eye.png" alt="Logo" width={22} height={15} onClick={() => setIsOpen(true)}/>
                        </div>

      </div>
    </motion.button>
  </motion.div>
</motion.div>
              </motion.div>
            </div>

            <motion.div className="col-span-12 lg:col-span-6 right-0 pl-[0px] lg:pl-[50px]">
              <div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className=""
                >
                  <div>
                    <motion.h2
                      className="text-xl text-primary font-[600] leading-[1.2] mb-4 lg:mb-6"
                      custom="x"
                      variants={textVariants}
                    >
                      {data.secondSection.secondTitle}
                    </motion.h2>

                        <motion.p
                        className="last:mb-0 text-sm font-normal mb-3 lg:mb-6 text-territory leading-[1.6]"
                        custom="y"
                        variants={textVariants}
                        transition={{ delay: 0.2  , duration: 0.5 }}
                      >
                       {data.secondSection.description}
                      </motion.p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

            {isOpen && (
                        <div
                        className="fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-60"
                        onClick={() => setIsOpen(false)}
                      > 
                <div className="relative w-[80%] md:w-[65%] xl:w-[40%] h-[80%] bg-white rounded-lg shadow-lg overflow-hidden"
                 onClick={(e) => e.stopPropagation()} >
                            <button
                    className="absolute top-2 right-5 text-black hover:text-red-600 text-2xl font-bold z-[1] "
                    onClick={() => setIsOpen(false)}
                            >
                    &times;
                            </button>
      
                  <div className="w-full h-full mt-10">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js`}>
                      <Viewer fileUrl={data.secondSection.file || ""} />
                    </Worker>
                  </div>
                </div> 
                </div>
            )}


    </section>
  );
};

export default Policy;
