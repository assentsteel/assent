"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  title: string;
  sector: string;
  image: string | StaticImageData;
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}
const Morepjts: React.FC<PlatformsSectionProps> = ({ data }) => {
  const containerRef = useRef(null);


  const textItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
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
    <section className="pb-[50px] md:pb-[70px] xl:pb-[100px]  overflow-hidden relative  ">
      <div className="container">
        <div className="flex justify-between mb-[20px] lg:mb-10">
          <div className="overflow-hidden ">
          <motion.p
            variants={textItemVariants}
            className="text-md uppercase text-[#595959] font-medium border-b inline-flex border-secondary pb-[10px] lg:pb-[25px] leading-none "
          >
            More projects
          </motion.p>
        </div>
        <div className="text-center">
          <button className="border whitespace-nowrap font-[500] border-secondary text-xs text-territory uppercase rounded-full py-[8px] px-[20px]  w-fit">
            View All
          </button>
        </div></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {data.slice(0, 4).map((item, index) => (
            <div key={index}>
              <div className="relative group">
                <figure className="overlayclr">
                  <Image
                    src={item.image}
                    alt=""
                    className="rounded-[15px]   w-full object-cover"
                  />
                </figure>
                <div className="absolute top-5 right-5   text-white">
                  <p className="text-xs font-[600]">{item.sector}</p>
                </div>
                <div className="absolute bottom-0 px-5 pb-5 w-full">
                  <p className="text-md text-white font-[600]  pr-0 lg:pr-6 ">
                    {item.title}
                  </p>
                  <div className="flex gap-2 items-center transform opacity-0 group-hover:opacity-100  transition-all duration-500 h-0 group-hover:h-[30px] md:group-hover:h-[48px]">
                    <div className="w-full border-b-2 border-white transition-all duration-500 group-hover:border-secondary"></div>
                    <div className="min-w-[30px] min-h-[30px] lg:min-w-[48px] lg:min-h-[48px] bg-secondary rounded-full flex items-center justify-center translate-x-[-20px] group-hover:translate-x-0  transition-all duration-500">
                      <svg
                        stroke="#fff"
                        fill="#fff"
                        strokeWidth="0"
                        viewBox="0 0 320 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Morepjts;
