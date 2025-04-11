"use client";
 ;
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
  data: PlatformsItem[];
}
const TextByImg: React.FC<PlatformsSectionProps> = ({data
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
        <div className="lg:flex items-center">
          <div className="w-full lg:w-1/2 pr-0 lg:pr-[44px]">
            {data.map((item) => (
              <div className="mb-8 lg:mb-0" key={item.id}>
                <h2 className="text-xl  text-primary font-[600] leading-[1.2] mb-4 lg:mb-10">{item.title}</h2>

                <div className="text-territory text-base font-[400] leading-[1.8] mb-6 lg:mb-10">
                  {item.paragraphs.map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/2 pl-0 lg:pl-[44px]">

            {data.map((item) => (
              <div className=" " key={item.id}>
                <figure className="image-wrapper ">
                  <Image src={item.image} alt="A beautiful view" className="rounded-[15px]" />
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextByImg;
