"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

interface specarr {
  icon : string | StaticImageData;
  text: string;
}
interface PlatformsItem {
  id: number;
  title: string;
  paragraphs: string[];
  image: string | StaticImageData;
  specs: specarr[];
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}
const CareerText: React.FC<PlatformsSectionProps> = ({data
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

  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px]   overflow-hidden relative ">
      <div className="container">
  {data.map((item) => (
    <motion.div
      key={item.id}
      className="rounded-[15px] p-4  lg:py-[120px] lg:px-[100px] blueoverlay relative"
      style={{
        background: `url(${
          typeof item.image === "string" ? item.image : item.image.src
        })`,
        backgroundSize: "cover",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full md:w-5/6 xl:w-2/3 flex flex-col justify-center relative z-10 h-full">
        <motion.h2
          className="text-xl text-white font-[600] leading-[1.2] mb-3 lg:mb-[30px]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {item.title}
        </motion.h2>

        {item.paragraphs.map((paragraph, index) => (
          <motion.p
            key={index}
            className="text-white text-base font-[400] leading-[1.8]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
          >
            {paragraph}
          </motion.p>
        ))}

        <div className="grid grid-cols-1 lg:grid-cols-2 mt-6 lg:mt-10 border-b border-white">
          {item.specs.map((spec, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 lg:gap-7 py-4 lg:py-[25px] border-t border-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
            >
              <Image src={spec.icon} alt="" />
              <p className="text-md text-white">{spec.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  ))}
</div>
    </section>
  );
};

export default CareerText;
