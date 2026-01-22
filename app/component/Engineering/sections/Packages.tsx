"use client";
import Image  from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion"
gsap.registerPlugin(ScrollTrigger);

 
  
       import {   Engineering } from '@/public/types/Common';   
      const Packages = ({ data }: { data: Engineering}) => {   
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
  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -30, transition: { duration: 0.4 } },
  };
  return (
    <section className="pt-0 md:pt-[70px] xl:pt-[80px] xxl:pt-[100px] pb-[50px] md:pb-[70px] xl:pb-[100px]   overflow-hidden relative ">
      <div className="container">

        <div className="">
          <div>
          <motion.h2
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
              className="text-xl  text-primary font-[600] leading-[1.2] mb-5 lg:mb-[60px]"
              dangerouslySetInnerHTML={{ __html: data.fifthSection.title}}
          >
          </motion.h2>

          </div>

          <div className="w-full ">
            {data.fifthSection.items.map((item,index)=> (
            <div className="" key={index}>
              <div className="pb-5 border-b mt6 md:mt-[60px]">
                  <p className="text-lg font-[500]">{item.title}</p>
                </div>

                {item.elements.map((ite ,index) => (
                  <div className="md:flex border-b py-3 lg:py-[42px] px-3 lg:px-[30px] bg-white hover:bg-[#005F9E08] " key={index}>
                    <div className="w-full md:w-3/5">
                      <div className="flex gap-4 md:gap-[95px] items-center mb-4 md:mb-0">
                        <div><Image
                          src={ite.logo}
                          alt={ite.logoAlt}
                          className="group-hover:brightness-0 group-hover:invert "
                          width={50}
                          height={50}
                        /></div>
                        <div><p className="text-md opacity-90">{ite.title}</p></div>
                      </div>
                    </div>
                    <div className="w-full md:w-2/5">
                      <div><p className="text-sm opacity-90">{ite.description}</p></div>
                    </div>
                  </div>
                ))}

            </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
