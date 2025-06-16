"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { assets } from "@/public/assets/assets";
import { Projectswfull } from '@/public/types/Common'; 

gsap.registerPlugin(ScrollTrigger);


interface PlatformsSectionProps {
  data:  Projectswfull['categories'][number]['projects'][number] 
}
const Specs: React.FC<PlatformsSectionProps> = ({ data }) => {
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
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };
  return (
    <section className="py-[50px] md:py-[70px] xl:py-[100px]  overflow-hidden relative ">
      <div className="container">
      <motion.div
        className="flex gap-5 items-center"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
      <div className="py-[50px] md:py-[70px] xl:py-[100px] bg-[#18355F] rounded-[15px]">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-y-[80px] gap-x-6 xxl:gap-x-[60px] px-6 md:px-10 lg:px-[150px]">
      <motion.div
        className="flex gap-5 items-center"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image src={assets.spec1} alt="" />
        <div className="text-white">
          <p className="text-xs capitalize">EMPLOYER</p>
          <p className="text-md font-[600] uppercase">{data.employer}</p>
        </div>
      </motion.div>

      <motion.div
        className="flex gap-5 items-center"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image src={assets.spec2} alt="" />
        <div className="text-white">
          <p className="text-xs capitalize">CONTRACTOR</p>
          <p className="text-md font-[600] uppercase">{data.contractor}</p>
        </div>
      </motion.div>

      <motion.div
        className="flex gap-5 items-center"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image src={assets.spec3} alt="" />
        <div className="text-white">
          <p className="text-xs capitalize">CONSULTANT</p>
          <p className="text-md font-[600] uppercase">{data.consultant}</p>
        </div>
      </motion.div>

      <motion.div
        className="flex gap-5 items-center"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image src={assets.spec4} alt="" />
        <div className="text-white">
          <p className="text-xs capitalize">COUNTRY</p>
          <p className="text-md font-[600] uppercase">{data.location}</p>
        </div>
      </motion.div>

      <motion.div
        className="flex gap-5 items-center"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image src={assets.spec5} alt="" />
        <div className="text-white">
          <p className="text-xs capitalize">SCOPE</p>
          <p className="text-md font-[600] uppercase">{data.scope}</p>
        </div>
      </motion.div>

      <motion.div
        className="flex gap-5 items-center"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image src={assets.spec6} alt="" />
        <div className="text-white">
          <p className="text-xs capitalize">STEEL TONNAGE</p>
          <p className="text-md font-[600] uppercase">{data.steelTonnage}</p>
        </div>
      </motion.div>

  </div>
</div>
</motion.div>
      </div>
    </section>
  );
};

export default Specs;
