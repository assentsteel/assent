"use client";
import Image  from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { assets } from "@/public/assets/assets";
gsap.registerPlugin(ScrollTrigger);

 
  
      import { Hse } from '@/public/types/Common'; 
       
        
          const Commitments = ({ data }: { data: Hse }) => {
  const containerRef = useRef(null);
  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.secondSection.items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + data.secondSection.items.length) % data.secondSection.items.length);
  };
  return (
    <section className="pt-[50px] md:pt-[70px] xl:pt-[100px] ">
      <div className="py-[50px] md:py-[70px] xl:py-[100px] bg-primary  overflow-hidden relative ">
      <div className="container">

          <div>
            <motion.h2
        className="text-xl font-semibold text-white mb-3 md:mb-10"
        viewport={{ once: true, amount: 0.2 }}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
      >
    {data.secondSection.title}
 </motion.h2>
</div>
<div className="lg:flex ">
<motion.div
  className="w-full mb-6 lg:mb-0 lg:w-1/2 pr-0 lg:pr-[40px]"
  initial="hidden"
  whileInView="visible"
  variants={imageVariants}
  viewport={{ once: true, amount: 0.2 }}
>

    <div  >
      <figure className="image-wrapper">
        <Image
          src={data.secondSection.items[currentIndex].image}
          alt=""
          className="rounded-[15px]"
        />
      </figure>
    </div>

</motion.div>
<div className="w-full lg:w-1/2 pr-0  ">

    <div className="mb-8 lg:mb-0" >
      <motion.h2
        className="text-lg text-white font-[600] leading-[1.2] mb-3 lg:mb-5 max-w-[35ch]"
        viewport={{ once: true, amount: 0.2 }}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
      >
        {data.secondSection.items[currentIndex].title}
      </motion.h2>

      <motion.div
        className="text-territory text-base font-[400] leading-[1.8] mb-6 lg:mb-[30px]"
        initial="hidden"
        whileInView="visible"
        variants={imageVariants}
        viewport={{ once: true, amount: 0.2 }}
      > 
          <p  className="mb-4 text-sm text-white leading-[1.6]">
            {data.secondSection.items[currentIndex].description}
          </p> 
      </motion.div>
      <div className=" flex gap-2 lg:gap-[30px] z-10 mb-8 md:mb-[40px] justify-end md:justify-normal">
        <button onClick={handlePrev}
          className="bg-white text-black px-3 py-1 rounded-full w-[38px] h-[38px] md:w-[48px] md:h-[48px] hover:bg-secondary group transition flex items-center justify-center">
          <Image
            src={assets.greenarrow}
            alt=""
            width={11}
            height={18}
            className="group-hover:brightness-0 group-hover:invert "
          />
        </button>
        <button
          onClick={handleNext}
          className="bg-white text-black px-3 py-1 rounded-full w-[38px] h-[38px] md:w-[48px] md:h-[48px] hover:bg-secondary group transition flex items-center justify-center">
          <Image
            src={assets.greenarrow}
            alt=""
            width={11}
            height={18}
            className="group-hover:brightness-0 group-hover:invert rotate-180"
          />
        </button>
      </div>

      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row justify-center items-center md:justify-start gap-5  ">
        <button className="mb-4 md:mb:0  group flex justify-between items-center mt-auto border border-secondary py-2 px-6 rounded-full hover:bg-white hover:text-territory text-white transition text-xs h-[40px] lg:h-[48px] max-w-[280px] w-[280px] font-medium uppercase relative">
          <span className="w-full text-center">quality policies</span>

          {/* Icons container */}
          <div className="absolute right-5 flex gap-2 items-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="16"
              viewBox="0 0 13 16"
              fill="none"
            >
              <path
                d="M1 15H12M6.5 1V11.5M6.5 11.5L9.70833 8.4375M6.5 11.5L3.29167 8.4375"
                stroke="#1F1F1F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="16"
              viewBox="0 0 24 16"
              fill="none"
            >
              <path
                d="M5.64453 13.0948C7.61842 14.3649 9.80446 15 12.2026 15C14.601 15 16.7857 14.3649 18.7567 13.0948C20.7279 11.8246 22.2214 10.1263 23.2371 8C22.2214 5.87366 20.7266 4.1754 18.7527 2.90524C16.7788 1.63508 14.5928 1 12.1946 1C9.79622 1 7.61152 1.63508 5.64051 2.90524C3.6693 4.1754 2.17585 5.87366 1.16016 8C2.17585 10.1263 3.67064 11.8246 5.64453 13.0948Z"
                stroke="#1F1F1F"
              />
            </svg>
          </div>
        </button>

        <button className="mb-4 md:mb:0  group flex justify-between items-center mt-auto border border-secondary py-2 px-6 rounded-full hover:bg-white hover:text-territory text-white transition text-xs h-[40px] lg:h-[48px] max-w-[280px] w-[280px] font-medium uppercase relative">
          <span className="w-full text-center">safety policies</span>

          {/* Icons container */}
          <div className="absolute right-5 flex gap-2 items-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="16"
              viewBox="0 0 13 16"
              fill="none"
            >
              <path
                d="M1 15H12M6.5 1V11.5M6.5 11.5L9.70833 8.4375M6.5 11.5L3.29167 8.4375"
                stroke="#1F1F1F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="16"
              viewBox="0 0 24 16"
              fill="none"
            >
              <path
                d="M5.64453 13.0948C7.61842 14.3649 9.80446 15 12.2026 15C14.601 15 16.7857 14.3649 18.7567 13.0948C20.7279 11.8246 22.2214 10.1263 23.2371 8C22.2214 5.87366 20.7266 4.1754 18.7527 2.90524C16.7788 1.63508 14.5928 1 12.1946 1C9.79622 1 7.61152 1.63508 5.64051 2.90524C3.6693 4.1754 2.17585 5.87366 1.16016 8C2.17585 10.1263 3.67064 11.8246 5.64453 13.0948Z"
                stroke="#1F1F1F"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>

</div>
</div>
</div>
      </div>
    </section>
  );
};

export default Commitments;
