"use client";
import {  useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);
  
    import { News } from '@/public/types/Common'; 
     
      
        const MoreNews = ({ data, id }: { data: News | undefined ,id:number}) => {
  const containerRef = useRef(null);
console.log(data);
const filteredNews = data?.news.filter((item) => item._id !== id);
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

  if (!filteredNews) return null;  // Return null if data is undefined

  return (
    <section className="pb-[50px] md:pb-[70px] xl:pb-[100px] overflow-hidden relative ">
      <div >

        <div className=" ">
          {filteredNews?.slice(0, 3).map((item, index) => (

            <div key={index} >
              <div className="relative group lg:h-auto  rounded-[15px]">
                <figure className=" h-[197px] w-[270px] ">
                  <Image
                    src={item.thumbnail}
                    alt={item.thumbnailAlt}
                    className="rounded-[15px]  h-full w-full object-cover"
                    width={270}
                    height={197}
                  />
                </figure>

                <div className=" pt-[10px] w-full">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-[#595959] font-[400] leading-[1.9] "> 
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })}
                    </p>
                    <p className="text-xs text-[#595959] font-[400] leading-[1.9] ">
                      {item.category}
                    </p>
                  </div>
                  <h3 className="line-clamp-2 text-black text-sm mt-2 lg:mt-5  leading-[1.3] xl:leading-[1.8] mb-4 lg:mb-[10px] font-[400]">
                    {item.mainTitle}
                  </h3>
                  <div className="flex justify-between mb-5 lg:mb-0">
                    <Link href={`/news-details/${item.slug}`}>
                    <div className=" flex gap-4 items-center w-fit m-0 border-b  border-secondary pb-[10px]   transition-all duration-500 ">
                      <p className="text-xs uppercase text-black font-[500] inline-flex  leading-[1] ">
                        Read More
                      </p>
                      <div className="min-w-[20px] min-h-[20px]   bg-black rounded-full flex items-center justify-center translate-x-0 group-hover:translate-x-[5px] transition-all duration-500">
                        <svg
                          stroke="#5BA646"
                          fill="#5BA646"
                          strokeWidth="0"
                          viewBox="0 0 320 512"
                          height="10px"
                          width="8px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
                        </svg>
                      </div>
                    </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="locks  lg:block lg:col-span-2 xl:col-span-3 h-[1px] bg-[#ccc] my-8 xl:my-[40px]"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};



export default MoreNews;
