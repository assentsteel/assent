"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  image: string | StaticImageData;
}

interface PlatformsSectionProps {
  data: PlatformsItem[];
}
const HeadingText: React.FC<PlatformsSectionProps> = ({ data }) => {
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
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
    const [selectedImage, setSelectedImage] = useState<string | StaticImageData | null>(null);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };
  return (
    <section className="pb-[50px] md:pb-[70px] xl:pb-[100px]  overflow-hidden relative  ">
        <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-4 break-inside-avoid rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => setSelectedImage(item.image)}
            >
              <Image
                src={item.image}
                alt=""
                className="w-full h-auto object-cover rounded-lg transform transition duration-300 group-hover:scale-105 group-hover:brightness-90"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-xl w-full">
              <button
                className="absolute top-2 right-2 text-white text-2xl z-10 flex justify-center items-center bg-primary rounded-full w-[25px] h-[25px]"
                onClick={() => setSelectedImage(null)}
              >
                &times;
              </button>
              <Image
                src={selectedImage}
                alt="popup"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </section>
  );
};

export default HeadingText;
