"use client";

import Image, { StaticImageData } from "next/image";
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
  leftzero: boolean;
  data: PlatformsItem[];
}
const SingleImageText: React.FC<PlatformsSectionProps> = ({data,leftzero
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
          <div className="relative " key={item.id}>
            <figure className="image-wrapper roverlay">
              <Image src={item.image} width={1920} height={100} alt="A beautiful view" className="rounded-[15px]" />
            </figure>
            <div className={`w-full lg:w-1/2 xl:w-2/3 absolute top-0 p-4 lg:pr-[100px] flex flex-col justify-center   h-full ${leftzero ? 'md:left-[90px]' : 'right-0'}`}>
            <h2 className="text-xl  text-white font-[600] leading-[1.2] mb-3 lg:mb-[30px]">{item.title}</h2>
              {item.paragraphs.map((paragraph, index) => (
                <p key={index} className=" text-white text-base font-[400] leading-[1.8]">
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
