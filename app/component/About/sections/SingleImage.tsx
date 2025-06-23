"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { motion } from "framer-motion";
import { About } from '@/public/types/Common'; 



const SingleImage = ({ data }: { data: About }) => {  
  const containerRef = useRef(null);
  const imageVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
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
    <section className="pb-0 md:pb-[70px] xl:pb-[100px] overflow-hidden relative">
    <div className="container">
      <div>
        <motion.figure
          className="image-wrapper"
          initial="hidden"
          whileInView="visible"
          variants={imageVariants}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Image
            src={data.secondSection.image1}
            alt={data.secondSection.image1Alt}
            className="rounded-[15px]"
            width={4860}
            height={1725}
          />
        </motion.figure>
      </div>
    </div>
  </section>
  );
};

export default SingleImage;
