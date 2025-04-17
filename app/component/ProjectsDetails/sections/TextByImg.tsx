"use client";
 ;
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef,useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { assets } from "@/public/assets/assets";
gsap.registerPlugin(ScrollTrigger);

const images = [assets.slim, assets.slim, assets.slim];
interface PlatformsItem {
  id: number;
  title: string;
  paragraphs: string[];
  image: string | StaticImageData;
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}
const TextByImg: React.FC<PlatformsSectionProps> = ({data
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
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

  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px]   overflow-hidden relative ">
      <div className="container">
        <div className="lg:flex items-center">

        <div className="w-full lg:w-1/2 pr-0 lg:pr-[44px]">
        <div className="relative w-full  mx-auto">
      {/* Main Swiper */}
      <Swiper
        modules={[Navigation, Thumbs]}
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
        thumbs={{ swiper: thumbsSwiper }}
        slidesPerView={1}
        spaceBetween={10}
        className="rounded-xl overflow-hidden"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails Swiper */}
      <div className="absolute bottom-8 p-[14px] rounded-[20px] bg-[#ffffff30] backdrop-blur-xs lg:bottom-[40px] left-1/2 -translate-x-1/2 z-10 w-full max-w-fit px-4">
      <Swiper
  onSwiper={(swiper) => setThumbsSwiper(swiper)}
  slidesPerView={3}
  spaceBetween={10}
  watchSlidesProgress
  modules={[Thumbs]}
  className="thumbs relative z-10"
>
  {images.map((src, i) => (
    <SwiperSlide
      key={i}
      className="!w-[50px] !h-[50px] flex items-center justify-center"
    >
      <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-transparent hover:border-secondary cursor-pointer">
        <Image
          src={src}
          alt={`Thumb ${i}`}
          width={50}
          height={50}
          className="object-cover w-full h-full"
        />
      </div>
    </SwiperSlide>
  ))}
</Swiper>
      </div>

      {/* Custom Nav Buttons */}
      <div className="absolute bottom-8  lg:bottom-[40px] right-4 flex gap-2 z-10 w-full justify-between left-0 px-6 lg:px-[40px]">
        <button
          ref={prevRef}
          className="bg-white text-black px-3 py-1 rounded-full w-[48px] h-[48px] hover:bg-secondary group transition flex items-center justify-center"
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
          ref={nextRef}
          className="bg-white text-black px-3 py-1 rounded-full w-[48px] h-[48px] hover:bg-secondary group transition flex items-center justify-center"
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
    </div>

          </div>
          <div className="w-full lg:w-1/2 pr-0 lg:pr-[44px]">
            {data.map((item) => (
              <div className="mb-8 lg:mb-0" key={item.id}>
                <h2 className="text-xl  text-primary font-[600] leading-[1.2] mb-4 lg:mb-10">{item.title}</h2>

                <div className="text-territory text-base font-[400] leading-[1.8] mb-6 lg:mb-10">
                  {item.paragraphs.map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextByImg;
