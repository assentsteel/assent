"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gdsVariants, gdVariants, slideInTop } from "../../common/MotionAnimation";
gsap.registerPlugin(ScrollTrigger);
interface secar{
  count: string;
  title: string;
  details: string;
}
interface PlatformsSection{
  heading: string;
   data: secar[]
}
interface PlatformsSectionProps {

  data: PlatformsSection;
}


const EuReach: React.FC<PlatformsSectionProps> = ({ data }) => {
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
    <div className="py-[50px] md:py-[70px] xl:py-[100px] overflow-hidden relative bg-primary ">
      <div className="container">
        <div className="mb-4 lg:mb-[60px]">
          <motion.h2 className="text-xl text-white font-semibold"
        variants={slideInTop}
                         initial="hidden"
                         whileInView="visible"
                         exit="exit">
            {data.heading}
          </motion.h2>
        </div>
        <motion.div className="grid grid-cols-12  "
                    variants={gdVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}>
        {data.data.map((item, index) => (
            <motion.div className="col-span-12 lg:col-span-4 group" key={index}   variants={gdsVariants}>
              <motion.div
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="border-b border-white group-hover:border-secondary transition-all ease-in-out duration-400 mb-4 pb-4 lg:mb-8 lg:pb-8">
                <div className="flex gap-2 items-baseline">
                      <h3 className="text-xl font-semibold text-white">
                        {item.count}
                      </h3>
                      <span className="text-md text-white">{item.title}</span>
                    </div>
                </div>
                <p className="text-sm text-white opacity-80">
                  {item.details}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default EuReach;
