"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { assets } from "@/public/assets/assets";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import {gdVariants, slideInTop } from "./MotionAnimation";


interface PlatformsSection {
  title: string;
  image: StaticImageData[];
}
interface PlatformsSectionProps {
  data:  PlatformsSection
}
const BoxSlider: React.FC<PlatformsSectionProps> = ({ data }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const containerRef = useRef(null);
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };
  const textItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -30, transition: { duration: 0.4 } },
  };
  return (
    <section className="overflow-hidden relative bg-primary py-[50px] md:py-[70px] xl:py-[100px] ">
      <div className="container">
        <div className="flex justify-between items-center mb-6 lg:mb-[60px]">
        <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="overflow-hidden ">
            <motion.p
              variants={textItemVariants}
              className="text-md uppercase text-white font-medium border-b inline-flex border-secondary pb-[10px] lg:pb-[25px] leading-none "
            >
            {data.title}
            </motion.p>
            </div>
            </motion.div>
          <motion.div className=" flex gap-2 lg:gap-[30px] z-10"
              variants={slideInTop}
                 initial="hidden"
                 whileInView="visible"
                 exit="exit">
              <button
                ref={prevRef}
                className="bg-white text-black  py-1 rounded-full w-[28px] h-[28px] lg:w-[48px] lg:h-[48px] hover:bg-secondary group transition flex items-center justify-center"
              >
                <Image
                  src={assets.greenarrow}
                  alt=""

                  className="group-hover:brightness-0 group-hover:invert w-[11px] h-[11px]  lg:w-[11px] lg:h-[18px]"
                />
              </button>
              <button
                ref={nextRef}
                className="bg-white text-black  py-1 rounded-full w-[28px] h-[28px] lg:w-[48px] lg:h-[48px] hover:bg-secondary group transition flex items-center justify-center"
              >
                <Image
                  src={assets.greenarrow}
                  alt=""
                  className="group-hover:brightness-0 group-hover:invert rotate-180 w-[11px] h-[11px]  lg:w-[11px]  lg:h-[18px]"
                />
              </button>
          </motion.div>
        </div>
      </div>
      <div>
      <div className=" ">
          <div className="relative w-full  ">
            <motion.div  variants={slideInLeft}
    initial="hidden"
    animate="visible"
    exit="exit">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onInit={(swiper) => {
                if (typeof swiper.params.navigation === "object") {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              loop
              spaceBetween={20}
                className="  overflow-hidden"

                breakpoints={{
                  320: {
                    slidesPerView: 2,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1524: {
                    slidesPerView:4.4,
                  },

                }}

            >
              {data.image.map((src, index) => (
                <SwiperSlide key={index} className="">
                  <motion.div
                      variants={gdVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}>
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover rounded-md"
                    priority
                    />
                    </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}

              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoxSlider;
