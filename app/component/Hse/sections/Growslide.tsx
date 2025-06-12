"use client";

import {  useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {motion} from 'framer-motion'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Autoplay, Pagination } from "swiper/modules";
gsap.registerPlugin(ScrollTrigger);
 

import { Hse } from '@/public/types/Common'; 



const Growslide = ({ data }: { data: Hse }) => {   

  const swiperRef = useRef<SwiperType | null>(null);


  return (
    <section className="pb-[50px] md:pb-[70px] xl:pb-[100px] overflow-hidden">
      <div className="container">


        <div className="relative">
          <motion.div  initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}>
          <Swiper
              spaceBetween={30}

              modules={[Autoplay, Pagination]}
               autoplay={{ delay: 2000, disableOnInteraction: false }}
              loop
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="w-full !overflow-visible"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {data.fourthSection.items.map((item, index) => (
              <SwiperSlide key={index} className="growslide" >
                <motion.div  className="cursor-pointer pl-5 border-l"
    whileHover={{ scale: 1.05, rotateY: 10, rotateX: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 10 }}>

                  <h3 className="text-40 font-semibold text-primary leading-none pt-[25px]">{item.number}</h3>
                  <p className="text-md text-territory leading-none font-normal py-[25px] ">{item.value}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default Growslide;