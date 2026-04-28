"use client";
import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { assets } from "@/public/assets/assets";
import MoreBlogs from "./MoreBlogs";
gsap.registerPlugin(ScrollTrigger);
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";


import { Blogs, Bogs } from '@/public/types/Common';
// import Link from "next/link";  

// import { blogData } from "@/app/component/BlogList/data";

const BlogDetails = ({ data }: { data: Bogs }) => {
  const [blogsList, setBlogsList] = useState<Blogs>();

  // const [currentUrl, setCurrentUrl] = useState("");

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setCurrentUrl(window.location.href);
  //   }
  // }, []);


  const handleFetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/blogs");
      if (response.ok) {
        const data = await response.json();
        setBlogsList(data.data);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error fetching Blogs", error);
    }
  };

  useEffect(() => {
    handleFetchProjects();
  }, []);
  // console.log(data)

  const containerRef = useRef(null);

  // const prevRef = useRef<HTMLButtonElement | null>(null);
  // const nextRef = useRef<HTMLButtonElement | null>(null);
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
          <div className={`lg:w-5/6 pr-4 lg:pr-6 xxl:pr-[135px] `}>
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
                  <div className="flex justify-between items-center  ">
                    <p className="text-[13px] md:text-sm font-[500] text-territory">
                      {new Date(data.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </p>
                  </div>
                  {/* <div className="flex gap-5 lg:gap-10">
                      <Image src={assets.share} alt="" />
                      <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`} target="_blank"><Image src={assets.linkedin} alt="" /></Link>
                    </div> */}
                </motion.div>
              </div>
            
              <div className="mbp10 blogcotentmn">
                <div
                  // variants={slideInTop}
                  // initial="hidden"
                  // whileInView="visible"
                  // viewport={{ once: true, amount: 0.3 }}
                  // exit="exit"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                >

                </div>

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
                      More Blogs
                    </p>
                  </div>
                </div>
                <MoreBlogs data={blogsList} id={data._id} />
              </motion.div>
            </div>
        
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
