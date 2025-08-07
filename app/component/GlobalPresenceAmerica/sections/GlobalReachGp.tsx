"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { textContainerVariants, textItemVariants } from "../../common/MotionAnimation";
gsap.registerPlugin(ScrollTrigger);
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
 
  
  import { Globaltype } from '@/public/types/Common'; 
  
  const GlobalReachGp = ({ data,bgcolor }: { data: Globaltype , bgcolor?: string }) => {
  const containerRef = useRef(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

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

  function extractNumber(value: string): number {
    const cleaned = value.replace(/,/g, '');
    const match = cleaned.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  return (
    <div className={`py-[50px] md:py-[70px] xl:py-[100px] overflow-hidden relative ${bgcolor ? bgcolor : ''} `}>
      <div className="container">
        
        <motion.div
  className="grid grid-cols-12 "
  ref={ref}
  variants={textContainerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  {data.items.map((item, index) => (
    <motion.div
      className="col-span-12 lg:col-span-4 lg:px-4 last:pb-0 pb-5 lg:pb-0"
      key={index}
      variants={textItemVariants}
    >
      <div>
        <div
          className={`border-b ${
            bgcolor ? 'border-white' : 'border-territory'
          } mb-4 pb-4 lg:mb-8 lg:pb-8`}
        >
          <h3
            className={`text-40 font-semibold ${
              bgcolor ? 'text-white' : 'text-territory'
            }`}
          >
            {inView ? <CountUp start={0} end={extractNumber(item.number)} duration={2} delay={0.3} decimals={extractNumber(item.number) % 1 !== 0 ? 1 : 0} /> : 0}<span>{item.number.split(" ").length > 1 ? item.number.split(" ")[1] : ""}</span>
            <span className="text-secondary">+</span>
          </h3>
          <p
            className={`text-md ${
              bgcolor ? 'text-white' : 'text-territory'
            }`}
          >
            {item.value}
          </p>
        </div>
        <p
          className={`text-sm ${
            bgcolor ? 'text-white' : 'text-territory'
          } opacity-80`}
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  ))}
</motion.div>

      </div>
    </div>
  );
};

export default GlobalReachGp;
