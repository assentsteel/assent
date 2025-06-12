"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { gdVariants,gdsVariants } from "../../common/MotionAnimation";
gsap.registerPlugin(ScrollTrigger);

 import {   Sustainability  } from '@/public/types/Common';   
        
 const Listsec = ({ data }: { data: Sustainability}) => {    
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

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="pt-10 xl:pt-[42px]     relative  ">
      <div className="container">
      <motion.div
  className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
  variants={gdVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  {data.firstSection.items.map((Item, index) => (
    <motion.div
      key={index}
      variants={gdsVariants}
      className={`grabg border border-secondary rounded-full w-full h-[100px] md:h-[120px] xl:h-[151px] flex justify-center items-center group transition-all duration-500 hover:bg-cover hover:bg-center hover:border-white`}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{
        backgroundImage:
          hoveredIndex === index
            ? `url(${
                typeof Item.image === "object" && "src" in Item.image
                  ? Item.image
                  : Item.image
              })`
            : "linear-gradient(90.51deg, #D9D9D9 0.47%, rgba(217, 217, 217, 0) 99.63%)",
      }}
    >
      <div className="flex gap-2 items-center">
        <p>
          <Image
            src={Item.logo}
            alt={Item.logoAlt}
            className="group-hover:brightness-0 group-hover:invert-[1] transition-all duration-400"
            width={20}
            height={33}
          />
        </p>
        <p className="text-lg text-territory group-hover:text-white transition-all duration-400">
          {Item.title}
        </p>
      </div>
    </motion.div>
  ))}
</motion.div>


        </div>
    </section>
  );
};

export default Listsec;
