"use client";

import {  useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {motion} from 'framer-motion'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Autoplay, Pagination } from "swiper/modules";
gsap.registerPlugin(ScrollTrigger);
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
 

import { Hse } from '@/public/types/Common'; 



const Growslide = ({ data }: { data: Hse }) => {   

  const swiperRef = useRef<SwiperType | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [activeYear, setActiveYear] = useState<number | null>(0);

  function extractNumber(value: string): number {
    const cleaned = value.replace(/,/g, '');
    const match = cleaned.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  return (
    <section className="pb-[50px] md:pb-[70px] xl:pb-[100px] overflow-hidden">
      <div className="container">
      <div className="lg:flex lg:flex-row flex flex-col gap-2"  ref={ref}>
          {data.fourthSection.years.map((year, index) => (
  <motion.div
    key={index} // Move key here
    className="overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.3 }}
    viewport={{ once: true, amount: 0.5 }}
  >
    <Button
      onClick={() => {
        setActiveYear(index);
      }}
      className={`px-[50px] py-5 text-xs rounded-full h-[40px] lg:h-[48px] hover:text-white hover:border-primary duration-300 ease-in-out transition-all uppercase ${
        activeYear === index
          ? "bg-secondary text-white border border-secondary"
          : "bg-white text-black border border-territory"
      }`}
    >
      {year.title}
    </Button>
  </motion.div>
))}
          </div>

        <div className="relative mt-5">
          <motion.div initial={{ opacity: 0, y: 50 }}
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
          {data.fourthSection.years[activeYear || 0].items.map((item, index) => (
              <SwiperSlide key={index} className="growslide" >
                <motion.div  className=" pl-5 border-l"
    whileHover={{ scale: 1.05, rotateY: 10, rotateX: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 10 }}>

                  <h3 className="text-40 font-semibold text-primary leading-none pt-[25px]"> {inView ? <CountUp key={`${activeYear}-${index}`} start={0} end={extractNumber(item.number)} duration={2} delay={0.3} decimals={extractNumber(item.number) % 1 !== 0 ? 1 : 0} /> : 0}<span>{item.number.includes("+") && "+" } {item.number.split(" ").length > 1 ? item.number.split(" ")[1] : ""}</span></h3>
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