"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { assets } from "@/public/assets/assets";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";
 
  
   import { Fabrication } from '@/public/types/Common'; 

   const ModelViewer = dynamic(() => import("../../Engineering/sections/ModelViewer"), { ssr: false });
     
    const   Structure = ({ data,maxchwidth }: { data: Fabrication, maxchwidth?: string }) => {   
  // const [currentImageIndexes, setCurrentImageIndexes] = useState(
  //   data.fourthSection.items.map(() => 0)
  // );
  // const [intervals, setIntervals] = useState<(NodeJS.Timeout | null)[]>(
  //   data.fourthSection.items.map(() => null)
  // );

    const swiperRef = useRef<SwiperType | null>(null);
    // const [activeIndex, setActiveIndex] = useState(0);

  // const handleMouseEnter = (index: number) => {
  //   if (intervals[index]) return;

  //   const interval = setInterval(() => {
  //     setCurrentImageIndexes((prev) => {
  //       const newIndexes = [...prev];
  //       newIndexes[index] =
  //         (newIndexes[index] + 1) % data.fourthSection.items[index].images.length;
  //       return newIndexes;
  //     });
  //   }, 1000);

  //   const updatedIntervals = [...intervals];
  //   updatedIntervals[index] = interval;
  //   setIntervals(updatedIntervals);
  // };

  // const handleMouseLeave = (index: number) => {
  //   const interval = intervals[index];
  //   if (interval) {
  //     clearInterval(interval);
  //     const updatedIntervals = [...intervals];
  //     updatedIntervals[index] = null;
  //     setIntervals(updatedIntervals);
  //   }

  //   setCurrentImageIndexes((prev) => {
  //     const newIndexes = [...prev];
  //     newIndexes[index] = 0;
  //     return newIndexes;
  //   });
  // };

  return (
    <section className="relative">
      <div className="container mx-auto py-0">
        <div className="flex flex-col">
          <div className="mb-5 lg:mb-[60px]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: "easeOut" },
                },
              }}
            >
              <h2
                className="text-xl text-primary font-[600] leading-[1.2] mb-4 lg:mb-7"
                style={{
                  maxWidth: maxchwidth ? `${maxchwidth}ch` : undefined,
                }}
              >
                {data.fourthSection.title}
              </h2>

              <p className="text-19 font-400 lg:max-w-[120ch]">
                {data.fourthSection.description}
              </p>
            </motion.div>
          </div>

   <div className="flex lg:justify-end gap-4 mb-5">
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

          <section className="overflow-hidden">
      <div className="">

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
              1024: { slidesPerView: 3.1 },
            }}
            className="w-full !overflow-visible"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
             {data.fourthSection.items.map((item, index) => (
              <SwiperSlide key={index} className="" >
        <motion.div  className="cursor-pointer">
                <figure className="rounded-custom overflow-hidden h-[250px] lg:h-[300px] xl:h-[400px]">
                  {/* <Image
                    src={project.banner}
                    width={1000}
                    height={500}
                    alt={project.title}
                    className="rounded-lg h-full w-full"
                  /> */}
                  <Canvas camera={{ position: [0, 1, 15] }} className="bg-slate-200">
                            <ambientLight intensity={1} />
                            <directionalLight position={[5, 5, 5]} />
                            <OrbitControls enableZoom={true} />
                            <ModelViewer
                              url={item.threeDFile}
                              position={[0, 0, 0]}
                              scale={0.7}
                            />
                          </Canvas>
                </figure>
                {/* <p className="text-sm text-[#595959] leading-none font-normal py-[25px] border-b border-[#1F1F1F]">{project.sector}</p>
                <h3 className="text-lg font-semibold leading-none pt-[25px]">{project.title}</h3> */}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          </motion.div>

{/* <div className="flex justify-center w-full">
          <div className="flex gap-2 border p-3 rounded-full w-fit">
                          {data.fourthSection.items.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => setActiveIndex(index)}
                              className={`w-[50px] h-[50px] rounded-full overflow-hidden border-2 cursor-pointer ${
                                activeIndex === index
                                  ? "border-secondary"
                                  : "border-[#f2f2f2]"
                              }`}
                            >
                              <Image
                                src={item.style === "3d-file" ? item.threeDFileThumbnail : item.image}
                                alt={item.style === "3d-file" ? item.threeDFileAltThumbnail : item.imageAlt}
                                width={50}
                                height={50}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                        </div> */}


        </div>
      </div>
    </section>
        </div>
      </div>
    </section>
  );
};

export default Structure;
