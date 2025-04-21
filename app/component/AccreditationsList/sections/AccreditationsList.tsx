"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  title: string;
  image: string | StaticImageData;
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}
const AccreditationsList: React.FC<PlatformsSectionProps> = ({ data }) => {
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
    <section className="py-[50px] md:py-[70px] xl:py-[100px]  xxl:py-[150px]  overflow-hidden relative  ">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {data.map((item, index) => (
            <div key={index}>
              <div className="relative group overlbl">
                <figure className="overlayclr">
                  <Image
                    src={item.image}
                    alt=""
                    className="rounded-[15px]   w-full object-cover"
                  />
                </figure>

                <div className="absolute bottom-0 px-5 pb-5 w-full">
                  <p className="text-md text-white font-[600]  pr-0 lg:pr-6 ">
                    {item.title}
                  </p>
                  <div className="flex gap-2 items-center transform opacity-0 group-hover:opacity-100  transition-all duration-500 h-0 group-hover:h-[30px] md:group-hover:h-[48px]">
                    <div className="w-full border-b-2 border-white transition-all duration-500 group-hover:border-secondary"></div>
                    <div className="min-w-[30px] min-h-[30px] lg:min-w-[48px] lg:min-h-[48px] bg-secondary rounded-full flex items-center justify-center translate-x-[-20px] group-hover:translate-x-0  transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none">
                    <path d="M13.8291 17.6665H3.81445V14.3282H13.8291V4.3136H17.1673V14.3282H27.1819V17.6665H17.1673V27.6811H13.8291V17.6665Z" fill="white"/>
                    <path d="M3.4268 30.9941C2.58297 30.9941 1.88519 30.7183 1.33346 30.1665C0.781726 29.6148 0.505859 28.917 0.505859 28.0732V21.8419H1.86896V28.0732C1.86896 28.4627 2.03124 28.8197 2.35579 29.1442C2.68033 29.4688 3.03734 29.631 3.4268 29.631H9.65813V30.9941H3.4268ZM21.3419 30.9941V29.631H27.5732C27.9627 29.631 28.3197 29.4688 28.6442 29.1442C28.9688 28.8197 29.131 28.4627 29.131 28.0732V21.8419H30.4941V28.0732C30.4941 28.917 30.2183 29.6148 29.6665 30.1665C29.1148 30.7183 28.417 30.9941 27.5732 30.9941H21.3419ZM0.505859 10.1581V3.9268C0.505859 3.08297 0.781726 2.38519 1.33346 1.83346C1.88519 1.28173 2.58297 1.00586 3.4268 1.00586H9.65813V2.36896H3.4268C3.03734 2.36896 2.68033 2.53124 2.35579 2.85579C2.03124 3.18033 1.86896 3.53734 1.86896 3.9268V10.1581H0.505859ZM29.131 10.1581V3.9268C29.131 3.53734 28.9688 3.18033 28.6442 2.85579C28.3197 2.53124 27.9627 2.36896 27.5732 2.36896H21.3419V1.00586H27.5732C28.417 1.00586 29.1148 1.28173 29.6665 1.83346C30.2183 2.38519 30.4941 3.08297 30.4941 3.9268V10.1581H29.131Z" fill="white" stroke="white" strokeWidth="0.8"/>
                    </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5 md:mt-[60px]">
          <button className="border flex gap-3 items-center justify-center m-auto whitespace-nowrap font-[500] border-secondary text-xs text-territory uppercase rounded-full py-[8px] px-[20px]  w-fit">
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
      </div>
    </section>
  );
};

export default AccreditationsList;
