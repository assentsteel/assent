"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import { slideInTop } from "../../common/MotionAnimation";
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  title: string;
  urlss: string;
  image: string | StaticImageData;
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}
const DiscoverPresence: React.FC<PlatformsSectionProps> = ({ data }) => {
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
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };
  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px]    relative  ">
      <div className="container">
        <motion.h3 variants={slideInTop} initial="hidden" whileInView="visible" exit="exit" className="text-xl font-semibold text-primary  leading-[1.2] mb-5 md:mb-10">Discover Our <br /> Presence in Other Countries</motion.h3>
        <motion.div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-5 gap-8" variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} >

          {data.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <motion.div className="relative group  h-full " whileHover={{ scale: 1.015 }} transition={{ type: "spring", stiffness: 300 }} >
                <Link href={item.urlss}>
                  <figure className="overlayclr lg:max-h-[650px] h-full overflow-hidden rounded-[15px]">
                    <Image src={item.image} alt="" className=" w-full object-cover h-[350px] md:h-full" priority />
                  </figure>

                  <div className="absolute bottom-0 px-5 pb-5 lg:px-[30px] lg:pb-[30px] w-full">
                    <p className="text-md text-white font-[500] pr-0 lg:pr-6 mb-3">
                      {item.title}
                    </p>
                    <div className="flex w-fit gap-4 items-center border-b border-secondary pb-[10px] transition-all duration-500">
                      <p className="text-xs uppercase text-white font-[500] inline-flex leading-[1]">Read More</p>
                      <div className="min-w-[20px] min-h-[20px] bg-white rounded-full flex items-center justify-center translate-x-0 group-hover:translate-x-[5px] transition-all duration-500">
                        <svg stroke="#5BA646" fill="#5BA646" strokeWidth="0" viewBox="0 0 320 512" height="10px" width="8px" xmlns="http://www.w3.org/2000/svg">
                          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default DiscoverPresence;
