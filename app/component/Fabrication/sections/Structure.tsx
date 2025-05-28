"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const Structure: React.FC<ExpertiseSectionProps> = ({ data, maxchwidth }) => {
  const [currentImageIndexes, setCurrentImageIndexes] = useState(
    data.slideitems.map(() => 0)
  );
  const [intervals, setIntervals] = useState<(NodeJS.Timeout | null)[]>(
    data.slideitems.map(() => null)
  );

  const handleMouseEnter = (index: number) => {
    if (intervals[index]) return;

    const interval = setInterval(() => {
      setCurrentImageIndexes((prev) => {
        const newIndexes = [...prev];
        newIndexes[index] =
          (newIndexes[index] + 1) % data.slideitems[index].icon.length;
        return newIndexes;
      });
    }, 1000);

    const updatedIntervals = [...intervals];
    updatedIntervals[index] = interval;
    setIntervals(updatedIntervals);
  };

  const handleMouseLeave = (index: number) => {
    const interval = intervals[index];
    if (interval) {
      clearInterval(interval);
      const updatedIntervals = [...intervals];
      updatedIntervals[index] = null;
      setIntervals(updatedIntervals);
    }

    setCurrentImageIndexes((prev) => {
      const newIndexes = [...prev];
      newIndexes[index] = 0;
      return newIndexes;
    });
  };

  return (
    <section className="relative">
      <div className="container mx-auto py-0">
        <div className="flex flex-col">
          <div className="mb-5 lg:mb-[60px]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: "easeOut" },
                },
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

              <p className="text-19 font-400 lg:max-w-[120ch]">
                {data.subttle}
              </p>
            </motion.div>
          </div>

          <div className="my-[50px] md:my-[70px] xl:my-[100px]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[10px] md:gap-[70px] xl:gap-[130px]">
              {data.slideitems.map((items, index) => (
                <div
  key={index}
  className="flex flex-col items-center gap-3 md:gap-5 justify-center group" // <-- Add 'group' here
  onMouseEnter={() => handleMouseEnter(index)}
  onMouseLeave={() => handleMouseLeave(index)}
>
                 <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={{
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  }}
  className="w-full"
>
  <div className="relative w-full min-h-[100px]  lg:min-h-full">{/* Ensures image doesn't collapse */}
    <AnimatePresence mode="wait">
      <motion.div
        key={currentImageIndexes[index]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 cursor-pointer"
      >
        <Image
          src={items.icon[currentImageIndexes[index]]}
          alt={items.title}
          fill
          style={{ objectFit: "contain" }}
        />
      </motion.div>
    </AnimatePresence>
  </div>

  {/* Pagination dots */}
  <div className="flex items-center justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    {items.icon.map((_, imgIndex) => (
      <button
        key={imgIndex}
        onClick={() => {
          const newIndexes = [...currentImageIndexes];
          newIndexes[index] = imgIndex;
          setCurrentImageIndexes(newIndexes);
        }}
        className={`w-3 h-3 rounded-full border border-gray-400 transition-all duration-300 ${
          imgIndex === currentImageIndexes[index]
            ? "bg-primary border-primary scale-110"
            : "bg-white hover:bg-gray-200"
        }`}
      />
    ))}
  </div>

  {/* Title - properly placed below the image */}
  <div className="mt-4">
    <p className="text-lg font-medium text-center">{items.title}</p>
  </div>
</motion.div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Structure;
