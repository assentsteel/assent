"use client";

import  { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  title: string;
  paragraphs: string[];
  image: string | StaticImageData;
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}
const SingleImageText: React.FC<PlatformsSectionProps> = ({data
}) => {

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
  const slideInTop = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
  };

  return (
    <section className="pt-0 md:pt-[70px] xl:pt-[100px] pb-[50px] md:pb-[70px] xl:pb-[100px] overflow-hidden relative ">
      <div className="container">
        {data.map((item) => (
               <div className="rounded-[15px] p-6 lg:py-[120px] lg:px-[100px] blueoverlay relative  " key={item.id} style={{background:`url(${typeof item.image === 'string' ? item.image : item.image.src})`, backgroundSize:'cover'}}>

            <div className={`max-w-[100ch]      flex flex-col justify-center relative z-10  h-full `}>
            <motion.h2 className="text-xl    text-white font-[600] leading-[1.2] mb-3 lg:mb-[30px]"
 variants={slideInLeft}
 initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
     >{item.title}</motion.h2>
     <motion.div
 variants={slideInTop}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.3 }}
      >
              {item.paragraphs.map((paragraph, index) => (
                <p key={index} className="max-w-[74ch] text-white text-base font-[400] leading-[1.8]">
                  {paragraph}
                </p>
              ))}
                </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SingleImageText;
