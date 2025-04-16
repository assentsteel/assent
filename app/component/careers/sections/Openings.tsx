"use client";

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

const Openings: React.FC<PlatformsSectionProps> = ({data
}) => {

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
    <section className="py-[50px] md:py-[70px] xl:py-[100px]   overflow-hidden relative bg-primary">
      <div className="container">

        {data.map((item) => (
          <div key={item.id}>
          <h2 className="text-xl  text-white font-[600] leading-[1.2] mb-3 lg:mb-[30px]">{item.title}</h2>

          {item.job.map((jobarray, index) => (
            <div key={index}>
              <div className="md:flex justify-between items-center group py-5 lg:py-10 border-b">
                <div className="md:w-1/2"> <p className="font-[600] text-lg text-white group-hover:text-secondary">{jobarray.jobtitle}</p> </div>
                <div className="md:w-1/2 flex justify-between items-center font-[600] text-md text-white group-hover:text-secondary mt-3 md:mt-0">
                  <p>{jobarray.place}</p>
                <div > <div className="flex justify-between ">
                    <div className=" flex gap-4 items-center w-fit m-0 group-hover:border-b cursor-pointer group-hover:border-secondary pb-[10px]   transition-all duration-500 ">
                      <p className="text-xs uppercase text-white group-hover:text-secondary font-[500] inline-flex  leading-[1] ">
                        Apply Now
                      </p>
                      <div className="min-w-[20px] min-h-[20px]   bg-black group-hover:bg-secondary rounded-full flex items-center justify-center  transition-all duration-500">
                        <svg
                          stroke="#ffffff"
                          fill="#ffffff"
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
                  </div></div></div>


              </div>
              </div>

            ))
            }
            </div>
        ))}
      </div>
    </section>
  );
};

export default Openings;
