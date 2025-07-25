"use client";
import { useEffect, useRef,useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "@/public/assets/assets";
import MoreNews from "./MoreNews";
gsap.registerPlugin(ScrollTrigger);
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
 

  import { News, Newsdetails } from '@/public/types/Common';
import Link from "next/link";


      const NewsDetails = ({ data }: { data: Newsdetails }) => {
        const [newsList, setNewsList] = useState<News>();

        const [currentUrl, setCurrentUrl] = useState("");

        useEffect(() => {
          if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
          }
        }, []);


        const handleFetchProjects = async () => {
          try {
            const response = await fetch("/api/admin/news");
            if (response.ok) {
              const data = await response.json();
              setNewsList(data.data);
            } else {
              const data = await response.json();
              alert(data.message);
            }
          } catch (error) {
            console.log("Error fetching news", error);
          }
        };

        useEffect(() => {
          handleFetchProjects();
        }, []);
        console.log(data)

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
  const slideInTop = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
  };
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
    <section className="pb-[50px] md:pb-[70px] xl:pb-[100px] overflow-hidden relative ">
      <div className="container">
        <div className="flex flex-col lg:flex-row ">
          <div className="lg:w-5/6 pr-4 lg:pr-6 xxl:pr-[135px] ">
            <div className=" ">
              <div className="relative w-full  ">
                <motion.div
                  variants={slideInTop}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
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
                    loop
                    slidesPerView={1}
                    spaceBetween={20}
                    className="rounded-xl overflow-hidden"
                  >
                    {data.data.images.map((src, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          src={src}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-[300px] md:h-[400px] lg:h-[570px] object-cover"
                          width={1215}
                          height={570}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* Custom Navigation Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 lg:gap-[30px] z-10">
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
                </motion.div>
              </div>
            </div>
             <div  >
                <div>
                  <motion.div
                    variants={slideInLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    exit="exit"
                    className="flex justify-between items-center mt-4 md:mt-5 mb-4 md:mb-5"
                  >
                    <div className="flex justify-between items-center mt-4 md:mt-5 mb-4 md:mb-5">
                      <p className="text-sm font-[500] text-territory">
                      {new Date(data.data.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })}
                      </p>
                    </div>
                    <div className="flex gap-5 lg:gap-10">
                      <Image src={assets.share} alt="" />
                      <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`} target="_blank"><Image src={assets.linkedin} alt="" /></Link>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  variants={slideInLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  exit="exit"
                >
                  <h2 className="font-[600] text-lg leading-[1.65] text-primary mb-4 lg:mb-[30px]">
                    {data.data.mainTitle}
                  </h2>
                </motion.div>
                <div className="mbp10">
                    <motion.div
                      variants={slideInTop}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      exit="exit"
                      dangerouslySetInnerHTML={{__html: data.data.content}}
                    >

                    </motion.div>

                </div>
              </div>

          </div>

          <div className="lg:w-1/6 ">
            <motion.div
              variants={slideInTop}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between mb-5 lg:mb-10">
                <div className="overflow-hidden ">
                  <p className="text-md uppercase text-[#595959] font-medium border-b inline-flex border-secondary pb-2 lg:pb-[12px] leading-[1.46] ">
                    More news
                  </p>
                </div>
              </div>
              <MoreNews data={newsList} id={data.data._id}/>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetails;
