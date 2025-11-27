"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { gdVariants, gdsVariants } from "../../common/MotionAnimation";
gsap.registerPlugin(ScrollTrigger);

import { Sustainability } from "@/public/types/Common";

const Listsec = ({ data }: { data: Sustainability }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const defaultGradient =
    "linear-gradient(90.51deg, #D9D9D9 0.47%, rgba(217, 217, 217, 0) 99.63%)";

  // 🚀 Preload background images to remove hover lag
  useEffect(() => {
    data.firstSection.items.forEach((item) => {
      const imgSrc = typeof item.image === "string" ? item.image : "";
      if (!imgSrc) return;

      const img = new window.Image();

      img.src = imgSrc;
    });
  }, [data.firstSection.items]);

  return (
    <section className="pt-[30px] md:pt-[40px] xl:pt-[60px] overflow-hidden max-w-[1920] mx-auto">
      <div className="container w-full">
        {/* Preload <link> tags for better performance */}
        {data.firstSection.items.map((item, idx) => {
          const imgSrc = typeof item.image === "string" ? item.image : "";
          return imgSrc ? (
            <link key={idx} rel="preload" as="image" href={imgSrc} />
          ) : null;
        })}

        <motion.div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            gap-6 
            place-items-center
          "
          variants={gdVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {data.firstSection.items.map((Item, index) => {
            const bgImage = typeof Item.image === "string" ? Item.image : "";
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                variants={gdsVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="w-full lg:max-w-[320px]"
              >
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="
      grabg border border-secondary rounded-[117px] 
      w-full sm:max-w-[320px]
      min-h-[80px] md:min-h-[100px] xl:min-h-[120px]
      flex justify-center items-center group 
      transition-all duration-500 
      hover:bg-cover hover:bg-center hover:border-white
    "
                  style={{
                    backgroundImage: isHovered
                      ? `url(${bgImage})`
                      : defaultGradient,
                  }}
                >
                  <div className="flex gap-[15px] sm:gap-[10px] items-center">
                    <Image
                      src={Item.logo}
                      alt={Item.logoAlt}
                      width={37}
                      height={37}
                      className="group-hover:invert group-hover:brightness-0 transition-colors duration-400"
                    />
                    <p className="text-lg text-territory group-hover:text-white transition-colors duration-400">
                      {Item.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Listsec;
