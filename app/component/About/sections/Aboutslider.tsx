"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "@/public/assets/assets";
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  title: string;
  image: StaticImageData;
  heading: string;
  desc: string;
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}

const Aboutslider: React.FC<PlatformsSectionProps> = ({ data }) => {
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

  const mainRef = useRef<Splide | null>(null);
  const thumbsRef = useRef<Splide | null>(null);

  useEffect(() => {
    if (
      mainRef.current &&
      thumbsRef.current &&
      mainRef.current.splide &&
      thumbsRef.current.splide
    ) {
      mainRef.current.splide.sync(thumbsRef.current.splide);
    }
  }, []);

  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px] bg-primary  overflow-hidden relative ">
      <div className="container">
        <div>
          <div className="flex justify-between items-center">
          <h2 className="text-white text-xl font-[600] ">History</h2>
          <div className="flex justify-end gap-4 ">
            <button
              onClick={() => {
                mainRef.current?.go("<");
              }}
              className="bg-white text-black px-3 py-1 rounded-full w-[48px] h-[48px] hover:bg-secondary group transition flex items-center justify-center"
            >
              <Image
                src={assets.greenarrow}
                alt=""
                width={11}
                height={18}
                className="group-hover:brightness-0 group-hover:invert "
              />
            </button>
            <button
              onClick={() => {
                mainRef.current?.go(">");
              }}
              className="bg-white text-black px-3 py-1 rounded-full w-[48px] h-[48px] hover:bg-secondary group transition flex items-center justify-center"
            >
              <Image
                src={assets.greenarrow}
                alt=""
                width={11}
                height={18}
                className="group-hover:brightness-0 group-hover:invert rotate-180"
              />
            </button>
          </div>
          </div>
          <div className=" mt-6 lg:mt-[40px]">
            <div className="border-b relative top-[8px] opacity-35"> </div>
            {/* Thumbnail Slider */}
            <Splide
              options={{
                perPage: 3.28,
                isNavigation: true,
                gap: "1rem",
                focus: 1, // keeps first slide aligned left
                pagination: false,
                cover: true,
                arrows: false,
                breakpoints: {
                  768: {
                    perPage: 2.5,
                  },
                },
              }}
              ref={thumbsRef}
              className="mb-4 justify-center abtstl "
            >
              {data.map((src, index) => (
                <SplideSlide key={`thumb-${index}`}>
                  <p className="font-[600] text-[45px] lg:text-[90px] text-[#54739F] pt-8 lg:pt-[40px]">
                    {src.title}
                  </p>
                </SplideSlide>
              ))}
            </Splide>

            {/* Main Slider */}
            <Splide
              options={{
                perPage: 1,
                pagination: false,
                gap: "1rem",
                arrows: false,
              }}
              ref={mainRef}
            >
              {data.map((src, index) => (
                <SplideSlide key={`main-${index}`}>
                  <div className="md:flex">
                    <div className="md:w-2/5">
                      <div className="pt-3 md:pt-[50px] lg:pt-[100px] md:pr-[50px] lg:pr-[100px] md:border-r border-[#ffffff35]">
                        <Image
                          src={src.image}
                          alt={`Slide ${index + 1}`}
                          width={600}
                          height={400}
                          className="w-full h-auto rounded-xl object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-3/5">
                      <div className="pt-10 md:pt-[50px] lg:pt-[100px] md:pl-[50px] lg:pl-[100px]">
                        <h3 className="text-white text-lg font-[600] mb-5 lg:mb-[40px]">
                          {src.heading}
                        </h3>
                        <p className="text-white max-w-[50ch]">{src.desc}</p>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutslider;
