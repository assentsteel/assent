"use client";

import { useState } from "react";
import Image from "next/image";




export default function ImageCarousel({data}:{data:string[]}) {

  console.log(data)
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScreen = (index: number) => {
    setActiveIndex(index);
  };

  const handleNext = () => {
    updateScreen((activeIndex + 1) % data.length);
  };

  const handlePrev = () => {
    updateScreen((activeIndex - 1 + data.length) % data.length);
  };

  // Function to get 4 thumbnails in a loop
  const getThumbnails = () => {
    const start = activeIndex;
    const thumbnails = [];
    for (let i = 0; i < data?.length; i++) {
      thumbnails.push(data && data[(start + i) % data.length]);
    }
    return thumbnails;
  };

  return (
    <div className="flex flex-col gap-4 w-full ">
      {/* Displayed Image with Controls and Thumbnails */}
      <div className="relative w-full lg:h-[571px] h-full aspect-video overflow-hidden rounded-xl shadow-lg flex flex-col justify-end">
        <Image
          src={data && data[activeIndex]}
          alt="Displayed"
          fill
          className="object-cover h-full"
        />
        <div
          className="absolute inset-0 rounded-custom"
          style={{
            background:
              "linear-gradient(to top, rgb(0 0 0 / 69%) 0%, rgb(0 0 0 / 0%) 75%, rgb(0 0 0 / 0%) 0%)",
          }}></div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-4 bottom-[32px] backdrop-blur-[24px] bg-[#0E3F7E]/4 text-primary p-[20px] rounded-[16px] "
          onClick={handlePrev}>
          <Image
            src="/assets/img/projects-details/next-icn.svg"
            alt="image"
            width={12}
            height={12}
          />
          {/* <ChevronLeft className="w-6 h-6" /> */}
        </button>
        <button
          className="absolute right-4 bottom-[32px] backdrop-blur-[24px]  bg-[#0E3F7E]/4
 text-primary p-[20px] rounded-[16px] "
          onClick={handleNext}>
          <Image
            src="/assets/img/projects-details/prev-icn.svg"
            alt=""
            width={12}
            height={12}
          />
        </button>

        {/* Thumbnails Inside Main Image */}
        <div className="absolute bottom-[32px] left-1/2 transform -translate-x-1/2 flex gap-2 backdrop-blur-[24px] bg-[#0E3F7E]/4 p-[12px] rounded-[16px]">
          {getThumbnails().map((img, index) => (
            <div
              key={index}
              className={`cursor-pointer rounded-[8px] overflow-hidden border-2 transition-all w-[54px] h-[54px] ${
                data.indexOf(img) === activeIndex
                  ? "border-[#FE6601]"
                  : "border-transparent"
              }`}
              onClick={() => updateScreen(data.indexOf(img))}>
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={40}
                className="object-cover h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
