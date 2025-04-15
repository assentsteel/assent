"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { assets } from "@/public/assets/assets";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);



const SingleImage = ({
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
    <section className="overflow-hidden relative ">
      <div className="container">
        <div className=" ">

        <figure className="image-wrapper ">
          <Image src={assets.slide} alt="A beautiful view" className="rounded-[15px]" />
        </figure>
        </div>
      </div>
    </section>
  );
};

export default SingleImage;
