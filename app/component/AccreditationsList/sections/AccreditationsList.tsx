"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  title: string;
  image: string | StaticImageData;
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}
const AccreditationsList: React.FC<PlatformsSectionProps> = ({ data }) => {
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
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px]  xxl:py-[150px]  overflow-hidden relative  ">
      <div className="container">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
           animate="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {data.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <div className="relative group overlbl h-full">
              <figure className="overlayclr">
                <Image
                  src={item.image}
                  alt=""
                  className="rounded-[15px] w-full object-cover"
                />
              </figure>

              <div className="absolute bottom-0 px-5 pb-5 w-full">
                <p className="text-md text-white font-[600] pr-0 lg:pr-6">
                  {item.title}
                </p>
                <div className="flex gap-2 items-center transform opacity-0 group-hover:opacity-100 transition-all duration-500 h-0 group-hover:h-[30px] md:group-hover:h-[48px]">
                  <div className="w-full border-b-2 border-white transition-all duration-500 group-hover:border-secondary"></div>
                  <div className="min-w-[30px] min-h-[30px] lg:min-w-[48px] lg:min-h-[48px] bg-secondary rounded-full flex items-center justify-center translate-x-[-20px] group-hover:translate-x-0 transition-all duration-500">
                    {/* SVG Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none">
                      <path d="M13.8291 17.6665H3.81445V14.3282H13.8291V4.3136H17.1673V14.3282H27.1819V17.6665H17.1673V27.6811H13.8291V17.6665Z" fill="white"/>
                      <path d="M3.4268 30.9941..." fill="white" stroke="white" strokeWidth="0.8"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-5 md:mt-[60px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <button className="border flex gap-3 items-center justify-center m-auto whitespace-nowrap font-[500] border-secondary text-xs text-territory uppercase rounded-full py-[8px] px-[20px] w-fit">
          Load More
          <svg
            stroke="#000"
            fill="#000"
            strokeWidth="0"
            viewBox="0 0 320 512"
            height="10px"
            width="8px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M310.6 233.4c12.5 12.5..." />
          </svg>
        </button>
      </motion.div>
      </div>
    </section>
  );
};

export default AccreditationsList;
