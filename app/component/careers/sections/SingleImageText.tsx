"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface specarr {
  icon : string | StaticImageData;
  text: string;
}
interface PlatformsItem {
  id: number;
  title: string;
  paragraphs: string[];
  image: string | StaticImageData;
  specs: specarr[];
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

            <div className={`w-full md:w-5/6  xl:w-2/3     flex flex-col justify-center relative z-10   h-full`}>
            <h2 className="text-xl  text-white font-[600] leading-[1.2] mb-3 lg:mb-[30px]">{item.title}</h2>
              {item.paragraphs.map((paragraph, index) => (
                <p key={index} className=" text-white text-base font-[400] leading-[1.8]">
                  {paragraph}
                </p>
              ))}
              <div className="grid grid-cols-1   lg:grid-cols-2 mt-6 lg:mt-10 border-b   border-white">

                {item.specs.map((spec, index) => (
                  <div key={index}>
                  <div key={index} className="flex items-center gap-3 lg:gap-7 py-4 lg:py-[25px]  border-t border-white">
                    <Image src={spec.icon} alt="" />
                      <p className="text-md text-white">{spec.text}</p>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SingleImageText;
