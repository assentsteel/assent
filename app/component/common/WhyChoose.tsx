"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import "swiper/css";
import "swiper/css/navigation";
import Image  from "next/image";
 
       import {   whychoose } from '@/public/types/Common';   
      const WhyChoose = ({ data }: { data: whychoose}) => {  

  return (
    <section className="overflow-hidden   py-[50px] md:py-[70px] xl:py-[60px] xxl:py-[70px] ">
      <div className="container">
        <div className="  pb-[50px] md:pb-[70px] xl:pb-[100px]">
            <h2 className="mb-5 lg:mb-8 text-xl font-extrabold text-territory">{data.title}</h2>
          <p className=" text-territory">{data.description
          }</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[50px] md:gap-x-[100px] lg:gap-x-[200px] " >
          {data.items.map((itm,index) => (
            <div className="p-3  md:p-[30px] group    border-b border-#00000033 hover:border-0 " key={index}>
              <div className="flex flex-col gap-y-4 md:gap-y-[30px]">
                <div className="align-center   flex h-[68px] w-[68px] rounded-[5px] justify-center  p-2 transition-colors duration-500 bg-secondary   md:h-[50px] md:w-[50px]">
                  <Image
                    src={itm.logo }
                    alt={itm.logoAlt}
                    className="fltrcls transition duration-500 brightness-0 invert-[1] "
                    width={50}
                    height={50}
                  />
                </div>

                <p className="text-territory opacity-90 text-md">{itm.title}</p>
                <p>{itm.description}</p>
              </div>

            </div>
          ))}


        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
