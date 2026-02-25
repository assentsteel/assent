"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { imageVariants } from "../../common/MotionAnimation";
import type { GPFirstSection } from "../types";

const FirstSection: React.FC<{ data: GPFirstSection }> = ({
  data,
}) => {
  // 1. Safety check: If data is missing, show a message instead of nothing
  if (!data) {
    return <div className="py-20 text-center">No section data found.</div>;
  }

  return (
    <section className="pt-[29px] lg:pt-[60px] pb100 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div>
          <motion.figure
            className="image-wrapper h-[200px] md:h-auto w-full"
            initial="hidden"
            whileInView="visible"
            variants={imageVariants}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image
              src={data.image}
              alt={data.imageAlt}
              width={1600}
              height={569}
              className="rounded-[15px] object-cover w-full h-full"
            />
          </motion.figure>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
