"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroSectionProps {
  imageSrc: string;
  title: string;
  breadcrumb: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  imageSrc,
  title,
  breadcrumb,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      <div className="relative w-full h-full">
        <div className="overlay absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/60 via-black/40 to-transparent z-[1]"></div>

        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-[0.6]"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="absolute inset-0 flex flex-col justify-between items-start text-left z-[2] container py-10">
          <motion.p
            variants={textVariants}
            className="text-white/50 pt-[100px] text-[16px] font-medium uppercase"
            style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
            Home / {breadcrumb}
            <span
              className="font-bold text-primary"
              style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
              {" "}
              {title}
            </span>
          </motion.p>

          <motion.h1
            variants={textVariants}
            className="text-white text-xxl leading-none pb-10 font-black uppercase">
            <span style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
              {title.split(" ")[0]}
            </span>{" "}
            <span
              className="font-light"
              style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
              {title.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
