"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


import { textContainerVariants ,textItemVariants} from "./MotionAnimation"



interface PlatformsSectionProps {

  data: {id: number;
    heading: string;
    title: string;
    paragraphs: string[];}
}
const Intro: React.FC<PlatformsSectionProps> = ({ data }) => {
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
    <section className="pt-[50px] xl:pt-[60px]   overflow-hidden relative  ">
      <div className="container">
      <div className="grid grid-cols-12  ">
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
              className="text-md uppercase  text-[#595959] font-medium border-b inline-flex border-secondary pb-[10px] lg:pb-[25px] leading-none "
            >
             {data.title}
            </motion.p>
            </div>


          </motion.div>
        </div>

<motion.div
  className="col-span-12 lg:col-span-8 right-0 pl-[0px] lg:pl-[50px]"
>
  <div>
  <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className=""
              >

                  <div >
                 <motion.h2
        className="text-xl text-primary font-[600] leading-[1.2] mb-4 lg:mb-6"
        custom="x"
        variants={textVariants}
      >
        {data.heading}
      </motion.h2>

      {data.paragraphs.map((text, index) => (
        <motion.p
          key={index}
          className="text-sm font-normal mb-0   text-territory leading-[1.6]"
          custom="y"
          variants={textVariants}
          transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
        >
          {text}
        </motion.p>
      ))}
     </div>
    </motion.div>
  </div>
</motion.div>
        </div>
        </div>
    </section>
  );
};

export default Intro;
