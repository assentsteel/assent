"use client";

import {  useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "@/public/assets/assets";
gsap.registerPlugin(ScrollTrigger);

   import { Gpslide} from '@/public/types/Common';    
          
         const ProjectAfrica = ({ data }: { data: Gpslide }) => {   
  const swiperRef = useRef<SwiperType | null>(null);

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
    <section className="section-spacing overflow-hidden bg-primary">
      <div className="container">
        <div className="flex justify-between">
          <motion.div
            className="flex overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold mb-5 lg:mb-[50px] leading-none text-white ">
              Showcasing Our Finest Projects in Africa
            </h2>
          </motion.div>

          <div className="flex justify-between gap-[10px] mb-[40px]">
            <div className="">
              <motion.div
                className=" lg:flex lg:flex-row flex flex-col gap-2 lg:gap-[60px]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <Button
                  variant="outline"
                  className="px-[17px] py-5 text-xs rounded-full h-[40px] lg:h-[48px] text-black border border-secondary uppercase"
                >
                  View All
                </Button>

                <div className="flex justify-end gap-4">
                                {/* Prev Button */}
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3 }}
                                  onClick={() => swiperRef.current?.slidePrev()}
                                  className="bg-white text-black px-3 py-1 rounded-full w-[38px] h-[38px] md:w-[48px] md:h-[48px] hover:bg-secondary group transition flex items-center justify-center"
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
                                </motion.button>
                              </div>








              </motion.div>
            </div>
          </div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Swiper
              spaceBetween={30}
              slidesPerView={1.2}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 1.2 },
                1024: { slidesPerView: 2 },
              }}
              className="w-full !overflow-visible"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {data.items.map((project, index) => (
                <SwiperSlide key={index} className="">
                  <motion.div className="cursor-pointer ">
                    <div className="relative group">
                      <figure className="rounded-custom overflow-hidden h-[288px] lg:h-auto">
                        <Image
                          src={project.image}
                          width={1000}
                          height={500}
                          alt={project.title}
                          className="rounded-lg object-cover h-full"
                        />
                      </figure>
                      <div className="hoveroverl opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="hrcontent lg:w-[60%]">
                          <div className="p-4 lg:p-10">
                            <div>
                              
                                <div >
                                  <div className="mb-2 pb-2 md:mb-2 md:pb-2 border-b border-[#F2F2F2]">
                                    <p className="text-white text-[12px] md:text-[15px] mb-1 uppercase">
                                      PROJECT
                                    </p>
                                    <p className="text-white text-[13px] md:text-sm leading-[1.3] max-w-[31ch]">
                                      {project.project}
                                    </p>
                                  </div>
                                  <div className="mb-2 pb-2 md:mb-2 md:pb-2 border-b border-[#F2F2F2]">
                                    <p className="text-white text-[12px] md:text-[15px] mb-1 uppercase">
                                      CLIENT, Location
                                    </p>
                                    <p className="text-white text-[13px] md:text-sm leading-[1.3] max-w-[31ch]">
                                      {project.clientLocation}
                                    </p>
                                  </div>
                                  <div className="">
                                    <p className="text-white text-[12px] md:text-[15px] mb-1 uppercase">
                                      QUANTITY
                                    </p>
                                    <p className="text-white text-[13px] md:text-sm leading-[1.3] max-w-[31ch]">
                                      {project.quantity}
                                    </p>
                                  </div>
                                </div>
                          
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold leading-none  border-b border-white text-white pt-5 pb-4">
                      {project.title}
                    </h3>
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

export default ProjectAfrica;
