"use client";
import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);
interface PlatformsItem {
  id: number;
  date: string;
  title: string;
  image: string | StaticImageData;
  linkText: string;
  url: string;
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}
const RecentNews: React.FC<PlatformsSectionProps> = ({ data }) => {
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

  const slideInTop = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 30, transition: { duration: 0.4 } },
  };

  const textParent = {
    hover: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const textChild = {
    initial: { opacity: 1, y: 10 },
    hover: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };
  return (
    <section className="pb-0 md:pb-[70px] xl:pb-[100px] overflow-hidden relative ">
      <div className="container">
        <div className="flex justify-between mb-[20px] lg:mb-10">
          <div className="  ">
            <motion.p  variants={slideInTop}
    initial="hidden"
    animate="visible"
    exit="exit" className="text-md uppercase text-[#595959] font-medium border-b inline-flex border-secondary pb-[10px] lg:pb-[18px] leading-[1.46] ">
              Recent news
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 xxl:gap-10">
        <motion.div  variants={slideInTop}
    initial="hidden"
    animate="visible"
    exit="exit">
    {data.slice(0, 1).map((item, index) => {
      return (
        <motion.div
          key={index}

  variants={textParent}
  initial="initial"
  whileHover="hover"
          className="relative group h-[300px] lg:h-[672px] overflow-hidden rounded-[15px]"
        >
          <figure className="h-full blueover">
            <Image src={item.image} alt="" className="rounded-[15px] h-full w-full object-cover" />
          </figure>
          <motion.div
  className="absolute bottom-0 z-10 px-5 xxl:px-10 pb-5 xxl:pb-10 w-full"
>
            <motion.p variants={textChild} className="text-xs text-white font-[500] mb-1">{item.date}</motion.p>
            <motion.h3 variants={textChild}  className="line-clamp-2 text-white text-md xxl:text-lg leading-[1.1] xl:leading-[1.5] mb-2 lg:mb-5 font-[600]">{item.title}</motion.h3>
            <motion.div variants={textChild} className="flex justify-between">

                  <Link href={item.url}>
              <div className="flex gap-4 items-center border-b border-secondary pb-[10px] transition-all duration-500">
                <p className="text-xs uppercase text-white font-[500] inline-flex leading-[1]">{item.linkText}</p>
                <div className="min-w-[20px] min-h-[20px] bg-white rounded-full flex items-center justify-center translate-x-0 group-hover:translate-x-[5px] transition-all duration-500">
                 <svg stroke="#5BA646" fill="#5BA646" strokeWidth="0" viewBox="0 0 320 512" height="10px" width="8px" xmlns="http://www.w3.org/2000/svg">
                          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                        </svg>
                </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      );
    })}
  </motion.div>
  <motion.div  variants={slideInTop}
    initial="hidden"
    animate="visible"
    exit="exit" className="flex flex-col gap-4 lg:gap-6 xxl:gap-10">
    {data.slice(1).map((item, index) => {

      return (
        <motion.div
  key={index}
  variants={textParent}
  initial="initial"
  whileHover="hover"
  className="vi h-[300px] lg:h-1/2 relative group blueover rounded-[15px]"
  style={{
    background: `url(${typeof item.image === "string" ? item.image : item.image.src})`,
    backgroundSize: "cover"
  }}
>
          <div className="absolute bottom-0 z-10 px-5 xxl:px-10 pb-5 xxl:pb-10 w-full">
            <motion.p variants={textChild} className="text-xs text-white font-[500] mb-1">{item.date}</motion.p>
            <motion.h3 variants={textChild} className="line-clamp-2 text-white text-md xxl:text-lg leading-[1.1] xl:leading-[1.5] mb-2 lg:mb-5 font-[600]">{item.title}</motion.h3>
            <motion.div variants={textChild} className="flex justify-between">
                <Link href={item.url}>
              <div className="flex gap-4 items-center border-b border-secondary pb-[10px] transition-all duration-500">
                <p className="text-xs uppercase text-white font-[500] inline-flex leading-[1]">{item.linkText}</p>
                <div className="min-w-[20px] min-h-[20px] bg-white rounded-full flex items-center justify-center translate-x-0 group-hover:translate-x-[5px] transition-all duration-500">
                 <svg stroke="#5BA646" fill="#5BA646" strokeWidth="0" viewBox="0 0 320 512" height="10px" width="8px" xmlns="http://www.w3.org/2000/svg">
                          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                        </svg>
                </div>
                </div>
                </Link>
            </motion.div>
          </div>
        </motion.div>
      );
    })}

  </motion.div>
</div>

      </div>
    </section>
  );
};

export default RecentNews;
