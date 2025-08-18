"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { motion } from "framer-motion";

import gsap from "gsap"; 
import { assets } from "@/public/assets/assets"; 
import { About } from '@/public/types/Common'; 



const Aboutslider = ({ data }: { data: About }) => {  
   
  
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
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
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

  const mainRef = useRef<Splide | null>(null);
  const thumbsRef = useRef<Splide | null>(null);

  useEffect(() => {
    if (
      mainRef.current &&
      thumbsRef.current &&
      mainRef.current.splide &&
      thumbsRef.current.splide
    ) {
      mainRef.current.splide.sync(thumbsRef.current.splide);
    }
  }, []);

  return (
    <section className="py-[50px] md:py-[70px] xl:py-[80px] xxl:py-[100px] bg-primary  overflow-hidden relative ">
      <div className="container">
        <div>
          <div className="flex justify-between items-center">
                 <motion.h2
               viewport={{ once: true, amount: 0.2 }}
               variants={textVariants}
               initial="hidden"
               whileInView="visible" className="text-white text-xl font-[600] ">{data.historySection.title}
              </motion.h2>
              <div className="flex justify-end gap-4">
                {/* Prev Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    mainRef.current?.go("<");
                  }}
                  className="bg-white text-black px-3 py-1 rounded-full w-[48px] h-[48px] hover:bg-secondary group transition flex items-center justify-center"
                >
                  <Image
                    src={assets.greenarrow}
                    alt=""
                    width={11}
                    height={18}
                    className="group-hover:brightness-0 group-hover:invert"
                  />
                </motion.button>

                {/* Next Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  onClick={() => {
                    mainRef.current?.go(">");
                  }}
                  className="bg-white text-black px-3 py-1 rounded-full w-[48px] h-[48px] hover:bg-secondary group transition flex items-center justify-center"
                >
                  <Image
                    src={assets.greenarrow}
                    alt=""
                    width={11}
                    height={18}
                    className="group-hover:brightness-0 group-hover:invert rotate-180"
                  />
                </motion.button>
              </div>
          </div>
          <div className=" mt-6 lg:mt-[40px]">
            <div className="border-b relative top-[8px] opacity-35"> </div>
            {/* Thumbnail Slider */}
            <Splide
    options={{
      perPage: 3.28,
      gap: "1rem",
      focus: 1,
      pagination: false,
                cover: true,
                autoplay: true,
      interval: 3000,
    pauseOnHover: false,
    resetProgress: false,
      arrows: false,
      breakpoints: {
        768: { perPage: 2 },
      },
    }}
    ref={thumbsRef}
    className="mb-4 justify-center abtstl"
  >
    {data.historySection.items.map((src, index) => (
      <SplideSlide key={`thumb-${index}`}>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="font-[600] text-[45px] lg:text-[90px] text-[#54739F] pt-8 lg:pt-[40px] cursor-pointer"
          onClick={() => {
            if (mainRef.current) {
              mainRef.current.go(index);
            }
          }}
        >
          {src.year}
        </motion.p>
      </SplideSlide>
    ))}
  </Splide>

            {/* Main Slider */}
            <Splide
    options={{
      perPage: 1,
      pagination: false,
      gap: "1rem",
                arrows: false,
                autoplay: true,
      interval: 3000,
    pauseOnHover: false,
    resetProgress: false,
    }}
    ref={mainRef}
  >
    {data.historySection.items.map((src, index) => (
      <SplideSlide key={`main-${index}`}>
        <div className="md:flex">
          <motion.div
            className="md:w-2/5"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="pt-3 md:pt-[50px] lg:pt-[100px] md:pr-[50px] lg:pr-[106px] md:border-r border-[#ffffff35]">
              <Image
                src={src.image}
                alt={src.imageAlt}
                width={600}
                height={400}
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="md:w-3/5"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="pt-10 md:pt-[50px] lg:pt-[100px] md:pl-[50px] lg:pl-[90px]">
              <h3 className="text-white text-lg font-[600] mb-5 lg:mb-[40px]">
                {src.title}
              </h3>
              <p className="text-white max-w-[50ch]">{src.description}</p>
            </div>
          </motion.div>
        </div>
      </SplideSlide>
    ))}
  </Splide>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutslider;
