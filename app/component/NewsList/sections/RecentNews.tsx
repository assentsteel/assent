"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "@/public/assets/assets";
gsap.registerPlugin(ScrollTrigger);

const RecentNews = ({}) => {
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
    <section className="pb-[50px] md:pb-[70px] xl:pb-[100px] overflow-hidden relative ">
      <div className="container">
        <div className="flex justify-between mb-[20px] lg:mb-10">
          <div className="overflow-hidden ">
            <p className="text-md uppercase text-[#595959] font-medium border-b inline-flex border-secondary pb-[10px] lg:pb-[18px] leading-[1.46] ">
              Recent news
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 xxl:gap-10 ">
          <div>
            <div className="relative group h-[300px] lg:h-auto overflow-hidden rounded-[15px]">
              <figure className=" h-full blueover">
                <Image
                  src={assets.ren1}
                  alt=""
                  className="rounded-[15px]  h-full w-full object-cover"
                />
              </figure>

              <div className="absolute bottom-0 z-10 px-5 xxl:px-10 pb-5  xxl:pb-10 w-full">
                <p className="text-xs text-white font-[500]  mb-1 ">
                  Jan 19, 2024
                </p>
                <h3 className="line-clamp-2 text-white text-md xxl:text-lg leading-[1.1] xl:leading-[1.5] mb-2 lg:mb-5 font-[600]">
                  ASSENT STEEL’s Commitment to Employee Well-Being and Team
                  Bonding Through..
                </h3>
                <div className="flex justify-between ">
                  <div className=" flex gap-4 items-center border-b  border-secondary pb-[10px]   transition-all duration-500 ">
                    <p className="text-xs uppercase text-white font-[500] inline-flex  leading-[1] ">
                      Read More
                    </p>
                    <div className="min-w-[20px] min-h-[20px]   bg-white rounded-full flex items-center justify-center translate-x-0 group-hover:translate-x-[5px] transition-all duration-500">
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
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:gap-6 xxl:gap-10">
            <div className="vi h-[300px] lg:h-1/2 relative group blueover rounded-[15px]" style={{background:`url(${assets.ren2.src})`, backgroundSize:'cover'}}>
              <div className="absolute bottom-0 z-10 px-5 xxl:px-10 pb-5  xxl:pb-10 w-full">
                <p className="text-xs text-white font-[500]  mb-1 ">
                  Jan 19, 2024
                </p>
                <h3 className="line-clamp-2 text-white text-md xxl:text-lg leading-[1.1] xl:leading-[1.5] mb-2 lg:mb-5 font-[600]">
                Connecting Continents with
                Steel Excellence!
                </h3>
                <div className="flex justify-between ">
                  <div className=" flex gap-4 items-center border-b  border-secondary pb-[10px]   transition-all duration-500 ">
                    <p className="text-xs uppercase text-white font-[500] inline-flex  leading-[1] ">
                      Read More
                    </p>
                    <div className="min-w-[20px] min-h-[20px]   bg-white rounded-full flex items-center justify-center translate-x-0 group-hover:translate-x-[5px] transition-all duration-500">
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
                </div>
              </div>
            </div>
            <div className="vi h-[300px] lg:h-1/2 relative group blueover rounded-[15px]" style={{background:`url(${assets.ren3.src})`, backgroundSize:'cover'}}>
              <div className="absolute bottom-0 z-10 px-5 xxl:px-10 pb-5  xxl:pb-10 w-full">
                <p className="text-xs text-white font-[500]  mb-1 ">
                  Jan 19, 2024
                </p>
                <h3 className="line-clamp-2 text-white text-md xxl:text-lg leading-[1.1] xl:leading-[1.5] mb-2 lg:mb-5 font-[600]">
                Cleaners Appreciation Award
                </h3>
                <div className="flex justify-between ">
                  <div className=" flex gap-4 items-center border-b  border-secondary pb-[10px]    transition-all duration-500 ">
                    <p className="text-xs uppercase text-white font-[500] inline-flex  leading-[1] ">
                      Read More
                    </p>
                    <div className="min-w-[20px] min-h-[20px]   bg-white rounded-full flex items-center justify-center translate-x-0 group-hover:translate-x-[5px] transition-all duration-500">
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
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
