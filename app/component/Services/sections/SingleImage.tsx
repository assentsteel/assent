"use client";
import Image from "next/image";
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

 
import { Swiper as SwiperType } from "swiper";
  
  import { Services } from '@/public/types/Common'; 
  
  
  
  const SingleImage = ({ data }: { data: Services }) => {  
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const containerRef = useRef(null);
  const swiperRef = useRef<SwiperType | null>(null);

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
    <section className="overflow-hidden relative ">
      <div className="container">
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
              
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              loop
              slidesPerView={1}
              spaceBetween={20}
              className="rounded-xl overflow-hidden h-[200px] md:h-auto"
            >
              {data.firstSection.items.map((src, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={src.image}
                    alt={`Slide ${index + 1}`}
                    width={600}
                    height={400}
                    className="w-full object-cover h-full"
                    priority
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            
      {data.firstSection.items.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-2 lg:gap-[30px] z-10">
              <button
                 onClick={() => swiperRef.current?.slidePrev()}
                className="bg-white text-black px-3 py-1 rounded-full w-[38px] h-[38px] md:w-[48px] md:h-[48px] hover:bg-secondary group transition flex items-center justify-center"
              >
                <Image
                  src={assets.greenarrow}
                  alt=""
                  width={11}
                  height={18}
                  className="group-hover:brightness-0 group-hover:invert "
                />
              </button>
              <button
              onClick={() => swiperRef.current?.slideNext()}
                className="bg-white text-black px-3 py-1 rounded-full w-[38px] h-[38px] md:w-[48px] md:h-[48px] hover:bg-secondary group transition flex items-center justify-center"
              >
                <Image
                  src={assets.greenarrow}
                  alt=""
                  width={11}
                  height={18}
                  className="group-hover:brightness-0 group-hover:invert rotate-180"
                />
              </button>
              </div>
              )}
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleImage;
