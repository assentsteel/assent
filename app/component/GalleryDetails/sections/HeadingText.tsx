"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  image: string | StaticImageData;
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}
const HeadingText: React.FC<PlatformsSectionProps> = ({ data }) => {
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
    <section className="pb-[50px] md:pb-[70px] xl:pb-[100px]  overflow-hidden relative  ">
      <div className="container">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
  {data.map((item, index) => (
    <div
      key={index}
      className="mb-4 break-inside-avoid rounded-lg overflow-hidden"
    >
      <Image
        src={item.image}
        alt={""}
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
  ))}
</div>





      </div>
    </section>
  );
};

export default HeadingText;
