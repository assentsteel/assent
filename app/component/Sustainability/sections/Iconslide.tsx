"use client";

import {useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {motion} from 'framer-motion'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Autoplay, Pagination } from "swiper/modules";
import Image, { StaticImageData } from "next/image";
gsap.registerPlugin(ScrollTrigger);
interface PlatformsItemss {
  image: StaticImageData;
}
interface PlatformsItem {
  content: PlatformsItemss[];
}

interface PlatformsSectionProps {
  data: PlatformsItem;
}

const Iconslide: React.FC<PlatformsSectionProps> = ({data
}) => {

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
              320: { slidesPerView: 3 },
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 8.2},
            }}
            className="w-full !overflow-visible"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {data.content.map((item, index) => (
              <SwiperSlide key={index} className="growslide" >
                <motion.div  className="cursor-pointer   "
    whileHover={{ scale: 1.05, rotateY: 10, rotateX: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 10 }}>

                 <Image src={item.image} alt=""  className="rounded-[15px]"  />
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
export default Iconslide;