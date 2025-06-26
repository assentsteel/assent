"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../common/MotionAnimation"
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger); 
  import { Gallery } from '@/public/types/Common';

  const HeadingText = ({ data }: { data: Gallery }) => { 
    const [visibleCount, setVisibleCount] = useState(12);
     
    const visibleItems = data.slice(0, visibleCount); 
    const handleLoadMore = () => {
      setVisibleCount((prev) => prev + 8);
    }; 
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
    <section className="pb-[50px] md:pb-[70px] xl:pb-[100px]    relative  ">
      <div className="container">

      < div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
   
>
  {visibleItems.map((item, index) => (
    <div key={index}  >
      <div
        className="relative group"
        
      >
        <Link href={`/gallery-details/${item.slug}`}>
          <figure className="overlayclr">
            <Image
              src={item.thumbnail}
              alt=""
              className="rounded-[15px] w-full object-cover"
              priority
              width={500}
              height={500}
            />
          </figure>
          <div className="absolute bottom-0 px-5 pb-5 lg:px-[30px] lg:pb-[30px] w-full">
            <p className="text-md text-white font-[600] pr-0 lg:pr-6">
              {item.title}
            </p>
            <div className="flex gap-2 items-center transform opacity-0 group-hover:opacity-100 transition-all duration-500 h-0 group-hover:h-[30px] md:group-hover:h-[48px]">
              <div className="w-full border-b-2 border-white transition-all duration-500 group-hover:border-secondary"></div>
              <div className="min-w-[30px] min-h-[30px] lg:min-w-[48px] lg:min-h-[48px] bg-secondary rounded-full flex items-center justify-center translate-x-[-20px] group-hover:translate-x-0 transition-all duration-500">
                <svg
                  stroke="#fff"
                  fill="#fff"
                  strokeWidth="0"
                  viewBox="0 0 320 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  ))}
</div>

{data.length > visibleCount && (
  <div className="text-center mt-5 md:mt-[60px]">
    <button
      onClick={handleLoadMore}
      className="border flex gap-3 items-center justify-center m-auto whitespace-nowrap font-[500] border-secondary text-xs text-territory uppercase rounded-full py-[8px] px-[20px]  w-fit"
    >
      Load More
      <svg
        stroke="#000"
        fill="#000"
        strokeWidth="0"
        viewBox="0 0 320 512"
        height="10px"
        width="8px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
      </svg>
    </button>
  </div>
)}

      </div>
    </section>
  );
};

export default HeadingText;
