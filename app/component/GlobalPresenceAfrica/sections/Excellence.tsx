"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
interface secar{
  title: string;
  subtitle: string;
  details: string;
}
interface PlatformsSection{
  heading: string;
   data: secar[]
}
interface PlatformsSectionProps {

  data: PlatformsSection;
}


const Excellence: React.FC<PlatformsSectionProps> = ({ data }) => {
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
          <h2 className="text-xl text-white font-semibold">
            {data.heading}
          </h2>
        </div>
        <div className="grid grid-cols-12   ">
        {data.data.map((item, index) => (
            <div className="col-span-12 " key={index}>
              <motion.div
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
              <div className="border-t border-[#ffffff40]  ">
                <div className="flex items-center py-9">
                  <div className="w-1/2">
                    <div className="flex gap-2 items-baseline">
                    <h3 className="text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <span className="text-md text-white">{item.subtitle}</span>
                    </div>
                  </div>
                <div className="w-1/2">
                    <p className="text-sm text-white">{item.details}</p></div>
                </div>
                </div>

              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Excellence;
