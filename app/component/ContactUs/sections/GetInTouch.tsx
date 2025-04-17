"use client";

import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface jobarray {
  jobtitle: string;
  place: string;
}
interface PlatformsItem {
  id: number;
  title: string;
  job: jobarray[];
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}

const GetInTouch: React.FC<PlatformsSectionProps> = () => {



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
        <div>
          <div className="flex flex-col md:flex-row gap-2 pb-5 lg:pb-[40px] mb-5 lg:mb-[40px] border-b border-[#00000015] ">
          <div className="border border-[#18355F] w-fit rounded-full min-w-[216px] text-center hover:bg-secondary hover:border-secondary hover:text-white text-territory cursor-pointer transition-all duration-300"><p className="uppercase text-xs  font-[500] py-[12px] px-[24px]">General Enquires</p></div>
          <div className="border border-[#18355F] w-fit rounded-full min-w-[216px] text-center hover:bg-secondary hover:border-secondary hover:text-white text-territory cursor-pointer transition-all duration-300"><p className="uppercase text-xs  font-[500] py-[12px] px-[24px]">Request for quotation</p></div>
          <div className="border border-[#18355F] w-fit rounded-full min-w-[216px] text-center hover:bg-secondary hover:border-secondary hover:text-white text-territory cursor-pointer transition-all duration-300"><p className="uppercase text-xs  font-[500] py-[12px] px-[24px]">downloads</p></div>
          </div>
          <h2 className="text-xl  text-primary font-[600] leading-[1.2] mb-3 lg:mb-[30px]">
          Get In Touch
          </h2>
          <p className="text-[#404040] max-w-[90ch] mb-5 lg:mb-[40px]">With our expertise in steel projects, we are with you to help you realize your dreams. Every step of the way. Simply let us know how we can reach you.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 lg:gap-x-6 xxl:gap-x-10 mb-5 lg:mb-[40px]">
            <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
              <input
                type="text"
                placeholder="Name"
                className=" px-1 appearance-none bg-transparent border-0 border-b border-[#ieieie] focus:outline-none focus:ring-0 focus:border-[black] text-[#595959] text-xs py-2 pr-6 w-full"
              />
            </div>
            <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
              <input
                type="email"
                placeholder="Email Id"
                className=" px-1 appearance-none bg-transparent border-0 border-b border-[#ieieie] focus:outline-none focus:ring-0 focus:border-[black] text-[#595959] text-xs py-2 pr-6 w-full"
              />
            </div>
            <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
              <input
                type="number"
                placeholder="Contact Number"
                className=" px-1 appearance-none bg-transparent border-0 border-b border-[#ieieie] focus:outline-none focus:ring-0 focus:border-[black] text-[#595959] text-xs py-2 pr-6 w-full"
              />
            </div>
          </div>

          <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
          <textarea
  placeholder="Message"
  rows={6}
  className="w-full px-1 py-2 pr-6 text-xs text-[#595959] bg-transparent border-0 border-b border-[#dcdcdc] focus:outline-none focus:ring-0 focus:border-black appearance-none"
/>
            </div>
          <div className=" ">
      <button className="mt-6 min-w-[173px] bg-[#0A2657] text-white text-[16px] font-[400] px-8 py-4 rounded-full shadow-md hover:bg-primary transition duration-300">
        SUBMIT
      </button>
    </div>

        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
