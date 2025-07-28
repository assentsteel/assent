"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useJobSelectContext } from "@/contexts/jobSelectionContext";
gsap.registerPlugin(ScrollTrigger);
 
  
  import { Career } from '@/public/types/Common';  
  
  const Openings = ({ data }: { data: Career }) => {    
  const containerRef = useRef(null);

  const { setJobSelect } = useJobSelectContext();


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
    <section className="py-[50px] md:py-[70px] xl:py-[100px]   overflow-hidden relative bg-primary">

<div className="container"> 
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-xl text-white font-[600] leading-[1.2] mb-3 lg:mb-[30px]"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {data.thirdSection.title}
      </motion.h2>

      {data.thirdSection.items.map((jobarray, index) => (
        <motion.div
          key={index}
          className="md:flex justify-between items-center group py-5 lg:py-10 border-b"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
        >
          <div className="md:w-1/2">
            <p className="font-[600] text-lg text-white group-hover:text-secondary transition-colors duration-300">
              {jobarray.title}
            </p>
          </div>

          <div className="md:w-1/2 flex justify-between items-center font-[600] text-md text-white group-hover:text-secondary mt-3 md:mt-0">
            <p>{jobarray.location}</p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() =>{
                setTimeout(() => {
                  const target = document.getElementById("wantToJoin");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100)

                setJobSelect(jobarray.title);
              }}
              className="flex gap-4 items-center w-fit m-0 group-hover:border-b cursor-pointer group-hover:border-secondary pb-[10px] transition-all duration-500"
            >
              <p className="text-xs uppercase text-white group-hover:text-secondary font-[500] inline-flex leading-[1]">
                Apply Now
              </p>

              <div className="min-w-[20px] min-h-[20px] bg-black group-hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-500">
                <svg
                  stroke="#ffffff"
                  fill="#ffffff"
                  strokeWidth="0"
                  viewBox="0 0 320 512"
                  height="10px"
                  width="8px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
 
</div>
    </section>
  );
};

export default Openings;
