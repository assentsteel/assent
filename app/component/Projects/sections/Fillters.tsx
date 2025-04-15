"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Fillters = ({}) => {
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
    <section className="overflow-hidden relative ">
      <div className="container">
        <div className="lg:flex gap-20 mb-5 lg:mb-10 pb-5 lg:pb-10 border-b border-#00000015">
        <div className="md:flex w-full items-center uppercase text-md font-[500] gap-3 lg:gap-10 mb-5 lg:mb-0 ">
          <p>Filter</p>

          <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
            <select
              className=" uppercase px-1 appearance-none bg-transparent border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-black text-primary text-xs py-2 pr-6 w-full
              "
            >
              <option value="">All countries</option>
              <option value="1">Option One</option>
              <option value="2">Option Two</option>
              <option value="3">Option Three</option>
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#5BA646]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
            <select
              className=" uppercase px-1 appearance-none bg-transparent border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-black text-primary text-xs py-2 pr-6 w-full
              "
            >
              <option value="">Category</option>
              <option value="1">Option One</option>
              <option value="2">Option Two</option>
              <option value="3">Option Three</option>
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#5BA646]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <div className="relative w-full mb-2 md:mb-0 mt-2 md:mt-0">
            <select
              className=" uppercase px-1 appearance-none bg-transparent border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-black text-primary text-xs py-2 pr-6 w-full
              "
            >
              <option value="">Sector</option>
              <option value="1">Option One</option>
              <option value="2">Option Two</option>
              <option value="3">Option Three</option>
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#5BA646]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <div className="relative w-full flex items-center mb-2 md:mb-0 mt-2 md:mt-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" className="absolute">
            <path d="M11.1235 20.0516C15.9379 20.0516 19.8407 16.1015 19.8407 11.2289C19.8407 6.35629 15.9379 2.40625 11.1235 2.40625C6.30909 2.40625 2.40625 6.35629 2.40625 11.2289C2.40625 16.1015 6.30909 20.0516 11.1235 20.0516Z" stroke="#595959" stroke-width="1.5" stroke-miterlimit="10"/>
            <path d="M17.4141 17.3203L23.6072 23.5884" stroke="#595959" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          <input
            type="text"
            placeholder="Search..."
            className="uppercase px-1 ps-8 appearance-none bg-transparent border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-black text-primary text-xs py-2 pr-6 w-full"
          />

          </div>
          </div>
          <button className="border whitespace-nowrap font-[500] border-[#5BA646] text-xs text-territory uppercase rounded-full py-[8px] px-[20px]">Clear filter</button>
        </div>
      </div>
    </section>
  );
};

export default Fillters;
