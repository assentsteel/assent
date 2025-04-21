"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion"
gsap.registerPlugin(ScrollTrigger);

interface PlatformsItem {
  id: number;
  title: string;
  paragraphs: string[];
  image: string | StaticImageData;
}
interface PlatformsSectionProps {
  data: PlatformsItem[];
  heading: string;
  description: string;
}

const TextByImg: React.FC<PlatformsSectionProps> = ({
  data,
  heading,
  description,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
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
  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -30, transition: { duration: 0.4 } },
  };
  const slideIntop = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 30, transition: { duration: 0.4 } },
  };
  return (
    <section className="pt-[50px] md:pt-[70px] xl:pt-[100px] pb-0 md:pb-[70px] xl:pb-[100px]   overflow-hidden relative ">
      <div className="container">
        <div>
          <motion.h2
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-xl  text-primary font-[600] leading-[1.2] mb-4 lg:mb-7"
          >
            {heading}
          </motion.h2>
          <motion.div
            variants={slideIntop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-4 lg:mb-[60px]"
          >
            <p>{description}</p>
          </motion.div>
        </div>
        <div className="lg:flex lg:items-center xxl:items-start">
          <div className="w-full lg:w-[51%] pr-0 lg:pr-[35px]">
            {data.map((item) => (
              <motion.div className=" hidden first:block" key={item.id}
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              exit="exit">
                <figure className="image-wrapper h-full ">
                  <Image
                    src={item.image}
                    alt="A beautiful view"
                    className="rounded-[15px] w-full object-cover "
                    priority
                  />
                </figure>
              </motion.div>
            ))}
          </div>

          <div className="w-full lg:w-[49%] pl-0 lg:pl-[35px] mt-6 lg:mt-0">
  {data.map((da, index) => (
    <motion.div
      key={index}
      className="group border-b first:border-t border-[#00000015] py-5  lg:py-[20px] xxl:py-[30px] group transition-all duration-300"
      onMouseEnter={() => setActiveIndex(index)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <h3 className="font-[600] text-md text-primary group-hover:text-secondary transition-all duration-300 cursor-pointer leading-[1]">
        {da.title}
      </h3>

      <AnimatePresence mode="wait">
        {activeIndex === index && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: "20px" }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4 }}
            className="text-territory text-sm font-[400] leading-[1.7]"
          >
            <p>{da.paragraphs}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  ))}
</div>
        </div>
      </div>
    </section>
  );
};

export default TextByImg;
