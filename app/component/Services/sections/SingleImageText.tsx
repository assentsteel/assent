"use client";

import  { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  title: string;
  paragraphs: string[];
  image: string | StaticImageData;
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}
const SingleImageText: React.FC<PlatformsSectionProps> = ({data
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
    <section className="py-[50px] md:py-[70px] xl:py-[100px]   overflow-hidden relative ">
      <div className="container">
        {data.map((item) => (
               <div className="rounded-[15px] p-10 lg:py-[120px] lg:px-[100px] blueoverlay relative  " key={item.id} style={{background:`url(${typeof item.image === 'string' ? item.image : item.image.src})`, backgroundSize:'cover'}}>

            <div className={`max-w-[100ch]      flex flex-col justify-center relative z-10  h-full `}>
            <h2 className="text-xl    text-white font-[600] leading-[1.2] mb-3 lg:mb-[30px]">{item.title}</h2>
              {item.paragraphs.map((paragraph, index) => (
                <p key={index} className="max-w-[74ch] text-white text-base font-[400] leading-[1.8]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SingleImageText;
