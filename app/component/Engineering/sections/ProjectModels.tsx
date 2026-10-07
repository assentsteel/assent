"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { Engineering } from '@/public/types/Common';

// Loaded client-side only: keeps three.js / @react-three/fiber out of the
// server render and this route's initial JS bundle (SEO/perf fix — the GLTF
// viewer never produces indexable content anyway, so it costs nothing to
// defer it until after hydration).
const ModelCanvas = dynamic(() => import("./ModelCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

    const ProjectModels = ({ data }: { data: Engineering}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedItem = data.thirdSection.items[activeIndex];

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + data.thirdSection.items.length) % data.thirdSection.items.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % data.thirdSection.items.length);
  };

  const renderViewer = () => {
    if (selectedItem.style === "3d-file") {
      return <ModelCanvas url={selectedItem.threeDFile} />;
    } else if (selectedItem.style === "image") {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={selectedItem.image}
            alt={selectedItem.imageAlt}
            width={600}
            height={600}
            className="object-contain max-h-full max-w-full"
          />
        </div>
      );
    }
  };

  return (
    <section className="pt-[50px] md:pt-[70px] xl:pt-[80px] xxl:pt-[100px] pb-[0px] md:pb-[0px] xl:pb-[0px] overflow-hidden relative">
      <div className="container">
        <div className="lg:flex items-center">
          {/* Viewer Section */}
          <div className="w-full md:w-1/2 h-[500px] md:h-[600px] pr-0 lg:pr-[44px]">
            {renderViewer()}
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-xl  text-primary font-[600] leading-[1.2] mb-4 lg:mb-10">
              {data.thirdSection.title}
            </h2> 
            <div  dangerouslySetInnerHTML={{__html: data.thirdSection.description}}></div>
             
            {/* Navigation Thumbnails */}
            <div className="flex items-center gap-4 mt-4">
              {/* Left Button */}
              <button
                onClick={handlePrev}
                className="bg-white border text-black px-3 py-1 rounded-full w-[48px] h-[48px] hover:bg-secondary group transition flex items-center justify-center"
              >
                <Image
                  src={assets.greenarrow}
                  alt=""
                  width={11}
                  height={18}
                  className="group-hover:brightness-0 group-hover:invert "
                />
              </button>

              {/* Thumbnails */}
              <div className="flex gap-2 border p-3 rounded-full">
                {data.thirdSection.items.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-[50px] h-[50px] rounded-full overflow-hidden border-2 cursor-pointer ${
                      activeIndex === index
                        ? "border-secondary"
                        : "border-[#f2f2f2]"
                    }`}
                  >
                    <Image
                      src={item.style === "3d-file" ? item.threeDFileThumbnail : item.image}
                      alt={item.style === "3d-file" ? item.threeDFileAltThumbnail : item.imageAlt}
                      width={50}
                      height={50}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>

              {/* Right Button */}
              <button
                onClick={handleNext}
                className="bg-white border text-black px-3 py-1 rounded-full w-[48px] h-[48px] hover:bg-secondary group transition flex items-center justify-center"
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
        </div>
      </div>
    </section>
  );
}
export default ProjectModels;