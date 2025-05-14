"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { assets } from "@/public/assets/assets";

interface ExpertiseItem {
  icon: StaticImageData[];
  title: string;
}
interface ExpertiseSection {
  title: string;
  subttle?: string;
  slideitems: ExpertiseItem[];
}
interface ExpertiseSectionProps {
  maxchwidth?: string;
  data: ExpertiseSection;
}


const imageSets  = [
  [assets.cer2, assets.cer1, assets.cer2],
  [assets.cer2, assets.cer1, assets.cer2],
  [assets.cer2, assets.cer1, assets.cer2, assets.cer3],
];

const Structure: React.FC<ExpertiseSectionProps> = ({ data, maxchwidth }) => {



  const [currentIndexes, setCurrentIndexes] = useState(Array(imageSets.length).fill(0));
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (hovered === null) return;

    const interval = setInterval(() => {
      setCurrentIndexes((prev) => {
        const updated = [...prev];
        const imgs = imageSets[hovered];
        updated[hovered] = (updated[hovered] + 1) % imgs.length;
        return updated;
      });
    }, 2000); // Slide every 4 seconds

    return () => clearInterval(interval);
  }, [hovered]);



  return (
    <section className="  relative">
      <div className="container mx-auto py-0">
        <div className="flex flex-col ">
          <div className="mb-5 lg:mb-[60px]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
              variants={{
                hidden: { opacity: 0, y: 50 }, // Start below and invisible
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: "easeOut" },
                }, // Slide up and fade in
              }}
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                variants={{
                  hidden: { opacity: 0, y: 50 }, // Start below and invisible
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1, ease: "easeOut" },
                  }, // Slide up and fade in
                }}
              >
                <h2
                  className="text-xl text-primary font-[600] leading-[1.2] mb-4 lg:mb-7"
                  style={{
                    maxWidth: maxchwidth ? `${maxchwidth}ch` : undefined,
                  }}
                >
                  {data.title}
                </h2>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                variants={{
                  hidden: { opacity: 0, x: 50 }, // Start below and invisible
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1, ease: "easeOut" },
                  }, // Slide up and fade in
                }}
              >
                <p className="text-19 font-400 lg:max-w-[120ch]">
                  {data.subttle}
                </p>
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-[50px] md:mt-[70px] xl:mt-[100px]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-[50px] md:gap-y-[70px] xl:gap-y-[130px]">
              {data.slideitems.map((items, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 md:gap-5 justify-center"
                >
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                    variants={{
                      hidden: { opacity: 0, x: 50 }, // Start below and invisible
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 1, ease: "easeOut" },
                      }, // Slide up and fade in
                    }}
                  >
                    {" "}

                    <Image src={items.icon[0]} alt="" />
                    <div>
                      <p className="text-lg font-medium text-center">
                        {items.title}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>



           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {imageSets.map((images, groupIndex) => (
        <div
          key={groupIndex}
          className="relative group w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-100"
          onMouseEnter={() => setHovered(groupIndex)}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndexes[groupIndex]}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndexes[groupIndex]]}
                alt={`Slide ${currentIndexes[groupIndex]}`}
                fill
                className="object-cover rounded-xl"
              />
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          {hovered === groupIndex && (
            <>
              <div className="flex gap-2  justify-center  items-center">
                <button
                onClick={() =>
                  setCurrentIndexes((prev) => {
                    const updated = [...prev];
                    const imgs = imageSets[groupIndex];
                    updated[groupIndex] = (updated[groupIndex] - 1 + imgs.length) % imgs.length;
                    return updated;
                  })
                }
                className="  -translate-y-1/2 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center"
              >
                ‹
              </button>
              <button
                onClick={() =>
                  setCurrentIndexes((prev) => {
                    const updated = [...prev];
                    const imgs = imageSets[groupIndex];
                    updated[groupIndex] = (updated[groupIndex] + 1) % imgs.length;
                    return updated;
                  })
                }
                className="  top-1/2 -translate-y-1/2 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center"
              >
                ›
              </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>





      </div>
    </section>
  );
};

export default Structure;
