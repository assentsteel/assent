"use client";

import  { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
  textright?: boolean;

  maxwidth?: string;
  data: PlatformsItem[];
}
const SingleImageText: React.FC<PlatformsSectionProps> = ({data,textright,maxwidth
}) => {

  const containerRef = useRef(null);
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

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
  {data.map((item) => (
    <motion.div
      key={item.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      className={`rounded-[15px] p-6 lg:pt-[116px] lg:pb-[96px] lg:px-[100px] bg-cover relative ${textright ? `blueoverlayrt` : 'blueoverlay'}`}
      style={{
        background: `url(${typeof item.image === 'string' ? item.image : item.image.src})`,
        backgroundSize: 'cover',
      }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={`  flex flex-col justify-center relative z-10 h-full ${maxwidth ? `${maxwidth}` : ''} ${textright ? 'lg:ml-auto' : ''}`}

      >
        <motion.h2
          variants={fadeUp}
          className="text-xl text-white font-[600] leading-[1.2] mb-3 lg:mb-[30px]"
        >
          {item.title}
        </motion.h2>

        {item.paragraphs.map((paragraph, index) => (
          <motion.p
            key={index}
            variants={fadeUp}
            className="mb-4 last:mb-0 text-white text-base font-[400] leading-[1.8]"
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>
    </motion.div>
  ))}
</div>
    </section>
  );
};

export default SingleImageText;
