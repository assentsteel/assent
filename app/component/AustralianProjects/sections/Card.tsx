"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Sectwo } from "@/public/types/Common";
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
import { StaticImageData } from 'next/image';

 
function Card({ item }: { item: { image: string | StaticImageData; imageAlt: string; title: string; description: string } }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      {/* Image */}
      <motion.figure
        className="overlayclr overflow-hidden rounded-[15px]"
        animate={{ scale: hovered ? 1.02 : 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          width={500}
          height={500}
          className="w-full object-cover h-[411px] xl:h-[401px] 2xl:h-[511px]"
        />
      </motion.figure>

      {/* Text overlay */}
      <div className="absolute bottom-0 px-4 pb-4 lg:px-[30px] lg:pb-[30px] w-full">
        {/* Title + animated underline */}
        <motion.p
          className="text-md xl:text-[24px] text-white leading-[1.417] font-[600] pb-[20px] border-b-2 transition-colors duration-300"
          style={{ borderColor: hovered ? "#5ba646" : "white" }}
          animate={{ x: hovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {item.title}
        </motion.p>

        {/* Description — smooth height + opacity via Framer Motion */}
        <motion.div
          initial={false}
          animate={{
            height: hovered ? "auto" : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={{
            height: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
            opacity: { duration: 0.35, delay: hovered ? 0.08 : 0 },
          }}
          style={{ overflow: "hidden" }}
        >
          <p className="mt-[20px] text-sm text-white">{item.description}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default function CardGrid({ data }: { data: { items: Sectwo["items"] } }) {
  return (
    <>
      {data.items.map((item, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Card item={item} />
        </motion.div>
      ))}
    </>
  );
}