"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { assets } from "@/public/assets/assets";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Autoplay, Pagination } from "swiper/modules";
interface ExpertiseItem {
  icon: string;
  title: string;
}

interface ExpertiseSection {
  title: string;
  subttle?: string;
  slideitems: ExpertiseItem[];
}
interface ExpertiseSectionProps {
  colnum?: number;
  maxchwidth?: string;
  data: ExpertiseSection;
}
const BoxgridSlider: React.FC<ExpertiseSectionProps> = ({

  data,
  colnum,
  maxchwidth,
}) => {

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current?.swiper?.autoplay) {
      swiperRef.current.swiper.autoplay.start();
    }
  }, []);
  return (
    <section className="bg-primary overimg relative">
    <div className="container mx-auto ">
      <div className="flex flex-col py-[50px]  lg:py-[90px]  ">
        <div >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
            variants={{
              hidden: { opacity: 0, y: 50 }, // Start below and invisible
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: "easeOut" },
              }, // Slide up and fade in
            }}
          >
            <h2 className="text-xl text-white font-[600] leading-[1.2] mb-4 lg:mb-7" style={{ maxWidth: maxchwidth ? `${maxchwidth}ch` : undefined }}>{data.title}</h2>
            <p className="text-19   font-400   text-white   lg:max-w-[120ch]">
              {data.subttle}
            </p>
          </motion.div>
        </div>

        <div className="my-10 lg:my-[90px]">
          <Swiper
      ref={swiperRef}
              modules={[Autoplay, Pagination]}
               autoplay={{ delay: 3000, disableOnInteraction: false }}
               loop={true}
              slidesPerView={6}
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
                1024: {
                  slidesPerView: 4,
                },
                1524: {
                  slidesPerView:6,
                },

              }}
            >

          {data.slideitems.map((item, index) => (
            <SwiperSlide  className="">
            <div className="flex items-center gap-[12px]">
              <div className="w-[40px] h-[44px] lg:w-[61px] lg:h-[64px] bg-secondary rounded-[5px] flex justify-center items-center">
                <Image src={item.icon} alt=""/>
              </div>
              <div><p className="tex-md font-semibold text-white">{item.title}</p></div>
            </div>
            </SwiperSlide>
              ))}
              </Swiper>

        </div>
      </div>
      </div>
      </section>
  );
};

export default BoxgridSlider;
