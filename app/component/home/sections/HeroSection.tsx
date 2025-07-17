"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination,Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home } from "@/public/types/Common";
import { assets } from "@/public/assets/assets";
gsap.registerPlugin(ScrollTrigger);


const HeroSection = ({ data }: { data: Home }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const textRef = useRef(null);
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
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };
  // Child Elements Animation
  /*   const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  }; */

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice( data.bannerSection.items.length);
  }, [data.bannerSection.items.length]);

/*   useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      width: 100,
      duration: 1.5,
      ease: "power3.out",
    });
  }, []);
 */
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination,Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}

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
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="custom-bullet ${className}">
               ${(index + 1).toString().padStart(2, "0")}
               <hr class="progress-bar"></hr>
            </span>`,
        }}
        loop={true}
        className="h-full"
        onSlideChange={(swiper) => {
          document.querySelectorAll(".progress-bar").forEach((el) => {
            (el as HTMLElement).style.animation = "none"; // Reset animation
            void (el as HTMLElement).offsetWidth; // Trigger reflow
            (el as HTMLElement).style.animation =
              "progress 10s linear forwards"; // Restart animation
          });

          videoRefs.current.forEach((video, index) => {
            if (video) {
              if (swiper.realIndex === index) {
                video.play();
              } else {
                video.pause();
                video.currentTime = 0;
              }
            }
          });
        }}
      >
        {data.bannerSection.items.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full mx-auto">
              <div className="overlay absolute w-full h-full bg-gradient-to-t from-black to-transparent z-[1]"></div>
              <div
                className="w-full h-full mx-auto"
                ref={containerRef}
              >
                {/* Video Slide with Poster */}
                {slide.video !== "" ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={slide.video}
                    className="absolute inset-0 w-full h-full object-cover"
                    loop
                    autoPlay
                    muted
                    playsInline
                    poster={slide.poster} // Poster image
                  />
                ) : (
                  /* Image Slide */
                  <Image
                    src={slide.poster}
                    alt="Hero Background"
                    layout="fill"
                    objectFit="cover"
                    priority
                    className="brightness-[0.6]"
                  />
                )}

                {/* Text Overlay */}
                <div className="absolute text-left z-[2] bottom-[125px] w-full">
                  <motion.div
                    className="container flex flex-col"
                    ref={textRef}
                    variants={textContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="overflow-hidden pb-2">
                      <motion.h1
                        className="text-white text-xxl leading-none xxl:w-[80%] xxxl:w-[70%] font-semibold"
                        variants={textItemVariants}
                      >
                        {slide.mainTitle}
                      </motion.h1>
                    </div>
                    <div className="overflow-hidden pb-1 mt-[30px]">
                      <motion.p
                        className="text-white text-md leading-none font-normal flex gap-2"
                        variants={textItemVariants}
                      >
                        <span className="">
    {slide.subTitle}{' '}
    <span className="text-green-500 font-semibold md:hidden">{slide.primaryColorText}</span>
  </span>
                        <b className="font-semibold text-secondary max-md:hidden">
                        {slide.primaryColorText}
                        </b>
                      </motion.p>
                    </div>
                    <div className="overflow-hidden">
                      <motion.div variants={textItemVariants}>
                        <Link
                          href="/about"
                          className="text-xs border-b border-secondary text-white uppercase group pb-[16px] inline-flex mt-[50px]  items-center gap-[18px]"
                        >
                          Read More{" "}
                          <div className="w-[20px] h-[20px] rounded-full text-secondary bg-white group-hover:bg-secondary group-hover:text-primary flex items-center text-[14px] justify-center transition duration-300 ease-in-out">
                            <FaChevronRight />
                          </div>
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {data.bannerSection.items.length > 1 && (
          <motion.div className=" flex gap-2 lg:gap-[30px] z-10 absolute right-[30px] bottom-[30px]" >
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
      )}
      {/* Custom Numbered Pagination */}
      {/*  <div className="absolute z-20 w-full bottom-[100px]">
        <div className="container relative">
          <div className="custom-pagination text-white flex space-x-6 "></div>
        </div>
      </div> */}
    </section>
  );
};

export default HeroSection;
