"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);



const Listsec = ({   }) => {
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
    <section className="pt-10 xl:pt-[42px]   overflow-hidden relative  ">
      <div className="container">
      <div className="flex  gap-6 ">
          <div className="rounded-full grabg w-[350px] h-[120px] flex justify-center items-center">
            <div className="flex gap-2 items-center">
              <p>p</p>
              <p className="text-lg text-territory">Environmental</p>
            </div>
          </div>

        </div>
        </div>
    </section>
  );
};

export default Listsec;
