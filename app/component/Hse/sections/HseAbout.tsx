"use client";

import { motion } from "framer-motion";
import React from "react";

interface SecondBlockProps {
  data: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    secondDescription?: string;
    secondImage?: string; // this is now the BACKGROUND
    secondImageAlt?: string;
  };
}

const SecondBlock = ({ data }: SecondBlockProps) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="pb-[50px] md:pb-[70px] xl:pb-[80px] xxl:pb-[100px] pt-10 overflow-hidden relative">
      <div className="container">
        {/* BLOCK WITH BACKGROUND IMAGE + GRADIENT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="relative rounded-[15px] p-4 lg:pt-[116px] lg:pb-[96px] lg:px-[100px] overflow-hidden blueoverlay"
          style={{
            backgroundImage: `url(${data.secondImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 max-w-[110ch]"
          >
            {/* ONLY DESCRIPTION */}
            {data.secondDescription && (
              <motion.p
                variants={fadeUp}
                className="text-white text-base font-[400] leading-[1.8]"
                dangerouslySetInnerHTML={{ __html: data.secondDescription }}
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecondBlock;
