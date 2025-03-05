"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import {motion} from 'framer-motion'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const projectCategories: Record<
  string,
  { title: string; category: string; image: string }[]
> = {
  "Commercial Projects": [
    {
      title: "Coca Cola Arena",
      category: "Commercial",
      image: "/assets/img/projects/pr-01.jpg",
    },
    {
      title: "Dubai International Airport Expansion",
      category: "Commercial",
      image: "/assets/img/projects/pr-02.jpg",
    },
    {
      title: "Blue Waters",
      category: "Commercial",
      image: "/assets/img/projects/pr-03.jpg",
    },
  ],
  "Industrial Oil & Gas Projects": [
    {
      title: "Offshore Rig",
      category: "Industrial",
      image: "/assets/img/projects/pr-02.jpg",
    },
    {
      title: "Refinery Plant",
      category: "Industrial",
      image: "/assets/img/projects/pr-03.jpg",
    },
    {
      title: "Refinery Plant",
      category: "Industrial",
      image: "/assets/img/projects/pr-01.jpg",
    },
  ],
  "Data Centre Projects": [
    {
      title: "Cloud Hub",
      category: "Data Centre",
      image: "/assets/img/projects/pr-03.jpg",
    },
    {
      title: "Tech Park Data Centre",
      category: "Data Centre",
      image: "/assets/img/projects/pr-02.jpg",
    },
    {
      title: "Tech Park Data Centre",
      category: "Data Centre",
      image: "/assets/img/projects/pr-01.jpg",
    },
  ],
};

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<
    keyof typeof projectCategories
  >("Commercial Projects");
  const [viewAll, setViewAll] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const projectsToShow = viewAll
    ? Object.values(projectCategories).flat()
    : projectCategories[activeCategory];

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
        
      
        <div className="flex justify-between gap-[10px] mb-[40px]">
          <div className="lg:flex lg:flex-row flex flex-col gap-2" >
          {Object.keys(projectCategories).map((category, index) => (
  <motion.div 
    key={category} // Move key here
    className="overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.3 }}
    viewport={{ once: true, amount: 0.5 }}
  >
    <Button
      onClick={() => {
        setActiveCategory(category as keyof typeof projectCategories);
        setViewAll(false);
      }}
      className={`px-[17px] py-5 text-xs rounded-[5px] h-[40px] lg:h-[48px] hover:text-white hover:border-primary duration-300 ease-in-out transition-all uppercase ${
        activeCategory === category && !viewAll
          ? "bg-secondary text-white border border-secondary"
          : "bg-white text-black border border-territory"
      }`}
    >
      {category}
    </Button>
  </motion.div>
))}
          </div>
          <div className="">
          <motion.div className="overflow-hidden lg:flex lg:flex-row flex flex-col gap-2 lg:gap-[60px]" initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay:  0.3 }}
               viewport={{ once: true, amount: 0.5 }}>
            <Button
              variant="outline"
              className="px-[17px] py-5 text-xs rounded-[5px] h-[40px] lg:h-[48px] text-black border border-secondary uppercase"
              onClick={() => setViewAll(!viewAll)}
            >
              {viewAll ? "Back" : "View All"}
            </Button>
            <div className="relative flex border border-[#595959] rounded-[5px]">
            <button
                className=" text-secondary px-3 py-2"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <FaChevronLeft />
              </button>
              <button
                className="  text-secondary px-3 py-2 border-l border-[#595959]"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <FaChevronRight />
              </button>
             
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
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            className="w-full !overflow-visible"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {projectsToShow.map((project, index) => (
              <SwiperSlide key={index} className="" >
                <motion.div  className="cursor-pointer"
    whileHover={{ scale: 1.05, rotateY: 10, rotateX: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 10 }}>
                <figure className="rounded-custom overflow-hidden">
                  <Image
                    src={project.image}
                    width={1000}
                    height={500}
                    alt={project.title}
                    className="rounded-lg"
                  />
                </figure>
                <p className="text-sm text-[#595959] leading-none font-normal py-[25px] border-b border-[#1F1F1F]">{project.category}</p>
                <h3 className="text-lg font-semibold leading-none pt-[25px]">{project.title}</h3>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
