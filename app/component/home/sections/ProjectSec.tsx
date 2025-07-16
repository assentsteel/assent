"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {motion} from 'framer-motion'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "@/public/assets/assets";
import { Projectswfull } from "@/public/types/Common";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);



export default function ProjectsSection({data}: {data: Projectswfull}) {
  const [activeCategory, setActiveCategory] = useState<number | null>(0);
  const [viewAll, setViewAll] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);



  return (
    <section className="section-spacing overflow-hidden">
      <div className="container">
         <motion.div
                  className="flex overflow-hidden"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}>
                  <h2 className="text-xl font-semibold mb-5 lg:mb-[50px] leading-none text-primary ">
                  Projects
                  </h2>

                </motion.div>


        <div className="flex flex-col md:flex-row justify-between gap-[10px] mb-[40px]">
          <div className="lg:flex lg:flex-row flex flex-col gap-2" >
          {data.categories.map((category, index) => (
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
        setActiveCategory(index);
        setViewAll(false);
      }}
      className={`px-[17px] py-5 text-xs rounded-full h-[40px] lg:h-[48px] hover:text-white hover:border-primary duration-300 ease-in-out transition-all uppercase ${
        activeCategory === index && !viewAll
          ? "bg-secondary text-white border border-secondary"
          : "bg-white text-black border border-territory"
      }`}
    >
      {category.name}
    </Button>
  </motion.div>
))}
          </div>
          <div className="mt-5 md:mt-0">
          <motion.div className="flex items-center justify-end gap-2 lg:gap-[60px]" initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay:  0.3 }}
              viewport={{ once: true, amount: 0.5 }}>
              <Link href={`/projects-list/${data.categories[activeCategory || 0]?.slug}`}><Button
                  variant="outline"
                className="px-[17px] py-5 text-xs rounded-full h-[40px] lg:h-[48px] text-black border border-secondary uppercase"
                >
                {"View All"}
                </Button></Link>
   <div className="flex justify-end gap-4">
                                {/* Prev Button */}
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3 }}
                                  onClick={() => swiperRef.current?.slidePrev()}
                                  className="bg-white text-black px-3 py-1 border border-[#595959] rounded-full w-[48px] h-[48px] hover:bg-secondary group transition flex items-center justify-center"
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
                                  className="bg-white text-black px-3 py-1 border border-[#595959] rounded-full w-[48px] h-[48px] hover:bg-secondary group transition flex items-center justify-center"
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

        <div className="relative">
          <motion.div  initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}>
          <Swiper
            spaceBetween={30}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.1 },
              1024: { slidesPerView: 2.1 },
            }}
            className="w-full !overflow-visible"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >{activeCategory !== null && (
             data.categories[activeCategory]?.projects.slice(0, 10).map((project, index) => (
              <SwiperSlide key={index} className="" >
                <Link href={`/projects-details/${data.categories[activeCategory]?.slug}/${project.slug}`}><motion.div  className="cursor-pointer"
    whileHover={{ scale: 1.05, rotateY: 10, rotateX: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 10 }}>
                <figure className="rounded-custom overflow-hidden h-[250px] lg:h-[300px] xl:h-[400px]">
                  <Image
                    src={project.banner}
                    width={1000}
                    height={500}
                    alt={project.title}
                    className="rounded-lg h-full w-full"
                  />
                </figure>
                <p className="text-sm text-[#595959] leading-none font-normal py-[25px] border-b border-[#1F1F1F]">{project.sector}</p>
                <h3 className="text-lg font-semibold leading-none pt-[25px]">{project.title}</h3>
                </motion.div></Link>
              </SwiperSlide>
            ))
          )}
          </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
